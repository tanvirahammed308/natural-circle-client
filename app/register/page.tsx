'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { registerSchema, RegisterFormValues } from '@/lib/validations/authSchema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAlert } from '@/hooks/useAlert';
import { getFirebaseErrorMessage } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(credential.user, { displayName: values.name });
      alert.success('Your account has been created.', { title: 'Welcome to Terra Harvest' });
      router.push('/products');
    } catch (err: any) {
      alert.error(getFirebaseErrorMessage(err?.code), { title: 'Registration failed' });
    }
  };

  return (
    <div className="container-px mx-auto flex max-w-md flex-col py-16">
      <h1 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">Create your account</h1>
      <p className="mt-1 text-sm text-earth-600 dark:text-earth-400">Join Terra Harvest for fresh organic produce.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
        <Input label="Full Name" placeholder="Jane Doe" error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
        <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
        <Input label="Confirm Password" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>Create Account</Button>
      </form>

      <p className="mt-6 text-center text-sm text-earth-600 dark:text-earth-400">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-organic-700 hover:underline dark:text-organic-400">Sign in</Link>
      </p>
    </div>
  );
}
