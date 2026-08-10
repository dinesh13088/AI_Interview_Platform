// components/RecruiterLogin.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRecruiter } from '../api/auth.api';
import { setUser } from '../store/RecruiterSlice';

const RecruiterLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await loginRecruiter({
        email: formData.email.trim(),
        password: formData.password
      });

      if (response?.data) {
        // Store user data and tokens in Redux
        dispatch(setUser({
          user: response.data.user,
          tokens: {
            access: response.data.access,
            refresh: response.data.refresh
          }
        }));
        
        // Redirect to dashboard
        navigate('/recruiter-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data) {
        const errorMsg = error.response.data.message || 
                        error.response.data.detail || 
                        'Invalid email or password';
        setError(errorMsg);
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 disabled:bg-slate-50 disabled:cursor-not-allowed";
  const labelClass = "block mb-2 text-xs font-semibold tracking-wide uppercase text-slate-500";

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-stone-100">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-sm shadow-sm">
        <div className="px-8 pt-8 pb-6 border-b border-slate-200">
          <h1 className="font-serif text-3xl text-slate-900 tracking-tight">Recruiter Login</h1>
          <p className="text-sm text-slate-500 mt-2">Sign in to manage your recruitment activities.</p>
        </div>

        {error && (
          <div className="mx-8 mt-6 bg-red-50 border border-red-200 rounded-sm p-4 flex items-start gap-3">
            <span className="text-red-500 text-lg">⚠️</span>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="recruiter@company.com"
              required
              className={inputClass}
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className={inputClass}
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                disabled={loading}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border border-slate-300 text-teal-800 focus:ring-2 focus:ring-teal-700/30"
                disabled={loading}
              />
              <span className="text-sm text-slate-600">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-teal-800 hover:text-teal-900 hover:underline transition-colors"
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-800 hover:bg-teal-900 text-white text-sm font-medium px-5 py-2.5 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In →'
            )}
          </button>

          {/* Register Link */}
          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/company-form')}
                className="text-teal-800 hover:text-teal-900 font-medium hover:underline transition-colors"
                disabled={loading}
              >
                Create Company Profile
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterLogin;