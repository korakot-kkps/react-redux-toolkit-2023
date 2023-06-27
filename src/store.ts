import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./feature/productslice"; 
import cartReducer from "./feature/carslice"; 

const globalStore = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

export type IRootState = ReturnType<typeof globalStore.getState>;
export default globalStore;
