'use client';
import { createContext, useState, useEffect } from 'react';

const defaultContextValues = {
  theme: 'dark',
  toogle: () => {},
};

export const ThemeContext = createContext(defaultContextValues);

const getFromLocalStoage = () => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('theme');
    return value || 'light';
  } else {
    return 'light';
  }
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<string>(getFromLocalStoage());
  const toogle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toogle }}>
      {children}
    </ThemeContext.Provider>
  );
};
