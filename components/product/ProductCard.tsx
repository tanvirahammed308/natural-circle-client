'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { useAlert } from '@/hooks/useAlert';

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/placeholder-product.jpg',
        quantity: 1,
        stock: product.stock,
        unit: product.unit,
      })
    );
    alert.success(`${product.name} added to your cart.`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-earth-100 bg-white transition-shadow hover:shadow-lg dark:border-earth-800 dark:bg-earth-900 dark:hover:shadow-earth-950/50">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-earth-50 dark:bg-earth-800">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-earth-300 dark:text-earth-700">
            <FaLeaf className="h-12 w-12" />
          </div>
        )}
        {product.isOrganic && (
          <Badge className="absolute left-3 top-3 bg-white/90 dark:bg-earth-950/80">
            <FaLeaf className="mr-1 h-3 w-3" /> Organic
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-earth-900 hover:text-organic-700 dark:text-earth-50 dark:hover:text-organic-400">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-earth-500 dark:text-earth-400">{product.price.toFixed(2)} / {product.unit}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-semibold text-earth-900 dark:text-earth-50">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-organic-600 text-white transition-colors hover:bg-organic-700 disabled:bg-earth-200 dark:bg-organic-500 dark:hover:bg-organic-600 dark:disabled:bg-earth-700"
            aria-label="Add to cart"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
        {product.stock === 0 && <span className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">Out of stock</span>}
      </div>
    </div>
  );
}
