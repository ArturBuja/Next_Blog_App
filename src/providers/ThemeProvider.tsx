'use client';
import { ThemeContext } from '@/context/ThemeContext';
import React, { useContext, useState, useEffect } from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
