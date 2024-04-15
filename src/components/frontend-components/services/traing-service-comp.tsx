import React from 'react';

// styleimport '../style.css';

// components
import HeroSection from '../../../shared/users-frontend/hero-section';
import { Link } from 'react-router-dom';
import JoinUs from '../../../shared/users-frontend/join-us';
import Footer from '../../../shared/users-frontend/footer';
import ProductStepComp from '../../../shared/users-frontend/product-step-comp';
import paAgentImg from '../../../assets/svg/pa-agent.svg';
import { trainingServiceSteps } from '../../../constants';

export type Step = {
    title: string;
    subTitle: string;
}

const TrainingServiceComp = () => {

    
    return (
        <>
            <HeroSection>
                <div className="flex justify-center md:ml-32 lg:ml-36">
                    <div className='py-4 w-full'>
                        <h3 className='text-5xl font-bold my-8 text-white'>Get Your Personal Assistant Services <br/> At Ease </h3>
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
                    title='TRAINING SERVICES'
                    imageUrl={paAgentImg}
                    steps={trainingServiceSteps}
                    subTitle='We offer the following Skill for Health and Skills for Care Training. Select the trainings you need and we will enrol you into the training. '
                />
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />
        </>
    )
}

export default TrainingServiceComp;