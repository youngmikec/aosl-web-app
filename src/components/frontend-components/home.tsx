import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ReadingCouncelImg from '../../assets/images/reading-council-img.jpeg';
import WestBrekshireImg from '../../assets/images/west-berkshire-img.jpeg';
import WorkinghamImg from '../../assets/images/workingham-img.jpeg';

// style
import './style.css';

// components
import HeroSection from '../../shared/users-frontend/hero-section';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../common';
import { WELCOME_ROUTE } from '../../services';
import ReviewComp from './review';
import WhatsappButton from '../whatsapp-btn';
import ProductServices from '../../shared/users-frontend/ProductServices';
import ProcessStep from './process-step';
import ContactUsForm from './contact-us-form';
import MarqueeComp from './Marquee-comp';

const HomeComp = () => {

    const marqueeImages: any = [
        ReadingCouncelImg,
        WestBrekshireImg,
        WorkinghamImg
    ]

    const sayHi = () => {
        WELCOME_ROUTE()
        .then((res: AxiosResponse<ApiResponse>) => {
            console.log('welcome')
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            console.log('error', message);
        });
    };

    useEffect(() => {
        sayHi();
    }, []);

    return (
        <>
            <HeroSection>
                <div className="flex justify-center items-center w-full min-h-[350px]">
                    <div>
                        <h3 className='text-5xl font-bold my-8 text-white animate__animated animate__fadeInDown'>All Occupation Service LTD</h3>

                        <div className='my-8 text-center'>
                            <button className='rounded-lg mt-4 mb-8 text-white bg-[#042f9c] py-4 px-7 hover:bg-white hover:text-[#042f9c]'>
                                <Link to="/sign-in">Get Started</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </HeroSection>

            <div className="overflow-hidden">
                <div className="text-center mx-auto w-10/12 sm:w-7/12 md:6/12 lg:w-5/12 my-16">
                    <h3 className='text-[#042f9c] font-extrabold text-3xl mb-4'>WHAT WE DO</h3>
                    {/* <p className='text-gray-500 text-sm mx-auto text-center'>
                        We offer training to our staff who provides care and cleaning services however other services will be based on self-training however we will make
                        available the qualifications of our candidates to their prospective employers upon requests.
                        Our cost is very competitive and we like to negotiate and work together with our clients to agree on the cost. 
                    </p> */}
                    <p className='text-gray-500 text-sm mx-auto text-center'>
                        We provide comprehensive training for our staff who deliver care and cleaning services. For other services, we ensure that our candidates undergo self-training. 
                        Upon request, we will provide the qualifications of our candidates to prospective employers.
                        Our pricing is highly competitive, and we are committed to negotiating and collaborating with our clients to reach mutually agreeable terms.
                    </p>
                </div>
            </div> 

            <div className='my-8'>
                <ProductServices />
            </div> 

            <div className='my-4'>
                <JoinUs />
            </div>

            <div className='my-4'>
                <ReviewComp />
            </div>

            <div className="my-4 mb-12">
                <h3 className='text-[#042f9c] font-extrabold text-3xl mb-8 text-center'>We are Trusted by</h3>
                <MarqueeComp images={marqueeImages} />
            </div>

            <div className="my-4">
                <ProcessStep />
            </div>

            <div className="my-4">
                <ContactUsForm />
            </div>

            {/* whatsapp */}
            <WhatsappButton />

            <Footer />
        </>
    )
}

export default HomeComp;