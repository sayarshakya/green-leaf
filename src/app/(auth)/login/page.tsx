'use client';

import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import loginSchema from '@/app/(auth)/utils/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCannabis } from '@fortawesome/free-solid-svg-icons';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as 'email' | 'password'] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({}); 
    setAuthError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/dashboard');
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        setAuthError((error as { message: string }).message);
      } else {
        setAuthError('Invalid email or password');
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/dashboard'); 
      }
    });

    return () => unsubscribe();
  }, [router]);


  return (
   <div className="min-h-screen flex items-center justify-center bg-gray">
    <div className="w-full max-w-md rounded-lg shadow-2xl p-8 bg-white">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faCannabis}
            className="mx-auto text-green-600 text-7xl mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Green Leaf</h1>
          <h3 className="text-lg font-bold text-gray-800 mb-6">Sign in to your Account</h3>
        </div>
        {authError && <p className="text-red-600 text-sm text-center">{authError}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-black mb-1">
              Email
            </label>
            <input
              id="email"
              className={`w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-400'
                }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-black mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-400'
                }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}



