'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartCount } from '@/store/slices/cartSlice';
import { selectCurrentUser } from '@/store/slices/authSlice';
import { toggleCart } from '@/store/slices/uiSlice';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartCount = useAppSelector(selectCartCount);
  const user = useAppSelector(selectCurrentUser);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : '/products');
    setMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-earth-100 bg-white/95 backdrop-blur dark:border-earth-800 dark:bg-earth-950/95">
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt="Organic Market Logo"
            width={180}
            height={30}
            className="w-44 h-14 object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-earth-700 transition-colors hover:text-organic-700 dark:text-earth-300 dark:hover:text-organic-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop search bar */}
        <form onSubmit={handleSearch} className="hidden flex-1 max-w-sm md:flex">
          <div className="relative w-full">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth-400 dark:text-earth-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search organic produce..."
              aria-label="Search products"
              className="w-full rounded-full border border-earth-200 bg-earth-50 py-2 pl-9 pr-4 text-sm text-earth-900 placeholder:text-earth-400 focus:border-organic-500 focus:outline-none focus:ring-2 focus:ring-organic-100 dark:border-earth-700 dark:bg-earth-900 dark:text-earth-50 dark:placeholder:text-earth-500 dark:focus:ring-organic-900"
            />
          </div>
        </form>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search toggle */}
          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="rounded-full p-2 text-earth-700 hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800 md:hidden"
            aria-label="Search"
          >
            <FiSearch className="h-5 w-5" />
          </button>

          <ThemeToggle />
          <Link
            href={user ? '/orders' : '/login'}
            className="hidden rounded-full p-2 text-earth-700 hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800 sm:block"
            aria-label="Account"
          >
            <FiUser className="h-5 w-5" />
          </Link>
          <button
            onClick={() => dispatch(toggleCart(true))}
            className="relative rounded-full p-2 text-earth-700 hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800"
            aria-label="Cart"
          >
            <FiShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-organic-600 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="rounded-full p-2 text-earth-700 hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar (expands below header) */}
      {mobileSearchOpen && (
        <div className="border-t border-earth-100 bg-white px-4 py-3 dark:border-earth-800 dark:bg-earth-950 md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth-400 dark:text-earth-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search organic produce..."
                aria-label="Search products"
                autoFocus
                className="w-full rounded-full border border-earth-200 bg-earth-50 py-2 pl-9 pr-4 text-sm text-earth-900 placeholder:text-earth-400 focus:border-organic-500 focus:outline-none focus:ring-2 focus:ring-organic-100 dark:border-earth-700 dark:bg-earth-900 dark:text-earth-50 dark:placeholder:text-earth-500 dark:focus:ring-organic-900"
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
    </header>
  );
}