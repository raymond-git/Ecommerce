import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./components/ecommerceHome"
import Cart from "./components/cart";
import { Provider } from 'react-redux';
import store from './redux/store';
import Success from "./components/success"
import Fail from "./components/fail"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/product" element={<Homepage/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/success" element={<Success/>}></Route>
        <Route path="/fail" element={<Fail/>}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
