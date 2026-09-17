
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { auth } from '@/lib/firebase';
import { useAlert } from '@/hooks/useAlert';
import { getFirebaseErrorMessage } from '@/lib/utils';

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(80),

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),

    confirmPassword: z
      .string()
      .min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const alert = useAlert();

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Email / Password Registration
  const onSubmit = async (values: RegisterFormData) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await updateProfile(credential.user, {
        displayName: values.name,
      });

      alert.success('Your account has been created.', {
        title: 'Welcome to Natural Circle',
      });

      // Redirect to login page after successful registration
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        alert.error(getFirebaseErrorMessage(err.code), {
          title: 'Registration failed',
        });
      } else {
        alert.error('Something went wrong. Please try again.', {
          title: 'Registration failed',
        });
      }
    }
  };

  // Google Registration
  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      alert.success('Your account has been created.', {
        title: 'Welcome to Natural Circle',
      });

      // Redirect to login page after successful Google registration
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        // User closed the popup or another popup request was cancelled
        if (
          err.code === 'auth/popup-closed-by-user' ||
          err.code === 'auth/cancelled-popup-request'
        ) {
          return;
        }

        alert.error(getFirebaseErrorMessage(err.code), {
          title: 'Google sign-up failed',
        });
      } else {
        alert.error('Something went wrong. Please try again.', {
          title: 'Google sign-up failed',
        });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="container-px mx-auto flex max-w-md flex-col py-16">
      <h1 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">
        Create your account
      </h1>

      <p className="mt-1 text-sm text-earth-600 dark:text-earth-400">
        Join Natural Circle for fresh organic produce.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-4"
        noValidate
      >
        {/* Full Name */}
        <div className="w-full">
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-earth-800 dark:text-earth-200"
          >
            Full Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            className="w-full rounded-lg border border-earth-200 bg-white px-4 py-2.5 text-sm text-earth-900 placeholder:text-earth-400 focus:border-organic-500 focus:outline-none focus:ring-2 focus:ring-organic-100 dark:border-earth-700 dark:bg-earth-900 dark:text-earth-50 dark:placeholder:text-earth-500"
            {...register('name')}
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {String(errors.name.message)}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="w-full">
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-earth-800 dark:text-earth-200"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-earth-200 bg-white px-4 py-2.5 text-sm text-earth-900 placeholder:text-earth-400 focus:border-organic-500 focus:outline-none focus:ring-2 focus:ring-organic-100 dark:border-earth-700 dark:bg-earth-900 dark:text-earth-50 dark:placeholder:text-earth-500"
            {...register('email')}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {String(errors.email.message)}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="w-full">
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-earth-800 dark:text-earth-200"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full rounded-lg border border-earth-200 bg-white px-4 py-2.5 pr-11 text-sm text-earth-900 placeholder:text-earth-400 focus:border-organic-500 focus:outline-none focus:ring-2 focus:ring-organic-100 dark:border-earth-700 dark:bg-earth-900 dark:text-earth-50 dark:placeholder:text-earth-500"
              {...register('password')}
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={
                showPassword ? 'Hide password' : 'Show password'
              }
              tabIndex={-1}
              className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-earth-400 transition-colors hover:text-earth-700 dark:text-earth-500 dark:hover:text-earth-300"
            >
              {showPassword ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <FiEye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {String(errors.password.message)}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="w-full">
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-medium text-earth-800 dark:text-earth-200"
          >
            Confirm Password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full rounded-lg border border-earth-200 bg-white px-4 py-2.5 pr-11 text-sm text-earth-900 placeholder:text-earth-400 focus:border-organic-500 focus:outline-none focus:ring-2 focus:ring-organic-100 dark:border-earth-700 dark:bg-earth-900 dark:text-earth-50 dark:placeholder:text-earth-500"
              {...register('confirmPassword')}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((v) => !v)
              }
              aria-label={
                showConfirmPassword
                  ? 'Hide password'
                  : 'Show password'
              }
              tabIndex={-1}
              className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-earth-400 transition-colors hover:text-earth-700 dark:text-earth-500 dark:hover:text-earth-300"
            >
              {showConfirmPassword ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <FiEye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {String(errors.confirmPassword.message)}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-organic-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-organic-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-organic-500 dark:hover:bg-organic-600"
        >
          {isSubmitting && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}

          Create Account
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-earth-200 dark:bg-earth-700" />

        <span className="text-xs uppercase tracking-wide text-earth-400 dark:text-earth-500">
          or
        </span>

        <div className="h-px flex-1 bg-earth-200 dark:bg-earth-700" />
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={isGoogleLoading}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-earth-200 bg-white py-2.5 text-sm font-medium text-earth-800 transition-colors hover:bg-earth-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-earth-700 dark:bg-earth-900 dark:text-earth-100 dark:hover:bg-earth-800"
      >
        {isGoogleLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-earth-400 border-t-transparent" />
        ) : (
          <FcGoogle className="h-5 w-5" />
        )}

        Continue with Google
      </button>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-earth-600 dark:text-earth-400">
        Already have an account?{' '}

        <Link
          href="/login"
          className="font-medium text-organic-700 hover:underline dark:text-organic-400"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
