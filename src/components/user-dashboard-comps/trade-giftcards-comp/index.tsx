import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';


import Card from '../../../shared/card';
import { ApiResponse, Step } from '../../../common';
import { RETREIVE_GIFTCARD } from '../../../services';
import StepHeader from '../../../shared/step-header';
import TradeGiftcardStepTwo from './trade-giftcard-step-two';
import TradeGiftcardStepOne from './trade-giftcard-step-one';
import TradeGiftcardStepThree from './trade-giftcard-step-three';
import { GiftCard } from '../../../common/giftcard';
import TradeGiftcardStepFour from './trade-giftcard-step-four';


const TradeGiftCardsComp = () => {
    const steps: Step[] = [
        {
            title: 'Choose Card',
            isActive: true
        },
        {
            title: 'Upload Image',
            isActive: false
        },
        {
            title: 'Account Details',
            isActive: false
        },
        {
            title: 'Status',
            isActive: false
        }
    ]
    const prevStep = () => {
        setStep(prev => prev - 1)
    }

    //states
    const [step, setStep] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus ] = useState<string>('error');
    const [giftcards, setGiftcards] = useState<GiftCard[]>([]);

    const retreiveGiftCards = () => {
        setLoading(true);
        RETREIVE_GIFTCARD().then((res: AxiosResponse<ApiResponse>) => {
            const { message, success, payload } = res.data;
            if(success){
                setLoading(false);
                console.log(message);
                setGiftcards(payload);
            }
        }).catch(err => {
            const { message } = err.resposne.data;
            setLoading(false);
            console.log(message);
        })
    }

    useEffect(() => {
        retreiveGiftCards()
    }, [])

    return (
        <>
            <div className='w-12/12'>
                <StepHeader 
                    title='Trade Giftcard'
                    steps={steps}
                    step={step}
                    changeStep={prevStep}
                    info="While trading with us, make sure you keep your reciept/ invoice used in purchasing the giftcard. Enter your gift card details in each field below to calculate how much naira"  
                />

            </div>

            <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row my-4'>
                <div className='w-full sm:w-11/12 md:w-9/12 lg:w-8/12 m-0 sm:mr-3 lg:ml-auto lg:mr-8'>
                    {/* <h3 className="mb-3 text-[#7F7F80]">Select Provider</h3> */}
                    <Card type="lg">
                        {/* trade giftcard steps */}
                        {
                            step === 1 &&
                            <TradeGiftcardStepOne changeStep={setStep} giftcards={giftcards} />
                        }
                        {
                            step === 2 &&
                            <TradeGiftcardStepTwo changeStep={setStep} changeStatus={setStatus} />
                        }
                        {
                            step === 3 &&
                            <TradeGiftcardStepThree changeStep={setStep} changeStatus={setStatus} />
                        }
                        {
                            step === 4 &&
                            <TradeGiftcardStepFour changeStep={setStep} status={status} />
                        }
                        {/* trade giftcard steps */}
                    </Card>
                </div>

                <div className='w-full md:mx-3 my-4 md:my-0 lg:my-0 sm:w-6/12 md:w-5/12 lg:w-4/12'>
                    <Card type="lg">
                        {/* Crypto rates */}
                        <div className="my-4 text-center">
                            <h3 className='text-[#042f9c] font-bold text-xl'>Best Giftcard so far</h3>
                        </div>
                        <div>
                            <div className="flex justify-between my-3">
                                <div><p className='text-[#77777e]'><strong>Name</strong></p></div>
                                <div><p className='text-[#7F7F80]'><strong>Rate</strong></p></div>
                            </div>
                            {
                                giftcards.length > 0 ?
                                giftcards.map((item: GiftCard, idx: number) => {
                                    return (
                                        <div key={idx} className="flex justify-between my-3">
                                            <div><p className='text-[#7F7F80] font-thin text-sm'><strong>{item?.name}</strong></p></div>
                                            <div><p className='text-[#042f9c] font-thin'><strong>{item?.rate}/$</strong></p></div>
                                        </div>
                                    )
                                }):
                                <div>
                                    <p className='text-[#7F7F80] font-thin text-sm'><strong>No Card available</strong></p>
                                </div>

                            }
                            
                        </div>
                        {/* Crypto rates */}
                    </Card>
                </div>
            </div>
        </>
    )
}

export default TradeGiftCardsComp;