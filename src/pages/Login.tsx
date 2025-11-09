import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    }
  };
  return <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-primary-50/20">
      {/* Left side with image */}
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative" style={{
      backgroundImage: "url('/login-shipping.jpg')"
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 to-charcoal-800/80"></div>
        <div className="w-full h-full flex items-center justify-center relative z-10">
          <div className="text-center text-white p-10 max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              Turning ideas into reality
            </h2>
            <p className="text-xl">
              From concept to market, we're with you every step of the way
            </p>
          </div>
        </div>
      </div>
      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex items-center text-primary-500 mb-8 hover:text-primary-600 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <div className="text-center mb-10">
            <img src="/IMG_8337.png" alt="Sprout'n Logo" className="h-40 mx-auto" />
            <h2 className="mt-8 text-center text-3xl font-extrabold text-charcoal-500">
              Your dream starts here
            </h2>
            <p className="mt-3 text-center text-sm text-charcoal-400">
              Sign in to access your dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>}
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-charcoal-500 mb-1">
                  Email address
                </label>
                <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-charcoal-500 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm shadow-sm" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal-500 mb-1">
                  Password
                </label>
                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-charcoal-500 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm shadow-sm" placeholder="Password" />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-md hover:shadow-lg transition-all duration-200">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default Login;