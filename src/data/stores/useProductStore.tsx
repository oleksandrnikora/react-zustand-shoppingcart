import { create } from 'zustand';
import { StoreItemProps } from '../../types/StoreItemProps';


type ProductStore = {
  products: StoreItemProps[];
  getProducts: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  getProducts: async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
   
    set({ products: data})
  },
  
}))

