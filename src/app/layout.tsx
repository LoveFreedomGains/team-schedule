'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('neutral');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.add(`${theme}-mode`); // Apply theme to body
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    document.body.classList.remove(`${theme}-mode`); // Remove old theme from body
    setTheme(newTheme);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto p-4"> 
          <div className="flex justify-end mb-4">
            <select value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
