'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { useAlert } from '@/hooks/useAlert';

export default function CheckoutSuccessPage({ searchParams }: { searchParams: { order_id?: string } }) {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    dispatch(clearCart());
    alert.success('Your order has been placed successfully.', { title: 'Payment received' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="container-px mx-auto flex max-w-md flex-col items-center py-24 text-center">
      <FaCheckCircle className="h-16 w-16 text-organic-600 dark:text-organic-400" />
      <h1 className="mt-6 font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">Order Confirmed!</h1>
      <p className="mt-2 text-earth-600 dark:text-earth-400">Thank you for your purchase. We&apos;re preparing your fresh organic produce for delivery.</p>
      {searchParams.order_id && <p className="mt-2 text-xs text-earth-400 dark:text-earth-500">Order ID: {searchParams.order_id}</p>}
      <div className="mt-8 flex gap-3">
        <Link href="/orders"><Button>View Orders</Button></Link>
        <Link href="/products"><Button variant="outline">Continue Shopping</Button></Link>
      </div>
    </div>
  );
}
