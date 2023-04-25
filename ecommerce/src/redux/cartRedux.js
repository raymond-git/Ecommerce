import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "productCart",
  initialState: {
    products: JSON.parse(localStorage.getItem('products')) || [],
    cartCount: JSON.parse(localStorage.getItem('cartCount')) || 0,
    itemCount: JSON.parse(localStorage.getItem('itemCount')) ?? 0,
    totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
    buttonChanges:JSON.parse(localStorage.getItem('buttonChanges')) || {},
  },

  reducers: {
    // Each time we add to Cart the item is pushed to products array
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.itemCount += action.payload.itemCount;
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("itemCount", JSON.stringify(state.itemCount));
    },

    buttonChanges: (state, action) => {
      state.buttonChanges[action.payload.changeColor] = true;
      //localStorage.setItem("buttonChanges", JSON.stringify(state.buttonChanges));
    },

    increaseItemCount: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);
      if (productToUpdate) {
        productToUpdate.itemCount += action.payload.itemCount;
        state.itemCount += action.payload.itemCount;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("itemCount", JSON.stringify(state.itemCount));
    },

    decreaseItemCount: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);
      if (productToUpdate !== null && productToUpdate.itemCount > 0) {
        productToUpdate.itemCount -= action.payload.itemCount;
        state.itemCount -= action.payload.itemCount;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("itemCount", JSON.stringify(state.itemCount));
    },

    removeProduct: (state, action) => {
      const productToRemove = state.products.findIndex(product => product.itemProduct.id === action.payload.id);
      if (productToRemove > -1) {
        const currentArray = [...state.products];
        const modifyItem = currentArray.splice(productToRemove, 1)[0];
        state.products = currentArray;

        // Update itemCount for removed product
        state.itemCount -= modifyItem.itemCount;
        localStorage.setItem('products', JSON.stringify(state.products));
        localStorage.setItem('itemCount', JSON.stringify(state.itemCount));
      }
    },

    removeAllProduct: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.cartCount = 0;
      state.totalPrice = 0;
      state.itemCount = 0;
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

    totalPriceAdd: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);

      if (productToUpdate) {
        const price = state.products.reduce((total, product) => { //Cacluate the price based on itemCount
          return total + (product.itemProduct.price * product.itemCount)
        }, 0);
        state.totalPrice = price;
      } else {
        state.totalPrice += action.payload.itemPrice * action.payload.cartCount; //Calculate the price based on cartCount
      }
      localStorage.setItem("totalPrice", JSON.stringify(parseFloat(state.totalPrice.toFixed(2))));
    },
  
    totalPriceRemove: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);
      if (productToUpdate) {
        const price = state.products.reduce((total, product) => { //Cacluate the price based on itemCount
          return total - (product.itemProduct.price * product.itemCount)
        }, 0);
        state.totalPrice = price;
      } else {
        state.totalPrice -= action.payload.itemPrice * action.payload.cartCount; //Calculate the price based on cartCount
      }
      localStorage.setItem("totalPrice", JSON.stringify(parseFloat(state.totalPrice.toFixed(2))));
    },
  },
});

// What this does is it collect all redux actions and a reducer function that handles those actions
// The cartSlice slice has one action creator defined, addProduct, which takes an itemProduct object 
// as a payload and adds it to the products array in the slice's state. The reducer function for the slice handles this action and updates the slice's state accordingly.
export const { addProduct, buttonChanges, buttonChanges2, removeProduct, removeCartCount, increaseItemCount, decreaseItemCount, addCartCount, totalPriceAdd, totalPriceRemove, totalPriceDeduct, deductTotalPrice, removeAllProduct } = cartSlice.actions
export default cartSlice.reducer;
