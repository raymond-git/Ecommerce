import axios from "axios";

// Fetches all products from the FakeStoreAPI
export const fetchAllProducts = async () => {
    try {
        const products = axios.get("https://fakestoreapi.com/products")
        return products
    } catch (error) {
        console.error(error);
    }
}

// Fetches a specific product from the FakeStoreAPI based on its ID
export const fetchSingleProduct = async (id) => {
    try {
        const productDetails = axios.get(`https://fakestoreapi.com/products/${id}`)
        return productDetails
    } catch (error) {
        console.error(error);
    }
}