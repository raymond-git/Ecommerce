import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "./navbar"
import Footer from "./footer"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { addProduct, addCartCount, buttonChanges, totalPriceIncrementing } from "../redux/cartRedux"

const Ecommerce = () => {

    const [allProducts, setAllProducts] = useState([]);
    const isClicked = useSelector(state => state.cart.buttonChanges);
    const dispatch = useDispatch();

    // Retrieves all the product data from a fake API. All Products:[ID, Title, Descriptions, Price]
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => {
                setAllProducts(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])


    // addProduct: Adds a specific product to the cart page
    // addCartCount: Increments the number of items in the cart
    // totalPriceIncrementing: Updates the total price based on the number of items in the cart
    // buttonChanges: Changes the button appearance to a darker, disabled mode to let the user know that it has already been clicked
    const handleAddProduct = (userProduct, changeBtnColorBasedOnId) => {
        dispatch(addProduct({ itemProduct: userProduct, itemQuantity: 1 }));
        dispatch(addCartCount({ cartCount: 1 }));
        dispatch(totalPriceIncrementing({ itemPrice: userProduct.price, cartCount: 1 }));
        dispatch(buttonChanges({ changeColor: changeBtnColorBasedOnId }));
    };

    return (
        <div className="ecommerce_background_color">
            <Navbar></Navbar>
            <h1 className="playfairFont font-bold text-3xl md:text-4xl pl-16 mt-12">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-16">
                {allProducts.map((product, index) => (
                    <div key={index}>
                        <div className="ecommerce_border_color rounded-xl lg-shadow w-full h-full flex flex-col justify-between p-12">
                            <Link className="hover-product" to={`/${product.id}`}>
                                <img className="w-28 h-28 lg:w-32 lg:h-32 mx-auto" src={product.image}></img>
                                <h1 className="playfairFont text-base md:text-lg mt-10">{product.title} </h1>
                                <p className="robotoFont font-bold text-base md:text-lg pt-4 price_color">Price: ${product.price}</p>
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

export default Ecommerce;






