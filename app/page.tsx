import { HeroSlider } from '@/components/home/HeroSlider';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { FlashSales } from '@/components/home/FlashSales';
import { Product } from '@/types';
import SaleBanner from '@/components/home/SaleBanner';

async function getSaleProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=50`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();

    return (data.products as Product[])
      .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
      .slice(0, 8);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const saleProducts = await getSaleProducts();
  console.log('Sale products:', saleProducts);

  return (
    <div>
      <HeroSlider />
      <FeaturedCategories />
      <FlashSales products={saleProducts} />
      <SaleBanner />
    </div>
  );
}