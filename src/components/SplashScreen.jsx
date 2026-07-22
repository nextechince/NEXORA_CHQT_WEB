import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, Sparkles } from 'lucide-react';
import { VerifiedBadge, PremiumBadge, AdminBadge, ModeratorBadge } from './Badges';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        navigate(isAuthenticated ? '/app' : '/login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-300 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-400 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Sparkles className="w-16 h-16 text-white" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-float delay-1000">
        <Sparkles className="w-12 h-12 text-white" />
      </div>
      
      <div className="relative z-10 text-center animate-bounce-slow">
        {/* App Icon - Large with gradient glow */}
        <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20 animate-glow">
          <img 
            src="/icons/app-icon.png" 
            alt="Nexora Chat" 
            className="w-24 h-24 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'w-24 h-24 bg-primary-500 rounded-2xl flex items-center justify-center';
              fallback.innerHTML = '<span class="text-4xl text-white">💬</span>';
              e.target.parentNode.appendChild(fallback);
            }}
          />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Nexora Chat</h1>
        <p className="text-primary-100/80 text-sm tracking-wider">Connecting the world • v2.0</p>
        
        {/* Badge preview with images */}
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          <span className="px-2 py-1 bg-white/10 rounded-full text-white text-xs flex items-center gap-1 backdrop-blur-sm">
            <img src="/icons/verified-badge.png" className="w-4 h-4" alt="verified" />
            Verified
          </span>
          <span className="px-2 py-1 bg-white/10 rounded-full text-white text-xs flex items-center gap-1 backdrop-blur-sm">
            <img src="/icons/premium-badge.png" className="w-4 h-4" alt="premium" />
            Premium
          </span>
          <span className="px-2 py-1 bg-white/10 rounded-full text-white text-xs flex items-center gap-1 backdrop-blur-sm">
            <img src="/icons/admin-badge.png" className="w-4 h-4" alt="admin" />
            Admin
          </span>
          <span className="px-2 py-1 bg-white/10 rounded-full text-white text-xs flex items-center gap-1 backdrop-blur-sm">
            <img src="/icons/moderator-badge.png" className="w-4 h-4" alt="moderator" />
            Moderator
          </span>
          <span className="px-2 py-1 bg-white/10 rounded-full text-white text-xs flex items-center gap-1 backdrop-blur-sm">
            <img src="/icons/developer-badge.png" className="w-4 h-4" alt="developer" />
            Developer
          </span>
        </div>
        
        {/* App version */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-primary-200/60">
          <span>🔒 Secure</span>
          <span>•</span>
          <span>⚡ Real-time</span>
          <span>•</span>
          <span>🌍 Global</span>
        </div>
      </div>
      
      <div className="relative z-10 mt-12 flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
