import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf, FaTruck, FaShieldAlt, FaSeedling } from 'react-icons/fa';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/featured`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      <section className="relative overflow-hidden bg-organic-50 dark:bg-earth-900">
        <div className="container-px mx-auto grid max-w-7xl items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-organic-100 px-3 py-1 text-xs font-medium text-organic-800 dark:bg-organic-900 dark:text-organic-300">
              <FaLeaf className="h-3.5 w-3.5" /> 100% Certified Organic
            </span>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-earth-900 dark:text-earth-50 md:text-5xl">
              Fresh from the farm, straight to your table
            </h1>
            <p className="mt-4 max-w-md text-earth-600 dark:text-earth-300">
              We partner with local, sustainable farms to bring you the freshest organic fruits, vegetables, and pantry staples — no pesticides, no shortcuts.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/products"><Button size="lg">Shop Now</Button></Link>
              <Link href="/about"><Button size="lg" variant="outline">Our Story</Button></Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&auto=format&fit=crop"
              alt="Fresh organic vegetables and fruits"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: FaSeedling, title: 'Farm Certified Organic', desc: 'Every product is independently certified pesticide-free.' },
            { icon: FaTruck, title: 'Fast Local Delivery', desc: 'Fresh produce delivered within 24 hours of harvest.' },
            { icon: FaShieldAlt, title: 'Quality Guaranteed', desc: 'Not happy? Full refund, no questions asked.' },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-earth-100 p-6 dark:border-earth-800">
              <f.icon className="h-8 w-8 text-organic-600 dark:text-organic-400" />
              <h3 className="mt-3 font-medium text-earth-900 dark:text-earth-50">{f.title}</h3>
              <p className="mt-1 text-sm text-earth-600 dark:text-earth-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-earth-900 dark:text-earth-50">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-organic-700 hover:underline dark:text-organic-400">View all</Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
}
