import React from 'react';
import { Bars, SpinningCircles, Circles, Rings } from 'react-loading-icons'

import './style.css';

type Props = {
    image: string;
    status: 'PENDING' | 'FAILED' | 'COMPLETED';
    title: string;
    value: number;
    loading: boolean;
}

const DashboardCard = ({image, status, title, value, loading}: Props) => {
    let bgColor = (state: string): string => {
        let color: string = '';
        if(state === 'PENDING') color = '#042f9c'
        if(state === 'FAILED') color = '#FF9120'
        if(state === 'COMPLETED') color = '#71DD37'
        return color
    }

    const style = {
        background: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        blendMode: "overlay",
        backgroundColor: bgColor(status),
        borderRadius: '8px',
        opacity: 0.7
    }

  return (
    <>
        {/* w-10/12 sm:w-full md:w-full lg:w-full */}
        <div>
            <div className='w-full py-4 px-4 sm:px-4 md:px-6 lg:px-5 text-white' style={style}>
                <p className='text-white text-lg sm:text-lg md:text-xl lg:text-xl'>{ title }</p> 
                <div className='my-4'>
                    <div className='flex gap-6'>
                        <span className='text-sm sm:text-lg md:text-xl lg:text-xl my-auto'>Total:</span> 
                        {
                            !loading &&
                            <span className='text-xl sm:text-xl md:text-4xl lg:text-4xl'>{ value }</span>
                        }
                        {
                            loading && <SpinningCircles fontSize={3} color='#ffffff' />
                        }
                    </div>
                </div>
            </div>           
        </div>
    </>
  )
}

export default DashboardCard