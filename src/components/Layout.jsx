import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  MessageSquare, Users, Phone, User, Sun, Moon, LogOut,
  Settings, Coins, Bot, Plus, Home, Search, Bell,
  Menu, X, Crown, Shield, Star
} from 'lucide-react';
import { UserBadges, VerifiedBadge, PremiumBadge, AdminBadge, ModeratorBadge, DeveloperBadge, OwnerBadge } from './Badges';
import toast from 'react-hot-toast';

const Layout = () => {
  const { profile, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/app', icon: MessageSquare, label: 'Chats' },
    { path: '/app/contacts', icon: Users, label: 'Contacts' },
    { path: '/app/calls', icon: Phone, label: 'Calls' },
    { path: '/app/profile', icon: User, label: 'Profile' },
  ];

  const handleLogout = async () => {
    await signOut();
    toast.success('Goodbye!');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-16 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col items-center py-4 space-y-2 shadow-sm relative z-20">
        {/* Logo with App Icon */}
        <Link to="/app" className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          <img src="/icons/app-icon.png" className="w-6 h-6 object-contain" alt="Nexora" />
        </Link>
        
        <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full my-2"></div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  p-2.5 rounded-xl transition-all relative group
                  ${isActive 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
                title={item.label}
              >
                <item.icon className="w-5 h-5 mx-auto" />
                {isActive && (
                  <span className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-full"></span>
                )}
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full my-2"></div>

        {/* Badges Display */}
        <div className="flex flex-col items-center gap-1">
          {profile?.is_verified && (
            <img src="/icons/verified-badge.png" className="w-5 h-5" alt="verified" title="Verified" />
          )}
          {profile?.premium_tier !== 'free' && (
            <img src="/icons/premium-badge.png" className="w-5 h-5 animate-pulse-slow" alt="premium" title="Premium" />
          )}
          {profile?.is_admin && (
            <img src="/icons/admin-badge.png" className="w-5 h-5" alt="admin" title="Admin" />
          )}
          {profile?.is_moderator && (
            <img src="/icons/moderator-badge.png" className="w-5 h-5" alt="moderator" title="Moderator" />
          )}
          {profile?.is_developer && (
            <img src="/icons/developer-badge.png" className="w-5 h-5" alt="developer" title="Developer" />
          )}
          {profile?.is_owner && (
            <img src="/icons/owner-badge.png" className="w-5 h-5" alt="owner" title="Owner" />
          )}
        </div>

        <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full my-2"></div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>

        {/* Profile Avatar with Badge Images */}
        {profile && (
          <div className="relative group cursor-pointer" onClick={() => navigate('/app/profile')}>
            <img
              src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name}&background=3b82f6&color=fff&size=40&bold=true`}
              alt={profile.full_name}
              className="w-8 h-8 rounded-full object-cover border-2 border-transparent group-hover:border-primary-500 transition"
            />
            {/* Badge overlays on avatar */}
            {profile.is_verified && (
              <img 
                src="/icons/verified-badge.png" 
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 object-contain" 
                alt="verified" 
              />
            )}
            {profile.premium_tier !== 'free' && (
              <img 
                src="/icons/premium-badge.png" 
                className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 object-contain" 
                alt="premium" 
              />
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
