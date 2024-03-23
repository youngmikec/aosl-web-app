import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';

import { Airtime, ApiResponse, Step } from '../../../common';
import Card from '../../../shared/card';
import StepHeader from '../../../shared/step-header';


// components
import AirtimeStepOne from './airtime-step-one';
import AirtimeStepThree from './airtime-step-three';
import AirtimeStepTwo from './airtime-step-two';
import AirtimeStepFour from './airtime-step-four';
import { RETREIVE_AIRTIME } from '../../../services/airtimes';
import { APPEND_TO_AIRTIME_ORDER } from '../../../store/orders';

const AirtimeComp = () => {
    const dispatch = useDispatch();
    // states
    const [loading, setLoading] = useState<boolean>(false);
    const [airtimeRecords, setAirtimeRecords] = useState<Airtime[]>([])
    const [step, setStep] = useState<number>(1);
    const [status, setStatus ] = useState<string>('error')
    const [selectedAirtime, setSelectedAirtime] = useState<Airtime | null>(null);

    const prevStep = () => {
        setStep(prev => prev - 1)
    }

    const airtimeSteps: Step[] = [
        {
            title: 'Choose asset',
            isActive: true
        },
        {
            title: 'account details',
            isActive: false
        },
        {
            title: 'upload proof',
            isActive: false
        },
        {
            title: 'status',
            isActive: false
        },
    ]


    const retreiveAirtimeRecords = () => {
        setLoading(true);
        const queryString: string = `?sort=name&status=ACTIVE`;
        RETREIVE_AIRTIME(queryString).then((res: AxiosResponse<ApiResponse>) => {
            setLoading(false);
            const { payload } = res.data;
            setAirtimeRecords(payload);
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })
    }

    useEffect(() => {
        retreiveAirtimeRecords();
    }, []);

    return (
        <>
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'> */}
            <div className='w-full'>
                <StepHeader 
                    title='Airtime To Cash'
                    steps={airtimeSteps}
                    step={step}
                    changeStep={prevStep}
                    info="Use USSD Code: Dial *600*Recipient's Number*Amount*PIN#. (Default Pin; 1234). Kindly note that you can only transfer 5,000 at a time and there's a sim daily limit of 100,000."  
                />

            </div>
            <div className='flex-4 flex-col sm:flex-row md:flex-row lg:flex-row my-4'>
                <div className='w-full sm:w-10/12 md:w-9/12 lg:w-8/12 m-0 sm:mr-3'>
                    <h3 className="mb-3 text-[#7F7F80]">Select Provider</h3>
    
                    <Card type="lg">
                        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
                            {
                                airtimeRecords.length > 0 && 
                                airtimeRecords.map((item: Airtime, idx: number) => {
                                    return (<div 
                                                key={idx} 
                                                onClick={() => {
                                                    setSelectedAirtime(item)
                                                    dispatch(APPEND_TO_AIRTIME_ORDER({ airtime: item }))
                                                }}
                                                className='border-2 border-gray-100 text-center rounded-md relative mx-auto p-1 lg:px-4 lg:py-2'
                                            >
                                                <img src={item?.networkImage} className="text-center" alt={item?.shortName} width="50px" height="50px" />
                                            {
                                                selectedAirtime && selectedAirtime.id === item.id && 
                                                <AiFillCheckCircle className='text-[#042f9c] absolute top-0 right-0' />
                                            }
                                        </div>)
                                })
                            }    
                        
                        </div>

                        {/* airtime steps */}

                        {
                            step === 1 && 
                            <AirtimeStepOne changeStep={setStep} product={selectedAirtime} />
                        }
                        {
                            step === 2 && 
                            <AirtimeStepTwo changeStep={setStep}/>
                        }
                        {
                            step === 3 && 
                            <AirtimeStepThree changeStep={setStep} changeStatus={setStatus} product={selectedAirtime} />
                        }
                        {
                            step === 4 && 
                            <AirtimeStepFour changeStep={setStep} status={status} />
                        }

                        {/* airtime steps */}
                    </Card>
                </div>
            </div>

        </>
    )
}

export default AirtimeComp