import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

declare global {
  const google: any;
}

const AuthView: React.FC = () => {
  const [view, setView] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login, signup, handleGoogleSignIn, loginAsGuest } = useAuth();

  useEffect(() => {
    if (typeof google === 'undefined') {
      console.error("Google Identity Services script not loaded.");
      return;
    }
    // IMPORTANT: REPLACE WITH YOUR OWN GOOGLE CLIENT ID
    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleSignIn,
    });
    
    google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large", width: "100%" } 
    );
    
    // google.accounts.id.prompt(); // Optional: display One Tap prompt
  }, [handleGoogleSignIn]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      if (view === 'login') {
        login(email);
      } else {
        signup(email, name);
      }
      setLoading(false);
    }, 1000);
  };

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
     // Simulate network delay
    setTimeout(() => {
        setMessage(`If an account exists for ${email}, a reset link has been sent.`);
        setLoading(false);
    }, 1500);
  }

  const switchView = (newView: 'login' | 'signup' | 'forgotPassword') => {
    setView(newView);
    setMessage('');
    // Optionally reset form fields
    // setEmail('');
    // setPassword('');
    // setName('');
  }

  if (view === 'forgotPassword') {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 p-4">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-purple-800">Chantify🌿</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mt-4">Reset Password</h2>
                    <p className="text-gray-600 mt-2">Enter your email to receive a reset link.</p>
                </div>
                <form onSubmit={handleResetRequest}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email-reset">
                            Email
                        </label>
                        <input
                            id="email-reset"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    {message && <p className="text-center text-green-700 font-medium text-sm mb-4">{message}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-8">
                    Remember your password?
                    <button
                        onClick={() => switchView('login')}
                        className="font-bold text-purple-600 hover:text-purple-800 ml-1"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800">Chantify🌿</h1>
          <p className="text-gray-600 mt-2">Find your inner peace.</p>
        </div>

        <form onSubmit={handleAuthSubmit}>
          {view === 'signup' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your Name"
                required={view === 'signup'}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          {view === 'login' && (
             <div className="flex items-center justify-end mb-6">
                <button 
                    type="button" 
                    onClick={() => switchView('forgotPassword')}
                    className="inline-block align-baseline font-bold text-sm text-purple-600 hover:text-purple-800">
                    Forgot Password?
                </button>
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Processing...' : view === 'login' ? 'Log In' : 'Sign Up'}
          </button>
          
          <div className="text-center my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div id="googleSignInButton" className="flex justify-center"></div>

        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          {view === 'login' ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => switchView(view === 'login' ? 'signup' : 'login')}
            className="font-bold text-purple-600 hover:text-purple-800 ml-1"
          >
            {view === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>

        <div className="text-center mt-4">
            <button
                type="button"
                onClick={loginAsGuest}
                className="font-semibold text-sm text-gray-500 hover:text-purple-700 transition-colors"
            >
                Continue as Guest
            </button>
        </div>

      </div>
    </div>
  );
};

export default AuthView;