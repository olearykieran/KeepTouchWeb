'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Initialize Supabase client
const supabaseUrl = 'https://nocqcvnmmoadxhhjgnys.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vY3Fjdm5tbW9hZHhoaGpnbnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzOTEzODAsImV4cCI6MjA0Mzk2NzM4MH0.V_3pMNZLJBNvbOmu_kYVVvHhP7bMXdtBfA-y3NNDWDM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetting, setResetting] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const hasAttemptedExchange = useRef(false);

  useEffect(() => {
    checkUrlParams();
  }, [searchParams]);

  const checkUrlParams = () => {
    // Get all parameters
    const urlCode = searchParams.get('code');
    const error = searchParams.get('error');
    const error_code = searchParams.get('error_code');
    const error_description = searchParams.get('error_description');

    // Check for errors
    if (error || error_code) {
      setError(error_description || 'Password reset link has expired or is invalid.');
      setLoading(false);
      return;
    }

    // If we have a code, show the confirm button instead of auto-exchanging
    if (urlCode && !hasAttemptedExchange.current) {
      setCode(urlCode);
      setShowConfirmButton(true);
      setLoading(false);
      return;
    }

    // Check if user already has a session
    checkExistingSession();
  };

  const checkExistingSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setShowForm(true);
      } else if (!code) {
        setError('No valid session found. Please request a password reset from the app.');
      }
    } catch (err) {
      console.error('Session check error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async () => {
    if (!code || hasAttemptedExchange.current) return;
    
    hasAttemptedExchange.current = true;
    setLoading(true);
    setShowConfirmButton(false);
    setError(null);

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        // If the code is already used, check if we have a session anyway
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setShowForm(true);
          setLoading(false);
          return;
        }
        throw error;
      }
      
      if (data.session) {
        setShowForm(true);
      } else {
        throw new Error('Failed to establish session');
      }
    } catch (err: any) {
      console.error('Code exchange error:', err);
      setError('This password reset link is invalid or has expired. Please request a new one.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setResetting(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) throw error;
      
      // Success! Sign out and show success message
      await supabase.auth.signOut();
      setSuccess(true);
      setShowForm(false);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to reset password');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5ed] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#9d9e9e]">KeepTouch</h1>
        </div>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#9d9e9e]"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        )}

        {showConfirmButton && !loading && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Confirm Password Reset</h2>
            <p className="text-gray-600 mb-6">
              Click the button below to reset your password. This helps prevent automated security systems from invalidating your reset link.
            </p>
            <button
              onClick={handleConfirmReset}
              className="bg-[#9d9e9e] text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Continue to Reset Password
            </button>
          </div>
        )}

        {error && !loading && !showConfirmButton && (
          <>
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
            <div className="text-center">
              <Link 
                href="/" 
                className="text-[#9d9e9e] hover:underline"
              >
                Back to KeepTouch
              </Link>
            </div>
          </>
        )}

        {success && (
          <>
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              <p className="font-semibold mb-2">Password reset successfully!</p>
              <p>You can now sign in with your new password in the KeepTouch app.</p>
              <p className="mt-2 font-semibold">Return to the app and sign in.</p>
            </div>
            <div className="text-center">
              <Link 
                href="/" 
                className="text-[#9d9e9e] hover:underline"
              >
                Back to KeepTouch
              </Link>
            </div>
          </>
        )}

        {showForm && !success && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9d9e9e] focus:border-transparent"
                  placeholder="Enter new password"
                  minLength={6}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9d9e9e] focus:border-transparent"
                  placeholder="Confirm new password"
                  minLength={6}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={resetting}
                className="w-full bg-[#9d9e9e] text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetting ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}