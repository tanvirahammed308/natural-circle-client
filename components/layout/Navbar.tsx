'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useState, useEffect, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartCount } from '@/store/slices/cartSlice';
import { selectCurrentUser } from '@/store/slices/authSlice';
import { toggleCart } from '@/store/slices/uiSlice';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/products?category=vegetables', label: 'Vegetables' },
  { href: '/products?category=fruits', label: 'Fruits' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartCount = useAppSelector(selectCartCount);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : '/products');
    setMobileSearchOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-shadow duration-300',
        scrolled ? 'shadow-sm shadow-earth-900/5' : 'shadow-none'
      )}
    >
      {/* Slim announcement strip */}
      <div className="bg-organic-700 dark:bg-organic-900">
        <p className="container-px mx-auto max-w-7xl py-1.5 text-center text-[11px] font-medium tracking-wide text-organic-50">
          🌱 Free delivery on orders over $50 · Certified organic, always
        </p>
      </div>

      <div className="border-b border-earth-100 bg-white/90 backdrop-blur-md dark:border-earth-800 dark:bg-earth-950/90">
        <div className="container-px mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* Logo — left cell */}
          <Link href="/" className="flex shrink-0 items-center justify-self-start">
            <Image
              src="/images/logo.png"
              alt="Organic Market Logo"
              width={180}
              height={30}
              className="h-14 w-44 object-contain"
              priority
            />
          </Link>

          {/* Nav — truly centered middle cell, independent of logo/icon widths */}
          <nav className="col-start-2 hidden items-center justify-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative whitespace-nowrap py-1 text-sm font-medium text-earth-700 transition-colors hover:text-organic-700 dark:text-earth-300 dark:hover:text-organic-400"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-organic-600 transition-transform duration-300 ease-out group-hover:scale-x-100 dark:bg-organic-400" />
              </Link>
            ))}
          </nav>

          {/* Search + icons — right cell */}
          <div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3">
            <form onSubmit={handleSearch} className="hidden max-w-[200px] flex-1 md:flex">
              <div className="group relative w-full">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-earth-400 transition-colors group-focus-within:text-organic-600 dark:text-earth-500 dark:group-focus-within:text-organic-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  aria-label="Search products"
                  className="w-full rounded-full border border-earth-200 bg-earth-50/70 py-1.5 pl-8 pr-3 text-xs text-earth-900 placeholder:text-earth-400 transition-all focus:border-organic-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-organic-100 dark:border-earth-700 dark:bg-earth-900/70 dark:text-earth-50 dark:placeholder:text-earth-500 dark:focus:bg-earth-900 dark:focus:ring-organic-950"
                />
              </div>
            </form>

            <button
              onClick={() => setMobileSearchOpen((v) => !v)}
              className="rounded-full p-2.5 text-earth-700 transition-colors hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800 md:hidden"
              aria-label="Search"
            >
              <FiSearch className="h-5 w-5" />
            </button>

            <ThemeToggle />

            <Link
              href={user ? '/orders' : '/login'}
              className="hidden rounded-full p-2.5 text-earth-700 transition-colors hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800 sm:block"
              aria-label="Account"
            >
              <FiUser className="h-5 w-5" />
            </Link>

            <button
              onClick={() => dispatch(toggleCart(true))}
              className="relative rounded-full p-2.5 text-earth-700 transition-colors hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800"
              aria-label="Cart"
            >
              <FiShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-organic-500 opacity-60" />
                  <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-organic-600 text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                </span>
              )}
            </button>

            <button
              className="rounded-full p-2.5 text-earth-700 transition-colors hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {mobileSearchOpen && (
          <div className="border-t border-earth-100 bg-white px-4 py-3 dark:border-earth-800 dark:bg-earth-950 md:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-earth-400 dark:text-earth-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search organic produce..."
                  aria-label="Search products"
                  autoFocus
                  className="w-full rounded-full border border-earth-200 bg-earth-50 py-2 pl-10 pr-4 text-sm text-earth-900 placeholder:text-earth-400 focus:border-organic-500 focus:outline-none focus:ring-4 focus:ring-organic-100 dark:border-earth-700 dark:bg-earth-900 dark:text-earth-50 dark:placeholder:text-earth-500 dark:focus:ring-organic-950"
                />
              </div>
            </form>
          </div>
        )}

        {mobileOpen && (
          <nav className="border-t border-earth-100 bg-white dark:border-earth-800 dark:bg-earth-950 lg:hidden">
            <div className="container-px mx-auto flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-earth-700 hover:bg-earth-50 dark:text-earth-300 dark:hover:bg-earth-800"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={user ? '/orders' : '/login'}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-earth-700 hover:bg-earth-50 dark:text-earth-300 dark:hover:bg-earth-800"
              >
                {user ? 'My Orders' : 'Sign In'}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}