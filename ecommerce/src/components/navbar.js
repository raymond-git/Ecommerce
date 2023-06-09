import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { BsCart3 } from "react-icons/bs"
import { renderToString } from 'react-dom/server';
import { SiBattledotnet } from "react-icons/si"

const Navbar = () => {

    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(
        renderToString(<SiBattledotnet fill="#61DAFB" />)
    )}`;

    //We are calling the "cart" from /redux/store.js
    const cartCount = useSelector(state => state.cart.cartCount);
    return (
        <div className="mobile-responsive bg-black flex justify-between py-4 p-14">
            <Link to={'/products'}>
                <div className="flex justify-start">
                    <img className="cc h-8 lg:h-10" src={dataUrl}></img>
                    <h1 className=" text-white text-xl lg:text-2xl ml-3 flex items-center font-medium">ShopiCart</h1>
                </div>
            </Link>
            <div className="relative">
                <Link to={`/cart`}><BsCart3 className="text-white h-9 w-7 lg:h-10 lg:w-8 cursor-pointer" /></Link>
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-white text-sm">{cartCount}</div>
            </div>
        </div>
    )
}

export default Navbar;