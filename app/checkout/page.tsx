'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormValues } from '@/lib/validations/checkoutSchema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { formatPrice, cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartTotal } from '@/store/slices/cartSlice';
import { selectCurrentUser } from '@/store/slices/authSlice';
import { useAlert } from '@/hooks/useAlert';

export default function CheckoutPage() {
  const router = useRouter();
  const alert = useAlert();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal);
  const user = useAppSelector(selectCurrentUser);

  const shippingFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shippingFee;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({ resolver: zodResolver(checkoutSchema) });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!user) {
      alert.warning('Please sign in to continue to payment.', { title: 'Sign in required' });
      router.push('/login');
      return;
    }
    if (items.length === 0) {
      alert.warning('Your cart is empty.');
      return;
    }

    try {
      const { data } = await api.post('/stripe/create-checkout-session', {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: values,
      });
      window.location.href = data.url;
    } catch (err: any) {
      alert.error(err.message || 'Could not start checkout. Please try again.', { title: 'Checkout failed' });
    }
  };

  return (
    <div className="container-px mx-auto max-w-5xl py-10">
      <h1 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">Checkout</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:col-span-2" noValidate>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-earth-500 dark:text-earth-400">Shipping Address</h2>
          <Input label="Street Address" error={errors.street?.message} {...register('street')} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" error={errors.city?.message} {...register('city')} />
            <Input label="State / Province" error={errors.state?.message} {...register('state')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Postal Code" error={errors.postalCode?.message} {...register('postalCode')} />
            <Input label="Country" error={errors.country?.message} {...register('country')} />
          </div>

          <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>Continue to Payment</Button>
          <p className="text-center text-xs text-earth-400 dark:text-earth-500">You&apos;ll be redirected to Stripe to securely complete your payment.</p>
        </form>

        <div className="rounded-2xl border border-earth-100 p-5 dark:border-earth-800">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-earth-500 dark:text-earth-400">Order Summary</h2>
          <ul className="space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between">
                <span className="text-earth-600 dark:text-earth-400">{item.name} × {item.quantity}</span>
                <span className="font-medium text-earth-900 dark:text-earth-50">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-earth-100 pt-4 text-sm dark:border-earth-800">
            <div className="flex justify-between text-earth-600 dark:text-earth-400">
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-earth-600 dark:text-earth-400">
              <span>Shipping</span><span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
            </div>
            <div className={cn('flex justify-between pt-2 text-base font-semibold text-earth-900 dark:text-earth-50')}>
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
