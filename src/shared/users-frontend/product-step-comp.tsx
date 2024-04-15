import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import AppModalComp from '../app-modal';
import ContactUsForm from '../../components/frontend-components/contact-us-form';
import { useDispatch } from 'react-redux';
import { OpenAppModal } from '../../store/modal';

export type Step = {
    title: string;
    subTitle: string;
}

type Props = {
    title: string;
    subTitle: string;
    imageUrl: string;
    steps: Step[]
}


const ProductStepComp = ({ title, subTitle, imageUrl, steps }: Props) => {

    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(OpenAppModal());
    }

    const style = {
        backgroundImage: `url("${imageUrl}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        width: '100%',
        height: '30rem',
    }
    
  return (
    <>
        <div className='w-full py-16'>
            <div className="mx-auto w-10/12">
                <div className="text-center">
                    <h3 className="text-[#585858] text-2xl text-center font-semibold my-5">{ title }</h3>
                    <p className=''>{ subTitle }</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-12">
                    <div>
                        {
                            subTitle && 
                            <h3 className="text-[#042f9c] text-xl font-bold my-8">{subTitle}</h3>
                        }

                        {
                            steps.length > 0 &&
                            steps.map((item: Step, key: number) => {
                                return <div key={key} className="flex justify-start my-9">
                                    <p className="mr-4 text-[#042f9c] list-disc"></p>
                                    <div className='mx-3'>
                                        <h3 className='font-bold mb-2'>{ item.title }</h3>
                                        <p className='text-[#585858]'>{ item.subTitle }</p>
                                    </div>
                                </div>
                            })
                        }

                        <div className='my-8'>
                            <button 
                                className="py-3 px-8 rounded-md bg-[#042f9c] text-white"
                                onClick={openModal}
                            >
                                Mail Us Now
                            </button>
                        </div>
                    </div>

                    <div style={style}>
                        {/* <img src={imageUrl} alt="illustration" width="100%" className='h-full my-auto w-full' /> */}
                    </div>
                </div>
            </div>
        </div>

        <AppModalComp title='Mail Us Now'>
            <ContactUsForm showFullForm={false} />
        </AppModalComp>
    </>
  )
}

export default ProductStepComp