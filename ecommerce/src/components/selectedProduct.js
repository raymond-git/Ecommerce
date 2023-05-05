import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
        <div>
            {/* {allProducts.map((productInformation) => ( */}
                {/* <div key={productInformation.id}> */}
                {allProducts && (
                    <div>
                    <div>{allProducts.image}</div>
                    <div>{allProducts.title}</div>
                    <div>{allProducts.description}</div>
                    <div>{allProducts.price}</div>
                    {/* <div className="shopping_cart_border_color rounded-xl lg-shadow p-10 mb-8 lg:p-0">
                        <div className="lg:flex justify-between lg:mr-20">
                            <div className="lg:flex justify-center items-center lg:w-1/3">
                                <img className="w-32 h-32 lg:w-36 lg:h-36 mx-auto" src={productInformation.itemProduct.image}></img>
                            </div>
                            <div className="lg:flex-1 lg:ml-6 lg:mb-10">
                                <h1 className="text-lg md:text-xl font-bold playfairFont mt-10 ">{productInformation.itemProduct.title}</h1>
                                <p className="text-sm md:text-base font-sans leading-6 pt-4">{productInformation.itemProduct.description}</p>
                                <div className="flex justify-start mt-4">
                                    <p className="text-base md:text-lg robotoFont font-bold">Price: ${productInformation.itemProduct.price}</p>

                                </div>
                                <div className="flex flex-col gap-4 pt-8">
                                    <div className="icon-container">
                                        <button onClick={() => handleRemoveButton(productInformation)} className="delete-button robotoFont p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                            </svg>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                 )}
               {/* ))}  */}
        </div>
    )
}

export default SelectedProduct;