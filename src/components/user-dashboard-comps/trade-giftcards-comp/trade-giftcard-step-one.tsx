import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GiftCard } from '../../../common/giftcard';
import { RootState } from '../../../store';
import { APPEND_TO_BUY_GIFTCARD_ORDER } from '../../../store/orders';

type Props = {
    changeStep: (data: number) => any,
    giftcards?: GiftCard[],
}

const TradeGiftcardStepOne = ({ changeStep, giftcards }: Props) => {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState<{value: number, error: boolean}>({value: 0, error: false});
    const [receivable, setReceivable] = useState<{value: number, error: boolean}>({value: 0, error: false});
    const [cardType, setCardType] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [giftcard, setGiftcard] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [rate, setRate] = useState<number>(0);

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if(amount.value === 0 || undefined || null){
            isValid = false;
            setAmount({...amount, error: true});
        }else{
            setAmount({...amount, error: false});
        }
        if(receivable.value === 0 || undefined || null){
            isValid = false;
            setReceivable({...receivable, error: true});
        }else{
            setReceivable({...receivable, error: false});
        }
        if(cardType.value === '' || undefined || null){
            isValid = false;
            setCardType({...cardType, error: true});
        }else{
            setCardType({...cardType, error: false});
        }
        if(giftcard.value === '' || undefined || null){
            isValid = false;
            setGiftcard({...giftcard, error: true});
        }else{
            setGiftcard({...giftcard, error: false});
        }
        
        return isValid;
    }

    const handleProcceede = () => {
        if(inputCheck()){
            const data = { 
                amount: amount.value, 
                amountReceivable: receivable.value,
                cardType: cardType.value,
                giftcard: giftcard.value
            };
            dispatch(APPEND_TO_BUY_GIFTCARD_ORDER(data))
            changeStep(2)
        }
    }

    const calculateReceivable = (id: string, amount: number): number => {
        const card: GiftCard | undefined = giftcards && giftcards.find(item => item.id === id);
        if(card){
            const rate: number = card.rate;
            setRate(rate);
            const total: number = !Number.isNaN(amount * rate) ? (amount * rate) : 0;
            return total;
        }else {
            return 0
        }
    }

    const useCalculateReceivable = (id: string, amount: number) => {
        const result = useMemo(() => {
            const total: number =  calculateReceivable(id, amount);
            return total;
        }, [id, amount])

        useEffect(() => {
            setReceivable({value: result, error: false});
        }, [result])
    }

    useCalculateReceivable(giftcard.value, amount.value)

 
    return (
        <>
            <div className='w-full'>
                <div className='my-4'>
                    <label htmlFor="cardType" className='text-[#7F7F80] text-sm'>Card Type</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <select 
                            name="cardType" 
                            id="cardType" 
                            className={`w-full px-4 py-2 ${cardType.error ? 'border-2 border-red' : ""}`}
                            onChange={(e) => {
                                setCardType({...cardType, value: e.target.value})
                            }}
                        >
                            <option value="">select card type</option>
                            <option value="PHYSICAL">Physical</option>
                            <option value="ECODE">Ecode</option>
                        </select>
                    </div>
                </div>

                <div className='my-4'>
                    <label htmlFor="giftcard" className='text-[#7F7F80] text-sm'>Card Name</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <select 
                            name="giftcard" 
                            id="giftcard" 
                            className={`w-full px-4 py-2 ${giftcard.error ? 'border-2 border-red' : ""}`}
                            onChange={(e) => {
                                setGiftcard({...giftcard, value: e.target.value})
                            }}
                        >
                            <option value="">Choose Giftcard</option>
                            {
                                giftcards && giftcards.length > 0 && 
                                giftcards.map((item: GiftCard, idx:number) => {
                                    return (
                                        <option key={idx} value={item.id}>{ item?.name }</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className='my-4'>
                    <label htmlFor="amount" className='text-[#7F7F80] text-sm'>Amount($)</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <input 
                            type="number" 
                            placeholder='Enter amount you want to sell' 
                            name="amount" 
                            className={`w-full px-4 py-2 ${amount.error ? 'border-2 border-red' : ""}`}
                            value={amount.value}
                            onChange={(e) => {
                                setAmount({...amount, value: parseInt(e.target.value)})
                            }}
                        />
                    </div>
                </div>

                <div className='my-4'>
                    <label htmlFor="amountReceivalble" className='text-[#7F7F80] text-sm'>Receiving Amount in NGN at {rate}/$</label>
                    <div className='border-2 border-gray-100 rounded-md mt-2'>
                        <input 
                            type="text"
                            disabled={true}
                            name='amountReceivalble' 
                            value={receivable.value}
                            onChange={(e) => setReceivable({...receivable, value: parseInt(e.target.value)})}
                            className={`w-full px-4 py-2 ${receivable.error ? 'border-2 border-red' : ""}`}
                        />
                    </div>
                </div>
                
                <div className='my-4 flex justify-center'>
                    <button 
                        className='rounded-md bg-[#042f9c] text-white px-6 py-3'
                        onClick={() => handleProcceede()}
                    >Proceed</button>
                </div>
            </div>
        </>
    )
}

export default TradeGiftcardStepOne;