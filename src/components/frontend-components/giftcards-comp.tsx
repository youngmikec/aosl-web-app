import React from 'react';

// style
import './style.css';

// components
import HeroSection from '../../shared/users-frontend/hero-section';
import { Link } from 'react-router-dom';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';
import ProductStepComp, { Step } from '../../shared/users-frontend/product-step-comp';
import vectorTik from '../../assets/images/vector-tick.png';


const GiftCardsComp = () => {
    const steps: Step[] = [
        {
            title: 'Create account',
            subTitle: 'Get started by inputing all your required details provided on the form'
        },
        {
            title: 'Check Rate',
            subTitle: 'Always check rate before you place an order from your dashboard'
        },
        {
            title: 'Convert ASAP',
            subTitle: 'Upload a clear picture of the card and get funded immediately after verification'
        },
    ]

    return (
        <>
            <HeroSection>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:ml-32 lg:ml-36">
                    <div className='py-4 w-full '>
                        <h3 className='text-5xl font-bold my-8 text-white'>The Best Platform To <br/> Trade Your Giftcard </h3>
                        <p className='text-sm font-semibold text-justify w-3/4 my-8 text-white'>Join over 100,000 users across the globe to trade your digital asset on a fast and secured platform</p>

                        <button className='rounded-lg my-4 text-white bg-[#134FE7] py-3 px-6 hover:bg-white hover:text-[#134FE7]'>
                            <Link to="/sign-in">Let's Trade</Link>
                        </button>
                    </div>
                    <div className='giftcard-bg'></div>
                </div>
            </HeroSection>

            <div className=''>
                <ProductStepComp 
                    title='Redeem Giftcards'
                    imageUrl={vectorTik}
                    steps={steps}
                    subTitle='Buy and sell Giftcards from over 20 countries around the world'
                />
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />
        </>
    )
}

export default GiftCardsComp;