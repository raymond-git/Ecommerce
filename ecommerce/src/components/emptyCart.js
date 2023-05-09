import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="p-14 mt-28 flex flex-col items-center">
            <div>
                <h1 className="font-sans font-bold text-xl md:text-2xl text-center pb-6">SHOPPING CART</h1>
            </div>
            <div className="flex justify-center ">
                <svg className="w-20 lg:w-1/2 !important" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607L1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2a1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" /></svg>
            </div>
            <div>
                <h1 className="font-sans font-bold text-2xl md:text-3xl text-center pb-6 mt-8">Your Cart is Currently Empty!</h1>
            </div>
            <Link to={`/products`}><button type="button" className="btn btn-primary btn-lg rounded-3xl flex items-center lg:h-12 lg:btn-lg my-8 h-10">Return to Shop</button></Link>
        </div>
    );
}

export default EmptyCart;
