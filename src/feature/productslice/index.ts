import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const data = [
//   {
//     name: "Product 1",
//     id: 1,
//   },
//   {
//     name: "Product 2",
//     id: 2,
//   },
//   {
//     name: "Product 3",
//     id: 3,
//   },
// ];

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
interface IProductState {
  isLoading: boolean;
  productList: IProduct[];
  error: string | undefined;
  isFailed: boolean;
}
const initialState = {
  productList: [] as IProduct[],
  isLoading: false,
  isFailed: false,
  error: "",
} as IProductState;

export const callProductListApi = createAsyncThunk(
  "/product/callproductlistapi",
  async (thunkAPI) => {
    try {
      const apiResponse = await fetch("https://dummyjson.com/products");
      const result = await apiResponse.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const callUpdateProductApi = createAsyncThunk(
  "/product/callupdateproductapi",
  async (thunkAPI) => {
    try {
      const apiResponse = await fetch("https://dummyjson.com/products/1", {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "iPhone Galaxy +11",
        }),
      });
      const result = await apiResponse.json();
      // console.log("callUpdateProductApi response");
      // console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  //name
  //initialstate
  //reducers
  //extrareducers
  name: "product",
  initialState,
  reducers: {
    // getProducts: (state) => {
    //   state.productList = data;
    // },
  },
  extraReducers: (builder) => {
    //pending state
    //fulfilled state
    //rejected state
    builder.addCase(callProductListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(callProductListApi.fulfilled, (state, action) => {
      // console.log(action);
      const { payload } = action;
      const { products } = payload;
      state.isLoading = false;
      state.productList = products;
    });
    builder.addCase(callProductListApi.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(callUpdateProductApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(callUpdateProductApi.fulfilled, (state, action) => {
      console.log("callUpdateProductApi");
      console.log(action);
      const { payload } = action;
      // const { products } = payload;
      state.isLoading = false; 
      //todo:korakot - update local state data *for example
      let updateItemIndex = state.productList.findIndex(x => x.id = payload.id);
      state.productList[updateItemIndex] = payload; 
    });
    builder.addCase(callUpdateProductApi.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

// export const { getProducts } = productSlice.actions;
export default productSlice.reducer;
