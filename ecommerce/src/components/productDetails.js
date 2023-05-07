import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import { addProduct, addCartCount, buttonChanges, totalPriceIncrementing } from "../redux/cartRedux"
import { useDispatch } from "react-redux"

const ProductDetails = () => {

    const isClicked = useSelector(state => state.cart.buttonChanges);
    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();

    const handleAddProduct = (userProduct, changeBtnColorBasedOnId) => {
        dispatch(addProduct({ itemProduct: userProduct, itemQuantity: 1 }));
        dispatch(addCartCount({ cartCount: 1 }));
        dispatch(totalPriceIncrementing({ itemPrice: userProduct.price, cartCount: 1 }));
        dispatch(buttonChanges({ changeColor: changeBtnColorBasedOnId }));
    };

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setAllProducts(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [id])

    return (
        <div className="selectedProduct_background_color">
            <Navbar></Navbar>
            {allProducts && (
                <div className="selectedProduct_border_color rounded-xl lg-shadow p-8 mr-12 ml-12 lg:p-16 lg:mr-64 lg:ml-64 mt-20 md:mt-32 lg:mt-30">
                    <a href="/products" className="text-gray-500 font-bold hover:text-black flex items-center pr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-1" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="15 6 9 12 15 18" />
                        </svg>
                        Back
                    </a>
                    <div className="lg:flex justify-between">
                        <div className="lg:flex justify-center items-center lg:w-1/3 ">
                            <img className="w-32 h-32 lg:w-48 lg:h-48 mx-auto" src={allProducts.image}></img>
                        </div>
                        <div className="lg:flex-1 lg:ml-6 lg:mb-10">
                            <h1 className="playfairFont font-bold text-lg md:text-xl mt-10 ">{allProducts.title}</h1>
                            <p className="font-sans text-sm md:text-base pt-4">{allProducts.description}</p>
                            <div className="flex justify-start mt-4">
                                <p className="robotoFont font-bold text-base md:text-lg lg:text-xl">Price: ${allProducts.price}</p>
                            </div>
                            <div>
                                <button
                                    className="btn btn-primary btn-lg btn-block font-sans h-10 flex items-center justify-center lg:h-12 lg:btn-lg lg:w-56 mt-4"
                                    style={{ backgroundColor: isClicked[allProducts.id] ? "black" : "", color: isClicked[allProducts.id] ? "white" : "" }}
                                    onClick={() => handleAddProduct(allProducts, allProducts.id)}
                                    disabled={isClicked[allProducts.id]}
                                >
                                    {isClicked[allProducts.id] ? "Added to Cart" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer></Footer>
        </div>
    )
}

export default ProductDetails;