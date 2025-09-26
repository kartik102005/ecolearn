import { Navigation } from "@/components/Navigation";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAuth } from '@/contexts/auth-context'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Heart
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        setError(error.message || 'Failed to sign in');
        setLoading(false);
        return;
      }

      setStep('success');
      setSuccess(true);

      // Navigate immediately for responsive UX
      navigate('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section 
        ref={ref}
        className={`pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden min-h-screen flex items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-4 h-4 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-16 w-6 h-6 border border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 left-16 w-5 h-5 bg-purple-300/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-md mx-auto">
            {/* Sign In Card */}
            <div className={`group ${isVisible ? 'scroll-animate' : 'opacity-0'}`}>
              <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 rounded-3xl"></div>
                
                {/* Floating decorative elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl rotate-45 opacity-15 group-hover:rotate-12 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3" />
                      </div>
                      Welcome Back
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 leading-tight">
                      Sign In to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">EcoLearn</span> ✨
                    </h1>
                    
                    <p className="text-gray-600 font-medium">
                      Continue your environmental learning journey
                    </p>
                  </div>

                  {/* Conditional Content Based on Step */}
                  {step === 'form' && (<>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="relative">
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Mail className="h-5 w-5 text-indigo-500" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-indigo-200/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium relative"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                      <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Lock className="h-5 w-5 text-indigo-500" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur-sm border border-indigo-200/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium relative"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200 z-10"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 bg-white border-indigo-300 rounded focus:ring-indigo-500 focus:ring-2"
                        />
                        <span className="text-sm font-medium text-gray-600">Remember me</span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-bold text-indigo-600 hover:text-purple-600 transition-colors duration-300"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Sign In Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 overflow-hidden disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white relative z-10"></div>
                          <span className="relative z-10">Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Sign In</span>
                          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>

                    {/* Social Sign In */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300/50"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white/80 text-gray-500 font-medium">Or continue with</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 font-medium text-gray-700"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                      <p className="text-gray-600 font-medium">
                        Don't have an account?{' '}
                        <Link
                          to="/signup"
                          className="font-bold text-indigo-600 hover:text-purple-600 transition-colors duration-300"
                        >
                          Sign up for free
                        </Link>
                      </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-8 flex items-center justify-center gap-6 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-lg" style={{ color: '#6366f1' }}>🛡️</span>
                        <span className="text-indigo-600 font-semibold">Secure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg" style={{ color: '#f43f5e' }}>❤️</span>
                        <span className="text-rose-600 font-semibold">Trusted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg" style={{ color: '#eab308' }}>⚡</span>
                        <span className="text-yellow-600 font-semibold">Fast</span>
                      </div>
                    </div>
                  </>)}

                  {/* Success Step */}
                  {step === 'success' && (
                    <div className="text-center py-8 animate-fade-in">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <span className="text-3xl">🎉</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back! 🌟</h2>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <span className="font-semibold text-green-800">Successfully Signed In</span>
                        </div>
                        <p className="text-green-700 text-sm leading-relaxed">
                          You're now logged into your EcoLearn account. Get ready to continue your environmental learning journey!
                        </p>
                      </div>
                      <div className="space-y-3 text-sm text-gray-600">
                        <p>🚀 Redirecting to your dashboard...</p>
                        <p>🌱 Continue where you left off</p>
                        <p>🏆 Check your latest achievements</p>
                      </div>
                      <div className="mt-6">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
