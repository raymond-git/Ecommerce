import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/navbar"
import { useDispatch } from "react-redux"
import { addProduct, totalCartCount, totalPrice, deleteProduct, removeAllProduct } from "../redux/cartRedux"
import { v4 as uuidv4 } from 'uuid';

const EcommerceHome = () => {
    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => {
                setAllProducts(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const handleAddProduct = (userProduct) => {
        dispatch(addProduct({ itemProduct: userProduct }))
        dispatch(totalCartCount({ cartCount: 1 }))
        dispatch(totalPrice({ itemPrice: userProduct.price, cartCount: 1 }))
    }


    // const handleRemoveProduct = (userProduct) => {
    //     dispatch(
    //         deleteProduct({
    //             itemProduct: userProduct,
    //             itemPrice: userProduct.price,
    //         }));
    // }


    // const handleRemoveAllProduct = (userProduct) => {
    //     dispatch(removeAllProduct(userProduct));
    // }

    return (
        <div>
            <Navbar></Navbar>
            <h1 className="text-5xl md:text-6xl pl-16 mt-20 font-semibold">Explore</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-16">
                {allProducts.map((product) => (
                    <div key={product.id}>
                        <div className="border lg-shadow w-full h-full p-12 flex flex-col justify-between">
                            <img className="w-44 h-44 mx-auto" src={product.image}></img>
                            <h1 className="text-xl md:text-2xl mt-10 font-sans">{product.title} </h1>
                            <p className="text-2xl md:text-3xl font-bold pt-4 font-sans price_color">Price: ${product.price} </p>
                            <div className="flex flex-col justify-center pt-8">
                                <button onClick={() => handleAddProduct(product)} className="add_cart_button lg-shadow text-base md:text-xl">Add To Cart</button>
                                {/* <button onClick={() => handleRemoveProduct(product.id)} className="lg-shadow border p-2">Delete Cart</button>
                                <button onClick={() => handleRemoveAllProduct(product)} className="lg-shadow border p-2">Remove Cart</button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EcommerceHome;