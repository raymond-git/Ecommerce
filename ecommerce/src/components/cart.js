import Navbar from "../components/navbar"
import { useDispatch, useSelector } from "react-redux"
import { incrementTotalPrice, totalPrice, totalCartCount } from "../redux/cartRedux";

const Cart = () => {
    const viewCart = useSelector(state => state.cart.products);
    const totalCartPrice = useSelector(state => state.cart.totalPrice);
    const updateTotalPrice = useSelector(state => state.cart.updateTotalPrice);
    const itemCount = useSelector(state => state.cart.increment);

    const dispatch = useDispatch();

    const incrementItem = (numberOfItem) => {
        dispatch(incrementTotalPrice({ previousTotal: totalCartPrice, updatedTotal: numberOfItem.price }));
    };
      

    return (
        <div>
            <Navbar></Navbar>
            <div className="p-20">
                <h1 className="text-5xl font-semibold pb-8">Shopping Cart</h1>
                {viewCart.map((cartItem) => (
                    <div key={cartItem.id}>
                        <div className="border lg-shadow w-full h-full p-20 mb-8">
                            <img className="w-44 h-44 mx-auto" src={cartItem.itemProduct.image}></img>
                            <h1 className="text-base md:text-xl font-bold mt-10 font-sans">{cartItem.itemProduct.title} </h1>
                            <p className="text-base md:text-lg font-sans pt-4">{cartItem.itemProduct.description} </p>
                            <p className="text-2xl font-extrabold pt-4 font-sans">Price: ${cartItem.itemProduct.price} </p>
                            <div className="pr-80 mx-auto flex justify-start gap-2"></div>
                            <div className="pt-12 flex flex-col">
                                <button className="lg-shadow text-xl remove_cart_button lg:w-72">Remove from Cart</button>


                                <div className="quantity">
                                    <a className="quantity__minus"><span>-</span></a>
                                    <p name="quantity" type="text" className="quantity__input" value="1"></p>
                                    <a className="quantity__plus" onClick={() => incrementItem(cartItem)}><span>+</span></a>
                                </div>





                            </div>
                        </div>
                    </div>

                ))}
            </div>
            <div className="border lg-shadow">
                <p>Total: {totalCartPrice}</p>
                <p>Total: {updateTotalPrice}</p>
            </div>

        </div>
    )
}

export default Cart;