"use client";

import React from 'react';
import { AuthProvider } from './AuthProvider';
import { CartProvider } from '@/context/CartContext';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
