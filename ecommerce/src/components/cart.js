import Navbar from "../components/navbar"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { totalPriceIncrementing, totalPriceDecrementing, increaseProductQuantity, decreaseProductQuantity, removeProduct, removeCartCount, discountPercentage, discountedPrice, applyPromoCode } from "../redux/cartRedux";

const Cart = () => {

    const [userInput, setUserInput] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);

    const viewCart = useSelector(state => state.cart.products);
    const viewDiscount = useSelector(state => state.cart.discount);
    const viewDiscountedFinal = useSelector(state => state.cart.discountedPrice);
    const totalCartPrice = useSelector(state => state.cart.totalPrice.toFixed(2));
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
            setDiscountApplied(true)
        } else {
            setDiscountApplied(false);
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
            {/* p-20 */}
            <div className="p-14 shopping_cart_background_color">
                <h1 className="text-3xl md:text-4xl font-bold pb-16 mt-6 font-merriweather">Shopping Cart</h1>
                {viewCart.map((cartItem, index) => (
                    <div key={index}>
                        <div className="shopping_cart_border_color rounded-xl lg-shadow w-full h-full p-10 mb-8">
                            <img className="w-44 h-44 mx-auto" src={cartItem.itemProduct.image}></img>
                            <h1 className="text-lg md:text-xl font-bold mt-10 font-merriweather">{cartItem.itemProduct.title} </h1>
                            <p className="text-sm md:text-lg leading-6 pt-4 ">{cartItem.itemProduct.description} </p>
                            <p className="text-base md:text-lg font-extrabold pt-4 font-merriweather">Price: ${cartItem.itemProduct.price} </p>
                            <div className="pt-8 flex flex-col gap-4">
                                <button className="lg-shadow text-sm md:text-base remove_cart_button lg:w-60 lg:h-12 font-merriweather" onClick={() => handleRemoveButton(cartItem)}>Remove from Cart</button>


                                <div key={index} className="quantity">
                                    <a className="quantity__minus" onClick={() => handleDecreaseCart(cartItem)}><span>-</span></a>
                                    <input name="quantity" type="text" className="quantity__input" value={cartItem.itemQuantity} />
                                    <a className="quantity__plus" onClick={() => handleIncreaseCart(cartItem)}><span>+</span></a>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

                <div className="promocode_border_color rounded-xl lg-shadow w-full h-full p-10 mb-8">
                    <div className="flex justify-center">
                        <input type="text" value={userInput} onChange={userPromoCode} className="promocode_placeholder text-sm font-merriweather" placeholder="type anything promocode" />
                        <button onClick={() => handleDiscountandTotal(totalCartPrice)} className="bg-black text-white text-xs font-merriweather px-8">Apply</button>
                    </div>
                    <p className="text-xs mt-2 text-gray-400">20% off discount</p>
                    <div className="border-2 mt-8"></div>
                    <div className="flex justify-between mt-8">
                        <div>Subtotal:</div>
                        <div>$ {totalCartPrice}</div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div id="calculate_discount">Discount:</div>
                        <div>$ {viewDiscount}</div>
                    </div>
                    <div className="border-2 mt-8"></div>
                    <div className="flex justify-between mt-4">
                        <div>Total:</div>
                        {discountApplied ? (
                            <div>{viewDiscountedFinal}</div>
                        ) : (
                            <div>{totalCartPrice}</div>
                        )}

                        {/* {viewDiscountedFinal > 0 ? (
                            <div>{viewDiscountedFinal}</div>
                        ) : (
                            <div>{totalCartPrice}</div>
                        )} */}

                    </div>
                </div>
            </div>

            <div className="border lg-shadow">
                <p>Total: {totalCartPrice}</p>
            </div>
        </div>
    )
}

export default Cart;



