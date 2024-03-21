import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { APPEND_TO_AIRTIME_ORDER } from '../../../store/orders';
import { ApiResponse, Bank } from '../../../common';
import { RETREIVE_BANKS, VERIFY_ACCOUNT_NUMBER } from '../../../services';
import { AxiosResponse } from 'axios';
import AppLoader from '../../app-loader';


type Props = {
    changeStep: (data: number) => any
}

const AirtimeStepTwo = ({ changeStep }: Props) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
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
        return isValid;
    }

    const handleProcceede = () => {
        setLoading(true);
        if(inputCheck()){
            const data = { 
                bankName: bankName.value, 
                accountName: accountName.value,
                accountNumber: accountNumber.value,
                paymentMethod: "BANK"
            };
            dispatch(APPEND_TO_AIRTIME_ORDER(data))
            changeStep(3)
        }
    }

    const getBankByName = (name: string) => {
        const bank = banks.find((item: Bank) => item.name === name);
        if(bank) setSelectedBank(bank);
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

    const verifyBankDetails = (bank: Bank | null, accountNumber: string) => {
        setVerifying(true);
        if(bank){
            VERIFY_ACCOUNT_NUMBER(bank.bankCode, accountNumber).then(res => {
                setVerifying(false);
                const { data } = res;
                const { status, message } = data;
                if(status){
                    setAccountName({...accountName, value: data.account_name})
                    notify('success', data.account_name);
                }else {
                    setAccountName({...accountName, value: ''})
                    notify('error', 'No account found');
                }
            })
            .catch(err => {
                setVerifying(false);
                console.log('Error', err)
                notify('error', err);
            })
        }
    }

    useEffect(() => {
        retrieveBanks();
    }, [])

    return (
        <>
            <div className='w-full'>
                <div className='my-4'>
                    <label htmlFor="bankName" className='text-[#7F7F80] text-sm'>Bank Name</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <select 
                            name="bankName" 
                            id="bankName" 
                            onChange={(e) => {
                                setBankName({...bankName, value: e.target.value})
                                getBankByName(e.target.value);
                            }}
                            className='w-full px-4 py-2'
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
                    <div className="flex justify-between">
                        <label htmlFor="accountNumber" className='text-[#7F7F80] text-sm'>Account Number</label>
                        
                        {
                            verifying && <AppLoader color='black' />
                        }
                    </div>
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <input 
                            type="text" 
                            name='accountNumber'
                            minLength={10}
                            maxLength={10}
                            className='w-full px-4 py-2'
                            value={accountNumber.value}
                            onChange={(e) => {
                                setAccountNumber({...accountNumber, value: e.target.value})
                                if(e.target.value.length >= 10){
                                    verifyBankDetails(selectedBank, e.target.value)
                                }
                            }}
                        />
                    </div>
                </div>
                
                <div className='my-4'>
                    <label htmlFor="accountName" className='text-[#7F7F80] text-sm'>Account Name</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <input 
                            type="text" 
                            name='accountName' 
                            className='w-full px-4 py-2'
                            disabled={true}
                            value={accountName.value}
                            onChange={(e) => setAccountName({...accountName, value: e.target.value})}
                        />
                    </div>
                </div>

                <div className='my-4 flex justify-center'>
                    <button 
                        className='rounded-md bg-[#134FE7] text-white px-6 py-3'
                        onClick={
                            (e) => {
                                e.preventDefault();
                                handleProcceede();
                            }
                        }
                    >Proceed</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AirtimeStepTwo;