import { Navigation } from "@/components/Navigation";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAuth } from '@/contexts/auth-context'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  User,
  Sparkles,
  Shield,
  Zap,
  Heart
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [step, setStep] = useState<'form' | 'confirmation' | 'success'>('form');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear errors when user types
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Show confirmation step
      setStep('confirmation');
      
      const { error } = await signUp(
        formData.email, 
        formData.password, 
        formData.username, 
        formData.fullName
      );
      
      if (error) {
        setError(error.message || 'Failed to create account');
        setStep('form');
      } else {
        setStep('success');
        setSuccess('Account created successfully! Please check your email to verify your account before signing in.');
        // Redirect after showing success message
        setTimeout(() => {
          navigate('/signin');
        }, 4000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!formData.email) return;
    
    setResendLoading(true);
    setResendMessage('');
    
    try {
      // Simulate resend delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success message since we're not using real email
      setResendMessage('Mock verification email sent! (No real email in demo mode)');
    } catch (err) {
      setResendMessage('Failed to resend email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section 
        ref={ref}
        className={`pt-32 pb-20 px-6 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden min-h-screen flex items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-violet-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-fuchsia-200/20 to-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-4 h-4 bg-fuchsia-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-16 w-6 h-6 border border-violet-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 left-16 w-5 h-5 bg-purple-300/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-md mx-auto">
            {/* Sign Up Card */}
            <div className={`group ${isVisible ? 'scroll-animate' : 'opacity-0'}`}>
              <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/30 rounded-3xl"></div>
                
                {/* Floating decorative elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl rotate-45 opacity-15 group-hover:rotate-12 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3" />
                      </div>
                      Join EcoLearn
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 leading-tight">
                      Create Your <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Account</span> 🚀
                    </h1>
                    
                    <p className="text-gray-600 font-medium">
                      Start your environmental learning adventure today
                    </p>
                  </div>

                  {/* Conditional Content Based on Step */}
                  {step === 'form' && (
                    <>
                      {/* Sign Up Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name Input */}
                    <div className="relative">
                      <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <User className="h-5 w-5 text-purple-500" />
                        </div>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium relative"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    {/* Username Input */}
                    <div className="relative">
                      <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">
                        Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <User className="h-5 w-5 text-purple-500" />
                        </div>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium relative"
                          placeholder="Choose a username"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Mail className="h-5 w-5 text-purple-500" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium relative"
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
                          <Lock className="h-5 w-5 text-purple-500" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium relative"
                          placeholder="Create a strong password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200 z-10"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-purple-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-purple-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                      <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Lock className="h-5 w-5 text-purple-500" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium relative"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200 z-10"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-purple-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-purple-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 bg-white border-purple-300 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                        required
                      />
                      <label htmlFor="agreeToTerms" className="text-sm font-medium text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms" className="font-bold text-purple-600 hover:text-fuchsia-600 transition-colors duration-300">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="font-bold text-purple-600 hover:text-fuchsia-600 transition-colors duration-300">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    {/* Sign Up Button */}
                    <button
                      type="submit"
                      className="group relative w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative z-10">Create Account</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>

                    {/* Social Sign Up */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300/50"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white/80 text-gray-500 font-medium">Or sign up with</span>
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

                  {/* Sign In Link */}
                  <div className="mt-8 text-center">
                    <p className="text-gray-600 font-medium">
                      Already have an account?{' '}
                      <Link
                        to="/signin"
                        className="font-bold text-purple-600 hover:text-fuchsia-600 transition-colors duration-300"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>


                  {/* Trust Indicators */}
                  <div className="mt-8 flex items-center justify-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg" style={{ color: '#a855f7' }}>🛡️</span>
                      <span className="text-purple-600 font-semibold">Secure</span>
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
                    </>
                  )}

                  {/* Confirmation Step */}
                  {step === 'confirmation' && (
                    <div className="text-center py-8 animate-pulse">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-white animate-bounce" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Account...</h2>
                      <p className="text-gray-600 mb-6">Please wait while we set up your EcoLearn profile</p>
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      </div>
                    </div>
                  )}

                  {/* Success Step */}
                  {step === 'success' && (
                    <div className="text-center py-8 animate-fade-in">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <span className="text-3xl">✅</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Created Successfully! 🎉</h2>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <span className="font-semibold text-green-800">Account Ready</span>
                        </div>
                        <p className="text-green-700 text-sm leading-relaxed">
                          Your account for <strong>{formData.email}</strong> has been created successfully! 
                          You can now sign in to access your EcoLearn dashboard.
                        </p>
                      </div>

                      <div className="space-y-3 text-sm text-gray-600 mt-6">
                        <p>✨ Welcome to the EcoLearn community!</p>
                        <p>🌱 Start your environmental learning journey</p>
                        <p>🏆 Earn XP and unlock achievements</p>
                      </div>
                      
                      <div className="mt-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <span className="text-green-600 text-lg">🎉</span>
                            <div className="text-sm text-green-800">
                              <p className="font-semibold mb-2">You're all set!</p>
                              <p className="text-xs">Click "Continue to Sign In" or wait for automatic redirect.</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Redirecting to sign in page in a few seconds...</p>
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

export default SignUp;
