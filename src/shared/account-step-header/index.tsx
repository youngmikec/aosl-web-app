import React from 'react';
import { Step } from '../../common';

type Props = {
    title: string;
    steps: Step[],
    changeStep: (data: number) => any
}

const AccountStepHeader = ({ title, steps, changeStep }: Props) => {
    return (
        <>
            <div className="w-full">
                <h3 className='text-[#042f9c] text-4xl font-bold mt-3 mb-8'> { title } </h3>

                <div className="w-full bg-[#d9d9d92d] rounded-t-xl px-4 py-5">
                    <div className="flex flex-row">
                        {
                            steps.length > 0 && 
                            steps.map((step: Step, key: number) => {
                                return <div className={`px-5 py-2 mx-2 rounded-md capitalize text-[0.8rem] md:text-sm lg:text-sm 
                                    hover:cursor-pointer  ${ step.isActive ? 'bg-[#042f9c]' : 'text-[#7F7F80]'}`} 
                                    key={key}
                                    onClick={() => changeStep(key + 1)}
                                    >
                                    <span className={`${ step.isActive ? 'text-white' : 'text-[#7F7F80]'}`}>{ step.title }</span>
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default AccountStepHeader;