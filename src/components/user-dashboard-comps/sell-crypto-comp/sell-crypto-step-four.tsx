import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import { APPEND_TO_SELL_CRYPTO_ORDER } from '../../../store/orders';
import { RootState } from '../../../store';
import { CREATE_ORDER } from '../../../services';
import { ApiResponse } from '../../../common';


type Props = {
    changeStep: (data: number) => any,
    changeStatus: (data: string) => any,
}

const SellCryptoStepFour = ({ changeStep, changeStatus }: Props) => {
    const dispatch = useDispatch();
    const cryptoOrderState = useSelector((state: RootState) => state.SellCryptoOrderSlice.value);

    const [loading, setLoading] = useState<boolean>(false);
    const [proofImage, setProofImage] = useState<{value: string, error: boolean}>({value: '', error: false});
    const fileRef = useRef<HTMLInputElement>(null);

    const openFile = () => {
        return fileRef.current?.click();
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

    const handleFileRead = async (e: any) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setProofImage({...proofImage, value: base64});
        dispatch(APPEND_TO_SELL_CRYPTO_ORDER({proofImage: base64}))
    }

    const convertBase64 = (file: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        }
        )
    }

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        
        if(proofImage.value === '' || undefined || null){
            isValid = false;
            setProofImage({...proofImage, error: true});
        }else{
            setProofImage({...proofImage, error: false});
        }

        return isValid;
    }

    const handleSubmit = () => {
        console.log({ cryptoOrderState })
        setLoading(true);
        if(inputCheck()){
            const data = {
                orderType: 'SELL_CRYPTO',
                paymentMethod: 'BANK',
                amount: cryptoOrderState?.amount,
                cryptocurrency: cryptoOrderState?.cryptocurrency,
                amountReceivable: cryptoOrderState?.amountReceivable,
                proofImage: proofImage.value,
                network: cryptoOrderState?.network,
                bankName: cryptoOrderState?.bankName,
                accountName: cryptoOrderState?.accountName,
                accountNumber: cryptoOrderState?.accountNumber,
            }
            CREATE_ORDER(data).then((res: AxiosResponse<ApiResponse>) => {
                const { success, message } = res.data;
                if(success){
                    setLoading(false);
                    notify('success', message);
                    changeStatus('success')
                    changeStep(5);
                }
            }).catch((err: any) => {
                setLoading(false);
                const { message } = err.response.data;
                notify('error', message);
                changeStatus('error');
            })
        }
    }

    return (
        <>
            <div className='w-full'>
                <div className='my-4'>
                    <label htmlFor="accountNumber" className='text-[#7F7F80] text-sm'>Kindly upload a proof your transaction</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2 h-32 w-full flex justify-center'>
                        {
                            proofImage.value ? 
                            <img src={proofImage.value} alt="uploaded" /> :
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
                    <button 
                        className='rounded-md bg-[#134FE7] text-white px-6 py-3'
                        onClick={() => handleSubmit()}
                    >
                        { loading ? 'Processing...' : 'Finish' }
                    </button>
                </div>
            </div>
        </>
    )
}

export default SellCryptoStepFour;