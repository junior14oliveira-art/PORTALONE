import React from 'react';

export function Logo({ className = "w-40 h-auto" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle cx="200" cy="200" r="190" fill="#050505" />
      
      {/* Teal Arrow (Brand) */}
      <path 
        d="M210 90 L290 170 C310 190 310 210 290 230 L210 310 C190 330 160 330 140 310 C120 290 120 260 140 240 L190 190 C195 185 195 175 190 170 L140 120 C120 100 120 70 140 50 C160 30 190 30 210 50 Z" 
        fill="#00A89D" 
        transform="translate(15, -45) scale(0.9)"
      />
      
      {/* Grey Arrow */}
      <path 
        d="M170 130 L220 180 C230 190 230 210 220 220 L170 270 C155 285 135 285 120 270 C105 255 105 235 120 220 L160 180 C165 175 165 165 160 160 L120 120 C105 105 105 85 120 70 C135 55 155 55 170 70 Z" 
        fill="#808285" 
        transform="translate(30, -35) scale(0.85)"
      />

      {/* PORTALONE Text */}
      <text 
        x="200" 
        y="255" 
        fontFamily="Arial, sans-serif" 
        fontSize="48" 
        fontWeight="900" 
        textAnchor="middle" 
        letterSpacing="1"
      >
        <tspan fill="#00A89D">PORTAL</tspan>
        <tspan fill="#808285">ONE</tspan>
      </text>

      {/* INFORMÁTICA Text */}
      <text 
        x="200" 
        y="295" 
        fontFamily="Arial, sans-serif" 
        fontSize="22" 
        fontWeight="600" 
        fill="#FFFFFF" 
        textAnchor="middle" 
        letterSpacing="10"
      >
        INFORMÁTICA
      </text>
    </svg>
  );
}
