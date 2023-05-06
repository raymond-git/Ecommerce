import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";

const SelectedProduct = () => {

    const [allProducts, setAllProducts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setAllProducts(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [id])

    const handleRemoveButton = () => {

    }

    return (
        <div className="selectedProduct_background_color">
            <Navbar></Navbar>
            {allProducts && (
                <div className="selectedProduct_border_color rounded-xl lg-shadow p-8 mr-12 ml-12 lg:p-16 lg:mr-64 lg:ml-64 mt-20 md:mt-32 lg:mt-30">
                    <div className="lg:flex justify-between">
                        <div className="lg:flex justify-center items-center lg:w-1/3 ">
                            <img className="w-32 h-32 lg:w-48 lg:h-48 mx-auto" src={allProducts.image}></img>
                        </div>
                        <div className="lg:flex-1 lg:ml-6 lg:mb-10">
                            <h1 className="text-lg md:text-xl font-bold playfairFont mt-10 ">{allProducts.title}</h1>
                            <p className="text-sm md:text-base font-sans pt-4">{allProducts.description}</p>
                            <div className="flex justify-start mt-4">
                                <p className="text-base md:text-lg lg:text-xl robotoFont font-bold">Price: ${allProducts.price}</p>
                            </div>
                            <div>
                                <button className="btn btn-primary btn-lg btn-block font-sans h-10 flex items-center justify-center lg:h-12 lg:btn-lg lg:w-56 mt-4">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer></Footer>
        </div>
    )
}

export default SelectedProduct;