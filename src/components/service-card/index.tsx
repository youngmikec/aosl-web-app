import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/card';

type Props = {
    title: string;
    subTitle: string;
    img: string;
    link: string;
    linkText: string;
}

const ServiceCard = ({title, subTitle, img, link, linkText}: Props) => {
    return (
        <>
            <div className='w-full text-center min-48'>
                <Link to={link}>
                    <Card type='sm'>

                        <p className=''>{title}</p>
                        <h5 className='text-xs'>{subTitle}</h5>

                        <div className='flex justify-center my-6'>
                            <img src={img} className='object-contain h-40 w-48 sm:h-40 md:max-h-40 lg:h-32' alt="service" />
                        </div>
                        {/* <button className='bg-[#042f9c] w-10/12 rounded-lg text-white my-4 '>
                        </button> */}
                    </Card>
                </Link>
            </div>
        </>
    )
}

export default ServiceCard;