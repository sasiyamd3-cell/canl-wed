import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { setAdminLoggedIn } from '../utils/storage';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 👇 ඔයාට කැමති email/password එකක් මෙතන දාන්න
  const ADMIN_EMAIL = 'admin@besthand.lk';
  const ADMIN_PASSWORD = 'besthand2025';

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      navigate('/admin/dashboard');
    } else {
      setError('❌ Invalid email or password!');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple blur-[150px] opacity-20 rounded-full"></div>
      
      <div className="w-full max-w-lg relative z-10">
        <Link to="/" className="text-gray-400 hover:text-neon-purple flex items-center gap-2 mb-6">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <form onSubmit={handleLogin} className="bg-card-bg p-10 lg:p-12 rounded-3xl border border-gray-800">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-2 text-center">
            👑 Admin
          </h2>
          <p className="text-neon-purple text-center text-xl font-bold mb-8">Login</p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="text-gray-400 mb-2 block font-semibold">Email</label>
            <div className="flex items-center bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 focus-within:border-neon-purple transition">
              <Mail className="text-neon-purple mr-3" />
              <input 
                type="email"
                placeholder="admin@besthand.lk"
                className="bg-transparent outline-none w-full text-white text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="text-gray-400 mb-2 block font-semibold">Password</label>
            <div className="flex items-center bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 focus-within:border-neon-purple transition">
              <Lock className="text-neon-purple mr-3" />
              <input 
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-white text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-neon-purple hover:bg-purple-700 text-white py-5 rounded-xl text-xl font-bold transition glow"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
