import { createSlice, findNonSerializableValue } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "productCart",
  initialState: {
    products: [],
    cartCount: 0,
    itemCount: 0,
    totalPrice: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload); //Each time we Add to Cart the item is pushed to products array
    },

    totalPrice: (state, action) => {
      state.totalPrice += action.payload.itemPrice * action.payload.cartCount;
    },

    totalCartCount: (state, action) => {
      state.cartCount += 1;
    },

    itemCartCount: (state, action) => {
      state.itemCount += 1;
    },

    // removeProduct: (state, action) => {
    //   const productToBeRemove = action.payload.id;
    //   state.products = state.products.filter((product) => product.id !== productToBeRemove);
    // },


    removeAllProduct: (state, action) => {
      state.products = [];
      state.quantity = 0;
    },
  },
});


// What this does is it collect all redux actions and a reducer function that handles those actions
// The cartSlice slice has one action creator defined, addProduct, which takes an itemProduct object 
// as a payload and adds it to the products array in the slice's state. The reducer function for the slice handles this action and updates the slice's state accordingly.

export const { addProduct, removeProduct, itemCartCount, totalCartCount, totalPrice, removeAllProduct } = cartSlice.actions
export default cartSlice.reducer;