import { BsInstagram, BsTwitter, BsPinterest, BsYoutube } from 'react-icons/bs';

const Footer = () => {
    return (
        <div className="bg-black mt-24 pt-8">
            <div className="flex flex-col items-center gap-4 mt-2">
                <div className='flex justify-center gap-2'>
                    <img className="h-5 mt-1 lg:h-6 lg:mt-1.5" src="logo192.png"></img>
                    <h1 className="text-white text-xl lg:text-2xl font-bold">ShopiCart</h1>
                </div>
                <div className="w-4/5 lg:w-3/6 lg:text-center">
                    <p className="text-sm lg:text-base text-white">
                        Find everything you need for online shopping with confidence at CloudCart, offering
                        high-quality products, competitive pricing, fast shipping, and dedicated customer service.
                    </p>
                </div>
                <div>
                    <div className='flex justify-between gap-10 py-4'>
                        <BsInstagram className='text-white text-lg lg:text-2xl' />
                        <BsTwitter className='text-white text-lg lg:text-2xl' />
                        <BsPinterest className='text-white text-lg lg:text-2xl' />
                        <BsYoutube className='text-white text-lg lg:text-2xl' />
                    </div>
                </div>
            </div>
            <div className='flex justify-between'>
                <p className="photo-credit2 ml-4 mt-7 lg:mt-8 lg:ml-4">
                <a href="https://www.freepik.com/free-photo/front-view-smiling-young-woman-with-measure-tape-sale-nameplate-white-background-losing-measuring-slimming-shopping-torso-hip-skin-body-waist-mall_21741736.htm#query=sale%20shopping%20white%20background%20color&position=26&from_view=search&track=ais">Image by KamranAydinov</a> on Freepik
                </p>
                <div className='flex justify-end gap-4 mr-4 mt-4 pb-2'>
                    <p className='text-white text-sm lg:text-base'>Home</p>
                    <p className='text-white text-sm lg:text-base'>Contact</p>
                    <p className='text-white text-sm lg:text-base'>Blog</p>
                    <p className='text-white text-sm lg:text-base'>Article</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;