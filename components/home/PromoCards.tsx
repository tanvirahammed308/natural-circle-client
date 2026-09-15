import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { FaLeaf, FaAppleAlt } from 'react-icons/fa';

const PromoCards = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-5 py-6 lg:px-8 lg:py-10">
      
      {/* Card 1  */}
      <div className="group relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-organic-100 p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl dark:bg-earth-900 sm:flex-row sm:p-8 sm:text-left">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.08]">
          {Array.from({ length: 8 }).map((_, i) => (
            <FaLeaf
              key={i}
              className="absolute text-earth-900 dark:text-earth-50"
              style={{
                top: `${(i * 31) % 100}%`,
                left: `${(i * 43) % 100}%`,
                fontSize: `${16 + (i % 3) * 8}px`,
                transform: `rotate(${(i * 61) % 360}deg)`,
              }}
            />
          ))}
        </div>

        
        <div className="relative flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-organic-200/70 dark:bg-organic-900/40 sm:h-36 sm:w-36 md:h-40 md:w-40">
          <div className="relative h-[85%] w-[85%] overflow-hidden rounded-full ring-4 ring-white transition-transform duration-500 group-hover:scale-105 dark:ring-earth-800">
            <Image
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop"
              alt="Fresh organic vegetables"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative flex flex-col items-center sm:items-start">
          <span className="rounded-full bg-organic-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-organic-800 dark:bg-organic-500/20 dark:text-organic-300">
            10% Off
          </span>
          <h3 className="mt-3 text-xl font-bold text-earth-900 dark:text-earth-50 sm:text-2xl">
            Fresh Vegetables
          </h3>
          <p className="mt-2 max-w-[240px] text-sm text-earth-700 dark:text-earth-300">
            Farm-fresh, certified organic vegetables picked at peak flavor.
          </p>
          <Link
            href="/products?category=vegetables"
            className="group/cta mt-5 inline-flex items-center gap-2 rounded-xl bg-earth-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-earth-700 hover:shadow-lg dark:bg-organic-600 dark:hover:bg-organic-500"
          >
            Shop Now
            <FiArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Card 2 */}
      <div className="group relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-amber-100 p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl dark:bg-earth-900 sm:flex-row sm:p-8 sm:text-left">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.08]">
          {Array.from({ length: 8 }).map((_, i) => (
            <FaAppleAlt
              key={i}
              className="absolute text-earth-900 dark:text-earth-50"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
                fontSize: `${16 + (i % 3) * 8}px`,
                transform: `rotate(${(i * 67) % 360}deg)`,
              }}
            />
          ))}
        </div>

        <div className="relative flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-amber-200/70 dark:bg-amber-500/10 sm:h-36 sm:w-36 md:h-40 md:w-40">
          <div className="relative h-[85%] w-[85%] overflow-hidden rounded-full ring-4 ring-white transition-transform duration-500 group-hover:scale-105 dark:ring-earth-800">
            <Image
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop"
              alt="Fresh organic fruits"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>

          {/* card body */}
          <div className="absolute -right-2 -top-2 z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#0E3E3E] text-center shadow-lg ring-4 ring-amber-100 dark:ring-earth-900 sm:h-[4.5rem] sm:w-[4.5rem]">
            <span className="text-[8px] font-medium leading-none text-white/80 sm:text-[9px]">Up to</span>
            <span className="text-base font-bold leading-tight text-white sm:text-lg">20%</span>
            <span className="text-[8px] font-medium leading-none text-white/80 sm:text-[9px]">Off</span>
          </div>
        </div>

        <div className="relative flex flex-col items-center sm:items-start">
          <span className="rounded-full bg-earth-900/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-earth-800 dark:bg-amber-500/20 dark:text-amber-300">
            Today&apos;s Best Deal
          </span>
          <h3 className="mt-3 text-xl font-bold text-earth-900 dark:text-earth-50 sm:text-2xl">
            Healthy Fruits
          </h3>
          <p className="mt-2 max-w-[240px] text-sm text-earth-700 dark:text-earth-300">
            Savor the goodness of nature with our hand-picked organic fruits.
          </p>
          <Link
            href="/products?category=fruits"
            className="group/cta mt-5 inline-flex items-center gap-2 rounded-xl bg-earth-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-earth-700 hover:shadow-lg dark:bg-organic-600 dark:hover:bg-organic-500"
          >
            Shop Now
            <FiArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromoCards;