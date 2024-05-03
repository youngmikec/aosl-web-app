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
import AppModalComp from '../../../shared/app-modal';

type Step = {
    title: string;
    subTitle: string;
}

const ImportationServiceComp = () => {
    const steps: Step[] = [
      {
        title: '',
        subTitle: 'We import and export farm produce'
      },
      {
        title: '',
        subTitle: 'We also deal in importing of Clothings'
      },
      {
        title: '',
        subTitle: 'Hair & Beauty Products importation at its best'
      },
    ]
    
    return (
        <>
            <HeroSection>
                <div className="flex justify-center md:ml-32 lg:ml-36">
                    <div className='py-4 w-full'>
                        <h3 className='text-5xl font-bold my-8 text-white'>We also deal in importing of farm produce</h3>

                        <button className='rounded-lg my-4 text-white bg-[#042f9c] py-3 px-6 hover:bg-white hover:text-[#042f9c]'>
                            <Link to="/sign-in">Get Started</Link>
                        </button>
                    </div>
                </div>
            </HeroSection>

            <div className=''>
              <ProductStepComp 
                title='Importation and Exportation Services'
                imageUrl={paAgentImg}
                steps={steps}
                subTitle=''
                />
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />

            
        </>
    )
}

export default ImportationServiceComp;