import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🛸</div>
        <h1 className="text-4xl font-bold text-white mb-3">Lost in space?</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Maybe it was abducted by robots.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/">Go Home</Button>
          <Button href="/robots" variant="outline">Browse Robots</Button>
        </div>
      </div>
    </div>
  );
}
