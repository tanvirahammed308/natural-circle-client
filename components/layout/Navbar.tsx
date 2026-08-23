'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartCount } from '@/store/slices/cartSlice';
import { selectCurrentUser } from '@/store/slices/authSlice';
import { toggleCart } from '@/store/slices/uiSlice';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/products?category=vegetables', label: 'Vegetables' },
  { href: '/products?category=fruits', label: 'Fruits' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const user = useAppSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-40 border-b border-earth-100 bg-white/95 backdrop-blur dark:border-earth-800 dark:bg-earth-950/95">
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
                        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt="Organic Market Logo"
            width={180}
            height={40}
            className="w-44 h-14 object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-earth-700 transition-colors hover:text-organic-700 dark:text-earth-300 dark:hover:text-organic-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
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
            className="rounded-full p-2 text-earth-700 hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-earth-100 bg-white dark:border-earth-800 dark:bg-earth-950 md:hidden">
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