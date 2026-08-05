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
      {/* Official App Icon Graphic */}
      <img
        src="/app-icon.png"
        alt="PATHPILOT App Icon"
        className={`${sizeDimensions.box} rounded-xl shadow-lg shadow-blue-500/25 object-cover shrink-0 hover:scale-105 transition-transform duration-300`}
      />

      {showText && (
        <div className="flex flex-col">
          <span className={`font-sora font-extrabold tracking-tight text-slate-900 dark:text-white ${sizeDimensions.font} flex items-center gap-0.5 leading-none`}>
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
