import React from 'react'
import { Header } from '../components'
import cheff from '../assests/img/cheff.png';

const Aboutus = () => {
    return (
        <div className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
            <Header />
            <h1 className="w-full flex items-center justify-center font-extrabold mt-32 px-6 md:px-24 2xl:px-96 gap-12 mb-12 text-4xl">About Us</h1>
            <div className="w-full flex flex-row items-start justify-center px-6 md:px-24 2xl:px-96 gap-12">

                <div className='flex justify-center items-center'>
                    <img src={cheff} className='w-1/3' alt='' />
                </div>
                <div>
                    <p>
                        <ul className='list-disc'>
                            <li> Welcome to Feast Express! We are passionate about providing delicious meals
                                right to your doorstep. Our mission is to deliver fresh and high-quality food while
                                ensuring a convenient and enjoyable user experience for our customers.</li>

                            <li> At our restaurant, we source the finest ingredients and prepare each dish with care and
                                attention to detail. Our talented chefs are dedicated to creating mouthwatering flavors
                                that will tantalize your taste buds. Whether you're craving a hearty burger, a refreshing
                                salad, or a decadent dessert, we have something to satisfy every appetite.</li>

                            <li>  We understand the importance of convenience, which is why we offer a user-friendly online
                                ordering system. With just a few clicks, you can browse our menu, customize your order,
                                and have it delivered to your doorstep in no time. We strive to provide prompt and
                                reliable delivery services, ensuring that your food arrives fresh and ready to be enjoyed. </li>

                            <li>Thank you for choosing us as your food delivery service. We appreciate your support and
                                look forward to serving you delicious meals for years to come! </li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Aboutus