import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';

import { MdContentCopy } from 'react-icons/md';
// import { AiOutlineSave, AiOutlineShareAlt } from 'react-icons/ai';

import { RootState } from '../../../store';
import { CryptoCurrency } from '../../../common';
import { copyTextToClipboard } from '../../../helpers';
import barCode from '../../../assets/images/bar-code.png';

type Props = {
    changeStep: (data: number) => any,
    cryptos?: CryptoCurrency[]
}

const SellCryptoStepTwo = ({ changeStep, cryptos }: Props) => {
    const sellCryptoState = useSelector((state: RootState) => state.SellCryptoOrderSlice.value);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [crypto, setCrypto] = useState<CryptoCurrency | undefined>();

    
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

    const copyWalletAddress = async () => {
        copyTextToClipboard(walletAddress).then(res => {
            notify('success', 'Wallet address copied to clipboard');
        }).catch(err => {
            notify('error', 'Error copying wallet Address');
        })
    }

    const handleProceed = () => {
        changeStep(3)
    }

    const selectCrypto = (id: any) => {
        const retreivedData = cryptos && cryptos.find(item => item.id === id);
        console.log({ retreivedData });
        return setCrypto(retreivedData);
    } 

    useEffect(() => {
        selectCrypto(sellCryptoState?.cryptocurrency);
    }, [sellCryptoState]);

    useEffect(() => {
        if(textRef.current){
            setWalletAddress(textRef.current.innerText)
        }
    }, [])

    return (
        <>
            <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto text-center'>
                <p className='text-[#8C8C8C]'>Copy Address</p>

                <div className='w-full'>
                    <div className='flex justify-center'>
                        <img src={crypto?.barcode || barCode} alt="barcode" width="180px" height="180px" />
                    </div>
                    <div className='text-center my-2'>
                        <p className='text-sm font-bold' ref={textRef}>{crypto?.walletAddress}</p>
                    </div>
                </div>

                <div className="flex justify-center my-6 mx-auto w-7/12">
                    <div 
                        className='hover:bg-[#042f9c] hover:text-white py-2 px-3 rounded-full border-2 border-[#042f9c]'
                    >
                        <button onClick={() => copyWalletAddress() }>
                            <MdContentCopy className="rotate-180 text-lg" />
                        </button>
                    </div>
                    {/* <div className='hover:bg-[#042f9c] hover:text-white p-2 rounded-full border-2 border-[#042f9c]'>
                        <AiOutlineSave className='text-lg' />
                    </div>
                    <div className='hover:bg-[#042f9c] hover:text-white p-2 rounded-full border-2 border-[#042f9c]'>
                        <AiOutlineShareAlt className='text-lg' />
                    </div> */}
                </div>

                <div className="text-center">
                    <p className='font-thin text-[#8C8C8C]'>send only USDT to this address.
                        sending any other coins may result in permanent loss.
                    </p>
                </div>

                <div className='my-4 flex justify-center'>
                    <button 
                        className='rounded-md bg-[#042f9c] text-white px-6 py-3'
                        onClick={() => handleProceed()}
                    >Proceed</button>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default SellCryptoStepTwo
;