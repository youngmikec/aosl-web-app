import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCancel } from "react-icons/md";

import { RootState } from '../../store';


import { CloseAppModal } from '../../store/modal';

type Props = {
    children: ReactNode,
    title: string;
}

const AppModalComp = ({ children, title }: Props) => {
    const dispatch = useDispatch();
    const displayModal: boolean = useSelector((state: RootState) => state.appModal.displayModal);
    // close modal
    const closeModal = () => {
        dispatch(CloseAppModal());
    }

    return (
        <>  
            {
                displayModal &&
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#4242428f] w-full h-full z-30 overflow-scroll">
                    <div className='my-12'>

                        <div className="bg-white p-2 lg:p-4 rounded-2xl mx-auto w-11/12 sm:w-11/12 md:w-10/12 lg:w-7/12">
                            <div className='flex justify-between mb-8'>
                                <div>
                                    <h1 className="text-lg md:text-2xl lg:text-2xl font-semibold">{ title }</h1>
                                </div>
                                <div className="relative bg-white rounded-full shadow">
                                    <button onClick={() => closeModal()} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-white shadow-md hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                                        {/* <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg> */}
                                        <MdCancel size={22} />
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                            </div>

                            {/* content */}
                            <div className='min-h-52 pt-4'>
                            {
                                children
                            }
                            </div>
                            {/* content */}
                        </div>
                        
                    </div>
                </div>

            }
        </>
    )
}

export default AppModalComp;