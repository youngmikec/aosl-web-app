import React from 'react';

// style
import '../style.css';

// components
import HeroSection from '../../../shared/users-frontend/hero-section';
import { Link } from 'react-router-dom';
import JoinUs from '../../../shared/users-frontend/join-us';
import Footer from '../../../shared/users-frontend/footer';
import ProductStepComp from '../../../shared/users-frontend/product-step-comp';
import paAgentImg from '../../../assets/svg/pa-agent.svg';

type Step = {
  title: string;
  subTitle: string;
}

const TransportationServiceComp = () => {
    const steps: Step[] = [
        {
            title: '',
            subTitle: 'Transport to all activity centres'
        },
        {
            title: '',
            subTitle: 'Private Chauffeuring to private events '
        },
        {
            title: '',
            subTitle: 'Airport transport services – pick up and drop off'
        },
    ]
    
    return (
        <>
            <HeroSection>
                <div className="flex justify-center md:ml-32 lg:ml-36">
                    <div className='py-4 w-full'>
                        <h3 className='text-5xl font-bold my-8 text-white'>We support families and local authorities with taking children to school and back. We provide the following services</h3>
                        {/* <p className='text-sm font-semibold text-justify w-3/4 my-8 text-white'>Join over 100,000 users across the globe to trade your digital asset on a fast and secured platform</p> */}

                        <button className='rounded-lg my-4 text-white bg-[#042f9c] py-3 px-6 hover:bg-white hover:text-[#042f9c]'>
                            <Link to="/sign-in">Get Started</Link>
                        </button>
                    </div>
                    {/* <div className='pa-bg'></div> */}
                </div>
            </HeroSection>

            <div className=''>
                <ProductStepComp 
                    title='TRANSPORTATION SERVICES '
                    imageUrl={paAgentImg}
                    steps={steps}
                    subTitle='We are committed to ensuring comfortable and effective services that are reliable and affordable. '
                />
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />
        </>
    )
}

export default TransportationServiceComp;