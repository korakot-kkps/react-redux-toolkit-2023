import { createSlice, nanoid } from "@reduxjs/toolkit";
import { IProduct } from "../productslice";
import { IRootState } from "../../store";
import { useSelector } from "react-redux";

export interface ICartItems {
  id: number; //product id
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
  description: string;
}

interface ICart {
  cartItems: ICartItems[];
  id: number;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  isLoading: boolean;
  isFailed: boolean;
  error: string;
}

const initialState = {
  cartItems: [] as ICartItems[],
  totalQuantity: 0,
  // isLoading: false,
  // isFailed: false,
  // error: "",
} as ICart;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { payload } = action;
      const { id } = payload;
      let cpyCurrentCartItems = [...state.cartItems];
      const index = cpyCurrentCartItems.findIndex((i) => i.id === id);
      if (index === -1) {
        cpyCurrentCartItems.push({
          ...payload,
          quantity: 1,
        });
      } else {
        cpyCurrentCartItems[index].quantity =
          cpyCurrentCartItems[index].quantity + 1;
      }
      state.cartItems = cpyCurrentCartItems;
      state.totalQuantity++;
    },
    removeFromCart: (state, action) => {
      const { payload } = action;
      const { id } = payload;
      let updateCurrentCartItemsAfterRemove = [...state.cartItems];

      const indexOfRemovedItem = updateCurrentCartItemsAfterRemove.findIndex(
        (item) => item.id === id
      );

      if (indexOfRemovedItem > -1) {
        const { quantity } =
          updateCurrentCartItemsAfterRemove[indexOfRemovedItem];
        if (quantity > 1) {
          updateCurrentCartItemsAfterRemove[indexOfRemovedItem].quantity--;
        } else {
          updateCurrentCartItemsAfterRemove = updateCurrentCartItemsAfterRemove.filter(
            (item) => item.id !== id
          );
        }
        state.totalQuantity--;
      } 
      state.cartItems = updateCurrentCartItemsAfterRemove; 
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
