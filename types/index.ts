export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: 'vegetables' | 'fruits' | 'grains' | 'dairy' | 'herbs' | 'pantry';
  images: string[];
  stock: number;
  unit: string;
  isOrganic: boolean;
  isFeatured: boolean;
  origin?: string;
  nutritionFacts?: string;
  rating: number;
  numReviews: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  unit: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  items: { product: string; name: string; quantity: number; price: number; image?: string }[];
  shippingAddress: Address;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface AuthUser {
  uid: string;
  name: string;
  email: string;
  role?: 'customer' | 'admin';
}

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertItem {
  id: string;
  type: AlertType;
  title?: string;
  message: string;
  duration: number;
}
