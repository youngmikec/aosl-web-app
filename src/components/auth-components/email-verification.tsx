import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';

import logo from '../../assets/images/logo-white.png';
// import googleIcon from '../../assets/icons/google-icon.png';
import { Link, useParams } from 'react-router-dom';
import { VERIFY_EMAIL } from '../../services';
import { ApiResponse } from '../../common';

const EmailVerificationComp = () => {
    const params = useParams();
    const { code } = params;

    const [loading, setLoading] = useState<boolean>(false);
    const [vCode, setVCode] = useState<{value: string | undefined, error: boolean}>({value: '', error: false});

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

    const handleEmailVerification = () => {
        setLoading(true)
        const data = code ? { code } : { code: vCode.value };
        console.log('payload', data);

        VERIFY_EMAIL(data).then((res: AxiosResponse<ApiResponse>) => {
            setLoading(false);
            const { message } = res.data
            notify('success', message);
            setTimeout(() => {
                window.location.href = '/sign-in';
            }, 2500);
        }).catch(err => {
            setLoading(false);
            const { message } = err.response.data;
            notify('error', message);
        })
    }

    useEffect(() => {
        if(code){
            setVCode({value: code, error: false});
            handleEmailVerification();
        }
    }, [code])

    return (
        <>
            <div className='auth-bg py-0 sm:py-8 md:py-8 lg:py-8'>
                <div className='fixed left-8 top-8'>
                    <div>
                        <Link to='/'>
                            <img src={logo} alt="logo" width="120px" height="120px" />
                        </Link>
                    </div>
                </div>

                <div className="mx-auto w-full sm:w-11/12 md:w-7/12 lg:w-5/12 bg-white h-screen rounded-lg px-8 py-8"> 
                    <div className='text-center my-10'>
                        <h1 className='text-4xl font-bold mb-4'>Email Verification</h1>
                        <p className='text-gray-400 my-4 text-sm'>Let's verify your email</p>
                        <p className='text-gray-400 my-4 text-sm'>A five digit code has been sent to your email.</p>
                    </div> 

                    <div className='my-6'>
                        <label htmlFor="email" className='font-bold text-gray-400 my-5'>Verification Code</label>
                        <div className={vCode.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                            <input 
                                type="text" 
                                value={vCode.value}
                                onChange={(e) => setVCode({...vCode, value: e.target.value})}
                                className='w-full border-0 px-4 py-2 text-gray-400' 
                                placeholder='please enter your verification code' 
                            />
                        </div>
                    </div>

                    {/* <div className="relative my-8 text-center">
                        <hr className='border-[#134FE78f] w-full' />
                        <p className='text-[#134FE7] text-sm px-4 bg-white absolute -top-3 left-56 '>or sign in with</p>
                        <img src={googleIcon} className="my-4 mx-auto" alt="google" />
                    </div> */}

                    <div className="w-8/12 my-4 mx-auto text-center">
                        <button 
                            onClick={() => handleEmailVerification() } 
                            className='bg-[#134FE7] text-white mb-6 block w-full rounded-lg py-3 sm:py-3 md:py-5 lg:py-6'
                        >
                            { loading ? 'verifying...' : 'Verify' }
                        </button>
                        <p className='text-[#134FE78f] text-sm block my-4'>Already have an account?    
                            <span className='text-[#134FE7] font-bold'><Link to="/sign-in">  Sign In</Link></span>
                        </p>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </>
    )
}

export default EmailVerificationComp;