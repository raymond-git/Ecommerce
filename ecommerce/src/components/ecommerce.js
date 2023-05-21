import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { addProduct, addCartCount, buttonChanges, totalPriceIncrementing } from "../redux/cartRedux"
import { fetchAllProducts } from "./api";
import Navbar from "./navbar"
import Footer from "./footer"

/**
 * Ecommerce.js:
 * Renders all products on the page and handles adding products to the cart. This file contain the main functionality for the Ecommerce page 
 * of the application. It fetches all products from the FakeStoreAPI. It also handles adding products to the cart and updating the cart count 
 * and total price.
 * 
 * Sub-components:
 *  - `Navbar`: renders the navigation bar at the top of the page
 *  - `Footer`: renders the footer at the bottom of the page
 * 
 * Redux managing cart page:
 *  - `addProduct`: adds a specific product to the cart page
 *  - `addCartCount`: increments the number of items in the cart
 *  - `totalPriceIncrementing`: updates the total price based on the number of items in the cart
 *  - `buttonChanges`: changes the button appearance to a darker, disabled mode to let the user know that it has already been clicked
 * @author Raymond Huang
 */
const Ecommerce = () => {

    const isClicked = useSelector(state => state.cart.buttonChanges);

    // Set up the `allProducts` state and fetch all products from the fake store API using `fetchAllProducts`
    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const getAllProducts = async () => {
            const products = await fetchAllProducts();
            console.log(products.data);
            setAllProducts(products.data);
        }
        getAllProducts();
    }, [])

    /**
      * Handles adding a product to the cart page and updating the cart count and total price.
      * @param {Object} userProduct - The product to be added to the cart.
      * @param {number} changeBtnColorBasedOnId - The ID of the product that was clicked, used to change the button appearance.
      */
    const handleAddProduct = (userProduct, changeBtnColorBasedOnId) => {
        dispatch(addProduct({ itemProduct: userProduct, itemQuantity: 1 }));
        dispatch(addCartCount({ cartCount: 1 }));
        dispatch(totalPriceIncrementing({ itemPrice: userProduct.price, cartCount: 1 }));
        dispatch(buttonChanges({ changeColor: changeBtnColorBasedOnId }));
    };

    return (
        <div className="ecommerce_background_color">
            <Navbar></Navbar>
            <h1 className="mobile-responsive-title-margin playfairFont font-bold text-3xl md:text-4xl pl-16 mt-12">All Products</h1>
            <div className="mobile-responsive-home grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-16">
                {allProducts.map((product, index) => (
                    <div key={index}>
                        <div className="ecommerce_border_color rounded-xl lg-shadow w-full h-full flex flex-col justify-between p-12">
                            <Link className="hover-product" to={`/${product.id}`}>
                                <img className="w-28 h-28 lg:w-32 lg:h-32 mx-auto" src={product.image} alt="product"></img>
                                <h1 className="mobile-responsive-font-ecommerce-title playfairFont text-base md:text-lg mt-10">{product.title} </h1>
                                <p className="mobile-responsive-font-price robotoFont font-bold text-base md:text-lg pt-4 price-color">Price: ${product.price}</p>
                            </Link>
                            <div className="flex flex-col justify-center pt-8">
                                <button
                                    className="mobile-responsive-button-addCart add_cart_button lg-shadow text-sm md:text-base playfairFont"
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






