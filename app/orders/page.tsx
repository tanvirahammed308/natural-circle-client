'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/types';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser, selectAuthLoading } from '@/store/slices/authSlice';
import { useAlert } from '@/hooks/useAlert';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  paid: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
};

export default function OrdersPage() {
  const user = useAppSelector(selectCurrentUser);
  const authLoading = useAppSelector(selectAuthLoading);
  const alert = useAlert();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    api
      .get('/orders/my-orders')
      .then(({ data }) => setOrders(data))
      .catch((err) => alert.error(err.message || 'Could not load your orders.'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);

  if (!authLoading && !user) {
    return (
      <div className="container-px mx-auto max-w-md py-24 text-center">
        <p className="text-earth-600 dark:text-earth-400">Please sign in to view your orders.</p>
        <Link href="/login" className="mt-3 inline-block font-medium text-organic-700 hover:underline dark:text-organic-400">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-4xl py-10">
      <h1 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">My Orders</h1>

      {loading ? (
        <p className="mt-6 text-earth-500 dark:text-earth-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-earth-500 dark:text-earth-400">You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-earth-100 p-5 dark:border-earth-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-earth-900 dark:text-earth-50">Order #{order._id.slice(-8)}</p>
                  <p className="text-xs text-earth-500 dark:text-earth-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[order.status]}`}>{order.status}</span>
              </div>
              <div className="mt-3 space-y-1 text-sm text-earth-600 dark:text-earth-400">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between border-t border-earth-100 pt-3 text-sm font-semibold text-earth-900 dark:border-earth-800 dark:text-earth-50">
                <span>Total</span><span>{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
