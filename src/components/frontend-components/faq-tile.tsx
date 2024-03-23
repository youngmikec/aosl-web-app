import React, { useState } from 'react';

//  images and icons
import { BsFillCaretDownFill } from "react-icons/bs";

type Props = {
  question: string;
  answers: string[];
}

const FaqTitle = ({ question, answers }: Props) => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  const toggleDisplay = () => {
    setIsDisplay((prev) => !prev);
  }

  return (
    <>
        <div 
          className="mx-auto w-full sm:w-9/12 md:w-6/12 lg:w-5/12 shadow-md px-8 my-4 py-8 cursor-pointer"
          onClick={() => toggleDisplay()}
        >
            <div className="flex  mx-auto flex-col  w-full">
                <div 
                  className='flex mx-auto justify-between w-full hover:text-[#042f9c]'
                >
                  <p className='text-gray-800 text-md'>{ question }</p>
                  <BsFillCaretDownFill className={`self-center ${isDisplay && 'rotate-180'}`} />
                </div>

                {
                  isDisplay && 
                  <div>
                      <div className=' text-gray-700 text-sm list-none'>
                        {
                          answers.length > 0 && 
                          answers.map((item: string, idx: number) => {
                            return (
                              <p key={idx} className='my-4'>{item}</p>
                            )
                          })
                        }
                      </div>
                  </div>
                }
            </div>
        </div>
    </>
  )
}

export default FaqTitle