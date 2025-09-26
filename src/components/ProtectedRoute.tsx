import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, error } = useAuth()
  const [loadingTimeout, setLoadingTimeout] = useState(false)
  const [allowAccess, setAllowAccess] = useState(false)
  const [showLoadingUI, setShowLoadingUI] = useState(false)

  // Set timeout for loading state to prevent infinite loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log('ProtectedRoute loading timeout reached')
        setLoadingTimeout(true)
      }
    }, 8000) // 8 second timeout

    return () => clearTimeout(timeoutId)
  }, [loading])

  useEffect(() => {
    if (loading) {
      const delayId = setTimeout(() => {
        setShowLoadingUI(true)
      }, 400)

      return () => clearTimeout(delayId)
    }

    setShowLoadingUI(false)
    return undefined
  }, [loading])

  // Enhanced loading state with timeout protection
  if (loading && !loadingTimeout && showLoadingUI) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-4">Authenticating...</p>
        </div>
      </div>
    )
  }

  // Handle authentication error or timeout
  if (error || loadingTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error ? 'Authentication Error' : 'Loading Timeout'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'Authentication is taking too long. You can continue without authentication or try again.'}
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                setAllowAccess(true)
                setLoadingTimeout(false)
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue to Dashboard
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Refresh Page
            </button>
            <button 
              onClick={() => window.location.href = '/signin'}
              className="text-green-600 hover:text-green-700 underline"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Allow access if user is authenticated or if access was manually allowed
  if (user || allowAccess) {
    return <>{children}</>
  }

  // Redirect to sign in if no user and no manual access
  return <Navigate to="/signin" replace />
}

export default ProtectedRoute
