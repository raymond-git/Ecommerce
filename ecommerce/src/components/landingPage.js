import Navbar from "./navbar";
import { Link } from "react-router-dom";
import Footer from "./footer";

const LandingPage = () => {
    return (
        <div className="overflow-x-hidden">
            <Navbar></Navbar>
          
            <div className="relative">
                <img className="brightness-filter w-full md:h-96 lg:h-96 object-cover" src="landingPageImage.png"></img>
                <div className="flex justify-center items-center">
                    <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-extrabold absolute top-1/3 lg:top-1/3">
                        Your one-stop shop for everything
                    </h1>
               
                    <Link to={"/product"} className="inline-block">
                        {/* <button className="shopnow-button text-sm md:text-base lg:text-lg absolute top-2/4 px-4 py-1 lg:px-8 lg:py-3">Shop Now</button> */}
                        <button className="shopnow-button text-sm md:text-base lg:text-lg absolute top-2/4 left-1/2 transform -translate-x-1/2 px-4 py-1 lg:px-8 lg:py-3">Shop Now</button>
                        </Link>
                  
                </div>
            </div>
           
            <div className="mt-8 p-14 lg:p-28 lg:-mt-25 lg:flex flex-row-reverse justify-between items-center gap-x-24">
                <div className="flex flex-col justify-between items-center">
                    <div className="lg:mr-14">
                        <img className="mr-80 object-contain md:w-full md:h-64 lg:w-full lg:h-96" src="shoppingBagsImage.png"></img>
                    </div>
                    <div className="">
                        <p className="photo-credit lg:text-right ml-16 lg:-mt-6 lg:ml-10">
                            <a href="https://www.freepik.com/free-photo/blonde-woman-holding-shopping-bags_8487944.htm#query=shopping%20for%20white%20background&position=14&from_view=search&track=ais">Image by Racool_studio</a> on Freepik
                        </p>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-10 gap-8">
                    <p className="font-sans font-bold text-base md:text-lg lg:text-xl">Shop Our Latest Collection</p>
                    <p className="playfairFont text-sm md:text-base lg:text-lg leading-6">
                        Welcome to our online store! Were excited to share our latest collection of products. From trendy design to
                        classic favorites. Browse our selection and find your perfect fit
                    </p>
                </div>
            </div>
            <div className="p-14 lg:p-28 lg:flex justify-between items-center gap-x-24 -mt-6 lg:-mt-48">
                <div>
                    <img className="md:w-full md:h-64 lg:w-full lg:h-96 mr-96 pr-20 md:pr-32 lg:pr-24 object-contain scale-150 transition duration-100 ease-in-out" src="discountImage.png"></img>
                </div>
                <div className="flex flex-col w-full mt-24 gap-8">
                    <p className="font-sans font-bold text-base md:text-lg lg:text-xl">Limited Time Off: 20% Off Your First Purchase</p>
                    <p className="playfairFont text-sm md:text-base lg:text-lg leading-6">
                        Looking to score a deal on your first purchase? Look no further! We're currently offering
                        20% off for all new customers. Don't miss out on this limited time offer – shop now and save!
                    </p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default LandingPage;