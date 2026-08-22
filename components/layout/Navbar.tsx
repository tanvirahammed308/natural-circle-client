'use client';

import Link from 'next/link';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartCount } from '@/store/slices/cartSlice';
import { selectCurrentUser } from '@/store/slices/authSlice';
import { toggleCart } from '@/store/slices/uiSlice';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import Image from 'next/image';

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
    <header className="sticky top-0 z-40 border-b border-[#7AA209]/20 bg-white/95 backdrop-blur dark:border-[#7AA209]/30 dark:bg-black/95">
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
          aria-label="Terra Harvest Home"
        >
          <Image
            src="/images/logo.png"
            alt="Terra Harvest"
            width={160}
            height={50}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#7AA209] transition-colors hover:text-[#5f8007] dark:text-[#7AA209] dark:hover:text-[#9ac72a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">

          <ThemeToggle />

          {/* Account */}
          <Link
            href={user ? '/orders' : '/login'}
            className="hidden rounded-full p-2 text-[#7AA209] hover:bg-[#7AA209]/10 dark:text-[#7AA209] dark:hover:bg-[#7AA209]/20 sm:block"
            aria-label="Account"
          >
            <FiUser className="h-5 w-5" />
          </Link>

          {/* Cart */}
          <button
            onClick={() => dispatch(toggleCart(true))}
            className="relative rounded-full p-2 text-[#7AA209] hover:bg-[#7AA209]/10 dark:text-[#7AA209] dark:hover:bg-[#7AA209]/20"
            aria-label="Cart"
          >
            <FiShoppingCart className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7AA209] text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            className="rounded-full p-2 text-[#7AA209] hover:bg-[#7AA209]/10 dark:text-[#7AA209] dark:hover:bg-[#7AA209]/20 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="border-t border-[#7AA209]/20 bg-white dark:border-[#7AA209]/30 dark:bg-black md:hidden">
          <div className="container-px mx-auto flex flex-col gap-1 py-3">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#7AA209] transition-colors hover:bg-[#7AA209]/10 dark:text-[#7AA209] dark:hover:bg-[#7AA209]/20"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={user ? '/orders' : '/login'}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#7AA209] transition-colors hover:bg-[#7AA209]/10 dark:text-[#7AA209] dark:hover:bg-[#7AA209]/20"
            >
              {user ? 'My Orders' : 'Sign In'}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}