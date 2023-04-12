import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import Navbar from "../components/navbar"
import { useSelector } from "react-redux"

const Cart = () => {
    const viewCart = useSelector(state => state.cart.products);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    console.log(viewCart);
    return (
        <div>
            <Navbar></Navbar>
            <div className="p-20">
                {viewCart.map((cartItem) => (
                    <div className="border lg-shadow w-full h-full p-6 flex flex-col justify-between">
                        <img className="w-44 h-44 mx-auto" src={cartItem.itemProduct.image}></img>
                        <h1 className="text-xl mt-10">Title: {cartItem.itemProduct.title} </h1>
                        <p>Price: {cartItem.itemProduct.price} </p>
                        <h3>Category: {cartItem.itemProduct.category} </h3>
                        <div className="pr-80 mx-auto flex justify-start gap-2">
                        </div>
                        <div className="flex flex-col justify-center pt-8">
                        </div>
                    </div>
                ))}
            </div>
            <p>{totalPrice}</p>
        </div>
    )
}

export default Cart;