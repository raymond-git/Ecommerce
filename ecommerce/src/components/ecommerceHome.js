import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/navbar"
import { useDispatch } from "react-redux"
import { addProduct, deleteProduct, removeAllProduct } from "../redux/cartRedux"
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
        dispatch(
            addProduct({
                itemProduct: userProduct,
                itemPrice: userProduct.price,
                quantity: 1
            }))
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-20">
                {allProducts.map((product) => (
                    <div key={product.id}>
                        <div className="border lg-shadow w-full h-full p-6 flex flex-col justify-between">
                            <img className="w-44 h-44 mx-auto" src={product.image}></img>
                            <h1 className="text-xl mt-10">Title: {product.title} </h1>
                            <p>Price: {product.price} </p>
                            <h3>Category: {product.category} </h3>
                            <div className="pr-80 mx-auto flex justify-start gap-2">
                            </div>
                            <div className="flex flex-col justify-center pt-8">
                                <button onClick={() => handleAddProduct(product)} className="lg-shadow border p-2">Add To Cart</button>
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