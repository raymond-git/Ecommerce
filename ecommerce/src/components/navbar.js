import { useSelector } from 'react-redux'
import { BsCart3 } from "react-icons/bs"
import { Link } from "react-router-dom";

const Navbar = () => {
    const cartProducts = useSelector(state => state.cart.cartCount); //We are calling the "cart" from /redux/store.js
    return (
        <div className="flex justify-between py-6 p-16 bg-black">
            <div className='flex justify-start'>
                <img className="h-10" src="/logo192.png"></img>
                <h1 className='text-white text-2xl ml-4'>CloudCart</h1>
            </div>
            <div className="relative">
                <Link to={`/cart`}><BsCart3 className="text-white h-10 w-8 cursor-pointer" /></Link>
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm">{cartProducts}</div>
            </div>
        </div>
    )
}

export default Navbar;