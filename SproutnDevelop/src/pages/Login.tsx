import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    login,
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    try {
      login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };
  return <div className="min-h-screen flex bg-gray-50">
      {/* Left side with image */}
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
    }}>
        <div className="w-full h-full flex items-center justify-center bg-charcoal-500 bg-opacity-60">
          <div className="text-center text-white p-10">
            <h2 className="text-3xl font-bold mb-4">
              Turning ideas into reality
            </h2>
            <p className="text-lg">
              From concept to market, we're with you every step of the way
            </p>
          </div>
        </div>
      </div>
      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <img src="/IMG_8336.webp" alt="Sprout'n Logo" className="h-40 mx-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-charcoal-500">
              Your dream starts here
            </h2>
            <p className="mt-2 text-center text-xs text-charcoal-400">
              Hint: Use email with "admin" for admin role, any other email for
              customer role
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-charcoal-500 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-charcoal-500 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Password" />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default Login;