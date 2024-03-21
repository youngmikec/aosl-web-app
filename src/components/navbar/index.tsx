import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// icons
import { FiMenu } from 'react-icons/fi';
import { CiDollar } from 'react-icons/ci';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdCancel, MdCardGiftcard } from 'react-icons/md';

import logo from '../../assets/images/logo-white.png';
import logoDark from '../../assets/images/logo.png';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const toggleShowDrowdown = () => {
        setShow(!show);
    }

    return (
        <>
            <div>
                <div className='hidden sm:hidden md:flex lg:flex w-full py-4 justify-between'>
                    <div>
                        <Link to='/'>
                            <img src={logo} alt="logo" width="120px" height="120px" />
                        </Link>
                    </div>
                    <div className='pt-3'>
                        <ul className='list-none inline-flex'>
                            <li className='mx-2 sm:mx-2 md:mx-2 lg:mx-4 text-white sm:text-xs font-semibold hover:border-b-2 hover:border-b-white'><Link to="/">Home</Link></li>
                            <li className='mx-2 sm:mx-2 md:mx-2 lg:mx-4 text-white sm:text-xs font-semibold hover:border-b-2 hover:border-b-white'>
                                <div
                                    className="relative mx-1 pt-0 pb-2 group  mb-1 md:mb-0"
                                    id="button_pm">
                                    <Link to="/" className='inline-flex'>Services <IoMdArrowDropdown className='mt-1 mx-1' /></Link>
                                    
                                    <ul className="w-max absolute left-0 top-0 mt-8 p-2 rounded-lg shadow-lg bg-[#F6F6F6] z-10 hidden group-hover:block">
                                        <svg
                                            className="block fill-current text-[#F6F6F6] w-4 h-4 absolute left-0 top-0 ml-3 -mt-3 z-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                        </svg>
                                        <li className="hover:bg-[#134FE7] text-[#134FE7] border-b-2 border-[#f1dbff] hover:cursor-pointer pr-10 p-3 whitespace-no-wrap hover:text-white text-sm md:text-base ">
                                            <Link to="/cryptos"> 
                                                <div className="flex justify-start">
                                                    <div className='mr-2 my-auto h-3'><CiDollar /></div>
                                                    <div>Trade Crypto</div>
                                                </div>
                                            </Link>
                                        </li>

                                        <li className="hover:bg-[#134FE7] text-[#134FE7] border-b-2 border-[#f1dbff] hover:cursor-pointer pr-10 p-3 whitespace-no-wrap hover:text-white text-sm md:text-base ">
                                            <Link to="/airtimes"> 
                                                <div className="flex justify-start">
                                                    <div className='mr-2 my-auto h-3'><CiDollar /></div>
                                                    <div>Airtime to Cash</div>
                                                </div>
                                            </Link>
                                        </li>

                                        <li className="hover:bg-[#134FE7] text-[#134FE7] border-b-2 border-[#f1dbff] hover:cursor-pointer pr-10 p-3 whitespace-no-wrap hover:text-white text-sm md:text-base ">
                                            <Link to="/giftcards"> 
                                                <div className="flex justify-start">
                                                    <div className='mr-2 my-auto h-3'><MdCardGiftcard /></div>
                                                    <div>Trade Giftcard</div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mx-2 sm:mx-2 md:mx-2 lg:mx-4 text-white sm:text-xs font-semibold hover:border-b-2 hover:border-b-white'><Link to="/about-us">About Us</Link></li>
                            <li className='mx-2 sm:mx-2 md:mx-2 lg:mx-4 text-white sm:text-xs font-semibold hover:border-b-2 hover:border-b-white'><Link to="/contact-us">Contact Us</Link></li>
                            <li className='mx-2 sm:mx-2 md:mx-2 lg:mx-4 text-white sm:text-xs font-semibold hover:border-b-2 hover:border-b-white'><Link to="/faqs">Faqs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <ul className='list-none inline-flex'>
                            <li className='mx-4 text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#134FE7]'><Link to="/sign-in">Sign In</Link></li>
                            <li className='mx-4 text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#134FE7]'><Link to="/sign-up">Sign Up</Link></li>
                        </ul>
                    </div>
                </div>


                {/* mobile view */}
                <div className="block sm:block md:hidden lg:hidden dropdownmenu mx-auto w-full">
                    <div className='flex justify-between'>
                        <div className="mt-5" style={{width: '35%'}}>
                            <img src={logo} style={{width: '100%'}} alt="logo" />
                        </div>
                        <div className="flex justify-right">
                            <div>
                                <div className='pt-4 dropdown relative'>
                                    <button className="
                                        dropdown-toggle
                                        px-6
                                        py-2.5
                                        text-white hover:border-b-2 hove                     font-medium
                                        font-lg
                                        leading-tight
                                        uppercase
                                        rounded
                                        hover:bg-white hover:shadow-lg hover:text-[#134FE7]
                                        focus:bg-white focus:text-[#134FE7] focus:shadow-lg focus:outline-none focus:ring-0
                                        active:bg-white active:shadow-lg active:text-[#134FE7]
                                        transition
                                        duration-150
                                        ease-in-out
                                        flex
                                        items-center
                                        whitespace-nowrap
                                        "
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="true"
                                        onClick={() => toggleShowDrowdown()}
                                    >
                                    <span className='font-lg text-4xl'>
                                        <FiMenu />
                                    </span>
                                
                                    </button>
                            
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`w-full bg-white px-4 absolute transition-all ease-in delay-700 top-0 ${ show ? 'block' : 'hidden' } left-0 h-screen z-40`}>
                        <div className='flex justify-between p-3'>
                            <div>
                                <img src={logoDark} width="50%" alt='logo' />
                            </div>
                            <div>
                                <p onClick={() => toggleShowDrowdown()} className='p-2 rounded-full bg-gray-100'>
                                    <MdCancel className="text-3xl text-[#134FE7]" />
                                </p>
                            </div>
                        </div>

                        <div className='my-3 text-center'>
                            <ul className='list-none'>
                                <li className='mx-4 my-8 text-[#7F7F80] font-semibold hover:border-b-2 hover:border-b-white'><Link to="/">Home</Link></li>
                                <li className='mx-4 my-8 text-[#7F7F80] font-semibold hover:border-b-2 hover:border-b-white'><Link to="/cryptos">Trade Crypto</Link></li>
                                <li className='mx-4 my-8 text-[#7F7F80] font-semibold hover:border-b-2 hover:border-b-white'><Link to="/airtimes">Airtime to Cash</Link></li>
                                <li className='mx-4 my-8 text-[#7F7F80] font-semibold hover:border-b-2 hover:border-b-white'><Link to="/giftcards">Trade Giftcard</Link></li>
                                <li className='mx-4 my-8 text-[#7F7F80] font-semibold hover:border-b-2 hover:border-b-white'><Link to="/about-us">About Us</Link></li>
                                <li className='mx-4 my-8 text-[#7F7F80] font-semibold hover:border-b-2 hover:border-b-white'><Link to="/contact-us">Contact Us</Link></li>
                                <li className='mx-4 my-8 text-[#7F7F80] font-semibold hover:border-b-2 hover:border-b-white'><Link to="/faqs">Faqs</Link></li>
                                <br />
                                <br />
                                <br />
                                <li className='mx-4 my-8 text-[#7F7F80] font-semibold hover:border-b-2 hover:border-b-white'><Link to="/sign-in">Sign in</Link></li>
                                <li className='mx-4 my-8 text-[#ffffff] font-semibold hover:border-b-2 hover:border-b-white'>
                                    <Link to="/sign-up">
                                        <span className='px-7 py-2 bg-[#134FE7] rounded-md'>Sign up</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                {/* mobile view */}
            </div>
        </>
    )
}

export default Navbar