import { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPrice: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; selectedPrice: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

export const initialCartState: CartState = {
  items: [],
  isOpen: false,
};