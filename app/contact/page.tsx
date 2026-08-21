'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormValues } from '@/lib/validations/contactSchema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAlert } from '@/hooks/useAlert';

export default function ContactPage() {
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await new Promise((r) => setTimeout(r, 600));
      alert.success("Thanks for reaching out! We'll get back to you within 24 hours.", { title: 'Message sent' });
      reset();
    } catch {
      alert.error('Could not send your message. Please try again.');
    }
  };

  return (
    <div className="container-px mx-auto max-w-lg py-16">
      <h1 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">Get in touch</h1>
      <p className="mt-1 text-sm text-earth-600 dark:text-earth-400">We&apos;d love to hear from you.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Input label="Subject" error={errors.subject?.message} {...register('subject')} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-earth-800 dark:text-earth-200">Message</label>
          <textarea
            rows={5}
            className="w-full rounded-lg border border-earth-200 bg-white px-4 py-2.5 text-sm text-earth-900 focus:border-organic-500 focus:outline-none focus:ring-2 focus:ring-organic-100 dark:border-earth-700 dark:bg-earth-900 dark:text-earth-50 dark:focus:ring-organic-900"
            {...register('message')}
          />
          {errors.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message.message}</p>}
        </div>
        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>Send Message</Button>
      </form>
    </div>
  );
}
