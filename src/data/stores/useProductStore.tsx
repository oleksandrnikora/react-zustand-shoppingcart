import { create } from 'zustand';
import { StoreItemProps } from '../../types/StoreItemProps';


type ProductStore = {
  products: StoreItemProps[];
  getProducts: () => void;
  error: string;
  loading: boolean;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: '',
  getProducts: async () => {
    set({loading: true, error: ''})
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
   
      set({loading: false, products: data})
    } catch (err: unknown) {
      set({ error: String(err) })
    }
  },
  
}))

