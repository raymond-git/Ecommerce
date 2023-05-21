import Navbar from "./navbar";
import Footer from "./footer";
import { renderToString } from 'react-dom/server';
import { BsFillBagCheckFill } from "react-icons/bs";
const PaymentSuccessful = () => {
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(
        renderToString(<BsFillBagCheckFill fill="#4285f4" />)
    )}`;

    setTimeout(function () {
        window.location = '/products';
    }, 5000);

    return (
        <div>
            <Navbar></Navbar>
            <div className="mt-20">
                <div className="flex flex-col items-center gap-20">
                    <img className="h-32 md:h-36 lg:h-40" src={dataUrl}></img>
                    <h1 className="robotoFont font-bold lg:font-bold text-3xl md:text-4xl lg:text-5xl thankyou-text-color">Thank You!</h1>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col items-center lg:gap-8">
                        <p className="robotoFont lg:font-medium text-lg md:text-xl lg:text-2xl">Payment done succesfully</p>
                        <p className="text-sm md:text-base lg:text-lg p-8 lg:p-0 text-center">You will be redirected to the shopping page shortly or click here to return to shopping page</p>
                        <button className="btn btn-primary btn-lg btn-block robotoFont h-12 flex items-center justify-center w-60 lg:h-12 lg:btn-lg lg:w-56 mt-4 rounded-3xl">Shopping Page</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>)
}

export default PaymentSuccessful;