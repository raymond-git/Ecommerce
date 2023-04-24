import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/navbar"
import { useDispatch } from "react-redux"
import { addProduct, addCartCount, totalPriceAdd, deleteProduct, removeAllProduct, itemCartCount } from "../redux/cartRedux"

const EcommerceHome = () => {
    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();

    const [isClicked, setisClicked] = useState(JSON.parse(localStorage.getItem("isClicked")) || {});

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => {
                setAllProducts(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    // const handleAddProduct = (userProduct, productID) => {
    //     dispatch(addProduct({ itemProduct: userProduct, itemCount: 1 }))
    //     dispatch(addCartCount({ cartCount: 1 }))
    //     dispatch(totalPriceAdd({ itemPrice: userProduct.price, cartCount: 1 }))
    //     setisClicked((prevState) => ({ ...prevState, [productID]: true })); //We want to have previous state to keep track of the clicked state
    //     localStorage.setItem("isClicked", JSON.stringify(setisClicked(isClicked)));
    // }
    const handleAddProduct = (userProduct, changeBtnColorBasedOnId) => {
        dispatch(addProduct({ itemProduct: userProduct, itemCount: 1 }));
        dispatch(addCartCount({ cartCount: 1 }));
        dispatch(totalPriceAdd({ itemPrice: userProduct.price, cartCount: 1 }));
        setisClicked(prevState => {
          const newState = { ...prevState, [changeBtnColorBasedOnId]: true };
          localStorage.setItem("isClicked", JSON.stringify(newState));
          return newState;
        });
      };
    

    return (
        <div>
            <Navbar></Navbar>
            <h1 className="text-5xl md:text-6xl pl-16 mt-20 font-semibold">Explore</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-16">
                {allProducts.map((product, index) => (
                    <div key={index}>
                        <div className="border lg-shadow w-full h-full p-12 flex flex-col justify-between">
                            <img className="w-44 h-44 mx-auto" src={product.image}></img>
                            <h1 className="text-xl md:text-2xl mt-10 font-sans">{product.title} </h1>
                            <p className="text-2xl md:text-3xl font-bold pt-4 font-sans price_color">Price: ${product.price} </p>
                            <div className="flex flex-col justify-center pt-8">
                                < button disabled={isClicked[product.id]}
                                    onClick={() => handleAddProduct(product, product.id)} className="add_cart_button lg-shadow text-base md:text-xl"
                                    style={{ backgroundColor: isClicked[product.id] ? "#888" : "" }}>
                                    {isClicked[product.id] ? "Added to Cart" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EcommerceHome;






