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
      // const chosenItem = action.payload.itemProduct;

      // // Check if the item exist in the cart if yes increment by one for specific item
      // const checkExistent = state.products.findIndex((product) => product.id === chosenItem.id);
      // if (checkExistent >= 0) {
      //   // If the chosen item is already in the cart, find its index and increment its quantity by 1
      //   state.products[checkExistent].quantity += 1;
      // } else {
      //   // If the chosen item is not already in the cart, add it to the cart with a quantity of 1
      //   state.products.push({ ...chosenItem, quantity: action.payload.quantity });
      // }
      // // Increment quantity to cart regardless of what product you add

      state.quantity += 1;
      state.products.push(action.payload) //Each time we Add to Cart the item is pushed to products array
      state.totalPrice += action.payload.itemPrice * action.payload.quantity

    },
  },
});


// What this does is it collect all redux actions and a reducer function that handles those actions
// The cartSlice slice has one action creator defined, addProduct, which takes an itemProduct object 
// as a payload and adds it to the products array in the slice's state. The reducer function for the slice handles this action and updates the slice's state accordingly.

export const { addProduct } = cartSlice.actions
export default cartSlice.reducer;