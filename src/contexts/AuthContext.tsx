import React, { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { queryClient } from '@/lib/queryClient'
import { AuthContext, type AuthResult, type AuthContextType, type Profile, type ProfileResult } from '@/contexts/auth-context'
import type { PostgrestSingleResponse, RealtimeChannel, Session, User, AuthError } from '@supabase/supabase-js'

const toSupabaseAuthError = (error: unknown): AuthError | null => {
  if (error && typeof error === 'object') {
    const candidate = error as Record<string, unknown>;
    if (typeof candidate.name === 'string' && candidate.name.includes('Auth')) {
      return error as AuthError;
    }
    if ('status' in candidate && 'message' in candidate) {
      return error as AuthError;
    }
  }

  return null;
};

const PROFILE_CACHE_PREFIX = 'ecolearn-profile-cache'

const getProfileCacheKey = (userId: string) => `${PROFILE_CACHE_PREFIX}:${userId}`

const readProfileFromCache = (userId: string): Profile | null => {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(getProfileCacheKey(userId))
    if (!raw) return null
    const parsed = JSON.parse(raw) as { profile?: Profile }
    return parsed?.profile ?? null
  } catch (error) {
    console.warn('Failed to read cached profile:', error)
    return null
  }
}

const writeProfileToCache = (profile: Profile) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(
      getProfileCacheKey(profile.id),
      JSON.stringify({ profile, timestamp: Date.now() })
    )
  } catch (error) {
    console.warn('Failed to cache profile:', error)
  }
}

const clearProfileCache = (userId: string) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(getProfileCacheKey(userId))
  } catch (error) {
    console.warn('Failed to clear cached profile:', error)
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Refs to prevent infinite loops and track state
  const isMountedRef = useRef(true)
  const initializingRef = useRef(false)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const loadingRef = useRef(true)
  const profileFetchRef = useRef<{ userId: string; promise: Promise<Profile | null> } | null>(null)
  const userIdRef = useRef<string | null>(null)

  useEffect(() => {
    userIdRef.current = user?.id ?? null
  }, [user?.id])

  const withTimeout = <T,>(promise: Promise<T> | PromiseLike<T>, timeoutMs: number, timeoutMessage: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(timeoutMessage))
      }, timeoutMs)

      Promise.resolve(promise)
        .then(result => {
          clearTimeout(timeout)
          resolve(result)
        })
        .catch(err => {
          clearTimeout(timeout)
          reject(err)
        })
    })
  }

  const fetchProfile = useCallback(async (userId: string, options: { skipNetworkIfCached?: boolean; force?: boolean } = {}) => {
    if (!userId) return null

    const cachedProfile = readProfileFromCache(userId)

    if (cachedProfile && isMountedRef.current) {
      setProfile(prev => {
        if (!prev) return cachedProfile
        return prev.updated_at === cachedProfile.updated_at ? prev : cachedProfile
      })
      if (options.skipNetworkIfCached && !options.force) {
        return cachedProfile
      }
    }

    if (!options.force && profileFetchRef.current?.userId === userId) {
      return profileFetchRef.current.promise
    }

    const fetchPromise = (async () => {
      try {
        console.log('Fetching profile for user:', userId)

        const profilePromise = supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        const { data, error }: PostgrestSingleResponse<Profile> = await withTimeout(
          profilePromise as unknown as Promise<PostgrestSingleResponse<Profile>>,
          7000,
          'Profile fetch timeout'
        )

        if (error && error.code !== 'PGRST116') {
          console.info('Profile fetch failed (non-critical):', error.message)
          return cachedProfile ?? null
        }

        if (data && isMountedRef.current) {
          setProfile(data)
          writeProfileToCache(data)
          return data
        }

        if (!data) {
          console.log('No profile found, user may need to complete setup')
          return null
        }

        return data
      } catch (error) {
        if (!isMountedRef.current) return cachedProfile ?? null

        if (error instanceof Error && error.message === 'Profile fetch timeout') {
          console.info('Profile fetch exceeded timeout, using cached profile if available')
        } else {
          console.warn('Profile fetch failed (continuing without profile):', error instanceof Error ? error.message : 'Unknown error')
        }

        return cachedProfile ?? null
      } finally {
        if (profileFetchRef.current?.userId === userId) {
          profileFetchRef.current = null
        }
      }
    })()

    profileFetchRef.current = { userId, promise: fetchPromise }
    return fetchPromise
  }, [])

  useEffect(() => {
    loadingRef.current = loading
  }, [loading])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [])

  // Subscribe to realtime updates for the current user's profile
  useEffect(() => {
    if (!user?.id) return

    const channel = supabase
      .channel(`realtime:profile-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        async () => {
          // Refetch latest profile snapshot to ensure consistency
          await fetchProfile(user.id)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchProfile, user?.id])

  useEffect(() => {
    // Prevent multiple initializations
    if (initializingRef.current) {
      console.log('Auth already initializing, skipping...')
      return
    }
    
    initializingRef.current = true
    
    // Set loading timeout to prevent infinite loading
    loadingTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current && loadingRef.current) {
        console.error('Auth initialization timeout reached')
        setLoading(false)
        setError('Authentication timeout. Please refresh the page.')
      }
    }, 10000)
    
    // Get initial session with error handling
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...')
        
        // Add timeout to getSession call
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session timeout')), 5000)
        )
        
        const response = await Promise.race([
          sessionPromise,
          timeoutPromise
        ]) as Awaited<ReturnType<typeof supabase.auth.getSession>>

        const { data: { session }, error } = response
        
        if (error) {
          console.error('Error getting session:', error)
          throw error
        }
        
        if (!isMountedRef.current) return
        
        console.log('Session retrieved:', session ? 'authenticated' : 'not authenticated')
        
        setSession(session)
        setUser(session?.user ?? null)
        setError(null)

        if (session?.user) {
          const cachedProfile = readProfileFromCache(session.user.id)
          if (cachedProfile) {
            setProfile(cachedProfile)
          }
          fetchProfile(session.user.id).catch(profileError => {
            console.warn('Profile fetch during init failed:', profileError)
          })
        } else {
          setProfile(null)
        }

      } catch (error) {
        if (error instanceof Error && error.message === 'Session timeout') {
          console.info('Initial session request exceeded timeout, waiting for auth change event')
        } else {
          console.error('Failed to get initial session:', error)
        }

        if (isMountedRef.current) {
          if (!(error instanceof Error && error.message === 'Session timeout')) {
            setError('Failed to initialize authentication')
          }
          setSession(null)
          setUser(null)
          if (userIdRef.current) {
            clearProfileCache(userIdRef.current)
          }
          setProfile(null)
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
          initializingRef.current = false
          if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current)
          }
        }
      }
    }

    // Initialize auth
    getInitialSession()

    // Listen for auth changes with error handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        console.log('Auth state changed:', event, session ? 'authenticated' : 'not authenticated')
        
        if (!isMountedRef.current) return
        
        setSession(session)
        setUser(session?.user ?? null)
        setError(null)

        if (session?.user) {
          const cachedProfile = readProfileFromCache(session.user.id)
          if (cachedProfile) {
            setProfile(cachedProfile)
          }
          fetchProfile(session.user.id, { force: true }).catch(profileError => {
            console.warn('Profile fetch after auth change failed:', profileError)
          })
        } else {
          setProfile(null)
        }

      } catch (error) {
        console.error('Error handling auth state change:', error)
        if (isMountedRef.current) {
          setError('Authentication error occurred')
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    })

    return () => {
      console.log('Cleaning up auth subscription')
      subscription.unsubscribe()
    }
  }, [fetchProfile])
  const createProfile = async (userId: string, email: string, username: string, fullName: string) => {
    try {
      const newProfile = {
        id: userId,
        email,
        username,
        full_name: fullName,
        avatar_url: '',
        bio: '',
        level: 1,
        total_xp: 0,
        eco_coins: 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const insertPromise = supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single()

      const { data, error } = await insertPromise as unknown as PostgrestSingleResponse<Profile>

      if (error) {
        console.error('Error creating profile:', error)
        return { error }
      }

      setProfile(data)
      writeProfileToCache(data)
      return { error: null }
    } catch (error) {
      console.error('Error creating profile:', error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, username: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: fullName
          }
        }
      })

      if (error) {
        return { error }
      }

      // Create profile if user was created successfully
      if (data.user) {
        await createProfile(data.user.id, email, username, fullName)
      }

      return { error: null }
    } catch (error) {
      console.error('Error during sign up:', error)
      return { error: toSupabaseAuthError(error) }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email)
      setError(null)
      setLoading(true)
      
      // Add timeout to sign in
      const signInPromise = supabase.auth.signInWithPassword({
        email,
        password
      })
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Sign in timeout')), 10000)
      )
      
      const response = await Promise.race([
        signInPromise,
        timeoutPromise
      ]) as Awaited<ReturnType<typeof supabase.auth.signInWithPassword>>

      const { data, error } = response

      if (error) {
        console.error('Sign in error:', error.message)
        setLoading(false)
        return { error }
      }
      
      console.log('Sign in successful')

      if (data.session) {
        setSession(data.session)
      }

      if (data.user) {
        setUser(data.user)
        const cachedProfile = readProfileFromCache(data.user.id)
        if (cachedProfile) {
          setProfile(cachedProfile)
        }
        fetchProfile(data.user.id, { force: true }).catch(profileError => {
          console.warn('Profile fetch after sign in failed:', profileError)
        })
      }

      setLoading(false)
      return { error: null }
    } catch (error) {
      console.error('Sign in failed:', error)
      setLoading(false)
      return { error: toSupabaseAuthError(error) }
    }
  }

  const signOut = async () => {
    console.log('Signing out user...')
    setLoading(true)
    setError(null)

    const cleanup = () => {
      try {
        const supabaseWithChannels = supabase as typeof supabase & { getChannels?: () => RealtimeChannel[] }
        const channels = supabaseWithChannels.getChannels?.() ?? []
        channels.forEach(channel => {
          try {
            supabase.removeChannel(channel)
          } catch (removeError) {
            console.warn('Failed to remove channel during sign out cleanup:', removeError)
          }
        })
      } catch (channelError) {
        console.warn('Failed to enumerate channels during sign out cleanup:', channelError)
      }

      const cachedUserId = userIdRef.current

      queryClient.clear()
      setSession(null)
      setUser(null)
      if (cachedUserId) {
        clearProfileCache(cachedUserId)
      }
      setProfile(null)

      try {
        const keysToRemove = [
          'dashboard-courses',
          'dashboard-progress',
          'dashboard-initialized',
          'dashboard-last-update',
          'mock-user-progress',
          'mock-courses',
          'mock-games'
        ]
        keysToRemove.forEach(k => localStorage.removeItem(k))
      } catch (cleanupError) {
        console.warn('Failed to clear cached data during sign out:', cleanupError)
      }
    }

    try {
      const { error } = await withTimeout(supabase.auth.signOut(), 5000, 'Sign out timeout')
      if (error) {
        console.error('Error signing out:', error)
      }
    } catch (error) {
      console.warn('Sign out timed out or failed, continuing with local cleanup:', error)
    } finally {
      cleanup()
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>): Promise<ProfileResult> => {
    if (!user || !profile) return { error: 'No user logged in' }

    try {
      const updatedProfile = { 
        ...updates, 
        updated_at: new Date().toISOString() 
      }

      const updatePromise = supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', user.id)
        .select()
        .single()

      const { data, error } = await updatePromise as unknown as PostgrestSingleResponse<Profile>

      if (error) {
        return { error }
      }

      setProfile(data)
      writeProfileToCache(data)
      return { error: null }
    } catch (error) {
      console.error('Error updating profile:', error)
      return { error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  const value = {
    user,
    session,
    profile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
