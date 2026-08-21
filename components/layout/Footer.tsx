import Link from 'next/link';
import { FaLeaf, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="border-t border-earth-100 bg-earth-50 dark:border-earth-800 dark:bg-earth-900">
      <div className="container-px mx-auto max-w-7xl py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <FaLeaf className="h-6 w-6 text-organic-600 dark:text-organic-400" />
              <span className="font-serif text-lg font-semibold text-earth-900 dark:text-earth-50">Terra Harvest</span>
            </div>
            <p className="mt-3 text-sm text-earth-600 dark:text-earth-400">
              Certified organic produce, sourced directly from trusted family farms.
            </p>
            <div className="mt-4 flex gap-3">
              <FaInstagram className="h-4 w-4 text-earth-500 dark:text-earth-400" />
              <FaFacebook className="h-4 w-4 text-earth-500 dark:text-earth-400" />
              <FaTwitter className="h-4 w-4 text-earth-500 dark:text-earth-400" />
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-earth-900 dark:text-earth-50">Shop</h4>
            <ul className="space-y-2 text-sm text-earth-600 dark:text-earth-400">
              <li><Link href="/products?category=vegetables">Vegetables</Link></li>
              <li><Link href="/products?category=fruits">Fruits</Link></li>
              <li><Link href="/products?category=grains">Grains</Link></li>
              <li><Link href="/products?category=pantry">Pantry</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-earth-900 dark:text-earth-50">Company</h4>
            <ul className="space-y-2 text-sm text-earth-600 dark:text-earth-400">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/orders">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-earth-900 dark:text-earth-50">Support</h4>
            <ul className="space-y-2 text-sm text-earth-600 dark:text-earth-400">
              <li><Link href="/contact">Help Center</Link></li>
              <li><Link href="/contact">Shipping Info</Link></li>
              <li><Link href="/contact">Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-earth-200 pt-6 text-center text-xs text-earth-500 dark:border-earth-800 dark:text-earth-500">
          © {new Date().getFullYear()} Terra Harvest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
