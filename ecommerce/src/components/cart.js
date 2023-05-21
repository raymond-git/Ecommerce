import Footer from "./footer"
import EmptyCart from "./emptyCart"
import Checkout from "./stripeCheckout"
import Navbar from "../components/navbar"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { totalPriceIncrementing, totalPriceDecrementing, increaseProductQuantity, decreaseProductQuantity, removeProduct, removeCartCount } from "../redux/cartRedux";

const Cart = () => {

    const [countChange, setCountChange] = useState("")

    //  viewCart contains the products that were added to the user's cart from product page
    //  cartCount tracks the total count of products in the cart, which is incremented or decremented each time a product is added or removed by the user.
    //  totalCartPrice is responsible for tracking the total cost of all the products that are currently in the shopping cart either through incrementing/decrementing or adding to cart.
    const viewCart = useSelector(state => state.cart.products);
    const cartCount = useSelector(state => state.cart.cartCount);
    const totalCartPrice = useSelector(state => Math.abs(state.cart.totalPrice.toFixed(2)));
    const dispatch = useDispatch();

    // Increase the quantity of the product and update the total price accordingly in shopping cart page
    const handleIncreaseCart = (increaseItemQuantity) => {
        dispatch(increaseProductQuantity({ id: increaseItemQuantity.itemProduct.id, itemQuantity: 1 }));
        dispatch(totalPriceIncrementing({ id: increaseItemQuantity.itemProduct.id, itemPrice: increaseItemQuantity.itemProduct.price, itemQuantity: 1, cartCount: 1 }));
    };

    // Reduce the quantity of the product and update the total price accordingly in shopping cart page
    const handleDecreaseCart = (decreaseItemQuantity) => {
        dispatch(decreaseProductQuantity({ id: decreaseItemQuantity.itemProduct.id, itemQuantity: 1 }));
        dispatch(totalPriceDecrementing({ id: decreaseItemQuantity.itemProduct.id, itemPrice: decreaseItemQuantity.itemProduct.price, itemQuantity: 1, cartCount: 1 }));
    }

    // Remove product from cart and cart count should be decremented accordingly in shopping cart page
    const handleRemoveButton = (deleteProduct) => {
        dispatch(removeProduct({ id: deleteProduct.itemProduct.id }));
        dispatch(removeCartCount({ cartCount: 1 }));
    }

    // keeps track of the user input and changes the state accordingly.
    const handleIncrementDecrentChange = (event) => {
        setCountChange(event.target.value);
    }

    return (
        <div className="shopping_cart_background_color">
            <Navbar></Navbar>
            {cartCount === 0 ? <EmptyCart /> :
                <div className="mobile-responsive-cart p-14">
                    <h1 className="text-2xl md:text-3xl font-bold playfairFont pb-6">Shopping Cart: {cartCount} items</h1>
                    <div className="lg:flex justify-between gap-8">
                        <div>
                            {viewCart.map((cartItem, index) => (
                                <div key={index}>
                                    <div className="mobile-responsive-details shopping_cart_border_color rounded-xl lg-shadow p-10 mb-8 lg:p-0">
                                        <div className="lg:flex justify-between lg:mr-20">
                                            <div className="lg:flex justify-center items-center lg:w-1/3">
                                                <img className="w-32 h-32 lg:w-36 lg:h-36 mx-auto" src={cartItem.itemProduct.image}></img>
                                            </div>
                                            <div className="lg:flex-1 lg:ml-6 lg:mb-10">
                                                <h1 className="mobile-responsive-font-title playfairFont font-bold text-base md:text-lg mt-10 ">{cartItem.itemProduct.title}</h1>
                                                <p className="mobile-responsive-font-description font-sans text-sm md:text-base leading-6 pt-4">{cartItem.itemProduct.description}</p>
                                                <div className="mobile-responsive-Quantitybutton flex justify-start mt-4">
                                                    <p className="mobile-responsive-font-price robotoFont text-base font-bold md:text-lg">Price: ${cartItem.itemProduct.price}</p>
                                                    <div key={index} className="quantity-count md:w-20 lg:w-20 lg:h-6 ml-4">
                                                        <button onClick={() => handleDecreaseCart(cartItem)} className="decrement-btn">-</button>
                                                        <input type="text" className="quantity-input" onChange={handleIncrementDecrentChange} value={cartItem.itemQuantity} />
                                                        <button onClick={() => handleIncreaseCart(cartItem)} className="increment-btn">+</button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4 pt-8">
                                                    <div className="icon-container">
                                                        <button onClick={() => handleRemoveButton(cartItem)} className="delete-button robotoFont p-2" style={{ outline: 'none' }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-3 px-0">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mobile-responsive-font-title mb-0">Summary</h5>
                                </div>
                                <div className="card-body flex flex-row align-items-center p-4">
                                    <h5 className="mobile-responsive-font-description text-sm lg:text-base font-sans">Don't miss out on savings! Enter promo code "PROMOTION1" for 20% off at checkout</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="mobile-responsive-font-description list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 font-sans text-sm lg:text-base">Subtotal
                                            <p className="mb-2">$ {totalCartPrice}</p>
                                        </li>
                                        <li className="mobile-responsive-font-description list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 font-sans text-sm lg:text-base">Delivery Charges
                                            <p className="mb-2 delivery_charges">Free</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0"></li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong className="mobile-responsive-font-description text-sm lg:text-base font-sans">Total amount</strong>
                                            </div>
                                            <span className="text-base font-bold text-gray-700 font-sans">$ {totalCartPrice}</span>
                                        </li>
                                    </ul>
                                    <Checkout/> {/* This code generates a button that utilizes the Stripe Checkout API for the payment process. */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer></Footer>
        </div>
    )
}

export default Cart;



