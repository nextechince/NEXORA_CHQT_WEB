import React from 'react';
import { 
  CheckCircle, Shield, Crown, Star, UserCheck, Code, Award,
  Sparkles, Medal, Trophy, Gem, Heart, Flame, Zap,
  Verified, BadgeCheck, CircleCheckBig
} from 'lucide-react';

// ============================================================
// IMAGE-BASED BADGES (Using public icons)
// ============================================================

export const BadgeImage = ({ src, alt, size = 20, label = '', className = '' }) => (
  <div className={`inline-flex items-center gap-1.5 ${className}`}>
    <img 
      src={src} 
      alt={alt} 
      className={`w-${size/4} h-${size/4} object-contain`}
      onError={(e) => {
        e.target.style.display = 'none';
        const fallback = document.createElement('span');
        fallback.className = 'text-base';
        fallback.textContent = alt === 'Verified' ? '✅' : 
                               alt === 'Premium' ? '⭐' : 
                               alt === 'Admin' ? '🛡️' : 
                               alt === 'Owner' ? '👑' : '🏅';
        e.target.parentNode.appendChild(fallback);
      }}
    />
    {label && <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{label}</span>}
  </div>
);

// ============================================================
// ICON-BASED BADGES
// ============================================================

export const VerifiedBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/verified-badge.png" 
        alt="Verified" 
        size={size}
        label={showLabel ? 'Verified' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 badge-verified">
      <CheckCircle className={`w-${size/4} h-${size/4}`} fill="#3b82f6" color="white" />
      {showLabel && 'Verified'}
    </span>
  );
};

export const PremiumBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/premium-badge.png" 
        alt="Premium" 
        size={size}
        label={showLabel ? 'Premium' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 badge-premium">
      <Star className={`w-${size/4} h-${size/4}`} fill="#f59e0b" color="white" />
      {showLabel && 'Premium'}
    </span>
  );
};

export const AdminBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/admin-badge.png" 
        alt="Admin" 
        size={size}
        label={showLabel ? 'Admin' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 badge-admin">
      <Shield className={`w-${size/4} h-${size/4}`} fill="#8b5cf6" color="white" />
      {showLabel && 'Admin'}
    </span>
  );
};

export const ModeratorBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/moderator-badge.png" 
        alt="Moderator" 
        size={size}
        label={showLabel ? 'Moderator' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 badge-moderator">
      <UserCheck className={`w-${size/4} h-${size/4}`} fill="#22c55e" color="white" />
      {showLabel && 'Moderator'}
    </span>
  );
};

export const DeveloperBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/developer-badge.png" 
        alt="Developer" 
        size={size}
        label={showLabel ? 'Developer' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 badge-developer">
      <Code className={`w-${size/4} h-${size/4}`} fill="#6366f1" color="white" />
      {showLabel && 'Developer'}
    </span>
  );
};

export const OwnerBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/owner-badge.png" 
        alt="Owner" 
        size={size}
        label={showLabel ? 'Owner' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 badge-owner">
      <Crown className={`w-${size/4} h-${size/4}`} fill="#d97706" color="white" />
      {showLabel && 'Owner'}
    </span>
  );
};

export const StaffBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/staff-badge.png" 
        alt="Staff" 
        size={size}
        label={showLabel ? 'Staff' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-medium rounded-full">
      <Award className={`w-${size/4} h-${size/4}`} fill="#f43f5e" color="white" />
      {showLabel && 'Staff'}
    </span>
  );
};

// ============================================================
// SPECIAL BADGES
// ============================================================

export const GoldBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/gold-badge.png" 
        alt="Gold" 
        size={size}
        label={showLabel ? 'Gold' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium rounded-full shadow-lg">
      <Trophy className={`w-${size/4} h-${size/4}`} />
      {showLabel && 'Gold'}
    </span>
  );
};

export const DiamondBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/diamond-badge.png" 
        alt="Diamond" 
        size={size}
        label={showLabel ? 'Diamond' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-xs font-medium rounded-full shadow-lg">
      <Gem className={`w-${size/4} h-${size/4}`} />
      {showLabel && 'Diamond'}
    </span>
  );
};

export const LegendBadge = ({ size = 16, showLabel = true, useImage = true }) => {
  if (useImage) {
    return (
      <BadgeImage 
        src="/icons/legend-badge.png" 
        alt="Legend" 
        size={size}
        label={showLabel ? 'Legend' : ''}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-400 to-pink-600 text-white text-xs font-medium rounded-full shadow-lg">
      <Sparkles className={`w-${size/4} h-${size/4}`} />
      {showLabel && 'Legend'}
    </span>
  );
};

// ============================================================
// GET ALL BADGES FOR A USER
// ============================================================
export const getUserBadges = (profile) => {
  const badges = [];
  
  if (profile?.is_verified) {
    badges.push({ 
      id: 'verified', 
      component: VerifiedBadge, 
      label: 'Verified',
      icon: '✅',
      color: 'text-blue-500',
      image: '/icons/verified-badge.png'
    });
  }
  
  if (profile?.premium_tier && profile.premium_tier !== 'free') {
    badges.push({ 
      id: 'premium', 
      component: PremiumBadge, 
      label: 'Premium',
      icon: '⭐',
      color: 'text-yellow-500',
      image: '/icons/premium-badge.png'
    });
  }
  
  if (profile?.is_owner) {
    badges.push({ 
      id: 'owner', 
      component: OwnerBadge, 
      label: 'Owner',
      icon: '👑',
      color: 'text-amber-500',
      image: '/icons/owner-badge.png'
    });
  }
  
  if (profile?.is_admin) {
    badges.push({ 
      id: 'admin', 
      component: AdminBadge, 
      label: 'Admin',
      icon: '🛡️',
      color: 'text-purple-500',
      image: '/icons/admin-badge.png'
    });
  }
  
  if (profile?.is_moderator) {
    badges.push({ 
      id: 'moderator', 
      component: ModeratorBadge, 
      label: 'Moderator',
      icon: '👮',
      color: 'text-green-500',
      image: '/icons/moderator-badge.png'
    });
  }
  
  if (profile?.is_developer) {
    badges.push({ 
      id: 'developer', 
      component: DeveloperBadge, 
      label: 'Developer',
      icon: '💻',
      color: 'text-indigo-500',
      image: '/icons/developer-badge.png'
    });
  }
  
  return badges;
};

// ============================================================
// BADGE DISPLAY COMPONENT
// ============================================================
export const UserBadges = ({ profile, size = 'sm', showLabels = true, useImages = true }) => {
  const badges = getUserBadges(profile);
  
  if (badges.length === 0) return null;
  
  return (
    <div className="flex flex-wrap items-center gap-1">
      {badges.map((badge, index) => (
        <span key={index} title={badge.label}>
          <badge.component size={16} showLabel={showLabels} use
