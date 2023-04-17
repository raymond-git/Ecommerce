import Navbar from "../components/navbar"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { totalPrice, removeProduct, removeCartCount, itemCartCount, totalCartCount } from "../redux/cartRedux";

const Cart = () => {

    const viewCart = useSelector(state => state.cart.products);
    const totalCartPrice = useSelector(state => '$' + state.cart.totalPrice.toFixed(2));
    const dispatch = useDispatch();

    const handleIncreaseCart = (numberOfItem) => {
        dispatch(itemCartCount({ id: numberOfItem.itemProduct.id, itemCount: 1 })) // Total number of quantity of the specific item
        dispatch(totalPrice({ itemPrice: numberOfItem.itemProduct.price, cartCount: 1 })); // Total price of all products in shopping cart
    };

    const handleRemoveButton = (deleteProduct) => {
        dispatch(removeProduct({ deleteProduct }));
        dispatch(removeCartCount({ cartCount: 1 }));
        // dispatch(deductTotalPrice({ itemPrice: deleteProduct.itemProduct.price, cartCount: 1 }))
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="p-20">
                <h1 className="text-5xl font-semibold pb-8">Shopping Cart</h1>
                {viewCart.map((cartItem, index) => (
                    <div key={index}>
                        <div className="border lg-shadow w-full h-full p-20 mb-8">
                            <img className="w-44 h-44 mx-auto" src={cartItem.itemProduct.image}></img>
                            <h1 className="text-base md:text-xl font-bold mt-10 font-sans">{cartItem.itemProduct.title} </h1>
                            <p className="text-base md:text-lg font-sans pt-4">{cartItem.itemProduct.description} </p>
                            <p className="text-2xl font-extrabold pt-4 font-sans">Price: ${cartItem.itemProduct.price} </p>
                            <div className="pr-80 mx-auto flex justify-start gap-2"></div>
                            <div className="pt-12 flex flex-col">
                                <button className="lg-shadow text-xl remove_cart_button lg:w-72" onClick={() => handleRemoveButton(cartItem.itemProduct.id)}>Remove from Cart</button>


                                <div key={index} className="quantity">
                                    <a className="quantity__minus"><span>-</span></a>
                                    <p name="quantity" type="text" className="quantity__input">{cartItem.itemCount}</p>
                                    <a className="quantity__plus" onClick={() => handleIncreaseCart(cartItem)}><span>+</span></a>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border lg-shadow">
                <p>Total: {totalCartPrice}</p>
            </div>

        </div>
    )
}

export default Cart;