import { useSelector } from 'react-redux'
import { BsCart3 } from "react-icons/bs"

const Navbar = () => {

    const cartProducts = useSelector(state => state.cart.quantity); //We are calling the "cart" from /redux/store.js
    console.log();

    return (
        <div className="flex justify-between py-6 p-20 bg-black">
            <img className="h-10" src="/logo192.png"></img>
            <h1 className="text-white text-2xl">Ecommerce Store</h1>
            <div className="relative">
                <BsCart3 className="text-white h-10 w-8 cursor-pointer" />
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm">{cartProducts}</div>
            </div>
        </div>
    )
}

export default Navbar;