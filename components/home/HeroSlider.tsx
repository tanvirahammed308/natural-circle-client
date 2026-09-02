'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface Slide {
  eyebrow: string;
  headline: [string, string];
  image: string;
  imageAlt: string;
  ctaHref: string;
  ctaLabel: string;
}

const slides: Slide[] = [
  {
    eyebrow: '100% Organic Fruits',
    headline: ['Organic Plants and', '100% Fresh Fruits'],
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&auto=format&fit=crop',
    imageAlt: 'Fresh organic oranges and citrus fruit',
    ctaHref: '/products?category=fruits',
    ctaLabel: 'Start Shopping',
  },
  {
    eyebrow: 'Certified Organic',
    headline: ['Vegetables Grown', 'Without Compromise'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop',
    imageAlt: 'Fresh organic vegetables',
    ctaHref: '/products?category=vegetables',
    ctaLabel: 'Shop Vegetables',
  },
  {
    eyebrow: 'Ancient Grains',
    headline: ['Wholesome Grains', 'For Every Table'],
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&auto=format&fit=crop',
    imageAlt: 'Organic grains and quinoa',
    ctaHref: '/products?category=grains',
    ctaLabel: 'Shop Grains',
  },
  {
    eyebrow: 'Farm Fresh Dairy',
    headline: ['Pasture Raised,', 'Never Rushed'],
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&auto=format&fit=crop',
    imageAlt: 'Organic dairy products',
    ctaHref: '/products?category=dairy',
    ctaLabel: 'Shop Dairy',
  },
  {
    eyebrow: 'Pantry Staples',
    headline: ['Cold-Pressed Oils,', 'Honest Ingredients'],
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&auto=format&fit=crop',
    imageAlt: 'Organic pantry staples and olive oil',
    ctaHref: '/products?category=pantry',
    ctaLabel: 'Shop Pantry',
  },
];

const AUTOPLAY_MS = 6000;

// A tiny neutral blurred placeholder (not yellow) shown while each photo
// is still downloading, so the gap reads as "loading" rather than "empty".
const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiM0YzJlMjMiLz48L3N2Zz4=';

const textVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const imageVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const hasMountedRef = useRef(false);

  const start = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    start();
    // Mark first mount complete on the next tick so slide 1 renders at
    // full opacity immediately, with no fade-in delay revealing the
    // amber panel underneath before the photo has painted.
    hasMountedRef.current = true;
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    start(); // reset the autoplay clock on manual interaction
  };

  const slide = slides[active];
  const skipEnterAnimation = !hasMountedRef.current;

  return (
    <section
      className="relative isolate overflow-hidden bg-organic-950"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={start}
    >
      {/* Faint scattered leaf texture across the dark background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]">
        {Array.from({ length: 14 }).map((_, i) => (
          <FaLeaf
            key={i}
            className="absolute text-earth-50"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              fontSize: `${24 + (i % 5) * 10}px`,
              transform: `rotate(${(i * 47) % 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_56px]">
        {/* Text column */}
        <div className="container-px relative z-10 flex min-h-[22rem] flex-col justify-center py-16 lg:py-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              variants={textVariants}
              initial={skipEnterAnimation ? 'center' : 'enter'}
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <span className="inline-block rounded-sm border border-earth-50/30 px-3 py-1 font-serif text-sm italic tracking-wide text-earth-50/90">
                {slide.eyebrow}
              </span>
              <h1 className="mt-4 max-w-md font-serif text-4xl font-bold leading-[1.15] text-amber-300 sm:text-5xl">
                {slide.headline[0]}
                <br />
                {slide.headline[1]}
              </h1>
              <Link
                href={slide.ctaHref}
                className="group mt-8 inline-flex items-center gap-4 rounded-full border-2 border-earth-50/80 py-2 pl-6 pr-2 text-sm font-semibold uppercase tracking-wider text-earth-50 transition-colors hover:border-amber-300"
              >
                {slide.ctaLabel}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-earth-50 text-organic-900 transition-transform group-hover:translate-x-0.5 group-hover:bg-amber-300">
                  <FiArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image panel with warm accent block behind the product photo */}
        <div className="relative overflow-hidden h-64 sm:h-80 lg:h-[420px]">
          <div className="absolute inset-4 sm:inset-6 lg:inset-8 rounded-[2rem] bg-amber-300/95" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              variants={imageVariants}
              initial={skipEnterAnimation ? 'center' : 'enter'}
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-4 sm:inset-6 lg:inset-8 overflow-hidden rounded-[2rem]"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Numbered slide indicator column */}
        <div className="relative z-10 hidden flex-col items-center justify-center gap-3 lg:flex">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className="relative flex h-8 w-8 items-center justify-center"
            >
              {i === active && (
                <motion.span
                  layoutId="hero-dot-active"
                  className="absolute inset-0 rounded-full bg-organic-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  'relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                  i === active ? 'text-white' : 'bg-earth-50 text-earth-700 hover:bg-amber-200'
                )}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile dot indicators (the side column is desktop-only) */}
      <div className="relative z-10 flex justify-center gap-2 pb-6 lg:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              'h-2 rounded-full transition-all',
              i === active ? 'w-6 bg-amber-300' : 'w-2 bg-earth-50/50'
            )}
          />
        ))}
      </div>
    </section>
  );
}