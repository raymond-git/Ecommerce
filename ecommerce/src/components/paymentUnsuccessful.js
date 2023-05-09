import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { renderToString } from "react-dom/server";
import { MdOutlineDisabledByDefault } from "react-icons/md"

const PaymentUnsuccessful = () => {

    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(
        renderToString(<MdOutlineDisabledByDefault fill="rgb(185 28 28)" />)
    )}`;

    // If you encountered a payment error, simply click the 'View Checkout' button to return to the checkout page.
    const viewCart = useSelector(state => state.cart.products);
    const handleCheckout = (event) => {
        event.preventDefault();
        fetch("/create-checkout-session", {
            method: "POST",
            body: JSON.stringify({
                items: viewCart,
            }),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(({ url }) => window.location = url)
            .catch(console.error);
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="mt-20">
                <div className="flex flex-col items-center gap-20">
                    <img className="h-40" src={dataUrl}></img>
                    <h1 className="font-sans font-bold text-4xl payment-unsuccessful-text-color">Payment was Unsuccessful</h1>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col items-center gap-8">
                        <p className="text-2xl font-medium">We're here to help.</p>
                        <p className="">We apologize for the inconvenience. Please check your payment details and contact us for assistance. Thank you for your patience and understanding. </p>
                        <div className="flex justify-between gap-8">
                            <Link to={`/products`}><button className="btn btn-primary btn-lg btn-block font-sans h-10 flex items-center justify-center lg:h-12 lg:btn-lg lg:w-56 mt-4 rounded-3xl">Shopping Page</button></Link>
                            <button onClick={handleCheckout} className="btn btn-primary btn-lg btn-block font-sans h-10 flex items-center justify-center lg:h-12 lg:btn-lg lg:w-56 mt-4 rounded-3xl">View Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>)
}

export default PaymentUnsuccessful;