import React from 'react';
import { BadgeCheck } from 'lucide-react';

export default function Avatar({
  src,
  alt = 'User avatar',
  size = 'md',
  hasStory = false,
  hasUnseenStory = false,
  isVerified = false,
  className = '',
  onClick,
}) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24 sm:w-32 sm:h-32',
  };

  const ringPaddings = {
    xs: 'p-[1.5px]',
    sm: 'p-[2px]',
    md: 'p-[2.5px]',
    lg: 'p-[3px]',
    xl: 'p-[3.5px]',
    '2xl': 'p-[4px]',
  };

  const avatarSize = sizeClasses[size] || sizeClasses.md;
  const ringPad = ringPaddings[size] || ringPaddings.md;

  const fallback = `https://api.dicebear.com/7.x/avataaars/svg?seed=${alt || 'user'}`;

  const imageElement = (
    <img
      src={src || fallback}
      alt={alt}
      onError={(e) => {
        e.target.src = fallback;
      }}
      className={`${avatarSize} rounded-full object-cover bg-zinc-200 dark:bg-zinc-800 transition-transform duration-200 ${
        onClick ? 'hover:scale-105' : ''
      }`}
    />
  );

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {hasStory ? (
        <div
          onClick={onClick}
          className={`rounded-full cursor-pointer transition-transform duration-150 active:scale-95 ${ringPad} ${
            hasUnseenStory
              ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600'
              : 'bg-zinc-300 dark:bg-zinc-700'
          }`}
        >
          <div className="rounded-full p-[2px] bg-white dark:bg-black">
            {imageElement}
          </div>
        </div>
      ) : (
        <div onClick={onClick} className={onClick ? 'cursor-pointer' : ''}>
          {imageElement}
        </div>
      )}

      {isVerified && (
        <div className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-black rounded-full p-[1px]">
          <BadgeCheck className="w-4 h-4 text-sky-500 fill-sky-500 text-white dark:text-black" />
        </div>
      )}
    </div>
  );
}

