'use client';

import { useEffect } from 'react';
import { trackRobotView } from './RecentlyViewed';

interface Props {
  id: string;
  name: string;
  manufacturer: string;
  price: string;
}

export default function RobotDetailTracker({ id, name, manufacturer, price }: Props) {
  useEffect(() => {
    trackRobotView({ id, name, manufacturer, price });
  }, [id, name, manufacturer, price]);

  return null;
}
