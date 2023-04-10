import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartRedux"

export default configureStore({
    reducer: {
        cart: cartReducer // We are storing all the global states from redux/cartRedux.js to here "cart"
    }
})