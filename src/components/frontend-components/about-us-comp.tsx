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
                    <h3 className='text-5xl font-bold my-8 text-white'>We deal inComprehensive Services for <br></br> Personal Assistant, Transportation, Training, and More</h3>
                    <p className='text-sm font-semibold text-justify w-3/4 my-8 text-white'>We provide you with our best services for Personal Assistant, Transportation, Training and many more.</p>
                    <button className='rounded-lg mt-4 mb-8 text-white bg-[#042f9c] py-4 px-7 hover:bg-white hover:text-[#042f9c]'>
                        <Link to="/sign-in">Get Started</Link>
                    </button>
                </div>
                
            </div>
        </HeroSection>

        <div className="overflow-hidden">
            <div className="text-center mx-auto w-10/12 sm:w-7/12 md:6/12 lg:w-5/12 my-16">
                <p className='text-gray-500 text-sm mx-auto text-center'>
                  All Occupation Services Ltd aims to provide Personal Assistant (PA) services tailored to the needs of our clients.
                  <br />
                  The Directors of All Occupation Services Ltd have extensive knowledge in the services we deliver and pride ourselves with putting smiles on our clients face and promoting their business ventures.
                  <br />

                  We aim to match the right candidate to the client’s needs thereby promoting staff-client relationship. This gives our client the opportunity to choose the right candidate and gives the candidate the opportunity to meet and understand their clients better before any ongoing commitment.
                  <br />

                  Our candidates include part-time, full-time, and self-employed who have the right training, knowledge, and competence to deliver the services required by our clients.
                  We support Local Authorities PA schemes by reaching out and delivering person-centered support to their residents with care and support needs. Our support services are tailored to meet our client’s diverse needs.
                  <br />
                  Why not contact us at <span className='text-[#042f9c] font-semibold'>info@aosl-online.com</span> ? We are here to help.


                </p>
            </div>
        </div> 

        <div className='flex w-screen bg-ellipse flex-col  overflow-hidden'>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-8 w-11/12 mx-auto mb-32 gap-6">

              <div className="py-4">
                <div className="about-bg2 w-full flex justify-center items-center py-28 sm:py-20">
                  <img src={logo} alt="" height="200px" className='mt-5 mx-auto small-icon object-fill' />
                </div>
              </div>

              <div className='text-left w-full'>
                <div>
                  <h3 className='text-black text-sm sm:text-sm md:text-sm font-bold mt-2 mb-4 px-8'>Our Mission</h3>
                  <p className='font-light px-4 text-justify text-gray-700 mb-4'>
                    Our mission is to deliver unparalleled services that cater to the specific needs of our clients.
                    We are committed to building lasting relationships based on trust, efficiency, and a deep
                    understanding of our clients’ unique requirements
                  </p>
                </div>

                <div>
                  <h3 className='text-black text-sm sm:text-sm md:text-sm font-bold mt-2 mb-4 px-8'>Our Vision</h3>
                  <p className='font-light px-4 text-justify text-gray-700 mb-4'>
                    At AOSL, we believe in a personalized approach to service delivery. We ensure that each
                    client receives solutions that are not just effective but also aligned with their individual goals.
                    Our team upholds the highest standards of professionalism and integrity.
                  </p>

                </div>
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
                    <h3 className='text-[#042f9c]font-bold text-sm my-4'>Trusted and Secured</h3>
                    <p className=' text-sm font-light'>Our platform is built on the best data  <br /> security networks with absolute care to <br /> make sure your experience is simple and <br /> seamless</p>

                </div>
                <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                    <img src={icon} alt="" width='30' className='self-center mx-auto my-2' />
                    <h3  className='text-[#042f9c]font-bold text-sm my-4'>Instant Payment</h3>
                    <p className=' text-sm font-light'>Don’t worry our team are always onboard <br /> to recieve your order and release funds <br /> ASAP to your bank account</p>

                </div>
                <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                    <img src={phone} alt="" width='30' className='self-center mx-auto my-2' />
                    <h3 className='text-[#042f9c]font-bold text-sm my-4'>24/7 Hours Trade</h3>
                    <p className=' text-sm font-light'>we understand the need for someone of <br /> our users that would love to trade at <br /> midnight. Our team members are always <br /> available.</p>

                </div>
              </div>
            </div>
            {/* difference section */}

        </div>



        <div className="overflow-hidden">
          <div className="text-center mx-auto w-10/12 sm:w-7/12 md:6/12 lg:w-5/12 my-16">
            <h3 className='text-[#042f9c] font-extrabold text-3xl mb-4'>What We Do</h3>
            <p className='text-gray-500 text-sm mx-auto text-center'>
              Add this to what you already have in the about us page – keep the vision, mission, values and why we do what we do as it is

              All Occupation Services Ltd aims to provide Personal Assistant (PA) services tailored to the needs of our clients
            </p>
          </div>

          <div className="text-center mx-auto w-10/12 sm:w-7/12 md:6/12 lg:w-5/12 my-16">
            <h3 className='text-[#042f9c] font-extrabold text-3xl mb-4'>Our Value</h3>
            <p className='text-gray-500 text-sm mx-auto text-center'>
              We are guided by core values that include an unwavering commitment to customer
              satisfaction, a continuous pursuit of innovation, and the maintenance of ethical business
              practices.
            </p>
          </div>
        </div> 

        <div className='my-4'>
            <JoinUs />
        </div>

        <Footer />
    </>
  )
}

export default AboutUsComp;