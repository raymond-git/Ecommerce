import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "productCart",
  initialState: {
    products: JSON.parse(localStorage.getItem('products')) || [],
    cartCount: JSON.parse(localStorage.getItem('cartCount')) || 0,
    itemQuantity: JSON.parse(localStorage.getItem('itemQuantity')) ?? 0,
    totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
    buttonChanges: JSON.parse(localStorage.getItem('buttonChanges')) || {},
  },

  reducers: {
    // Each time we add to Cart the item is pushed to products array
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.itemQuantity += action.payload.itemQuantity;
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("itemQuantity", JSON.stringify(state.itemQuantity));
    },

    increaseProductQuantity: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);
      if (productToUpdate) {
        productToUpdate.itemQuantity += action.payload.itemQuantity;
        state.itemQuantity += action.payload.itemQuantity;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("itemQuantity", JSON.stringify(state.itemQuantity));
    },

    decreaseProductQuantity: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);
      if (productToUpdate !== null && productToUpdate.itemQuantity > 0) {
        productToUpdate.itemQuantity -= action.payload.itemQuantity;
        state.itemQuantity -= action.payload.itemQuantity;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("itemQuantity", JSON.stringify(state.itemQuantity));
    },

    removeProduct: (state, action) => {
      const productToRemove = state.products.findIndex(product => product.itemProduct.id === action.payload.id);
      if (productToRemove > -1) {
        const currentArray = [...state.products];
        const modifyItem = currentArray.splice(productToRemove, 1)[0];
        state.products = currentArray;
        state.itemQuantity -= modifyItem.itemQuantity; // Update itemQuantity for removed product
        state.totalPrice = state.products.reduce((total, product) => {
          return total + (product.itemProduct.price * product.itemQuantity);
        }, 0); // Recalculate totalPrice based on remaining products
        localStorage.setItem('products', JSON.stringify(state.products));
        localStorage.setItem('itemQuantity', JSON.stringify(state.itemQuantity));
        localStorage.setItem('totalPrice', JSON.stringify(parseFloat(state.totalPrice.toFixed(2))));
      }
    },

    removeAllProduct: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.cartCount = 0;
      state.totalPrice = 0;
      state.itemQuantity = 0;
    },

    addCartCount: (state, action) => {
      state.cartCount += action.payload.cartCount;
      localStorage.setItem("cartCount", JSON.stringify(state.cartCount));
    },

    removeCartCount: (state, action) => {
      state.cartCount -= action.payload.cartCount;
      if (state.cartCount < 1) {
        state.cartCount = 0;
      }
      localStorage.setItem("cartCount", JSON.stringify(state.cartCount));
    },

    totalPriceIncrementing: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);

      if (productToUpdate) {
        state.totalPrice = state.products.reduce((total, product) => { //Cacluate the price based on itemQuantity
          return total + (product.itemProduct.price * product.itemQuantity)
        }, 0);
      } else {
        state.totalPrice += action.payload.itemPrice * action.payload.cartCount; //Calculate the price based on cartCount
      }
      localStorage.setItem("totalPrice", JSON.stringify(parseFloat(state.totalPrice.toFixed(2))));
    },

    totalPriceDecrementing: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);
      if (productToUpdate) {
        state.totalPrice = state.products.reduce((total, product) => { //Cacluate the price based on itemQuantity
          return total - (product.itemProduct.price * product.itemQuantity)
        }, 0);
      } else {
        state.totalPrice -= action.payload.itemPrice * action.payload.cartCount; //Calculate the price based on cartCount
      }
      localStorage.setItem("totalPrice", JSON.stringify(parseFloat(state.totalPrice.toFixed(2))));
    },

    buttonChanges: (state, action) => {
      state.buttonChanges[action.payload.changeColor] = true;
    },
  },
});

// What this does is it collect all redux actions and a reducer function that handles those actions
// The cartSlice slice has one action creator defined, addProduct, which takes an itemProduct object 
// as a payload and adds it to the products array in the slice's state. The reducer function for the slice handles this action and updates the slice's state accordingly.
export const { addProduct, removeProduct, removeCartCount, increaseProductQuantity, decreaseProductQuantity, addCartCount, totalPriceIncrementing, totalPriceDecrementing, removeAllProduct, buttonChanges } = cartSlice.actions
export default cartSlice.reducer;
