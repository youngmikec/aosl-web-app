import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootState } from '../../../store';
import { APPEND_TO_BUY_GIFTCARD_ORDER } from '../../../store/orders';

type Props = {
    changeStep: (data: number) => any,
    changeStatus: (data: string) => any,
}

const TradeGiftcardStepTwo = ({changeStep, changeStatus}: Props) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [cardNumber, setCardNumber] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [proofImage, setProofImage] = useState<{value: string, error: boolean}>({value: '', error: false});
    const fileRef = useRef<HTMLInputElement>(null);

    const openFile = () => {
        return fileRef.current?.click();
    }



    const handleFileRead = async (e: any) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setProofImage({...proofImage, value: base64});
        dispatch(APPEND_TO_BUY_GIFTCARD_ORDER({proofImage: base64}))
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
        if(cardNumber.value === '' || undefined || null){
            isValid = false;
            setCardNumber({...cardNumber, error: true});
        }else{
            setCardNumber({...cardNumber, error: false});
        }
        if(cardNumber.value.length < 10 || cardNumber.value.length > 15){
            isValid = false;
            setCardNumber({...cardNumber, error: true});
        }else{
            setCardNumber({...cardNumber, error: false});
        }
        if(proofImage.value === '' || undefined || null){
            isValid = false;
            setProofImage({...proofImage, error: true});
        }else{
            setProofImage({...proofImage, error: false});
        }

        return isValid;
    }

    const handleProcceede = () => {
        if(inputCheck()){
            const data = { 
                cardNumber: cardNumber?.value,
                proofImage: proofImage.value
            };
            dispatch(APPEND_TO_BUY_GIFTCARD_ORDER(data))
            changeStep(3)
        }
    }

    return (
        <>
            <div className='w-full'>
                <div className='my-4'>
                    <label htmlFor="cardNumber" className='text-[#7F7F80] text-sm'>Card Number</label>
                    <div className={`border-2 ${cardNumber.error ? 'border-red-500' : 'border-gray-100'} rounded-md mt-2`}>
                        <input 
                            type="text" 
                            placeholder='0902233242' 
                            name='cardNumber'
                            minLength={10}
                            maxLength={15}
                            required
                            className={`w-full px-4 py-2 ${cardNumber.error ? 'border-2 border-red' : ""}`}
                            value={cardNumber.value}
                            onChange={(e) => setCardNumber({...cardNumber, value: e.target.value})}
                        />
                    </div>
                </div>

                <div className='my-4'>
                    <label htmlFor="accountNumber" className='text-[#7F7F80] text-sm'>Kindly upload the picture of the card together with the receipt</label>
                    <div className={`border-2 ${proofImage.error ? 'border-red-500' : 'border-gray-100'} rounded-md mt-2 h-32 w-full flex justify-center`}>
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
                    <button className='rounded-md bg-[#042f9c] text-white px-6 py-3' 
                        onClick={() => handleProcceede()}
                    >
                        { loading ? 'Proccessing' : 'Proceed' }
                    </button>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default TradeGiftcardStepTwo;