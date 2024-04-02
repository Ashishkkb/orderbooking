"use client"
// pages/index.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BinanceSymbolList from './Components/Symbols';

export default function Home() {
  const router = useRouter();

  // Check if the logintoken is available
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('logintoken');

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
    <div className="bg-gradient-to-br from-white to-blue-200 bg-opacity-20 min-h-screen flex flex-col gap-10">
      <nav className="flex justify-between items-center py-4 px-8 bg-white bg-opacity-50 backdrop-blur-md">
        <div className="text-lg font-semibold text-gray-800">OrderBook</div>
        <button
          onClick={handleLogout}
          className="text-gray-800 hover:text-gray-900"
        >
          Logout
        </button>
      </nav>
      <BinanceSymbolList />
    </div>
  );
}
