import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { addProduct, addCartCount, buttonChanges, totalPriceIncrementing } from "../redux/cartRedux"

const EcommerceHome = () => {
    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();
    const isClicked = useSelector(state => state.cart.buttonChanges);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => {
                setAllProducts(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const handleAddProduct = (userProduct, changeBtnColorBasedOnId) => {
        dispatch(addProduct({ itemProduct: userProduct, itemQuantity: 1 }));
        dispatch(addCartCount({ cartCount: 1 }));
        dispatch(totalPriceIncrementing({ itemPrice: userProduct.price, cartCount: 1 }));
        dispatch(buttonChanges({ changeColor: changeBtnColorBasedOnId }));
    };

    return (
        <div className="ecommerce_background_color">
            <Navbar></Navbar>
            {/* <div className="hidden sm:block" >
                <img className="w-full h-full object-fill" src="EcommerceBanner.png" alt="Ecommerce Banner" style={{ maxWidth: "100%" }} />
            </div> */}
            <h1 className="text-3xl md:text-4xl pl-16 mt-12 font-bold playfairFont">All Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-16">
                {allProducts.map((product, index) => (
                    <div key={index}>

                        <div className="ecommerce_border_color flex flex-col justify-between rounded-xl lg-shadow w-full h-full p-12">
                            <Link to={`/${product.id}`}>
                                <img className="w-28 h-28 lg:w-32 lg:h-32 mx-auto" src={product.image}></img>
                                <h1 className="text-base md:text-lg mt-10 playfairFont">{product.title} </h1>
                                <p className="text-base md:text-lg font-bold pt-4 price_color robotoFont">Price: ${product.price}</p>
                            </Link>
                            <div className="flex flex-col justify-center pt-8">
                                <button
                                    className="add_cart_button lg-shadow text-sm md:text-base playfairFont"
                                    style={{ backgroundColor: isClicked[product.id] ? "black" : "", color: isClicked[product.id] ? "white" : "" }}
                                    onClick={() => handleAddProduct(product, product.id)}
                                    disabled={isClicked[product.id]}
                                >
                                    {isClicked[product.id] ? "Added to Cart" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer></Footer>
        </div>
    )
}

export default EcommerceHome;






