import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';


import { Airtime, ApiResponse } from '../../../common';
import { CREATE_ORDER } from '../../../services';
import { RootState } from '../../../store';
import { APPEND_TO_AIRTIME_ORDER } from '../../../store/orders';


type Props = {
    changeStep: (data: number) => any,
    changeStatus: (data: string) => any,
    product: Airtime | null,
}

const AirtimeStepThree = ({ changeStep, changeStatus, product }: Props) => {
    const dispatch = useDispatch();
    const airtimeOrderState = useSelector((state: RootState) => state.AirtimeOrderSlice.value);

    const [imageString, setImageString] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const openFile = () => {
        return fileRef.current?.click();
    }

    const handleFileRead = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);
        setImageString(base64);
        dispatch(APPEND_TO_AIRTIME_ORDER({ proofImage: base64}))
    }

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
            resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
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

    const handleSubmit = () => {
        setLoading(true);
        const data = {
            orderType: 'AIRTIME',
            amount: airtimeOrderState?.amount,
            amountReceivable: airtimeOrderState?.amountReceivable,
            sendersPhone: airtimeOrderState?.sendersPhone,
            paymentMethod: airtimeOrderState?.paymentMethod || 'BANK',
            bankName: airtimeOrderState?.bankName,
            accountName: airtimeOrderState?.accountName,
            accountNumber: airtimeOrderState?.accountNumber,
            airtime: airtimeOrderState?.airtime?.id,
            proofImage: airtimeOrderState?.proofImage || imageString
        }
        CREATE_ORDER(data).then((res: AxiosResponse<ApiResponse>) => {
            const { success, message } = res.data;
            if(success){
                setLoading(false);
                notify('success', message);
                changeStatus('success')
                changeStep(4);
            }
        }).catch((err: any) => {
            setLoading(false);
            const { message } = err.response.data;
            notify('error', message);
            changeStatus('error');
        })
    }


    return (
        <>
            <div className='w-full'>
                {
                    product &&
                    <div className='my-4'>
                        <p className='font-semibold'>Kindly send {airtimeOrderState?.amount} airtime to {product?.txnNetwork} network {product?.txnNetworkNumber}</p>
                    </div>
                }
                <div className='my-4'>
                    <label htmlFor="accountNumber" className='text-[#7F7F80] text-sm'>Kindly upload a proof your transaction</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2 h-32 w-full flex justify-center'>
                        {
                            imageString ? 
                            <img src={imageString} alt="uploaded image" /> :
                            <button className='text-center text-[#7F7F80]' onClick={() => openFile()}>
                                + <br /> Choose file
                            </button>
                        }
                        <input 
                            type="file" 
                            className='hidden'
                            ref={fileRef}
                            onChange={(e) => handleFileRead(e)}
                        />
                    </div>
                </div>

                
                <div className='my-4 flex justify-center'>
                    <button className='rounded-md bg-[#042f9c] text-white px-6 py-3' 
                        onClick={() => handleSubmit()}
                    >
                        { loading ? 'Proccessing' : 'Mark Paid' }
                    </button>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default AirtimeStepThree;