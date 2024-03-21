import React, { useState } from 'react';

// style
import './style.css';

//  images and icons
import coin from '../../assets/images/hompage_coin.png'

// components
import HeroSection from '../../shared/users-frontend/hero-section';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';
import FaqTitle from './faq-tile';
import { Faq, faqs } from '../../constants';


const FaqComp = () => {
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [questions, setQuestions] = useState<Faq[]>(faqs);

    const handleSearchQuery = () => {
        setSearching(true);
        if(searchQuery !== '') {
            const filteredResults: any[] = faqs.filter((item: any) => Object.values(item).includes(searchQuery));
            setQuestions(filteredResults);
            setSearching(false);
        }else {
            setQuestions(faqs);
            setSearching(false);
        }
    }
    return (
        <>
            <HeroSection>
                <div className="w-full">
                    <div className='py-4 mt-8'>
                        <h3 className='text-xl lg:text-5xl font-bold mb-1 mt-4 text-white text-center capitalize'>Hi, Do you have any question?</h3> *
                        <p className='text-md font-semibold text-center lg:w-3/4 mt-0 mx-auto text-white'>Get answers to any question or inquiry you might have</p>
                        
                        <div className='flex justify-between rounded-md mx-auto border-none bg-white w-full md:w-7/12 lg:w-7/12 my-8'>
                            <input 
                                type="text" 
                                className='rounded-md border-none bg-white py-3 px-3' 
                                placeholder='Enter question here'
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button 
                                className='rounded-tr-md rounded-br-md  text-white bg-[#134FE7] py-2 px-6 min-w-max'
                                onClick={() => handleSearchQuery()}
                            >
                                { searching ? 'Searching' : 'Search' }
                            </button>

                        </div>
                        <div className="image mx-auto justify-center flex">
                            <img src={coin} alt=""  />
                        </div>
                        
                    </div>
                
                </div>
            </HeroSection>

            <div className="hero bg-ellipse flex flex-col ">
                <div className="text-gray-600 text-center text-lg my-10">
                    <p className='capitalize font-bold'>
                        Frequently asked questions
                    </p>
                </div>


                {
                    questions.length > 0 &&
                    questions.map((item: Faq, idx: number) => {
                        return <FaqTitle key={idx} question={item.question} answers={item.answers} />
                    })
                }
                
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />
        </>
    )
}

export default FaqComp;