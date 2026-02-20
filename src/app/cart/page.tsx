import type { Metadata } from 'next';
import CartPageClient from '@/components/ui/CartPageClient';

export const metadata: Metadata = {
  title: 'Shopping Cart — RoboNorth',
  description: 'Review your cart and proceed to checkout. Canadian pricing with GST/HST calculation by province.',
};

export default function CartPage() {
  return <CartPageClient />;
}
