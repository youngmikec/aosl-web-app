import React from 'react';

// style
import './style.css';

// components
import HeroSection from '../../shared/users-frontend/hero-section';
import { Link } from 'react-router-dom';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';
import ProductStepComp from '../../shared/users-frontend/product-step-comp';
import paAgentImg from '../../assets/svg/pa-agent.svg';

type Step = {
    title: string;
    subTitle: string;
}

const PAserviceComp = () => {
    const steps: Step[] = [
        {
            title: '',
            subTitle: 'Companionship – keeping the client company, sharing stories, indoor games, ensuring safety at home'
        },
        {
            title: '',
            subTitle: 'Support with booking and attending appointments - doctor’s appointment and all professional/personal appointments'
        },
        {
            title: '',
            subTitle: 'Domestic support - cleaners, support with preparing meals/serving'
        },
        {
            title: '',
            subTitle: 'Support with shopping – shopping lists, dropping, shopping, picking and support with putting the shopping away '
        },
        {
            title: '',
            subTitle: 'General Administrative support - support with paying bills, reading formal emails and letters, responding to formal letters/emails'
        },
        {
            title: '',
            subTitle: 'Family contact supervision – support children and families with social interaction, meet up and sharing love and togetherness '
        },
        {
            title: '',
            subTitle: 'Childcare – support parent and families with looking after their children to provide respite and in their absence, taking the children out to the park etc. '
        },
    ]
    
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
                    title='PA SERVICES – PART-TIME, FULL-TIME & SELF-EMPLOYED'
                    imageUrl={paAgentImg}
                    steps={steps}
                    subTitle='Our Personal Assistants (PAs) are trained and competent to deliver the following support services;'
                />
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />
        </>
    )
}

export default PAserviceComp;