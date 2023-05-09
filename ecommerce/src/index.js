import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Products from "./components/ecommerce"
import Cart from "./components/cart";
import { Provider } from 'react-redux';
import store from './redux/store';
import PaymentSuccessful from "./components/paymentSuccessful"
import PaymentUnsuccessful from "./components/paymentUnsuccessful"
import ProductDetails from "./components/productDetails";
import LandingPage from './components/landingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/products" element={<Products/>}></Route>
        <Route path="/:id" element={<ProductDetails/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/payment-success" element={<PaymentSuccessful/>}></Route>
        <Route path="/payment-error" element={<PaymentUnsuccessful/>}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
