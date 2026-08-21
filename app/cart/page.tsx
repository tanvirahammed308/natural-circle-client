'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useAlert } from '@/hooks/useAlert';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const handleRemove = (productId: string, name: string) => {
    dispatch(removeFromCart(productId));
    alert.info(`${name} removed from cart.`);
  };

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto max-w-md py-24 text-center">
        <h1 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">Your cart is empty</h1>
        <p className="mt-2 text-earth-600 dark:text-earth-400">Add some fresh organic goodness to get started.</p>
        <Link href="/products" className="mt-6 inline-block"><Button>Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-4xl py-10">
      <h1 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">Your Cart</h1>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 rounded-2xl border border-earth-100 p-4 dark:border-earth-800">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-earth-50 dark:bg-earth-800">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-earth-900 dark:text-earth-50">{item.name}</p>
              <p className="text-sm text-earth-500 dark:text-earth-400">{formatPrice(item.price)} / {item.unit}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))} className="rounded-full border border-earth-200 p-1.5 dark:border-earth-700">
                <FiMinus className="h-3.5 w-3.5 dark:text-earth-300" />
              </button>
              <span className="w-6 text-center text-earth-900 dark:text-earth-50">{item.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))} className="rounded-full border border-earth-200 p-1.5 dark:border-earth-700">
                <FiPlus className="h-3.5 w-3.5 dark:text-earth-300" />
              </button>
            </div>
            <p className="w-20 text-right font-medium text-earth-900 dark:text-earth-50">{formatPrice(item.price * item.quantity)}</p>
            <button onClick={() => handleRemove(item.productId, item.name)} className="text-earth-400 hover:text-red-500 dark:text-earth-500 dark:hover:text-red-400">
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <p className="text-lg font-semibold text-earth-900 dark:text-earth-50">Subtotal: {formatPrice(total)}</p>
        <Link href="/checkout"><Button size="lg">Proceed to Checkout</Button></Link>
      </div>
    </div>
  );
}
