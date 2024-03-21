import React, { useState, useEffect, useMemo } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { whatsAppUrl } from '../../../constants';
import { RootState } from '../../../store';
import { APPEND_TO_BUY_CRYPTO_ORDER } from '../../../store/orders';

type Props = {
    changeStep: (data: number) => any,
}

const BuyCryptoStepTwo = ({ changeStep }: Props) => {
    const dispatch = useDispatch();
    const buyCryptoState = useSelector((state: RootState) => state.BuyCryptoOrderSlice.value);

    const [cryptoName, setCryptoName] = useState<string | undefined>('');
    const [amount, setAmount] = useState<{value: number, error: boolean}>({value: 0, error: false});
    const [amountReceivable, setAmountReceivable] = useState<{value: number, error: boolean}>({value: 0, error: false});
    const [rate, setRate] = useState<number>(0);

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if(amount.value === 0 || undefined || null){
            isValid = false;
            setAmount({...amount, error: true});
        }else if(amount.value < 1000){
            isValid = false;
            //show notification about amount
        }else{
            setAmount({...amount, error: false});
        }
        if(amountReceivable.value === 0 || undefined || null){
            isValid = false;
            setAmountReceivable({...amountReceivable, error: true});
        }else{
            setAmountReceivable({...amountReceivable, error: false});
        }
        
        return isValid;
    }


    const handleProcceede = () => {
        if(inputCheck()){
            const data = { 
                amount: amount.value, 
                amountReceivable: amountReceivable.value
            };
            dispatch(APPEND_TO_BUY_CRYPTO_ORDER(data))
            changeStep(3)
        }
    }

    const useCalculateReceivable = (rate: number, amount: number) => {
        const receivable: number = useMemo(() => {
            if(rate && amount){
                const num = amount / rate;
                return parseFloat(num.toFixed(2));
            }else{
                return 0;
            }
        }, [rate, amount]);

        useEffect(() => {
            setAmountReceivable({value: receivable, error: false});
        }, [receivable]);
    }

    useCalculateReceivable(rate, amount.value);

    useEffect(() => {
        buyCryptoState?.rate && setRate(buyCryptoState.rate);
        buyCryptoState?.cryptoName && setCryptoName(buyCryptoState.cryptoName);
    }, [buyCryptoState])

    return (
        <>
        <div className='w-full'>
            <div className='my-4'>
                <label htmlFor="amount" className='text-[#7F7F80] text-sm'>Amount in (NGN)</label>
                <div className='border-2 border-gray-100 rounded-md mt-2'>
                    <input 
                        type="number" 
                        placeholder='1000 ' 
                        name="amount" 
                        className='w-full px-4 py-2 '
                        value={amount.value}
                        onChange={(e) => {
                            setAmount({...amount, value: parseInt(e.target.value)})
                        }}
                    />
                </div>
            </div>
            <div className='my-4'>
                <label htmlFor="amountReceivable" className='text-[#7F7F80] text-sm'>You will receive ${amountReceivable.value} worth of { cryptoName } </label>
                <div className='border-2 border-gray-100 rounded-md mt-2'>
                    <input 
                    type="number" 
                    placeholder='1000 ' 
                    name="amountReceivable" 
                    className='w-full px-4 py-2 '
                    disabled={true}
                    value={amountReceivable.value}
                />
                </div>
                <p className="text-sm text-[#7F7F80] "> Minimuim we sell is 1,000 (NGN)</p>
            </div>


        
            <div className='my-8 flex justify-center'>
                <button className='rounded-md bg-[#134FE7] text-white px-6 py-3'onClick={
                    (e) => {
                        e.preventDefault();
                        handleProcceede();
                    }
                }>Submit</button>
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

export default BuyCryptoStepTwo