import React from 'react';

interface PathPilotLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const PathPilotLogo: React.FC<PathPilotLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const sizeDimensions = {
    sm: { box: 'w-8 h-8', font: 'text-lg' },
    md: { box: 'w-10 h-10', font: 'text-xl' },
    lg: { box: 'w-12 h-12', font: 'text-2xl' },
    xl: { box: 'w-16 h-16', font: 'text-3xl' }
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Graphic recreating the official PATHPILOT logo artwork */}
      <div className={`relative ${sizeDimensions.box} rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-1 shadow-lg shadow-blue-500/30 flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300 overflow-hidden`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Main White 'P' Loop & Pathway */}
          <path
            d="M 42,175 L 42,105 C 42,55 78,25 118,25 C 158,25 174,58 174,88 C 174,120 146,142 118,142 L 86,142"
            stroke="white"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sweeping Curving Road */}
          <path
            d="M 40,178 C 65,162 88,135 118,110 C 145,88 165,70 178,54"
            stroke="white"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* Arrowhead tip */}
          <path
            d="M 152,44 L 184,48 L 172,78 Z"
            fill="white"
          />

          {/* Road Dashed Markings */}
          <path
            d="M 45,178 C 68,162 90,135 120,110 C 146,88 166,70 177,55"
            stroke="#0B1736"
            strokeWidth="4"
            strokeDasharray="9 7"
            strokeLinecap="round"
          />

          {/* Center Compass Star inside the P loop */}
          <g transform="translate(108, 80)">
            {/* North Point - Orange Top */}
            <path d="M 0,-34 L 7,-8 L 0,-12 Z" fill="#F97316" />
            <path d="M 0,-34 L -7,-8 L 0,-12 Z" fill="#EA580C" />

            {/* South Point */}
            <path d="M 0,30 L 7,8 L 0,10 Z" fill="#0F172A" />
            <path d="M 0,30 L -7,8 L 0,10 Z" fill="#1E293B" />

            {/* East Point */}
            <path d="M 32,0 L 8,7 L 10,0 Z" fill="#1E293B" />
            <path d="M 32,0 L 8,-7 L 10,0 Z" fill="#0F172A" />

            {/* West Point */}
            <path d="M -32,0 L -8,7 L -10,0 Z" fill="#0F172A" />
            <path d="M -32,0 L -8,-7 L -10,0 Z" fill="#1E293B" />

            {/* Core dot */}
            <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-sora font-extrabold tracking-tight text-white ${sizeDimensions.font} flex items-center gap-0.5 leading-none`}>
            PATH<span className="text-blue-500">PILOT</span>
          </span>
          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest mt-0.5">
            DISCOVER YOUR FUTURE
          </span>
        </div>
      )}
    </div>
  );
};
