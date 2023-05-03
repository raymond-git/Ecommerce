import Navbar from "../components/navbar"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { totalPriceIncrementing, totalPriceDecrementing, increaseProductQuantity, decreaseProductQuantity, removeProduct, removeCartCount, discountPercentage, discountedPrice, applyPromoCode } from "../redux/cartRedux";
import Payment from "./stripeCheckout"

const Cart = () => {

    const cartCount = useSelector(state => state.cart.cartCount);
    const viewCart = useSelector(state => state.cart.products);
    const totalCartPrice = useSelector(state => Math.abs(state.cart.totalPrice.toFixed(2)));
    const dispatch = useDispatch();

    const handleIncreaseCart = (increaseItemQuantity) => {
        dispatch(increaseProductQuantity({ id: increaseItemQuantity.itemProduct.id, itemQuantity: 1 })); // Total number of quantity of the specific item
        dispatch(totalPriceIncrementing({ id: increaseItemQuantity.itemProduct.id, itemPrice: increaseItemQuantity.itemProduct.price, itemQuantity: 1, cartCount: 1 }));
    };

    const handleDecreaseCart = (decreaseItemQuantity) => {
        dispatch(decreaseProductQuantity({ id: decreaseItemQuantity.itemProduct.id, itemQuantity: 1 }));
        dispatch(totalPriceDecrementing({ id: decreaseItemQuantity.itemProduct.id, itemPrice: decreaseItemQuantity.itemProduct.price, itemQuantity: 1, cartCount: 1 }));
    }

    const handleRemoveButton = (deleteProduct) => {
        dispatch(removeProduct({ id: deleteProduct.itemProduct.id }));
        dispatch(removeCartCount({ cartCount: 1 }));
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="p-14 shopping_cart_background_color">
                <h1 className="text-2xl md:text-3xl font-bold pb-6 font-sans">Shopping Cart: {cartCount} items</h1>

                <div className="lg:flex justify-between gap-8">
                    <div>
                        {viewCart.map((cartItem, index) => (
                            <div key={index}>
                                <div className="shopping_cart_border_color rounded-xl lg-shadow p-10 mb-8 lg:p-0">
                                    <div className="lg:flex justify-between lg:mr-20">
                                        <div className="lg:w-1/3 lg:flex justify-center items-center">
                                            <img className="w-32 h-32 lg:w-36 lg:h-36 mx-auto" src={cartItem.itemProduct.image}></img>
                                        </div>

                                        <div className="lg:flex-1 lg:ml-6 lg:mb-10">
                                            <h1 className="text-lg md:text-xl font-bold mt-10 font-sans">{cartItem.itemProduct.title} </h1>
                                            <p className="text-sm md:text-lg leading-6 pt-4 font-sans">{cartItem.itemProduct.description} </p>

                                            <div className="flex justify-start mt-4">
                                                <p className="text-base md:text-lg font-extrabold font-sans">Price: ${cartItem.itemProduct.price} </p>
                                                <div key={index} class="quantity-count md:w-20 lg:w-20 lg:h-6 ml-4">
                                                    <button onClick={() => handleDecreaseCart(cartItem)} class="decrement-btn">-</button>
                                                    <input type="text" class="quantity-input" value={cartItem.itemQuantity} />
                                                    <button onClick={() => handleIncreaseCart(cartItem)} class="increment-btn">+</button>
                                                </div>
                                            </div>
                                            <div className="pt-8 flex flex-col gap-4">
                                                <div class="icon-container">
                                                    <button onClick={() => handleRemoveButton(cartItem)} class="delete-button p-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
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

                    <div class="col-lg-3 px-0">
                        <div class="card mb-4">
                            <div class="card-header py-3">
                                <h5 class="mb-0">Summary</h5>
                            </div>
                            <div class="card-body p-4 flex flex-row align-items-center">
                                <h5 className="text-sm font-sans">Don't miss out on savings! Enter promo code "PROMOTION1" for 20% off at checkout</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 font-sans">
                                        Subtotal
                                        <p class="mb-2">$ {totalCartPrice}</p>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                        {/* Discount
                                        <div className="text-sm text-gray-400">(20%) {viewDiscount < 0 ? '-' : '-'} ${Math.abs(viewDiscount)}</div> */}
                                    </li>
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong className="font-sans">Total amount</strong>
                                        </div>
                                        {/* <span className="text-base font-bold text-gray-700">{promoCodeApplied ? (<div>${viewDiscountedFinal}</div>) : (<div>${totalCartPrice}</div>)}</span> */}
                                        <span className="text-base font-bold text-gray-700 font-sans">{totalCartPrice}</span>
                                    </li>
                                </ul>
                                <Payment />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart;



