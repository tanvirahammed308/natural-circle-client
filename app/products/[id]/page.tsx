import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaLeaf, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { AddToCartSection } from '@/components/product/AddToCartSection';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <div className="container-px mx-auto max-w-6xl py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-earth-50 dark:bg-earth-800">
          {product.images[0] ? (
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" priority />
          ) : (
            <div className="flex h-full items-center justify-center text-earth-300 dark:text-earth-700">
              <FaLeaf className="h-16 w-16" />
            </div>
          )}
        </div>

        <div>
          {product.isOrganic && (
            <span className="inline-flex items-center gap-1 rounded-full bg-organic-100 px-3 py-1 text-xs font-medium text-organic-800 dark:bg-organic-900 dark:text-organic-300">
              <FaLeaf className="h-3.5 w-3.5" /> Certified Organic
            </span>
          )}
          <h1 className="mt-3 font-serif text-3xl font-semibold text-earth-900 dark:text-earth-50">{product.name}</h1>

          <div className="mt-2 flex items-center gap-4 text-sm text-earth-600 dark:text-earth-400">
            <span className="flex items-center gap-1">
              <FaStar className="h-4 w-4 text-amber-400" />
              {product.rating.toFixed(1)} ({product.numReviews} reviews)
            </span>
            {product.origin && (
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="h-4 w-4" /> {product.origin}
              </span>
            )}
          </div>

          <p className="mt-4 text-2xl font-semibold text-earth-900 dark:text-earth-50">
            {formatPrice(product.price)} <span className="text-sm font-normal text-earth-500 dark:text-earth-400">/ {product.unit}</span>
          </p>

          <p className="mt-4 leading-relaxed text-earth-600 dark:text-earth-300">{product.description}</p>

          {product.nutritionFacts && (
            <div className="mt-4 rounded-xl bg-earth-50 p-4 text-sm text-earth-600 dark:bg-earth-900 dark:text-earth-300">
              <h3 className="mb-1 font-medium text-earth-900 dark:text-earth-50">Nutrition Facts</h3>
              {product.nutritionFacts}
            </div>
          )}

          <AddToCartSection product={product} />
        </div>
      </div>
    </div>
  );
}
