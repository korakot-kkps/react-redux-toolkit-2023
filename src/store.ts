import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./feature/productslice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
