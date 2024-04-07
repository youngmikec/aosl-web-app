import React from 'react';
import { useDispatch } from 'react-redux';
import { CloseAppModal } from '../../store/modal';

type Props = {
    id?: string,
    deleting: boolean,
    action?: (id: string) => any
}

const DeleteComp = ({ id, action, deleting }: Props) => {
    const dispatch = useDispatch();
    // close modal
    const closeModal = () => {
        dispatch(CloseAppModal());
    }

    const handleDelete = () => {
        const recordId: string = id ? id : '';
        return action && action(recordId);
    }

    return (
        <>
            <div className="p-6 text-center my-8">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this record?</h3>
                <button 
                    data-modal-hide="popup-modal" 
                    type="button"
                    onClick={() => handleDelete()}
                    className="
                        text-white bg-red-600 hover:bg-red-800 focus:ring-4 
                        focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                        text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                    Yes, I'm sure
                </button>
                <button 
                    data-modal-hide="popup-modal" 
                    type="button"
                    onClick={() => closeModal()}
                    className="
                        text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none 
                        focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 
                        hover:text-gray-900 focus:z-10"
                    >No, cancel</button>
            </div>
        </>
    )
}

export default DeleteComp;