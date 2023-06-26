import { createSlice } from "@reduxjs/toolkit";

//name
//initialstate
//reducers
//extrareducers

const data = [
  {
    name: "Product 1",
    id: 1,
  },
  {
    name: "Product 2",
    id: 2,
  },
  {
    name: "Product 3",
    id: 3,
  },
];

export interface Product {
  name: string;
  id: number;
}

const initialState = {
  productList: [] as Product[],
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.productList = data as Product[];
    },
  },
});

export const { getProducts } = productSlice.actions;
export default productSlice.reducer;
