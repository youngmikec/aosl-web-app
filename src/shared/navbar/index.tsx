import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

//  icons
import{CiSearch} from 'react-icons/ci';
import {CiBellOn} from 'react-icons/ci';
import { FiMenu } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { CgLogOff } from 'react-icons/cg';
import { RiDashboardFill } from 'react-icons/ri';
import { AiOutlineDollar, AiOutlineSetting } from 'react-icons/ai';


// styles
import './style.css';

// logo
import defaultProfileImg from '../../assets/images/arash.png';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { User } from "../../common";
import { getItem } from "../../utils";
import AppLoader from "../../components/app-loader";
import { OpenLogoutModal } from "../../store/modal/logout-modal";


type Props = {
    profile: User | null;
    loading: boolean;
}


const Navbar = ({ profile, loading}: Props) => {
    const location = useLocation();
    const { pathname } = location;
    const dispatch = useDispatch();

    const headPadding: string = 'pt-0';

    const [search, setSearch] = useState('');
    const[ toggle, setToggle] = useState<boolean>(true);
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [showSideBar, setShowSidebar] = useState<boolean>(false);

    const openSidebar = () => {
        setShowSidebar(true);
        console.log(showSideBar);
    }
    const closeSidebar = () => setShowSidebar(false);

    const customeStyle = {
        sidebar: {zIndex: 60, left: '-1rem', paddingRight: '1rem', height: '100vh'}
    }
    const openModal = () => {
        dispatch(OpenLogoutModal());
    }



    useEffect(()=>{
        if(!search){
            setToggle(false);
        }else{
            setToggle(true);
        }

    },[search])

    useEffect(() => {
        let client = getItem('clientD');
        client && setUserProfile(client);
    }, [])

    return (
        <>
            <nav className='bg-white flex justify-between py-4 px-6 mb-4'>
                <div className='flex justify-start w-4/12'>
                    {/* mobile view */}
                    <div className={`container flex justify-start sm:hidden md:hidden lg:hidden xl:hidden ${headPadding}`}>
                        <div className="mr-4" onClick={() => openSidebar()}>
                            <button className="text-3xl text-[#7F7F80]"  >
                                <FiMenu />
                            </button>
                        </div>
                    </div>
                    {/* mobile view */}
                    <div className="text-[#7F7F80] hover:text-[#042f9c] text-sm font-semibold mx-4">
                        <span>
                            <Link to="/">Home</Link>
                        </span>
                    </div>
                    {/* <div className="text-[#7F7F80] text-sm font-semibold">
                        <span>
                            <Link to="/users-dashboard">How to trade</Link>
                        </span>
                    </div> */}
                    <div className="text-[#7F7F80] hover:text-[#042f9c] text-sm font-semibold mx-8">
                        <span>
                            <Link to="/chats">Chat</Link>
                        </span>
                    </div>
                </div>

                <div className='flex justify-end ml-4'>
                    <div className="hidden md:flex lg:flex justify-start border-2 border-[#f0f0f0] rounded-md">
                        <CiSearch className="text-xl my-auto text-[#7F7F80] ml-2 mr-4" />
                        <input type="text" placeholder='Search.....' className='w-80' onChange={(e)=>setSearch(e.target.value)}/>
                    </div>
                    <div className="mx-4 my-auto">
                        <CiBellOn className='inline-flex text-xl font-semibold my-auto text-[#7F7F80]'/>
                    </div>
                    <div className="inline-flex rounded-full bg-[#b1bbdf]">
                        {
                            loading ? <AppLoader color="black" /> :
                            <Link to="/account">
                                <img 
                                    src={profile?.profileImage ? profile.profileImage : defaultProfileImg } 
                                    alt="profile" 
                                    className='rounded-full object-cover w-[40px] h-[40px]' 
                                    width='100%' 
                                    height='40px'  
                                />
                            </Link>
                        }
                    </div>
                </div>

                <div className={`
                    fixed left-0 top-0 -bottom-1 h-full
                 bg-white text-left w-8/12 px-8 py-4 z-100
                    ${showSideBar ? 'block' : 'hidden'}
                 `} style={customeStyle.sidebar}>
                    <div className='bg-white'>
                        <div className="container text-right">
                            <button className="text-black text-xl" onClick={() => closeSidebar()} >
                                <FaTimes />
                            </button>

                            <ul className="list-none text-[#7F7F80]">
                                <li 
                                className={`${ pathname === '/users-dashboard' && 'bg-[#042f9c] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#042f9c] hover:text-white` }
                                title="Dashboard"
                            >
                                    <Link to="/users-dashboard">
                                        <div className='flex justify-start'>
                                            <div><span><RiDashboardFill /></span></div>
                                            <div className='mx-2'>Dashboard</div>
                                        </div>   
                                    </Link>
                                </li>

                                <li 
                                    className={`${ pathname === '/jobs' && 'bg-[#042f9c] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#042f9c] hover:text-white` }
                                    title="Jobs & Trainings"
                                >
                                    <Link to="/jobs">
                                        <div className='flex justify-start'>
                                            <div><span><AiOutlineDollar className='text-xl'/></span></div>
                                            <div className='mx-2'>Jobs & Trainings</div>
                                        </div>           
                                    </Link>
                                </li>

                                <li 
                                    className={`${ pathname === '/applications' && 'bg-[#042f9c] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#042f9c] hover:text-white` }
                                    title="Jobs & Trainings Applicationis"
                                >
                                    <Link to="/applications">
                                        <div className='flex justify-start'>
                                            <div><span><AiOutlineDollar className='text-xl'/></span></div>
                                            <div className='mx-2'>Applications</div>
                                        </div>           
                                    </Link>
                                </li>
                                
                                <li 
                                    className={`${ pathname === '/history' && 'bg-[#042f9c] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#042f9c] hover:text-white` }
                                    title="Order history"
                                >
                                    <Link to="/history">
                                        <div className='flex justify-start'>
                                            <div><span><MdOutlineDashboardCustomize className='text-xl'/></span></div>
                                            <div className='mx-2'>Order History</div>
                                        </div>                                   
                                    </Link>
                                </li>
                                <li 
                                    className={`${ pathname === '/account' && 'bg-[#042f9c] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#042f9c] hover:text-white` }
                                    title="Account setting"
                                >
                                    <Link to="/account">
                                        <div className='flex justify-start'>
                                            <div><span><AiOutlineSetting className='text-xl'/></span></div>
                                            <div className='mx-2'>Account Settings</div>
                                        </div>                                   
                                    </Link>
                                </li>

                                <li 
                                    className={`cursor-pointer my-6 py-3 px-4 text-center rounded-md hover:bg-[#042f9c] hover:text-white` }
                                    title="log out"
                                    onClick={() => openModal()}
                                >
                                    <div className='flex justify-start'>
                                        <div><span><CgLogOff className='text-xl'/></span></div>
                                        <div className='mx-2'>Log Out</div>
                                    </div>           
                                </li>       
                                
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;