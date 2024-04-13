import { createSlice } from "@reduxjs/toolkit";

export const initialState = [
    {
      productName: '',
      quantity: 1,
      price: 0,
      id: 0,
    }
  ];
  
export const buySlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { productName, quantity, price, id } = action.payload;
      state.push({ productName, quantity, price, id});
    },
    removeProduct: (state, action) => {
      const { item } = action.payload;
      if (state.length >= 2) {
        state.splice(item, 1);
      }
    },
    addQuatity: (state, action) => { 
      const index  = action.payload;
      const indexInArray = state.findIndex((item) => item.id === index);
      state[indexInArray].quantity += 1

      
    },
    removeQuatity: (state, action) => {
      const index  = action.payload;
      const indexInArray = state.findIndex((item) => item.id === index);
      state[indexInArray].quantity -= 1
    }
  },
});

export const { addProduct, removeProduct, addQuatity,removeQuatity } = buySlice.actions;
export default buySlice.reducer;