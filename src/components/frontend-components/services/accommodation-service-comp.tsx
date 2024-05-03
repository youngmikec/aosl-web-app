import 'animate.css';

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

const AccommodationServiceComp = () => {
    const steps: Step[] = [
        {
            title: '',
            subTitle: 'Support with securing long / short accomodation'
        },
        {
            title: '',
            subTitle: 'AIR B & B Booking support'
        },
        {
            title: '',
            subTitle: 'Support with student accommodation'
        },
    ]
    
    return (
        <>
            <HeroSection>
                <div className="flex justify-center md:ml-32 lg:ml-36">
                    <div className='py-4 w-full animate__animated animate__fadeInRight'>
                        <h3 className='text-5xl font-bold my-8 text-white'>Get Your Accommodation Services support <br/> At Ease </h3>

                        <button className='rounded-lg my-4 text-white bg-[#042f9c] py-3 px-6 hover:bg-white hover:text-[#042f9c]'>
                            <Link to="/sign-in">Get Started</Link>
                        </button>
                    </div>
                </div>
            </HeroSection>

            <div className=''>
                <ProductStepComp 
                    title='Accommodation Service and support'
                    imageUrl={paAgentImg}
                    steps={steps}
                    subTitle='Lets help you secure your accommodation without a hassle. We provide the following Accommodation Services.'
                />
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />

            
        </>
    )
}

export default AccommodationServiceComp;