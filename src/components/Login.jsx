import React, { useState } from 'react';
import {
  Lock, Mail, Eye, EyeOff, ArrowRight, Shield, Wallet, TrendingUp,
  CheckCircle, Zap, Globe, AlertCircle, X, KeyRound
} from 'lucide-react';

const LoginPage = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [otp, setOTP] = useState('');
  const [userId, setUserId] = useState('');
  const [step, setStep] = useState(1); // 1 = login, 2 = otp
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [role, setRole] = useState('');

  const API_BASE_URL = 'https://79c08d872c31.ngrok-free.app/api/v1/auth';

  // Input handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
    if (error) setError('');
  };

  // Submit logic
  const handleSubmit = () => {
    if (isForgotPassword) {
      handleForgotPassword();
    } else if (step === 1) {
      handleLoginStep1();
    } else if (step === 2) {
      handleLoginStep2();
    }
  };

  // Step 1: Email+Pass
  const handleLoginStep1 = async () => {
    setIsLoading(true); setError(''); setSuccess('');
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await response.json();

      if (!response.ok) {
        // 401, 403, 400 handled by backend
        setError(data.message || 'Login failed');
        return;
      }

      // If OTP is required
      if (data?.data?.requiresOTP) {
        setUserId(data.data.userId);
        setSuccess('OTP sent to your email. Enter OTP to continue.');
        setStep(2);
        return;
      }

      // If login directly (should not happen with OTP flow, but fallback)
      if (data.success && data.data?.user) {
        if (data.data.user.role !== 'merchant') {
          setError('Only merchant login is allowed.');
          return;
        }
        setRole(data.data.user.role);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => { window.location.href = '#/dashboard'; }, 1200);
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: OTP verify
  const handleLoginStep2 = async () => {
    setIsLoading(true); setError(''); setSuccess('');
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          otp
        })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'OTP verification failed.');
        return;
      }

      // OTP verified and login successful
      if (data.success && data.data?.user) {
        if (data.data.user.role !== 'merchant') {
          setError('Only merchant login is allowed.');
          return;
        }
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => { window.location.href = '#/dashboard'; }, 1200);
      } else {
        setError(data.message || 'OTP verification failed.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password as earlier
  const handleForgotPassword = async () => {
    setIsLoading(true); setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Password reset link sent to your email!');
        setIsForgotPassword(false);
      } else {
        setError(data.message || 'Failed to send reset link.');
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
    setError(''); setSuccess('');
    setOTP(''); setUserId('');
    setStep(1);
  };
  const switchToForgotPassword = () => { resetForm(); setIsForgotPassword(true); };
  const switchToLogin = () => { resetForm(); setIsForgotPassword(false); };

  // Features data as earlier
  const features = [
    { icon: <Shield className="w-6 h-6" />, title: 'Bank-Grade Security', description: 'End-to-end encryption and multi-layer protection' },
    { icon: <Zap className="w-6 h-6" />, title: 'Instant Payments', description: 'Process crypto payments in seconds, not minutes' },
    { icon: <Globe className="w-6 h-6" />, title: 'Global Reach', description: 'Accept payments from customers worldwide' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">
              CryptoPay
            </h1>
            <p className="text-gray-600">
              {isForgotPassword
                ? 'Reset your password'
                : (step === 2 ? 'Verify OTP sent to your email' : 'Welcome back to your crypto dashboard')}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-xl">
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
                <button onClick={() => setError('')} className="ml-auto text-red-500 hover:text-red-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-green-700 text-sm">{success}</span>
                <button onClick={() => setSuccess('')} className="ml-auto text-green-500 hover:text-green-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              {/* Step 1: Email/Password */}
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your email"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {!isForgotPassword && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your password"
                          required
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <button type="button" onClick={switchToForgotPassword} className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200">
                      Forgot password?
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: OTP */}
              {step === 2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={otp}
                      onChange={handleOTPChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter OTP sent to email"
                      required
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {/* Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>
                      {isForgotPassword
                        ? 'Send Reset Link'
                        : step === 2
                        ? 'Verify OTP'
                        : 'Sign In'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Back to Login link for Forgot Password or OTP */}
            {(isForgotPassword || step === 2) && (
              <div className="mt-4 text-center">
                <button onClick={switchToLogin} className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        <div className="relative z-10 max-w-md text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Crypto Payment Solutions</h2>
                <p className="text-blue-100">Built for modern businesses</p>
              </div>
            </div>
            <p className="text-blue-100 text-lg leading-relaxed">
              Join thousands of merchants who trust our platform for secure, fast, and reliable cryptocurrency payments.
            </p>
          </div>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-blue-100">Trusted by 50,000+ merchants</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-blue-100">99.9% uptime guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
