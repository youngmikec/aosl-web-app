import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import { ApiResponse, Bank } from '../../../common';
import { RETREIVE_BANKS } from '../../../services';
import { APPEND_TO_SELL_CRYPTO_ORDER } from '../../../store/orders';

type Props = {
    changeStep: (data: number) => any,
}

const SellCryptoStepThree = ({ changeStep }: Props) => {
    const dispatch = useDispatch();

    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [bankName, setBankName] = useState<{value: string, error: boolean}>({value: '', error: false})
    const [accountName, setAccountName] = useState<{value: string, error: boolean}>({value: '', error: false})
    const [accountNumber, setAccountNumber] = useState<{value: string, error: boolean}>({value: '', error: false})

    const inputcheck = (): boolean => {
        let isValid: boolean = true;
        if(bankName.value === '' || undefined) {
            setBankName({...bankName, error: true})
            isValid = false;
        }else{
            setBankName({...bankName, error: false})
        }
        if(accountName.value === '' || undefined) {
            setAccountName({...accountName, error: true})
            isValid = false;
        }else{
            setAccountName({...accountName, error: false})
        }
        if(accountNumber.value === '' || undefined) {
            setAccountNumber({...accountNumber, error: true})
            isValid = false;
        }else{
            setAccountNumber({...accountNumber, error: false})
        }
        return isValid
    }

    const handleProceed = () => {
        if(inputcheck()){
            const data = {
                bankName: bankName.value,
                accountName: accountName.value,
                accountNumber: accountNumber.value
            }
            dispatch(APPEND_TO_SELL_CRYPTO_ORDER(data))
            changeStep(4)
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
                    <div className='border-2 border-gray-100 rounded-md mt-2'>

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
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <input 
                            type="text" 
                            name='accountName' 
                            className={`w-full px-4 py-2 ${accountName.error ? 'border-2 border-red' : ""}`}
                            value={accountName.value}
                            onChange={(e) => setAccountName({...accountName, value: e.target.value})}
                        />
                    </div>
                </div>
                {/* <div className='my-4'>
                    <label htmlFor="confirmAccountNumber" className='text-[#7F7F80] text-sm'>Confirm Account Number</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <input type="text" name="confirmAccountNumber" className={`w-full px-4 py-2 ${bankName.error ? 'border-2 border-red' : ""}`}/>
                    </div>
                </div> */}
                <div className='my-4'>
                    <label htmlFor="accountNumber" className='text-[#7F7F80] text-sm'>Account Number</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <input 
                            type="text" 
                            name='accountNumber' 
                            className={`w-full px-4 py-2 ${accountNumber.error ? 'border-2 border-red' : ""}`}
                            value={accountNumber.value}
                            onChange={(e) => setAccountNumber({...accountNumber, value: e.target.value})}
                        />
                    </div>
                </div>

                <div className='my-4 flex justify-center'>
                    <button 
                        className='rounded-md bg-[#042f9c] text-white px-6 py-3'
                        onClick={() => handleProceed()}
                    >Proceed</button>
                </div>
            </div>
        </>
    )
}

export default SellCryptoStepThree;