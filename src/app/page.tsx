"use client"
// pages/index.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BinanceSymbolList from './Components/Symbols';

export default function Home() {
  const router = useRouter();

  // Check if the logintoken is available
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('logintoken') || ""

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('logintoken');
    router.push('/login');
  };

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Don't render anything until authentication is verified
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 bg-opacity-20 min-h-screen flex flex-col gap-10">
      <nav className="flex justify-end items-center py-4 px-8  bg-opacity-50 backdrop-blur-md">
        <button
          onClick={handleLogout}
          className="text-gray-800 hover:text-blue-900"
        >
          Log Out
        </button>
      </nav>
      <BinanceSymbolList />
    </div>
  );
}
