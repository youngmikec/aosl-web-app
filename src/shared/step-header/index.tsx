import React, { useEffect, useState } from 'react';
import { AiFillExclamationCircle, AiFillLeftCircle } from 'react-icons/ai';
import { Step } from '../../common';

type Props = {
    title: string;
    info: string;
    steps: Step[];
    step?: number;
    changeStep: () => any
}

const StepHeader = ({ title, info, steps, step, changeStep }: Props) => {
    const [stepsArray, setStepArray] = useState<Step[]>([]);    

    useEffect(() => {
        setStepArray(steps);
    }, [steps]);

    useEffect(() => {
        steps.forEach((item, idx) => {
            ((idx + 1) === step) ? item.isActive = true : item.isActive = false;
        })
        setStepArray(steps);
    }, [step]);

    return (
        <>
            <div className="w-full">
                <div className="flex justify-between">
                    <h3 className='text-[#042f9c] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-3 mb-8'> { title } </h3>
                    {
                        step && step > 1 &&
                        <div className=''>
                            <div className='text-[#042f9c]'>
                                <p className='text-[#042f9c] text-xl inline-flex cursor-pointer' onClick={() => changeStep()}>
                                    <AiFillLeftCircle className='mr-2 my-auto' />
                                    <span>Back</span>
                                </p>
                            </div>
                        </div>
                    }
                </div>

                <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 flex justify-start">
                    {
                        stepsArray.length > 0 && 
                        stepsArray.map((step: Step, key: number) => {
                            return <div className='text-center flex-1' key={key}>
                            <p className='text-[#7F7F80] text-lg'>Step {key + 1} </p>
                            <p className={`px-1 sm:px-4 md:px-5 lg:px-6 py-3 capitalize text-[0.5rem] sm:text-[0.6rem] md:text-[0.6rem] lg:text-[0.6rem] ${ step.isActive ? 'bg-[#042f9c] text-white' : 'bg-[#D9D9D9] text-[#7F7F80]'}`}>{ step.title }</p>
                        </div>
                        })
                    }
                </div>


                {/* info section */}
                <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 my-6 rounded-md border-2 border-[#d30b0b4b] p-4 flex justify-start">
                    <div className='mr-6 my-auto h-4'>
                        <AiFillExclamationCircle className="text-[#d30b0baf]" />
                    </div>
                    <div>
                        <p className='text-[#7F7F80] text-sm'>{ info }</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepHeader;