import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "productCart",
  initialState: {
    products: JSON.parse(localStorage.getItem('products')) || [],
    cartCount: JSON.parse(localStorage.getItem('cartCount')) || 0,
    itemQuantity: JSON.parse(localStorage.getItem('itemQuantity')) ?? 0,
    totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
    discount: JSON.parse(localStorage.getItem('discount')) || 0,
    discountedPrice: JSON.parse(localStorage.getItem('discountedPrice')) || 0,
    appliedPromoCode: JSON.parse(localStorage.getItem('appliedPromoCode')) || null,
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

    // Add the number value on the cart icon each time we add products
    addCartCount: (state, action) => {
      state.cartCount += action.payload.cartCount;
      localStorage.setItem("cartCount", JSON.stringify(state.cartCount));
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
      }
      localStorage.setItem('products', JSON.stringify(state.products));
      localStorage.setItem('itemQuantity', JSON.stringify(state.itemQuantity));
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
    },

    removeCartCount: (state, action) => {
      state.cartCount -= action.payload.cartCount;
      if (state.cartCount < 1) {
        state.cartCount = 0;
      }
      localStorage.setItem("cartCount", JSON.stringify(state.cartCount));
    },

    // Remove all products from the cart
    removeAllProduct: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.cartCount = 0;
      state.totalPrice = 0;
      state.itemQuantity = 0;
    },

    /**
     * Updates the total price and discount when a product is added to the cart.
     1 If the product already exists in the cart, the price is updated based on the itemQuantity.
     2 If it's a new product, the price is updated based on the cartCount.
     */
    totalPriceIncrementing: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);
      if (productToUpdate) { //1
        state.totalPrice = state.products.reduce((total, product) => {
          return total + (product.itemProduct.price * product.itemQuantity)
        }, 0);
      } else {
        state.totalPrice += action.payload.itemPrice * action.payload.cartCount; //2
      }

      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },

    totalPriceDecrementing: (state, action) => {
      const productToUpdate = state.products.find(product => product.itemProduct.id === action.payload.id);
      if (productToUpdate) {
        state.totalPrice = state.products.reduce((total, product) => {
          return total - (product.itemProduct.price * product.itemQuantity)
        }, 0);
      } else {
        state.totalPrice -= action.payload.itemPrice * action.payload.cartCount;
      }
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    buttonChanges: (state, action) => {
      state.buttonChanges[action.payload.changeColor] = true;
    },
  },
});

// What this does is it collect all redux actions and a reducer function that handles those actions
// The cartSlice slice has one action creator defined, addProduct, which takes an itemProduct object 
// as a payload and adds it to the products array in the slice's state. The reducer function for the slice handles this action and updates the slice's state accordingly.
export const { addProduct, addCartCount, increaseProductQuantity, decreaseProductQuantity, removeProduct, removeCartCount, removeAllProduct, totalPriceIncrementing, totalPriceDecrementing, discountPercentage, discountedPrice, applyPromoCode, buttonChanges } = cartSlice.actions
export default cartSlice.reducer;