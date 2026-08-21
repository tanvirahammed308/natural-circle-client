import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-px mx-auto flex max-w-md flex-col items-center py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold text-earth-900 dark:text-earth-50">Page Not Found</h1>
      <p className="mt-2 text-earth-600 dark:text-earth-400">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-6"><Button>Back to Home</Button></Link>
    </div>
  );
}
