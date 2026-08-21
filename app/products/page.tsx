import { ProductGrid } from '@/components/product/ProductGrid';
import { Product } from '@/types';

interface SearchParams {
  category?: string;
  search?: string;
  sort?: string;
}

async function getProducts(searchParams: SearchParams): Promise<Product[]> {
  const params = new URLSearchParams();
  if (searchParams.category) params.set('category', searchParams.category);
  if (searchParams.search) params.set('search', searchParams.search);
  if (searchParams.sort) params.set('sort', searchParams.sort);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

const categories = ['vegetables', 'fruits', 'grains', 'dairy', 'herbs', 'pantry'];

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const products = await getProducts(searchParams);

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <h1 className="font-serif text-3xl font-semibold text-earth-900 dark:text-earth-50">Shop Organic</h1>
      <p className="mt-1 text-earth-600 dark:text-earth-400">Fresh, certified organic produce sourced from local farms.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href="/products"
          className={`rounded-full border px-4 py-1.5 text-sm ${
            !searchParams.category
              ? 'border-organic-600 bg-organic-600 text-white dark:border-organic-500 dark:bg-organic-500'
              : 'border-earth-200 text-earth-700 dark:border-earth-700 dark:text-earth-300'
          }`}
        >
          All
        </a>
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/products?category=${cat}`}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize ${
              searchParams.category === cat
                ? 'border-organic-600 bg-organic-600 text-white dark:border-organic-500 dark:bg-organic-500'
                : 'border-earth-200 text-earth-700 dark:border-earth-700 dark:text-earth-300'
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
