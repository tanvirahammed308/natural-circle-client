'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { toggleCart } from '@/store/slices/uiSlice';
import { formatPrice, cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useAlert } from '@/hooks/useAlert';

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const isOpen = useAppSelector((s) => s.ui.isCartOpen);
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const handleRemove = (productId: string, name: string) => {
    dispatch(removeFromCart(productId));
    alert.info(`${name} removed from cart.`);
  };

  return (
    <>
      <div
        className={cn('fixed inset-0 z-50 bg-black/40 transition-opacity', isOpen ? 'opacity-100' : 'pointer-events-none opacity-0')}
        onClick={() => dispatch(toggleCart(false))}
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col bg-white shadow-xl transition-transform dark:bg-earth-950',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-earth-100 p-4 dark:border-earth-800">
          <h2 className="font-serif text-lg font-semibold text-earth-900 dark:text-earth-50">Your Cart ({items.length})</h2>
          <button onClick={() => dispatch(toggleCart(false))} aria-label="Close cart">
            <FiX className="h-5 w-5 text-earth-600 dark:text-earth-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-earth-500 dark:text-earth-400">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-earth-50 dark:bg-earth-800">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-earth-900 dark:text-earth-50">{item.name}</p>
                    <p className="text-xs text-earth-500 dark:text-earth-400">{formatPrice(item.price)} / {item.unit}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}
                        className="rounded-full border border-earth-200 p-1 dark:border-earth-700"
                      >
                        <FiMinus className="h-3 w-3 dark:text-earth-300" />
                      </button>
                      <span className="w-6 text-center text-sm text-earth-900 dark:text-earth-50">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}
                        className="rounded-full border border-earth-200 p-1 dark:border-earth-700"
                      >
                        <FiPlus className="h-3 w-3 dark:text-earth-300" />
                      </button>
                      <button onClick={() => handleRemove(item.productId, item.name)} className="ml-auto text-earth-400 hover:text-red-500 dark:text-earth-500 dark:hover:text-red-400">
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-earth-100 p-4 dark:border-earth-800">
            <div className="mb-4 flex items-center justify-between text-sm font-medium text-earth-900 dark:text-earth-50">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" onClick={() => dispatch(toggleCart(false))}>
              <Button className="w-full" size="lg">Proceed to Checkout</Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
