import Navbar from "../components/navbar"
import { useSelector } from "react-redux"

const Cart = () => {
    const viewCart = useSelector(state => state.cart.products);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    // console.log(viewCart);
    return (
        <div>
            <Navbar></Navbar>
            <div className="p-20">
                <h1 className="text-5xl font-semibold pb-8">Shopping Cart</h1>
                {viewCart.map((cartItem) => (
                    <div className="border lg-shadow w-full h-full p-20 mb-8">
                        <img className="w-44 h-44 mx-auto" src={cartItem.itemProduct.image}></img>
                        <h1 className="text-2xl mt-10 font-sans">{cartItem.itemProduct.title} </h1>
                        <p className="text-2xl font-sans">{cartItem.itemProduct.description} </p>
                        <p className="text-2xl font-extrabold pt-4 font-sans">Price: ${cartItem.itemProduct.price} </p>
                        <div className="pr-80 mx-auto flex justify-start gap-2"></div>
                        <div className="pt-12 flex justify-start">
                            <button className="lg-shadow text-xl remove_cart_button">Remove from Cart</button>
                            <button className="lg-shadow border border-black border-opacity-100 ml-3 mb-5 mt-5 p-2">+</button>
                            <p className="mt-7 mr-2 ml-2">0</p>
                            <button className="lg-shadow border border-black  mb-5 mt-5 p-2.5">-</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border lg-shadow">
                <p>Total: {totalPrice}</p>
            </div>

        </div>
    )
}

export default Cart;