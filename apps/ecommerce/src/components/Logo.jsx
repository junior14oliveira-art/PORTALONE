import React from 'react';

export function Logo({ className = "w-48 h-auto" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 500 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Teal Chevron (Outer) */}
      <path 
        d="M50 20 L110 75 L50 130" 
        stroke="#20AAA0" 
        strokeWidth="30" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* White/Grey Chevron (Inner) */}
      <path 
        d="M20 45 L45 75 L20 105" 
        stroke="#FFFFFF" 
        strokeWidth="20" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* PORTALONE Text */}
      <text 
        x="150" 
        y="85" 
        fontFamily="Arial, sans-serif" 
        fontSize="65" 
        fontWeight="900" 
        letterSpacing="-1"
      >
        <tspan fill="#20AAA0">PORTAL</tspan>
        <tspan fill="#FFFFFF">ONE</tspan>
      </text>

      {/* INFORMÁTICA Text */}
      <text 
        x="155" 
        y="120" 
        fontFamily="Arial, sans-serif" 
        fontSize="22" 
        fontWeight="400" 
        fill="#FFFFFF" 
        letterSpacing="8"
      >
        INFORMÁTICA
      </text>
    </svg>
  );
}
