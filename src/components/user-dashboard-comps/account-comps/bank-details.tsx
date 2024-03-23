import React from 'react'
import Card from '../../../shared/card';

import cardInfo from '../../../assets/icons/master-card.png';

const BankDetails = () => {
  return (
    <>
       <div className='w-full'>
        
            <div className='my-4 py-5 px-10'>
                <h3 className='text-[#7F7F80] text-sm font-semibold mb-6'>Bank Information</h3>
                <Card type='lg'>
                    <div className='p-4'>
                        <div className='flex justify-start'>
                            <div className='mr-8'>
                                <div className='border-2 border-[#ebebeb] p-2 rounded-md'>
                                    <img src={cardInfo} alt="card type" width="50px" height="50px" />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <span className='inline mx-2 text-[#7F7F80] text-xl font-bold'>Master Card</span>
                                    <span className='inline mx-2 text-[#7F7F80] text-sm font-thin'>8981********3456</span>
                                </div>

                                <div className='my-4'>
                                    <p className='text-[#7F7F80] font-thin mx-2'>Expires 09/24</p>
                                </div>

                                <div className='flex justify-end'>
                                    <div className="mx-2 text-[#042f9c]">
                                        <p>
                                            Remove
                                        </p>
                                    </div>
                                    <div className="mx-2 text-[#042f9c]">
                                        <p>Edit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className='my-4 py-5 px-10'>
                <div className='border-2 border-gray-200 rounded-md mt-2 h-40 w-full flex justify-center'>
                    <button className='text-center text-[#042f9c]'>
                        + <br /> Choose file
                    </button>
                    <input type="file" className='hidden' />
                </div>
            </div>
        </div> 
    </>
  )
}

export default BankDetails;