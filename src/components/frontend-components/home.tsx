import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from "@material-tailwind/react";

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
                    <p className='text-gray-500 text-sm mx-auto text-center'>
                        We offer training to our staff who provides care and cleaning services owever other services will be based on self-training however we will make
                        available the qualifications of our candidates to their prospective employers upon requests.
                        Our cost is very competitive and we like to negotiate and work together with our clients to agree on the cost. 
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

            <div className="my-4">
                {/* <Carousel 
                    translate='yes'
                    title='companies'
                    slot={"slider"}  
                    transition={{ duration: 2 }} 
                    className="rounded-xl"
                    autoplay={true}
                    loop={true}
                    style={{ height: "300px" }}
                    onChange={() => console.log('changed')}
                >
                    <img
                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                        alt="image 3"
                        className="h-full w-full object-cover"
                    />
                </Carousel> */}
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