import React, { useState, useRef } from 'react';
import { AxiosResponse } from 'axios';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { whatsAppUrl } from '../../../constants';
import { ApiResponse } from '../../../common';
import { RootState } from '../../../store';
import { APPEND_TO_BUY_GIFTCARD_ORDER } from '../../../store/orders';
import { CREATE_ORDER } from '../../../services';
import { ADD_TO_ORDERS } from '../../../store/orders/orders';

type Props = {
    changeStep: (data: number) => any,
}

const BuyCryptoStepFour = ({ changeStep }: Props) => {
    const dispatch = useDispatch();
    const buyCryptoState = useSelector((state: RootState) => state.BuyCryptoOrderSlice.value);
    console.log(buyCryptoState);
    
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
        dispatch(APPEND_TO_BUY_GIFTCARD_ORDER({ proofImage: base64}))
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
            orderType: buyCryptoState?.orderType,
            amount: buyCryptoState?.amount,
            amountReceivable: buyCryptoState?.amountReceivable,
            sendersPhone: buyCryptoState?.sendersPhone,
            walletAddress: buyCryptoState?.walletAddress,
            paymentMethod: buyCryptoState?.paymentMethod || 'WALLET',
            network: buyCryptoState?.network,
            cryptocurrency: buyCryptoState?.cryptocurrency,
            proofImage: buyCryptoState?.proofImage || imageString
        }
        CREATE_ORDER(data).then((res: AxiosResponse<ApiResponse>) => {
            const { success, message, payload } = res.data;
            if(success){
                setLoading(false);
                notify('success', message);
                dispatch(ADD_TO_ORDERS(payload));
                // changeStatus('success')
                changeStep(5);
            }
        }).catch((err: any) => {
            setLoading(false);
            const { message } = err.response.data;
            notify('error', message);
            // changeStatus('error');
        })
    }

    return (
        <>
            <div className='w-full'>
                <div className="text-center">
                    <h2 className='text-[#7F7F80] text-lg my-16'>Upload Proof</h2>
                    <p className='text-[#7F7F80] text-sm '>Kindly upload a proof your transaction</p>
                </div>

                <div className='my-4'>
                    {/* <label htmlFor="accountNumber" className='text-[#7F7F80] text-sm '>Kindly upload a proof your transaction</label> */}
                    <div className='border-2 border-gray-100 py-8 rounded-md mt-2 h-32 w-full flex justify-center'>
                        {
                            imageString ? 
                            <img src={imageString} alt="uploaded" /> :
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

                    
                <div className='my-10 flex justify-center'>
                    <button 
                        className='rounded-md bg-[#134FE7] text-white px-6 py-3'
                        onClick={() => handleSubmit()}
                    >
                        { loading ? 'Proccessing' : 'Finish' }
                    </button>
                </div>

                <a href={whatsAppUrl} target='_blank'>
                    <div className='flex justify-center gap-3 text-[#134FE7] cursor-pointer'>
                        <span className='my-auto'>
                            <BsWhatsapp />
                        </span>
                        <span>Chat with us on whatsaapp</span>
                    </div>
                </a>
            </div>
        </>
    )
}

export default BuyCryptoStepFour;