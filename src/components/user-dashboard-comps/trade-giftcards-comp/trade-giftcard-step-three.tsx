import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';

import { RootState } from '../../../store';
import { ApiResponse, Bank } from '../../../common';
import { CREATE_ORDER, RETREIVE_BANKS } from '../../../services';

type Props = {
    changeStep: (data: number) => any,
    changeStatus: (data: string) => any,
}

const TradeGiftcardStepThree = ({changeStep, changeStatus}: Props) => {
    const giftcardOrderState = useSelector((state: RootState) => state.BuyGiftcardOrderSlice.value);

    const [loading, setLoading] = useState<boolean>(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [bankName, setBankName] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [accountName, setAccountName] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [accountNumber, setAccountNumber] = useState<{value: string, error: boolean}>({value: '', error: false});

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

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if(bankName.value === '' || undefined || null){
            isValid = false;
            setBankName({...bankName, error: true});
        }else{
            setBankName({...bankName, error: false});
        }
        if(accountName.value === '' || undefined || null){
            isValid = false;
            setAccountName({...accountName, error: true});
        }else{
            setAccountName({...accountName, error: false});
        }
        if(accountNumber.value === '' || undefined || null){
            isValid = false;
            setAccountNumber({...accountNumber, error: true});
        }else{
            setAccountNumber({...accountNumber, error: false});
        }
        if(accountNumber.value.length < 10 || accountNumber.value.length > 10){
            isValid = false;
            setAccountNumber({...accountNumber, error: true});
        }else{
            setAccountNumber({...accountNumber, error: false});
        }
        return isValid;
    }

    const handleSubmit = () => {
        if(inputCheck()){
            setLoading(true);
            const data = {
                orderType: "GIFTCARD",
                paymentMethod: 'BANK',
                amount: giftcardOrderState?.amount,
                giftcard: giftcardOrderState?.giftcard,
                cardNumber: giftcardOrderState?.cardNumber,
                cardType: giftcardOrderState?.cardType,
                amountReceivable: giftcardOrderState?.amountReceivable,
                proofImage: giftcardOrderState?.proofImage,
                bankName: bankName.value,
                accountName: accountName.value,
                accountNumber: accountNumber.value,
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
    }

    const retrieveBanks = () => {
        const queryString: string = `?sort=name`;
        setLoading(true);
        RETREIVE_BANKS(queryString).then((res: AxiosResponse<ApiResponse>) => {
            const { message, success, payload } = res.data;
            if(success){
                setLoading(false);
                setBanks(payload);
                console.log('message', message);
            }
        }).catch((err: any) => {
            setLoading(false);
            console.log(err);
        })
    }

    useEffect(() => {
        retrieveBanks();
    }, [])

    return (
        <>
            <div className='w-full'>

                <div className='my-4'>
                    <label htmlFor="bankName" className='text-[#7F7F80] text-sm'>Bank Name</label>
                    <div className={`border-2 ${bankName.error ? 'border-red-500' : 'border-gray-100'} rounded-md mt-2`}>
                        <select 
                            name="bankName" 
                            id="bankName" 
                            onChange={(e) => setBankName({...bankName, value: e.target.value})}
                            className={`w-full px-4 py-2 ${bankName.error ? 'border-2 border-red' : ""}`}
                        >
                            {
                                banks.length > 0 ? 
                                banks.map((item: Bank, idx: number) => {
                                    return (
                                        <option key={idx} value={item.name}>{ item.name }</option>
                                    )
                                }) : 
                                <option value="">No bank available</option>
                            }
                        </select>
                    </div>
                </div>

                <div className='my-4'>
                    <label htmlFor="accountName" className='text-[#7F7F80] text-sm'>Account Name</label>
                    <div className={`border-2 ${accountName.error ? 'border-red-500' : 'border-gray-100'} rounded-md mt-2`}>
                        <input 
                            type="text" 
                            name='accountName' 
                            className={`w-full px-4 py-2 ${accountName.error ? 'border-2 border-red' : ""}`}
                            value={accountName.value}
                            onChange={(e) => setAccountName({...accountName, value: e.target.value})}
                        />
                    </div>
                </div>

                <div className='my-4'>
                    <label htmlFor="accountNumber" className='text-[#7F7F80] text-sm'>Account Number</label>
                    <div className={`border-2 ${accountNumber.error ? 'border-red-500' : 'border-gray-100'} rounded-md mt-2`}>
                        <input 
                            type="text" 
                            placeholder='0902233242' 
                            name='accountNumber'
                            minLength={10}
                            maxLength={10}
                            className={`w-full px-4 py-2 ${accountNumber.error ? 'border-2 border-red' : ""}`}
                            value={accountNumber.value}
                            onChange={(e) => setAccountNumber({...accountNumber, value: e.target.value})}
                        />
                    </div>
                </div>

                
                <div className='my-4 flex justify-center'>
                    <button className='rounded-md bg-[#042f9c] text-white px-6 py-3' 
                        onClick={() => handleSubmit()}
                    >
                        { loading ? 'Proccessing' : 'Proceed' }
                    </button>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default TradeGiftcardStepThree;