"use client"
// pages/index.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BinanceSymbolList from './Components/Symbols';

export default function Home() {
  const router = useRouter();

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('logintoken') || ""

  const handleLogout = () => {
    localStorage.removeItem('logintoken');
    router.push('/login');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <div className=" bg-opacity-20 min-h-screen flex flex-col gap-10">
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
