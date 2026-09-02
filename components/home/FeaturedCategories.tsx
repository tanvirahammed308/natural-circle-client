'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { GiCarrot, GiWheat, GiMilkCarton, GiHerbsBundle, GiOlive } from 'react-icons/gi';
import { FaAppleAlt } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const categories = [
  { slug: 'vegetables', label: 'Vegetables', icon: GiCarrot },
  { slug: 'fruits', label: 'Fruits', icon: FaAppleAlt },
  { slug: 'grains', label: 'Grains', icon: GiWheat },
  { slug: 'dairy', label: 'Dairy', icon: GiMilkCarton },
  { slug: 'herbs', label: 'Herbs', icon: GiHerbsBundle },
  { slug: 'pantry', label: 'Pantry', icon: GiOlive },
  { slug: 'pantry', label: 'Pantry', icon: GiOlive },
  { slug: 'pantry', label: 'Pantry', icon: GiOlive },
] as const;

interface FeaturedCategoriesProps {
  
  activeCategory?: string;
}

export function FeaturedCategories({ activeCategory }: FeaturedCategoriesProps) {
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
  }, [checkOverflow]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;

    
    const cardWidth = firstCardRef.current?.offsetWidth ?? 160;
    const gap = 16; 
    const amount = cardWidth + gap;

    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="container-px mx-auto max-w-7xl py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">
          Featured Categories
        </h2>
        {hasOverflow && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll categories left"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-earth-200 text-earth-600 transition-colors hover:border-organic-500 hover:text-organic-600 dark:border-earth-700 dark:text-earth-300 dark:hover:border-organic-500 dark:hover:text-organic-400"
            >
              <FiArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll categories right"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-earth-900 text-white transition-colors hover:bg-organic-600 dark:bg-earth-50 dark:text-earth-900 dark:hover:bg-organic-500 dark:hover:text-white"
            >
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map(({ slug, label, icon: Icon }, index) => {
          const isActive = activeCategory === slug;
          return (
            <Link
              key={slug}
              ref={index === 0 ? firstCardRef : undefined}
              href={`/products?category=${slug}`}
              className={cn(
                'flex w-36 flex-shrink-0 flex-col items-center gap-4 rounded-2xl px-4 py-8 transition-colors sm:w-40',
                isActive
                  ? 'bg-[#7CA006] text-white'
                  : 'bg-earth-50 text-earth-900 hover:bg-earth-100 dark:bg-earth-800 dark:text-earth-50 dark:hover:bg-earth-700'
              )}
            >
              <Icon className={cn('h-11 w-11', isActive ? 'text-white' : 'text-earth-800 dark:text-earth-100')} />
              <span className="text-sm font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}