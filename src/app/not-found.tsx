import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-7xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button href="/">Go Home</Button>
          <Button href="/robots" variant="outline">Browse Robots</Button>
        </div>
      </div>
    </div>
  );
}
