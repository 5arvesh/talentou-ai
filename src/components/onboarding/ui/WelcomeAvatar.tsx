import React from 'react';

interface WelcomeAvatarProps {
  initials: string;
  gradient: 'purple' | 'blue';
  size?: 'sm' | 'md';
  className?: string;
}

export function WelcomeAvatar({ initials, gradient, size = 'md', className = '' }: WelcomeAvatarProps) {
  return (
    <div
      className={`rounded-full flex items-center justify-center font-sora font-bold text-white ${
        size === 'sm' ? 'w-12 h-12 text-lg' : 'w-14 h-14 text-xl'
      } ${
        gradient === 'purple'
          ? 'bg-gradient-to-br from-[#7800D3] to-[#c084fc]'
          : 'bg-gradient-to-br from-[#185FA5] to-[#4da3f5]'
      } ${className}`}
    >
      {initials}
    </div>
  );
}
