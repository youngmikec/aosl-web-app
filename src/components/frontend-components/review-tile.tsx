import React from 'react';

// icons
import { AiFillStar } from 'react-icons/ai';

//components
import Card from '../../shared/card';

type Props = {
    fullName: string;
    review: string;
    stars: number;
}

const ReviewTile = ({ fullName, review, stars }: Props) => {

    // return number of stars based on input number
    const processStars = (stars: number): any => {
        const max: number = 6;
        let aciveStars: number[] = [];
        for(let i = 1; i < max; i++){
            i <= stars ? aciveStars.push(1) : aciveStars.push(0);
        }
        return <div className=''>
            <span className='mr-2 inline'>{stars}</span>
            {
                aciveStars.map((item: number) => {
                    return <AiFillStar key={item} className={`${ item === 1 ? 'text-[#134FE7]' : 'text-[#7F7F80]'} text-sm inline`} />
                })
            }
        </div>
    }

    return (
        <>
            <Card type='sm'>
                <div className='px-4 md:px-6 lg:px-6'>
                    <div className="my-2">
                        <h1 className='text-2xl font-semibold'>{fullName}</h1>
                        <p className='text-[#7F7F80] my-2'>{ processStars(stars) }</p>
                    </div>

                    <div className='h-32 md:h-24 lg:h-24 min-h-full mt-6 mb-12'>
                        <p className='text-[#7F7F80] text-lg'>
                            { review }
                        </p>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default ReviewTile;