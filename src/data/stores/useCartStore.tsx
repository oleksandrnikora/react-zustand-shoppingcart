import { create } from 'zustand';
import { CartItem } from '../../types/CartItem';
import { persist } from 'zustand/middleware';

type CartStore = {
  openCart: () => void;
  closeCart: () => void;
  carts: CartItem[];
  isOpen: boolean;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

export const useCartStore = create<CartStore>()(persist((set, get) => ({
  carts: [],
  isOpen: false,
  getItemQuantity: (id: number) => {
    const { carts } = get();

    return carts.find((item) => item.id === id)?.quantity || 0;
  },

  increaseCartQuantity: (id: number) => {
    const { carts } = get();
    const cartItem = carts.find((item) => item.id === id);

    if (cartItem == null) {
      const updateCart = [...carts, { id, quantity: 1 }];

      set({
        carts: updateCart,
      });
    } else {
      const updateCart = carts.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        } else {
          return item
        }
      });

      set({
        carts: updateCart,
      })
    }
  },

  decreaseCartQuantity: (id: number) => {
    const { carts } = get();
    const cartItem = carts.find((item) => item.id === id)?.quantity;

    if (cartItem === 1) {
      const updateCart = carts.filter(item => item.id !== id);

      set({
        carts: updateCart,
      });
    } else {
      const updateCart = carts.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity - 1}
        } else {
          return item
        }
      });

      set({
        carts: updateCart,
      })
    }
  },

  removeFromCart: (id: number) => {
    const { carts } = get();

    const updateCart = carts.filter(item => item.id !== id);

    set({
      carts: updateCart,
    })
  },

  openCart:() => {
    set({
      isOpen:true,
    })
  },

  closeCart:() => {
    set({
      isOpen:false,
    })
  },

}), {
  name: 'cart-storage', version: 1
}));

