import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

// style
import './style.css';


// components
import HeroSection from '../../shared/users-frontend/hero-section';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';
import ContactUsForm from './contact-us-form';

const ContactUsComp = () => {
    
    
    return (
        <>
            <HeroSection>
                <div className="flex justify-center flex-row">
                    <div className='py-4 w-full my-8 '>
                        <div className='mt-8'>
                            <h3 className='text-5xl font-bold mt-8 mb-4 text-white text-center'>We’re Available 24/7 to Attend <br /> To Our Customer</h3>
                            <p className='text-sm font-semibold text-center w-3/4 mt-4 mb-6 mx-auto text-white'>Get answers to any question or inquiry you might have</p>

                            <div className='my-8 text-center'>
                                <button className='rounded-lg mt-4 mb-8 text-white bg-[#042f9c] py-4 px-7 hover:bg-white hover:text-[#042f9c]'>
                                    <Link to="/sign-in">Get Started</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </HeroSection>

            <div className="my-12">
                <ContactUsForm />
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />
            <ToastContainer />
        </>
    )
}

export default ContactUsComp;