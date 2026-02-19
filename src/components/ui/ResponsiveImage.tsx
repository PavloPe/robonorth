/**
 * ResponsiveImage: Placeholder component for when real product images are added.
 * 
 * When real images are available, this will generate srcset with multiple sizes:
 * - 320w for mobile
 * - 640w for tablet
 * - 960w for desktop
 * - 1280w for retina
 * 
 * For now, renders a placeholder that's structured for easy image replacement.
 */

interface ResponsiveImageProps {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  placeholder?: React.ReactNode;
}

export default function ResponsiveImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  width,
  height,
  placeholder,
}: ResponsiveImageProps) {
  // If no real image, show placeholder
  if (!src || src.startsWith('/images/robots/')) {
    return placeholder || (
      <div className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center ${className}`}>
        <span className="text-6xl opacity-25">🤖</span>
      </div>
    );
  }

  // When real images are available, use Next.js Image with srcset
  // import Image from 'next/image';
  // return (
  //   <Image
  //     src={src}
  //     alt={alt}
  //     width={width || 800}
  //     height={height || 600}
  //     sizes={sizes}
  //     priority={priority}
  //     loading={priority ? 'eager' : 'lazy'}
  //     className={className}
  //     placeholder="blur"
  //     blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  //   />
  // );

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
      className={className}
    />
  );
}
