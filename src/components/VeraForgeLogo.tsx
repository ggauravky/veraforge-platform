import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  shieldColor?: string;
  monogramColor?: string;
}

export default function VeraForgeLogo({ 
  className = 'w-6 h-6', 
  shieldColor = 'url(#shieldGrad)', 
  monogramColor = 'url(#monogramGrad)', 
  ...props 
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Shield Metallic Gold-Bronze Gradient */}
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#78350f" /> {/* bronze-900 */}
          <stop offset="30%" stopColor="#b45309" /> {/* amber-700 */}
          <stop offset="70%" stopColor="#92400e" /> {/* amber-800 */}
          <stop offset="100%" stopColor="#f59e0b" /> {/* amber-500 */}
        </linearGradient>
        {/* Monogram / Arrow Bright Gold-Yellow Gradient */}
        <linearGradient id="monogramGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d97706" /> {/* amber-600 */}
          <stop offset="50%" stopColor="#fbbf24" /> {/* yellow-400 */}
          <stop offset="100%" stopColor="#fef08a" /> {/* yellow-200 */}
        </linearGradient>
      </defs>
      
      {/* Sharp-angled cyber shield path */}
      <path
        d="M12 2L21 5V14C21 18.5 17.5 21.5 12 22C6.5 21.5 3 18.5 3 14V5L12 2Z"
        fill={shieldColor}
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Inner Geometric monogram V + F with central upward arrow */}
      {/* V shape at bottom */}
      <path
        d="M8 12.5L12 16.5L16 12.5"
        stroke={monogramColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* F horizontal bars */}
      <path
        d="M12 9H16"
        stroke={monogramColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 11.2H15"
        stroke={monogramColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Center upward-pointing progress arrow */}
      <path
        d="M12 16.5V6M12 6L9 9M12 6L15 9"
        stroke={monogramColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
