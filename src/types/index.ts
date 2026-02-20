// ============================================================================
// RoboNorth.ca — Shared Types
// ============================================================================

export type Availability =
  | 'shipping'
  | 'preorder'
  | 'pilot'
  | 'announced'
  | 'prototype';

export type RobotCategory =
  | 'consumer'
  | 'enterprise'
  | 'research'
  | 'announced';

export interface RobotSpecs {
  height: number | null;
  weight: number | null;
  dof: number | null;
  battery: string | null;
  payload: number | null;
  speed: number | null;
}

export interface Robot {
  id: string;
  name: string;
  manufacturer: string;
  manufacturerSlug: string;
  price: string;
  priceMin: number;
  availability: Availability;
  category: RobotCategory;
  useCase: string[];
  description: string;
  specs: RobotSpecs;
  country: string;
  imageUrl: string;
  featured: boolean;
  canadaAvailable: boolean;
}

export interface Manufacturer {
  id: string;
  name: string;
  country: string;
  founded: string;
  description: string;
  website: string;
  robotIds: string[];
  imageUrl: string;
  featured: boolean;
}

export interface PartItem {
  name: string;
  priceRange: string;
  description: string;
}

export interface PartCategory {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  imageUrl: string;
  popularItems: PartItem[];
}

export type PartCategorySlug =
  | 'actuators'
  | 'sensors'
  | 'controllers'
  | 'power'
  | 'structural'
  | 'hands'
  | 'software';

export interface Part {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  manufacturerSlug: string;
  category: PartCategorySlug;
  subcategory: string;
  priceCAD: number;
  priceUSD: number;
  inStock: boolean;
  leadTimeDays: number | null;
  specifications: Record<string, string>;
  compatibility: string[];
  imageUrl: string;
  datasheetUrl: string;
  featured: boolean;
}

export interface InquiryBasketItem {
  itemType: 'robot' | 'part';
  itemId: string;
  itemName: string;
  quantity: number;
  price?: string;
}
