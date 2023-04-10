import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/navbar"
import { useDispatch } from "react-redux"
import { addProduct } from "../redux/cartRedux"

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
        // allProducts = [hat id=1, bat id=2, mat id=3]
        // if selectedProduct is equal handleAddProduct(hat id=1)
        const selectedProduct = allProducts.find((findSpecificItem) => findSpecificItem.id === userProduct);
        if (selectedProduct) {
            dispatch(
                addProduct({
                    itemProduct: selectedProduct,
                    itemPrice: selectedProduct.price,
                    quantity: 1
                }))
        }
    }

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
                            <div className="flex flex-col justify-center">
                                <button onClick={() => handleAddProduct(product.id)} className="lg-shadow border p-2">Add To Cart</button>
                            </div>
                        </div>
                        <p>Cart Count: {} </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EcommerceHome;