import React from 'react';

// style
import './style.css';

//images and icons
import coin from '../../assets/images/hompage_coin.png'
import logo from '../../assets/images/logo-white.png'
import phone from '../../assets/images/phone.png'
import icon from '../../assets/images/customer-satisfaction.png'
// components
import HeroSection from '../../shared/users-frontend/hero-section';
import { Link } from 'react-router-dom';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';

const AboutUsComp = () => {
  return (
    <>
        <HeroSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 overflow-hidden md:ml-32 lg:ml-36">
                <div className='py-12 w-full relative'>
                    <h3 className='text-5xl font-bold my-8 text-white'>Secured And Easy to <br />Use platform</h3>
                    <p className='text-sm font-semibold text-justify w-3/4 my-8 text-white'>We provide you with our best services for Crypto Exchange, Airtime Conversion, Giftcard Redeemtion.</p>
                    <button className='rounded-lg mt-4 mb-8 text-white bg-[#042f9c] py-4 px-7 hover:bg-white hover:text-[#042f9c]'>
                        <Link to="/sign-in">Let's Trade</Link>
                    </button>
                    <img src={coin} alt="" className=' md:block lg:block absolute right-0 bottom-0 '  />
                </div>

                <div className='about-bg hidden sm:hidden md:block lg:block'>
                    
                </div>
                
            </div>
        </HeroSection>

        <div className='flex w-screen bg-ellipse flex-col  overflow-hidden'>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-8 w-11/12 mx-auto mb-32 gap-6">

              <div className="py-4">
                <div className="about-bg2 w-full flex justify-center items-center py-28 sm:py-20">
                  <img src={logo} alt="" height="200px" className='mt-5 mx-auto small-icon object-fill' />
                </div>
              </div>

              <div className='text-left w-full'>
                <h3 className='text-black text-sm sm:text-sm md:text-lg font-bold mt-2 mb-4 px-8'>Vision & Mission</h3>
                <p className='font-light px-4 text-justify text-gray-700 mb-4'>
                  Introducing chinosexchange, where trust meets innovation in the world of Giftcard and crypto trading. 
                  With a steadfast commitment to excellence, we are revolutionizing the way you buy and sell Giftcards and cryptocurrency. 
                  Our unwavering dedication to providing top-notch service has not only set a new standard but also established us as the most reputable 
                  and trusted Giftcard trading entity not only in Africa but also across borders
                </p>
                <p className='font-light px-4 text-justify text-gray-700 mb-4'>
                  At Chinosexchange, trust is not just a word; it's a cornerstone of our philosophy. 
                  We understand the importance of reliability and transparency when it comes to financial services. 
                  That's why we go above and beyond to ensure every transaction is seamless, secure, and meets the highest industry standards
                </p>
              </div>
              {/* <div className='md:px-4 sm:px-8 flex'>
              </div>  */}

            </div>

            {/* difference section */}
            <div className='flex flex-col w-screen'>
              <div className='text-center'>
                  <h2 className=' font-bold text-black text-xl mb-2 capitalize '>what Makes Us Different</h2>
                  <p className='text-sm text-gray-600 font-light'>There'are million reasons to use chinos Exchange platform </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 justify-evenly my-10'>
                <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                    <img src={phone} alt="" width='30' className='self-center mx-auto my-2' />
                    <h3 className='text-[#042f9c]font-bold text-lg my-4'>Trusted and Secured</h3>
                    <p className=' text-sm font-light'>Our platform is built on the best data  <br /> security networks with absolute care to <br /> make sure your experience is simple and <br /> seamless</p>

                </div>
                <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                    <img src={icon} alt="" width='30' className='self-center mx-auto my-2' />
                    <h3  className='text-[#042f9c]font-bold text-lg my-4'>Instant Payment</h3>
                    <p className=' text-sm font-light'>Don’t worry our team are always onboard <br /> to recieve your order and release funds <br /> ASAP to your bank account</p>

                </div>
                <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                    <img src={phone} alt="" width='30' className='self-center mx-auto my-2' />
                    <h3 className='text-[#042f9c]font-bold text-lg my-4'>24/7 Hours Trade</h3>
                    <p className=' text-sm font-light'>we understand the need for someone of <br /> our users that would love to trade at <br /> midnight. Our team members are always <br /> available.</p>

                </div>
              </div>
            </div>
            {/* difference section */}

        </div>

        <div className='my-4'>
            <JoinUs />
        </div>

        <Footer />
    </>
  )
}

export default AboutUsComp;