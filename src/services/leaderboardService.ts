import { supabase } from '@/lib/supabase'
import type { PostgrestError, PostgrestSingleResponse, PostgrestResponse } from '@supabase/supabase-js'

export interface LeaderboardEntry {
  id: string
  full_name?: string
  username?: string
  avatar_url?: string
  total_xp: number
  level: number
  eco_coins?: number
  institution?: string | null
}

export type LeaderboardScope = 'global' | 'school'

export interface LeaderboardRankResult {
  rank: number | null
  error: PostgrestError | Error | null
  scopeUsed: LeaderboardScope
}

export interface LeaderboardFetchResult {
  data: LeaderboardEntry[]
  error: PostgrestError | Error | null
  scopeUsed: LeaderboardScope
}

const PROFILE_COLUMNS = 'id,full_name,username,avatar_url,total_xp,level,eco_coins,institution'

export async function fetchUserRank(scope: LeaderboardScope, userId: string, institution?: string): Promise<LeaderboardRankResult> {
  try {
    const meResponse: PostgrestSingleResponse<{ id: string; total_xp: number; institution: string | null }> = await supabase
      .from('profiles')
      .select('id,total_xp,institution')
      .eq('id', userId)
      .single()

    if (meResponse.error || !meResponse.data) {
      return { rank: null, error: meResponse.error, scopeUsed: scope }
    }

    const me = meResponse.data

    let countQuery = supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .gt('total_xp', me.total_xp)

    let scopeUsed: LeaderboardScope = 'global'
    if (scope === 'school' && (institution || me.institution)) {
      countQuery = countQuery.eq('institution', institution || me.institution)
      scopeUsed = 'school'
    }

    const { count, error: countError } = await countQuery
    if (countError) {
      return { rank: null, error: countError, scopeUsed }
    }

    const higherCount = typeof count === 'number' ? count : 0
    return { rank: higherCount + 1, error: null, scopeUsed }
  } catch (error) {
    return { rank: null, error: error instanceof Error ? error : null, scopeUsed: scope }
  }
}

export const getInitialsAvatar = (name?: string) => {
  const n = (name || 'Student').trim()
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(n)}&background=10b981&color=fff&size=64&rounded=true`
}

export async function fetchLeaderboard(scope: LeaderboardScope, institution?: string, limit = 100): Promise<LeaderboardFetchResult> {
  try {
    const baseQuery = () =>
      supabase
        .from('profiles')
        .select(PROFILE_COLUMNS)
        .order('total_xp', { ascending: false })
        .limit(limit)

    if (scope === 'school' && institution) {
      const schoolQuery = baseQuery().eq('institution', institution)
      const { data, error }: PostgrestResponse<LeaderboardEntry> = await schoolQuery

      if (!error) {
        return { data: data ?? [], error: null, scopeUsed: 'school' }
      }

      const { data: globalData, error: globalErr }: PostgrestResponse<LeaderboardEntry> = await baseQuery()
      return { data: globalData ?? [], error: globalErr, scopeUsed: 'global' }
    }

    const { data, error }: PostgrestResponse<LeaderboardEntry> = await baseQuery()
    return { data: data ?? [], error, scopeUsed: 'global' }
  } catch (error) {
    return { data: [], error: error instanceof Error ? error : null, scopeUsed: scope }
  }
}

export function subscribeToProfilesChanges(onChange: () => void) {
  const channel = supabase
    .channel('realtime:profiles-leaderboard')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'profiles'
      },
      () => {
        onChange()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
