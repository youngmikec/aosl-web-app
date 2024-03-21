import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';

import { ApiResponse, CryptoCurrency, Step } from '../../../common';
import { RETREIVE_CRYPTO } from '../../../services';
import Card from '../../../shared/card';
import StepHeader from '../../../shared/step-header';
import SellCryptoStepFive from './sell-crypto-step-five';
import SellCryptoStepFour from './sell-crypto-step-four';
import SellCryptoStepOne from './sell-crypto-step-one';
import SellCryptoStepThree from './sell-crypto-step-three';
import SellCryptoStepTwo from './sell-crypto-step-two';

const SellCryptoComp = () => {
    const steps: Step[] = [
        {
            title: 'Choose asset',
            isActive: true
        },
        {
            title: 'copy address',
            isActive: false
        },
        {
            title: 'account details',
            isActive: false
        },
        {
            title: 'upload proof',
            isActive: false
        },
    ]
    const prevStep = () => {
        setStep(prev => prev - 1)
    }

    const [step, setStep] = useState<number>(1);
    const [status, setStatus ] = useState<string>('error');
    const [loading, setLoading] = useState<boolean>(false);
    const [cryptoRecords, setCryptoRecords] = useState<CryptoCurrency[]>([])

    const retreiveCryptos = () => {
        setLoading(true);
        const queryString: string = `?sort=name&status=ACTIVE`;
        RETREIVE_CRYPTO(queryString).then((res: AxiosResponse<ApiResponse>) => {
            setLoading(false);
            const { payload } = res.data;
            setCryptoRecords(payload);
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })

    }

    useEffect(() => {
        retreiveCryptos();
    }, [])


    return (
        <>
            <div className='w-full'>
                <StepHeader 
                    title='Sell Crypto'
                    steps={steps}
                    step={step}
                    changeStep={prevStep}
                    info="While trading with us, make sure you copy the right address for your deposit to avoid lost of fund. upload a screenshot of your transaction as well."  
                />

            </div>

            <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row my-4'>
                <div className='w-full sm:w-11/12 md:w-9/12 lg:w-8/12 m-0 sm:mr-3 lg:ml-auto lg:mr-4'>
                    {/* <h3 className="mb-3 text-[#7F7F80]">Select Provider</h3> */}
                    <Card type="lg">
                        {/* sell crypto steps */}
                        {
                            step === 1 &&
                            <SellCryptoStepOne
                                changeStep={setStep}
                                cryptos={cryptoRecords}
                            />
                        }

                        {
                            step === 2 && 
                            <SellCryptoStepTwo 
                                changeStep={setStep} 
                                cryptos={cryptoRecords} 
                            />
                        }

                        {
                            step === 3 && 
                            <SellCryptoStepThree changeStep={setStep} />
                        }

                        {
                            step === 4 && 
                            <SellCryptoStepFour changeStep={setStep} changeStatus={setStatus} />
                        }

                        {
                            step === 5 && 
                            <SellCryptoStepFive />
                        }


                        {/* sell crypto steps */}
                    </Card>
                </div>

                <div className='w-full md:mx-3 my-4 md:my-0 lg:my-0 sm:w-6/12 md:w-5/12 lg:w-4/12'>
                    <Card type="lg">
                        {/* Crypto rates */}
                        <div className="my-4 text-center">
                            <h3 className='text-[#134FE7] font-bold text-xl'>Current Rate Price</h3>
                        </div>
                        <div>
                            <div className="flex justify-between my-3">
                                <div><p className='text-[#77777e]'><strong>Name</strong></p></div>
                                <div><p className='text-[#7F7F80]'><strong>Rate</strong></p></div>
                            </div>

                            {
                                cryptoRecords.length > 0 ? 
                                cryptoRecords.map((item: CryptoCurrency, idx: number) => {
                                    return <div className="flex justify-between my-3" key={idx}>
                                    <div>
                                        <img src={item?.cryptoImage} width="25px" height="25px" className="rounded-full mx-2 inline-flex" alt="crypto" />
                                        <p className='text-[#7F7F80] font-thin inline'><strong>{item?.shortName}</strong></p>
                                    </div>
                                    <div><p className='text-[#134FE7] font-thin text-sm'><strong>{item?.sellingRate}/$</strong></p></div>
                                </div>
                                }) :

                                <div className="flex justify-between my-3">
                                    <div><p className='text-[#7F7F80]'><strong>No Record found</strong></p></div>
                                    <div><p className='text-[#134FE7] font-thin'><strong>0/$</strong></p></div>
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

export default SellCryptoComp;