import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";



// style
import './style.css';

//icons and images
import coin from '../../assets/images/hompage_coin.png';
import userPhone from '../../assets/images/user-phone.png';
import userDashboard from '../../assets/images/user-dashboard.png';
import airtimePhone from '../../assets/images/hand-with-phone.png';
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
                <div className="flex justify-center items-center w-full min-h-[350px]">
                    <div>
                        <h3 className='text-5xl font-bold my-8 text-white'>All Occupation Service LTD</h3>

                        <div className='my-8 text-center'>
                            <button className='rounded-lg mt-4 mb-8 text-white bg-[#134FE7] py-4 px-7 hover:bg-white hover:text-[#134FE7]'>
                                <Link to="/sign-in">Get Started</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </HeroSection>

            <div className="overflow-hidden">
                <div className="text-center mx-auto w-10/12 sm:w-7/12 md:6/12 lg:w-5/12 my-16">
                    <h3 className='text-gray-500 font-extrabold text-3xl mb-4'>WHAT WE DO</h3>
                    <p className='text-gray-500 text-lg mx-auto text-center'>
                        We offer training to our staff who provides care and cleaning services owever other services will be based on self-training however we will make
                        available the qualifications of our candidates to their prospective employers upon requests.
                        Our cost is very competitive and we like to negotiate and work together with our clients to agree on the cost. 
                    </p>
                </div>


                <div className='flex flex-col w-screen mt-16'>
                    <div className='text-center'>
                        <h2 className='text-gray-700 font-bold text-xl mb-2 capitalize'>what Makes Us Different</h2>
                        <p className='text-sm text-gray-600 font-light'>There'are million reasons to use chinos Exchange platform </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 justify-evenly my-10'>
                        <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                            <img src={phone} alt="" width='30' className='self-center mx-auto my-2' />
                            <h3 className='text-[#134FE7] font-bold text-lg my-4'>Trusted and Secured</h3>
                            <p className=' text-sm font-light'>Our platform is built on the best data  <br /> security networks with absolute care to <br /> make sure your experience is simple and <br /> seamless</p>

                        </div>
                        <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                            <img src={icon} alt="" width='30' className='self-center mx-auto my-2' />
                            <h3  className='text-[#134FE7] font-bold text-lg my-4'>Instant Payment</h3>
                            <p className=' text-sm font-light'>Don’t worry our team are always onboard <br /> to recieve your order and release funds <br /> ASAP to your bank account</p>

                        </div>
                        <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                            <img src={phone} alt="" width='30' className='self-center mx-auto my-2' />
                            <h3 className='text-[#134FE7] font-bold text-lg my-4'>24/7 Hours Trade</h3>
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