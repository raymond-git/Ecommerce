import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "productCart",
  initialState: {
    products: [],
    quantity: 0,
    totalPrice: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload) //Each time we Add to Cart the item is pushed to products array
      state.totalPrice += action.payload.itemPrice * action.payload.quantity
    },

    deleteProduct: (state, action) => {
      // product = [hat, scooter, umbrella, ball]; if userinput.id is not inside product array it should print [hat, scooter, umbrella]
      state.products = state.products.filter((product) => product.id !== action.payload.quantity);
      state.quantity -=1;
      state.totalPrice -= action.payload.itemPrice * action.payload.quantity;
    },

    removeAllProduct: (state, action) => {
      state.products = [];
      state.quantity = 0;
    }
  },
});


// What this does is it collect all redux actions and a reducer function that handles those actions
// The cartSlice slice has one action creator defined, addProduct, which takes an itemProduct object 
// as a payload and adds it to the products array in the slice's state. The reducer function for the slice handles this action and updates the slice's state accordingly.

export const { addProduct, deleteProduct, removeAllProduct } = cartSlice.actions
export default cartSlice.reducer;