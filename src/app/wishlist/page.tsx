import type { Metadata } from 'next';
import WishlistClient from '@/components/ui/WishlistClient';

export const metadata: Metadata = {
  title: 'My Wishlist — RoboNorth',
  description: 'View and manage your saved robots and parts wishlist.',
};

export default function WishlistPage() {
  return <WishlistClient />;
}
