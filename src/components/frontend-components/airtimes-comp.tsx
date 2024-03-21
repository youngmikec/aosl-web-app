import React from 'react';

// style
import './style.css';

// components
import HeroSection from '../../shared/users-frontend/hero-section';
import { Link } from 'react-router-dom';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';
import ProductStepComp from '../../shared/users-frontend/product-step-comp';
import airtimeImage from '../../assets/images/girl_profile.png';

type Step = {
    title: string;
    subTitle: string;
}

const AirtimesComp = () => {
    const steps: Step[] = [
        {
            title: 'Create account',
            subTitle: 'Get started by inputing all your required details provided on the form'
        },
        {
            title: 'Get Verified',
            subTitle: 'Your submitted credentials would then be subjected to verification before your account gets approved.'
        },
        {
            title: 'Convert ASAP',
            subTitle: 'Select the network you wish to sell and the amount .then proceed..'
        },
    ]
    
    return (
        <>
            <HeroSection>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:ml-32 lg:ml-36">
                    <div className='py-4 w-full'>
                        <h3 className='text-5xl font-bold my-8 text-white'>Convert your Airtime  <br/> To Cash At Ease </h3>
                        <p className='text-sm font-semibold text-justify w-3/4 my-8 text-white'>Join over 100,000 users across the globe to trade your digital asset on a fast and secured platform</p>

                        <button className='rounded-lg my-4 text-white bg-[#134FE7] py-3 px-6 hover:bg-white hover:text-[#134FE7]'>
                            <Link to="/sign-in">Let's Trade</Link>
                        </button>
                    </div>
                    <div className='airtime-bg'></div>
                </div>
            </HeroSection>

            <div className=''>
                <ProductStepComp 
                    title='Airtime Conversion'
                    imageUrl={airtimeImage}
                    steps={steps}
                    subTitle='Don’t worry we understand the frustration of excess recharge.We make it easy for you to convert airtime on your sim to cash'
                />
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />
        </>
    )
}

export default AirtimesComp;