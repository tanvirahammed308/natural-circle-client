import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container-px mx-auto max-w-4xl py-16">
      <h1 className="font-serif text-3xl font-semibold text-earth-900 dark:text-earth-50">Our Story</h1>
      <p className="mt-4 leading-relaxed text-earth-600 dark:text-earth-300">
        Terra Harvest started with a simple idea: everyone deserves access to real,
        chemical-free food grown the way nature intended. We work directly with
        certified organic farms to cut out the middlemen, so more of what you pay goes
        back to the people who grow your food.
      </p>
      <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop"
          alt="Organic farm"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
