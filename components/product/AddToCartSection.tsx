'use client';

import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleCart } from '@/store/slices/uiSlice';
import { useAlert } from '@/hooks/useAlert';

export function AddToCartSection({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const handleAdd = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/placeholder-product.jpg',
        quantity,
        stock: product.stock,
        unit: product.unit,
      })
    );
    alert.success(`${quantity} × ${product.name} added to your cart.`, { title: 'Added to cart' });
    dispatch(toggleCart(true));
  };

  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="flex items-center rounded-full border border-earth-200 dark:border-earth-700">
        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2.5 text-earth-600 dark:text-earth-300" aria-label="Decrease quantity">
          <FiMinus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm text-earth-900 dark:text-earth-50">{quantity}</span>
        <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="p-2.5 text-earth-600 dark:text-earth-300" aria-label="Increase quantity">
          <FiPlus className="h-4 w-4" />
        </button>
      </div>
      <Button size="lg" className="flex-1" onClick={handleAdd} disabled={product.stock === 0}>
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </div>
  );
}
