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
      const chosenItem = action.payload.itemProduct;

      //Check if the item exist in the cart if yes increment by one fpr specific item
      const checkExistent = state.products.findIndex((product) => product.id === chosenItem.id);
      if (checkExistent >= 0) {
        state.products[checkExistent].quantity += 1;
      } else {
        state.products.push({ ...chosenItem, quantity: action.payload.quantity });
      }

      state.quantity += action.payload.quantity
      state.totalPrice += action.payload.itemPrice

      //If the item does not exist in the cart increment by 1
    },
  },
});


// What this does is it collect all redux actions and a reducer function that handles those actions
// The cartSlice slice has one action creator defined, addProduct, which takes an itemProduct object 
// as a payload and adds it to the products array in the slice's state. The reducer function for the slice handles this action and updates the slice's state accordingly.

export const { addProduct } = cartSlice.actions
export default cartSlice.reducer;