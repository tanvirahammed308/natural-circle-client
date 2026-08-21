'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { loginSchema, LoginFormValues } from '@/lib/validations/authSchema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAlert } from '@/hooks/useAlert';
import { getFirebaseErrorMessage } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      alert.success('Signed in successfully.', { title: 'Welcome back' });
      router.push('/products');
    } catch (err: any) {
      alert.error(getFirebaseErrorMessage(err?.code), { title: 'Sign in failed' });
    }
  };

  return (
    <div className="container-px mx-auto flex max-w-md flex-col py-16">
      <h1 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">Welcome back</h1>
      <p className="mt-1 text-sm text-earth-600 dark:text-earth-400">Sign in to your Terra Harvest account.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
        <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
        <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>Sign In</Button>
      </form>

      <p className="mt-6 text-center text-sm text-earth-600 dark:text-earth-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-organic-700 hover:underline dark:text-organic-400">Create one</Link>
      </p>
    </div>
  );
}
