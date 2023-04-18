import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "productCart",
  initialState: {
    products: JSON.parse(localStorage.getItem('products')) || [],
    cartCount: JSON.parse(localStorage.getItem('cartCount')) || 0,
    itemCount: 0,
    totalPrice: 0,
  },

  reducers: {
    // Each time we add to Cart the item is pushed to products array
    addProduct: (state, action) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    //Increase the quantity count for specific product you select
    increaseItemCount: (state, action) => {
      const productToUpdate = state.products.find(prod => prod.itemProduct.id === action.payload.id);
      if (productToUpdate !== -1) {
        const itemCount = parseInt(action.payload.itemCount); // ensure itemCount is a number
        if (!isNaN(itemCount)) {
          productToUpdate.itemCount = (productToUpdate.itemCount || 1) + itemCount;
          state.itemCount = (state.itemCount || 0) + itemCount;
        }
      }
    },

    decreaseItemCount: (state, action) => {
      const productToUpdate = state.products.find(prod => prod.itemProduct.id ===action.payload.id);
      if(productToUpdate){
        const itemCount = parseInt(action.payload.itemCount);
        if(!isNaN(itemCount)){
          productToUpdate.itemCount = Math.max(0, (productToUpdate.itemCount || 1) - itemCount);
          state.itemCount = Math.max(0, (state.itemCount || 0) - itemCount)
        }
      }
    },

    // Total items in the shopping cart
    totalCartCount: (state, action) => {
      state.cartCount += action.payload.cartCount;
      localStorage.setItem("cartCount", JSON.stringify(state.cartCount));
    },

    // Total price in the shopping cart
    totalPrice: (state, action) => {
      if (action.payload.itemPrice) {
        state.totalPrice += action.payload.itemPrice * action.payload.cartCount;
      } else if (action.payload.itemPrice2) {
        state.totalPrice -= action.payload.itemPrice2 * action.payload.cartCount2;
      } else if (state.itemCount === 0) {
        state.totalPrice = 0;
      }
      console.log('totalPrice state itemCount:', state.itemCount);
      console.log('totalPrice state totalPrice before:', state.totalPrice);
      console.log('totalPrice state totalPrice after:', state.totalPrice);
    },
    

    // Remove product from shopping cart
    removeProduct: (state, action) => {
      const productToRemove = state.products.findIndex(product => product.itemProduct.id === action.payload.deleteProduct);
      if (productToRemove > -1) {
        const currentArray = [...state.products]; // Take the current array so that we can modify
        currentArray.splice(productToRemove, 1); // Remove one element from the updatedRemoveProduct starting at the index
        state.products = currentArray;
        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },

    // Remove shopping cart count after removing product from cart
    removeCartCount: (state, action) => {
      if (state.cartCount < 1) {
        state.cartCount = 0;
      } else {
        state.cartCount -= action.payload.cartCount
      }
      localStorage.setItem("cartCount", JSON.stringify(state.cartCount));
    },

    // Completely remove all product in the cart
    removeAllProduct: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.cartCount = 0;
      state.totalPrice = 0;
    },
  },
});

// What this does is it collect all redux actions and a reducer function that handles those actions
// The cartSlice slice has one action creator defined, addProduct, which takes an itemProduct object 
// as a payload and adds it to the products array in the slice's state. The reducer function for the slice handles this action and updates the slice's state accordingly.

export const { addProduct, removeProduct, removeCartCount, increaseItemCount, decreaseItemCount, totalCartCount, totalPrice, totalPriceDeduct, deductTotalPrice, removeAllProduct } = cartSlice.actions
export default cartSlice.reducer;