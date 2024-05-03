import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../../shared/users-frontend/footer';
import JoinUs from '../../shared/users-frontend/join-us';
import HeroSection from '../../shared/users-frontend/hero-section';
import ProductServices from '../../shared/users-frontend/ProductServices';

const ServicesPage = () => {
  return (
    <>
        <HeroSection>
            <div className="flex justify-center items-center w-full min-h-[350px]">
                <div>
                    <h3 className='text-5xl font-bold my-8 text-white'>AOSL Services</h3>

                    {/* <div className='my-8 text-center'>
                        <button className='rounded-lg mt-4 mb-8 text-white bg-[#042f9c] py-4 px-7 hover:bg-white hover:text-[#042f9c]'>
                            <Link to="/sign-in">Get Started</Link>
                        </button>
                    </div> */}
                </div>
            </div>
        </HeroSection>

        <div className="overflow-hidden">
            <div className="text-center mx-auto w-10/12 sm:w-7/12 md:6/12 lg:w-5/12 my-16">
                <p className='text-gray-500 text-lg mx-auto text-center'>
                  At AOSL, we pride ourselves with providing the below services tailored to your needs. Why not contact us and find out how we can support you or your loved ones. 
                </p>
            </div>
        </div> 

      <div className='my-1-'>
          <ProductServices showFullServices={true} />
      </div>


      <div className='my-4'>
          <JoinUs />
      </div>

      <Footer />
    </>
  )
}

export default ServicesPage;