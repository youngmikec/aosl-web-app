import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import SuccessAlert from '../../../shared/alerts/success-alert';
import { CLEAR_SELL_CRYPTO_ORDER } from '../../../store/orders';

const SellCryptoStepFive = () => {
    const dispatch = useDispatch();

    const clearState = () => {
        dispatch(CLEAR_SELL_CRYPTO_ORDER());
    }
    
    return (
        <>
             <div className="w-full">
                <div className="self-center flex my-20">
                <SuccessAlert 
                    title='Great!' 
                    subTitle='Order Created'
                    msg="expect your money if few minutes"
                />
                </div>
                <div className='my-8 flex justify-center'>
                <button 
                    onClick={() => { clearState() }}
                    className='rounded-md bg-[#134FE7] text-white px-6 py-3'
                >
                    <Link to="/history">Check Status</Link>
                </button>
                </div>
            </div>
        </>
    )
}

export default SellCryptoStepFive;