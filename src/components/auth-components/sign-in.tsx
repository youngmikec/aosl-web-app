import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';

import './style.css';
import { setItem } from '../../utils';
import { ApiResponse } from '../../common';
import { LOGIN_USER } from '../../services';
import logo from '../../assets/images/logo-white.png';
import logoBlack from '../../assets/images/logo.png';
// import googleIcon from '../../assets/icons/google-icon.png';
// import { ADD_USER_PROFILE } from '../../store/user';

//icons
import { FiEyeOff, FiEye } from 'react-icons/fi';

const SignInComp = () => {
  
    const [loading, setLoading] = useState<boolean>(false);
    const [pDisplay, setPDisplay] = useState<boolean>(false);
    const [email, setEmail] = useState<{value: string, error: boolean, msg: string}>({value: '', error: false, msg: ''});
    const [password, setPassword] = useState<{value: string, error: boolean, msg: string}>({value: '', error: false, msg: ''});

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if(email.value === '' || undefined || null){
            isValid = false;
            setEmail({...email, error: true, msg: 'email field is empty'});
        }else{
            setEmail({...email, error: false})
        }

        if(password.value === '' || undefined || null){
            isValid = false;
            setPassword({...password, error: true, msg: 'password field is empty'});
        }else{
            setPassword({...password, error: false})
        }
        return isValid;
    }

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

    const handleLogin = () => {
        setLoading(true);
        if(inputCheck()){
            const data = { email: email.value, password: password.value};
            LOGIN_USER(data).then((res: AxiosResponse<ApiResponse>) => {
                setLoading(false);
                const { token, user } = res.data.payload;
                setItem('clientToken', token);
                setItem('clientD', user);
                notify('success', "Login successful");
                setTimeout(() => {
                    window.location.href = '/users-dashboard';
                    // navigate('/users-dashboard');
                }, 2500);
            }).catch(err => {
                setLoading(false);
                const { message } = err.response.data;
                notify('error', message);
            })
        }
    }

    const togglePasswordDisplay = () => {
        setPDisplay(!pDisplay);
    }

    return (
        <>
            <div className='auth-bg py-0 sm:py-8 md:py-8 lg:py-8'>
                <div className='fixed left-5 md:left-8 lg:left-8 top-6 md:top-8 lg:top-8'>
                    <div>
                        <Link to='/' className='hidden sm:hidden md:block lg:block'>
                            <img src={logo} alt="logo" width="120px" height="120px" />
                        </Link>
                        <Link to='/' className='block sm:block md:hidden lg:hidden'>
                            <img src={logoBlack} alt="logo" width="120px" height="120px" />
                        </Link>
                    </div>
                </div>

                <div className="mx-auto w-full sm:w-11/12 md:w-7/12 lg:w-5/12 bg-white h-screen rounded-lg px-8 py-8"> 
                    <div className='text-center my-20 md:my-10 lg:my-10'>
                        <h1 className='text-3xl font-bold mb-4'>Sign In</h1>
                        <p className='text-gray-400 my-4 text-sm'>To sign in please enter your email and password</p>
                    </div> 

                    <div className='my-10'>
                        <label htmlFor="email" className='font-bold text-gray-400'>Email</label>
                        <div className={email.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                            <input 
                                type="email" 
                                value={email.value}
                                onChange={(e) => setEmail({...email, value: e.target.value})}
                                className='w-full border-0 px-4 py-2 text-gray-400' 
                                placeholder='please enter your email' 
                            />
                        </div>
                        {
                            email.error &&
                            <label htmlFor="email" className='text-red-400'>{email.msg}</label>
                        }
                    </div>

                    <div className='my-10'>
                        <label htmlFor="password" className='font-bold text-gray-400'>Password</label>
                        <div className={password.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                            <div className='flex' >
                                <input 
                                    type={ pDisplay ? 'text' : 'password' } 
                                    value={password.value}
                                    onChange={(e) => setPassword({...password, value: e.target.value})}
                                    className='w-full border-none px-4 py-2 text-gray-400 grow' 
                                    placeholder='please enter your password' 
                                />
                                <span className='mx-2 p-2 my-auto text-gray-400 text-lg' onClick={() => togglePasswordDisplay() }>
                                    {
                                        pDisplay ? <FiEyeOff /> : <FiEye />
                                    }
                                </span>
                            </div>
                        </div>
                        {
                            password.error &&
                            <label htmlFor="password" className='text-red-400'>{password.msg}</label>
                        }
                    </div>

                    <div className="flex justify-between my-4">
                        <div>
                            <input type="checkbox" name="" id="" />
                            <span className='text-[#042f9c] text-sm mx-3 font-semibold'>Remember me</span>
                        </div>
                        <p className='text-[#042f9c] text-sm font-semibold'>
                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>
                        </p>
                    </div>

                    {/* <div className="relative my-6 text-center">
                        <p className='text-[#042f9c] text-lg text-center z-40'><span className='bg-[#ffffff] px-4 py-1'>or sign in with</span></p>
                        <hr className='border-[#042f9c8f] w-full -mt-4' />
                        <img src={googleIcon} className="my-7 mx-auto" alt="google" />
                    </div> */}

                    <div className="w-8/12 my-12 mx-auto text-center">
                        <button 
                            onClick={() => handleLogin() } 
                            className='bg-[#042f9c] text-white mb-6 block w-full rounded-lg py-3 sm:py-3 md:py-5 lg:py-6'
                        >
                            { loading ? 'processing' : 'Sign in' }
                        </button>
                        <p className='text-[#042f9c8f] text-sm block my-4'>Don't have an account?    
                            <span className='text-[#042f9c] font-bold'><Link to="/sign-up">  Sign Up</Link></span>
                        </p>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default SignInComp;