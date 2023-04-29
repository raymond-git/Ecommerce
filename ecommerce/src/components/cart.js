import Navbar from "../components/navbar"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { totalPriceIncrementing, totalPriceDecrementing, increaseProductQuantity, decreaseProductQuantity, removeProduct, removeCartCount, discountPercentage, discountedPrice, applyPromoCode } from "../redux/cartRedux";
import PaymentForm from "../components/paymentForm"

const Cart = () => {

    const [userInput, setUserInput] = useState('');

    const viewCart = useSelector(state => state.cart.products);
    const viewDiscount = useSelector(state => state.cart.discount);
    const promoCodeApplied = useSelector(state => state.cart.appliedPromoCode);
    const viewDiscountedFinal = useSelector(state => Math.abs(state.cart.discountedPrice));
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

    const userPromoCode = (event) => {
        setUserInput(event.target.value);
        dispatch(applyPromoCode({ userinput: userInput }))
    }

    const calculateDiscountedPrice = (totalPrice) => {
        if (userInput !== '') {
            dispatch(discountPercentage({ calculateDiscount: totalPrice }));
        }
    };

    const handleDiscountAndFinalPrice = (totalPrice) => {
        if (userInput !== '') {
            dispatch(discountedPrice({ finalDiscountedPrice: totalPrice }));
        }
    }

    const handleDiscountandTotal = (totalPrice) => {
        calculateDiscountedPrice(totalPrice)
        handleDiscountAndFinalPrice(totalPrice);
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="p-14 shopping_cart_background_color">
                <h1 className="text-3xl md:text-4xl font-bold pb-16 mt-6 font-merriweather">Shopping Cart</h1>
                {viewCart.map((cartItem, index) => (
                    <div key={index}>
                        <div className="shopping_cart_border_color rounded-xl lg-shadow w-full h-full p-10 mb-8">
                            <img className="w-44 h-44 mx-auto" src={cartItem.itemProduct.image}></img>
                            <h1 className="text-lg md:text-xl font-bold mt-10 font-merriweather ">{cartItem.itemProduct.title} </h1>
                            <p className="text-sm md:text-lg leading-6 pt-4 ">{cartItem.itemProduct.description} </p>

                            <div className="flex justify-start mt-4">
                                <p className="text-base md:text-lg font-extrabold font-merriweather">Price: ${cartItem.itemProduct.price} </p>
                                <div key={index} class="quantity-count md:w-20 lg:w-20 lg:h-6 ml-4">
                                    <button onClick={() => handleDecreaseCart(cartItem)} class="decrement-btn">-</button>
                                    <input type="text" class="quantity-input" value={cartItem.itemQuantity} />
                                    <button onClick={() => handleIncreaseCart(cartItem)} class="increment-btn">+</button>
                                </div>
                            </div>
                            <div className="pt-8 flex flex-col gap-4">
                                <button className="lg-shadow text-sm md:text-base remove_cart_button h-10 lg:w-60 lg:h-12 font-merriweather" onClick={() => handleRemoveButton(cartItem)}>Remove from Cart</button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="promocode_border_color rounded-xl lg-shadow w-full h-full p-10 mb-8">
                    <div className="flex justify-start">
                        <input type="text" value={userInput} onChange={userPromoCode} className="promocode_placeholder text-sm font-merriweather" placeholder=" Promocode type any" />
                        <button onClick={() => handleDiscountandTotal(totalCartPrice)} className="bg-black text-white text-xs font-merriweather px-8">Apply</button>
                    </div>
                    <p className="text-sm mt-2 text-gray-400 font-merriweather">20% off discount</p>
                    <div className="border mt-6"></div>
                    <div className="flex justify-between mt-4">
                        <div className="text-base font-bold font-merriweather text-gray-700">Subtotal:</div>
                        <span className="text-base font-bold text-gray-700"><div>$ {totalCartPrice}</div></span>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div className="text-sm text-gray-400 font-merriweather">Discount:</div>
                        <div className="text-sm text-gray-400">(20%) {viewDiscount < 0 ? '-' : '-'} ${Math.abs(viewDiscount)}</div>
                    </div>
                    <div className="border mt-8"></div>
                    <div className="flex justify-between mt-4">
                        <div className="text-base font-bold font-merriweather text-gray-700">Total:</div>
                        <span className="text-base font-bold text-gray-700">{promoCodeApplied ? (<div>${viewDiscountedFinal}</div>) : (<div>${totalCartPrice}</div>)}</span>
                    </div>
                    <div className="pt-8 flex flex-col gap-4 justify-end md:flex-col md:justify-end lg:flex-row lg:justify-end">
                        <button className="lg-shadow text-sm md:text-base payment_button h-10 lg:w-60 lg:h-12 font-merriweather">Complete Payment</button>
                    </div>
                </div>



                <div class="col-lg-5">
                    <div class="card bg-primary text-white rounded-3">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 class="mb-0">Card details</h5>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                    class="img-fluid rounded-3" style={{ width: 45 }} alt="Avatar" />
                            </div>

                            <p class="small mb-2">Card type</p>
                            <a href="#!" type="submit" class="text-white"><i
                                class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                            <a href="#!" type="submit" class="text-white"><i
                                class="fab fa-cc-visa fa-2x me-2"></i></a>
                            <a href="#!" type="submit" class="text-white"><i
                                class="fab fa-cc-amex fa-2x me-2"></i></a>
                            <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x"></i></a>

                            <form class="mt-4">
                                <div class="form-outline form-white mb-4">
                                    <input type="text" id="typeName" class="form-control form-control-lg text-base lg:text-lg" siez="17"
                                        placeholder="Cardholder's Name" />
                                    <label class="form-label text-sm lg:text-lg" for="typeName">Cardholder's Name</label>
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <input type="text" id="typeText" class="form-control form-control-lg text-base lg:text-lg" siez="17"
                                        placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" />
                                    <label class="form-label text-sm lg:text-lg" for="typeText">Card Number</label>
                                </div>

                                <div class="row mb-4">
                                    <div class="col-md-6">
                                        <div class="form-outline form-white">
                                            <input type="text" id="typeExp" class="form-control form-control-lg text-base lg:text-lg"
                                                placeholder="MM/YYYY" size="7" minlength="7" maxlength="7" />
                                            <label class="form-label text-sm lg:text-lg" for="typeExp">Expiration</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-outline form-white">
                                            <input type="password" id="typeText" class="form-control form-control-lg text-base lg:text-lg"
                                                placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                                            <label class="form-label text-sm lg:text-lg" for="typeText">Cvv</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <hr class="my-4" />
                            <div class="d-flex justify-content-between">
                                <p class="mb-2">Subtotal</p>
                                <p class="mb-2">$4798.00</p>
                            </div>

                            <div class="d-flex justify-content-between">
                                <p class="mb-2">Shipping</p>
                                <p class="mb-2">$20.00</p>
                            </div>

                            <div class="d-flex justify-content-between mb-4">
                                <p class="mb-2">Total(Incl. taxes)</p>
                                <p class="mb-2">$4818.00</p>
                            </div>

                            <button type="button" class="btn btn-info btn-block btn-lg">
                                <div class="d-flex justify-content-between">
                                    <span>$4818.00</span>
                                    <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                                </div>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;



