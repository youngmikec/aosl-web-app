import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// icons
import { IoIosSend } from 'react-icons/io'
import { CgInstagram } from 'react-icons/cg';
import { GrFacebookOption, GrTwitter } from 'react-icons/gr';

import './styles.css';
import logo from '../../assets/images/logo-white.png';
import { CREATE_SUBSCRIBER } from '../../services';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../common';

const Footer = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const notify = (type: string, msg: string) => {
        if (type === "success") {
          toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
    
        if (type === "error") {
          toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
    };

    const handleSubscribe = () => {
        setLoading(true);
        const data = { subscriberEmail: email }
        CREATE_SUBSCRIBER(data).then((res: AxiosResponse<ApiResponse>) => {
            const { message, success } = res.data;
            if(success){
                setLoading(false);
                setEmail('');
                notify('success', `Newsletter subscription was ${message}`);
            }
        }).catch((err: any) => {
            setLoading(false);
            const { message } = err.response.data;
            notify('error', message);
        })
    }
    return (
        <>
            <div className='w-full footer-bg py-20 bg-[#042f9ccc] text-white'>
                <div className="mx-auto w-10/12">
                    <div className="grid lg:space-x-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        {/* column1 */}
                        <div>
                            <div className='mb-6'>
                                <img src={logo} alt="logo" width="110px" height="110px" />
                            </div>
                            <p className='text-justify text-white my-4 pr-8'>Your one stop solution for all your needs</p>
                            <ul className='list-none'>
                                <li className='inline-flex mx-3'>
                                    <a 
                                        href="https://web.facebook.com/profile.php?id=61557766280904&_rdc=1&_rdr" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className='p-2 bg-white rounded-full'
                                    >
                                        <GrFacebookOption className="text-[#042f9c]" />
                                    </a>
                                </li>
                                <li className='inline-flex mx-3'>
                                    <a 
                                        href="https://www.instagram.com/alloccupationservicesltd?igsh=MXFhM2ZweHdpdm1naw==" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className='p-2 bg-white rounded-full'
                                    >
                                        <CgInstagram className="text-[#042f9c]" />
                                    </a>
                                </li>

                                <li className='inline-flex mx-3'>
                                    <a 
                                        href="https://twitter.com/AOSL2023"
                                        target="_blank"
                                        rel="noreferrer"
                                        className='p-2 bg-white rounded-full'
                                    >
                                        <GrTwitter className="text-[#042f9c]" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* column2 */}
                        <div>
                            <h3 className='text-white text-3xl font-bold mb-6'>Quick Links</h3>

                            <ul className='list-none text-white'>
                                <li className='my-4 font-light'>
                                    <Link to="/">Home</Link>
                                </li>
                                <li className='my-4 font-light'>
                                    <Link to="/about-us">About us</Link>
                                </li>
                                <li className='my-4 font-light'>
                                    <Link to="/services">services</Link>
                                </li>
                                <li className='my-4 font-light'>
                                    <Link to="/faqs">FAQS</Link>
                                </li>
                                <li className='my-4 font-light'>
                                    <Link to="/contact-us">Contact</Link>
                                </li>
                            </ul>
                        </div>

                        {/* column3 */}
                        <div>
                            <h3 className='text-white text-3xl font-bold mb-6'>Contact Info</h3>

                            <ul className='list-none text-white'>
                                <li className='my-4 font-light'>
                                    (44) 7872 078432
                                </li>
                                <li className='my-4 font-light'>
                                    info@aosl-online.com
                                </li>
                                <li className='my-4 font-light'>
                                    24/7 Hours
                                </li>
                            </ul>
                        </div>

                        {/* column4 */}
                        <div>
                            <h3 className='text-white text-3xl font-bold mb-6'>Updates</h3>
                            <p className='text-justify text-white my-4'>Stay in touch to keep up with the latest offers from us</p>
                            
                            <div className="my-4">
                                <div className='flex w-full justify-between rounded-3xl border-none bg-white'>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='example@gmail.com' 
                                        className='w-full rounded-l-3xl border-none outline-none bg-white py-3 px-5' 
                                    />
                                    <button 
                                        onClick={() => handleSubscribe()}
                                        className='rounded-r-3xl text-white bg-[#042f9c] py-3 px-6 min-w-max'
                                    >
                                        {
                                            loading ? 'subscribing...' : <IoIosSend />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default Footer