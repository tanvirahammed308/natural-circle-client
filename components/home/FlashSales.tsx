'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiStar } from 'react-icons/fi';
import { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

interface FlashSalesProps {
  products: Product[];
  /** When the sale ends. Defaults to 2 days from when the component mounts. */
  endTime?: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono text-xl font-bold text-earth-900 sm:text-2xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[11px] text-earth-700">{label}</span>
    </div>
  );
}

export function FlashSales({ products, endTime }: FlashSalesProps) {
  // Stable default target so it doesn't reset to "2 days away" on every render.
  const [target] = useState(() => endTime ?? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLAnchorElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setHasOverflow(el.scrollWidth > el.clientWidth + 1);
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [checkOverflow, products]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = firstCardRef.current?.offsetWidth ?? 280;
    const gap = 24; // matches gap-6 below
    const amount = cardWidth + gap;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <section className="bg-earth-50 py-12 dark:bg-earth-900">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-earth-50 sm:text-3xl">
              Flash Sales
            </h2>
            <div className="flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <span className="pb-4 text-lg font-bold text-earth-900">:</span>
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <span className="pb-4 text-lg font-bold text-earth-900">:</span>
              <CountdownUnit value={timeLeft.minutes} label="Mins" />
              <span className="pb-4 text-lg font-bold text-earth-900">:</span>
              <CountdownUnit value={timeLeft.seconds} label="Secs" />
            </div>
          </div>

          {hasOverflow && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                aria-label="Scroll flash sales left"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-earth-200 bg-white text-earth-600 transition-colors hover:border-organic-500 hover:text-organic-600 dark:border-earth-700 dark:bg-earth-800 dark:text-earth-300"
              >
                <FiArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                aria-label="Scroll flash sales right"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-earth-900 text-white transition-colors hover:bg-organic-600 dark:bg-earth-50 dark:text-earth-900 dark:hover:bg-organic-500 dark:hover:text-white"
              >
                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, index) => {
            const discountPercent =
              product.compareAtPrice && product.compareAtPrice > product.price
                ? Math.round((1 - product.price / product.compareAtPrice) * 100)
                : null;

            return (
              <Link
                key={product._id}
                ref={index === 0 ? firstCardRef : undefined}
                href={`/products/${product.slug}`}
                className="w-72 flex-shrink-0 rounded-2xl border border-earth-100 bg-white transition-shadow hover:shadow-lg dark:border-earth-800 dark:bg-earth-800"
              >
                <div className="relative aspect-square p-6">
                  {discountPercent !== null && (
                    <span className="absolute left-4 top-4 z-10 rounded-lg bg-amber-300 px-2.5 py-1 text-xs font-bold text-earth-900">
                      -{discountPercent}%
                    </span>
                  )}
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="288px"
                      className="object-contain p-6"
                    />
                  ) : (
                    <div className="h-full w-full rounded-xl bg-earth-50 dark:bg-earth-900" />
                  )}
                </div>

                <div className="border-t border-earth-100 p-5 dark:border-earth-700">
                  <h3 className="line-clamp-2 min-h-[3rem] text-lg font-semibold text-earth-900 dark:text-earth-50">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-earth-600 dark:text-earth-400">
                    <FiStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-earth-900 dark:text-earth-50">
                      {product.rating.toFixed(1)}
                    </span>
                    <span>({product.numReviews} Reviews)</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-base font-semibold text-earth-900 dark:text-earth-50">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-earth-400 line-through dark:text-earth-500">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}