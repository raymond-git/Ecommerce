import Navbar from "../components/navbar"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { totalPriceIncrementing, totalPriceDecrementing, increaseProductQuantity, decreaseProductQuantity, removeProduct, removeCartCount, discountPercentage, discountedPrice, applyPromoCode } from "../redux/cartRedux";
import Payment from "../components/payment"

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

                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-header py-3">
                            <h5 class="mb-0">Summary</h5>
                        </div>
                        <div class="card-body p-4 flex flex-row align-items-center">
                            <input value={userInput} onChange={userPromoCode} type="text" id="form1" placeholder="Discount code" class="form-control h-10" />
                            <button onClick={() => handleDiscountandTotal(totalCartPrice)} type="button" class="discount_apply_button btn  h-9" style={{ fontSize: '14px', padding: '0.375rem 1rem' }}>Apply</button>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Subtotal
                                    <p class="mb-2">$ {totalCartPrice}</p>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Discount
                                    <div className="text-sm text-gray-400">(20%) {viewDiscount < 0 ? '-' : '-'} ${Math.abs(viewDiscount)}</div>
                                </li>
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>Total amount</strong>
                                    </div>
                                    <span className="text-base font-bold text-gray-700">{promoCodeApplied ? (<div>${viewDiscountedFinal}</div>) : (<div>${totalCartPrice}</div>)}</span>
                                </li>
                            </ul>
                            <Payment />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;



