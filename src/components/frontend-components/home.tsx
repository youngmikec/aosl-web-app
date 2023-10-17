import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


// style
import './style.css';

//icons and images
import coin from '../../assets/images/hompage_coin.png';
import phoneCoins from '../../assets/images/phone-coin.svg'
import giftcards from '../../assets/images/giftcards.svg'
import phone from '../../assets/images/phone.png'
import icon from '../../assets/images/customer-satisfaction.png'
import networks from '../../assets/images/networks.svg';
// components
import HeroSection from '../../shared/users-frontend/hero-section';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';
import { AxiosResponse } from 'axios';
import { ApiResponse, CryptoCurrency } from '../../common';
import { RETREIVE_CRYPTO } from '../../services';
import ReviewComp from './review';
import WhatsappButton from '../whatsapp-btn';
import AppTable, { TableHeader } from '../../shared/app-table';

const HomeComp = () => {
    const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
    const [tableRows, setTableRows] = useState<any[]>([]);

    const tableHeaders: TableHeader[] = [
        { key: 'sn', value: 'S/N' },
        { key: 'image', value: 'Image' },
        { key: 'name', value: 'Name' },
        { key: 'shortName', value: 'Short Name' },
        { key: 'rate', value: 'Buy Rate' },
        { key: 'sellingRate', value: 'Selling Rate' },
    ];

    const retrieveCryptos = () => {
        const query: string = `?sort=-name&status=ACTIVE`;
        RETREIVE_CRYPTO(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            setCryptos(payload);
            const mappedDate = payload.map((item: CryptoCurrency, idx: number) => {
                return {
                    sn: idx + 1,
                    image: <img src={item?.cryptoImage } width="25px" height="25px" alt="crypto" />,
                    name: item?.name,
                    shortName: item?.shortName,
                    rate: item?.rate,
                    sellingRate: item?.sellingRate,
                }
            });
            setTableRows(mappedDate);
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            console.log('error', message);
        });
    };

    useEffect(() => {
        retrieveCryptos();
    }, []);

    return (
        <>
            <HeroSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-8 md:ml-32 lg:ml-36">
                    <div className='py-4 w-full relative'>
                        <h3 className='text-5xl font-bold my-8 text-white'>The Fastest Way To Buy, <br/> Sell And Trade Crypto </h3>
                        <div className='w-3/4 my-8'>
                            <p className='text-sm font-semibold text-justify my-2 text-white'>Join over 100,000 users across the globe to trade</p> 
                            <p className='text-sm font-semibold text-justify my-2 text-white'>your digital asset on a fast and secured platform</p>   
                        </div>

                        <div className='my-8'>
                            <button className='rounded-lg mt-4 mb-8 text-white bg-[#FFAB2E] py-4 px-7 hover:bg-white hover:text-[#FFAB2E]'>
                                <Link to="/sign-in">Let's Trade</Link>
                            </button>
                        </div>
                        <img src={coin} alt="" className='hidden sm:hidden md:block lg:block absolute right-0 bottom-0 '  />
                    </div>

                    <div className='wallet-bg'>
                    </div>
                </div>
            </HeroSection>

            <div className="overflow-hidden">
                <div className="text-center mx-auto my-16">
                    <h3 className='text-gray-400 font-extrabold text-2xl'>Our Current Market Rate</h3>
                    <p className='text-gray-400 font-light text-sm mx-auto'>For our most trading cryptocurrency</p>
                </div>

                <div className='my-8 flex justify-center w:11/12'>
                    <div>
                        <AppTable 
                            tableHeaders={tableHeaders} 
                            tableRows={tableRows} 
                            showSearch={false} 
                            className='w-[350px] sm:w-[450px] md:w-[600px] lg:w-[800px]'
                        />
                    </div>
                </div>


                <div className="bg-ellipse">
                    <div className="mx-auto w-10/12 bg-white rounded-md shadow-lg my-6 py-6 border-t-2 border-[#BA68C8]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                            <div className="px-0 md:px-3 lg:px-3 w-11/12 md:w-full lg:w-full">
                                <img src={phoneCoins} alt="phoneCoins" />
                            </div>

                            <div className='text-center md:text-left lg:text-left py-4 mt-10 md:my-auto lg:my-auto'>
                                <h1 className='text-4xl font-semibold text-[#121212]'>Buy and Sell your <br /> Cryptocurrency</h1>
                                <p className='my-4 font-light text-[#7F7F80E5]'>Send us crypto and recieve cash at with instant <br />payment via your Bank account</p>
                                <button className='bg-[#8652A4] text-white font-bold rounded-md my-4 py-4 px-16 capitalize'> 
                                    <Link to="/sign-in">let's trade</Link>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto w-10/12 bg-white rounded-md shadow-lg my-6 py-6 border-t-2 border-[#FE0808]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                            <div className="px-0 md:px-3 lg:px-3 w-11/12 md:w-full lg:w-full">
                                <img src={giftcards} alt="giftcards" />
                            </div>

                            <div className='text-center md:text-left lg:text-left py-4 mt-10 md:my-auto lg:my-auto'>
                                <h1 className='text-4xl font-semibold text-[#121212]'>Redeem your Gift <br/> card with ease </h1>
                                <p className='my-4 font-light text-[#7F7F80E5]'>Unlock the World of Savings: Exchange Giftcards from <br /> 20+ Countries.</p>
                                <button className='bg-[#8652A4] text-white font-bold rounded-md my-4 py-4 px-16 capitalize'> 
                                    <Link to="/sign-in">let's trade</Link>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto w-10/12 bg-white rounded-md shadow-lg my-6 py-6 border-t-2 border-[#1B24FA]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                            <div className="px-0 md:px-3 lg:px-3 w-11/12 md:w-full lg:w-full">
                                <img src={networks} alt="networks" />
                            </div>

                            <div className='text-center md:text-left lg:text-left py-4 mt-10 md:my-auto lg:my-auto'>
                                <h1 className='text-4xl font-semibold text-[#121212]'>Convert Airtime <br/> to Cash</h1>
                                <p className='my-4 font-light text-[#7F7F80E5]'>Don’t worry we understand the frustration <br />of excess recharge.  We make it easy for you to <br /> convert airtime on your sim to cash</p>
                                <button className='bg-[#8652A4] text-white font-bold rounded-md my-4 py-4 px-16 capitalize'> 
                                    <Link to="/sign-in">let's trade</Link>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>


                <div className='flex flex-col w-screen mt-16'>
                    <div className='text-center'>
                        <h2 className=' font-bold text-black text-xl mb-2 capitalize text-[#7F7F80] '>what Makes Us Different</h2>
                        <p className='text-sm text-gray-600 font-light'>There'are million reasons to use chinos Exchange platform </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 justify-evenly my-10'>
                        <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                            <img src={phone} alt="" width='30' className='self-center mx-auto my-2' />
                            <h3 className='text-purple-800 font-bold text-lg my-4'>Trusted and Secured</h3>
                            <p className=' text-sm font-light'>Our platform is built on the best data  <br /> security networks with absolute care to <br /> make sure your experience is simple and <br /> seamless</p>

                        </div>
                        <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                            <img src={icon} alt="" width='30' className='self-center mx-auto my-2' />
                            <h3  className='text-purple-800 font-bold text-lg my-4'>Instant Payment</h3>
                            <p className=' text-sm font-light'>Don’t worry our team are always onboard <br /> to recieve your order and release funds <br /> ASAP to your bank account</p>

                        </div>
                        <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                            <img src={phone} alt="" width='30' className='self-center mx-auto my-2' />
                            <h3 className='text-purple-800 font-bold text-lg my-4'>24/7 Hours Trade</h3>
                            <p className=' text-sm font-light'>we understand the need for someone of <br /> our users that would love to trade at <br /> midnight. Our team members are always <br /> available.</p>

                        </div>
                    </div>
                </div>
            </div>  

            <div className='my-4'>
                <JoinUs />
            </div>

            <div className='my-4'>
                <ReviewComp />
            </div>

            {/* whatsapp */}
            <WhatsappButton />

            <Footer />
        </>
    )
}

export default HomeComp;