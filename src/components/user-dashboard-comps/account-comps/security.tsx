import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';

import { ApiResponse } from '../../../common';
import { UPDATE_PROFILE } from '../../../services';

const AccountSecurity = () => {
    const [display, setDisplay] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

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

    const updateProfile = (data: any) => {
        setLoading(true);
        UPDATE_PROFILE(data).then((res: AxiosResponse<ApiResponse>) => {
            const { message, success } = res.data;
            if(success){
                setLoading(false);
                notify('success', message);
            }
        }).catch(err => {
            setLoading(false);
            const { message } = err.response.data;
            notify('error', message);
        })
    }

    const handleUpdatePassword = () => {
        if(password === '' || undefined) notify('error', 'Password is empty');
        if(password === '' || undefined) notify('error', 'confirm Password is empty');
        if(password !== confirmPassword) notify('error', 'Password does not match');
        const data = { password };
        updateProfile(data);
    }

    const toggleDisplay = () => {
        setDisplay((prev) => !prev);
    }

    return (
        <>
            <div className='w-full'>
                <div className='w-full border-b-2 border-[#7f7f8056] py-5 px-5'>
                    <div className='flex justify-between'>
                        <div className='mx-3 w-7/12'>
                            <h3 className='text-sm text-[#7F7F80] font-semibold'>Reset Password</h3>
                            <p className='text-sm text-[#7F7F80]'>someone tampared with your password? reset now to avoid lost of fund</p>
                        </div>

                        <div className='my-auto w-4/12 text-center'>
                            <button 
                                className='text-[#134FE7] font-semibold'
                                onClick={() => toggleDisplay()}
                            >
                                Reset now
                            </button>
                        </div>
                    </div>
                </div>

                {
                    display && 
                    <div className='mt-6 py-5 px-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:space-x-2">
                                <div className='my-4'>
                                    <label htmlFor="password" className='text-[#7F7F80] text-sm font-bold'>Password *</label>
                                    <div className='border-2 border-gray-100 rounded-xl mt-2'>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            className='w-full px-4 py-2'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='my-4'>
                                    <label htmlFor="confirmPassword" className='text-[#7F7F80] text-sm font-bold'>Confirm Password *</label>
                                    <div className='border-2 border-gray-100 rounded-xl mt-2'>
                                        <input 
                                            type="password" 
                                            name="confirmPassword" 
                                            className='w-full px-4 py-2'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            

                            <div className='mt-6 flex justify-center'>
                                <button 
                                    className='rounded-md bg-[#134FE7] text-white px-6 py-3'
                                    onClick={() => handleUpdatePassword()}
                                >
                                    { loading ? 'Saving...' : 'Save Change'}
                                </button>
                            </div>
                    </div>
                }

                <ToastContainer />
            </div>
        </>
    )
}

export default AccountSecurity;