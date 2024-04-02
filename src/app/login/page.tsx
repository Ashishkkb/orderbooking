"use client"


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageNew from "./ImageAnalytics.svg"
import Image from 'next/image';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('logintoken') || ""

  if (isLoggedIn) {
    router.push('/');
  }

  const handleLogin = () => {
    // Perform login logic here, e.g., fetch a token from the server
    const token = 'loginisdone';
    localStorage.setItem('logintoken', token);
    localStorage.setItem('username', username); // Store the username
    router.push('/'); // Redirect to the home page
  };

  return (
    <div className="grid grid-cols-3 gap-4 bg-white shadow-lg min-w-screen h-screen overflow-y-hidden">
      <div className="col-span-1 flex flex-col justify-center">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Login to OrderBook</h2>
        <p className="text-gray-400 text-center mb-6 text-sm ">Enter your credentials to access your account.</p>
        <form className="space-y-6 " action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm flex flex-col items-center gap-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-md relative block w-[400px] px-3 py-4 bg-[#EAEEED] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#EC6062] focus:border-[#EC6062] focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-[400px] px-3 py-4 bg-[#EAEEED] border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#EC6062] focus:border-[#EC6062] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="hover:underline pb-2 hover:text-[#EC6062] mt-4">
              Forget your password?
            </div>
            <div>
              <button
                type="button"
                className="mt-6 transition-all hover:scale-110 w-[200px] flex justify-center py-3 px-4 text-md font-semibold rounded-full text-white bg-[#EC6062] hover:bg-[#d35456] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d35456]"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <Image src={ImageNew} alt="Image" className='loginimage overflow-y-hidden col-span-2'/>
    </div>
  );
};

export default Login;
