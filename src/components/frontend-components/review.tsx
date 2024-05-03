import React, { useState, useEffect } from 'react';
import { Review } from '../../common';
import { appReviews } from '../../constants';
import ReviewTile from './review-tile';


const ReviewComp = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        setReviews(appReviews);
    }, []);

    return (
        <>
            <div className="mx-auto w-11/12 sm:w-9/12 md:w-8/12 lg:w-8/12">
                <div className="text-center">
                    <h1 className='text-2xl font-semibold text-[#7F7F80]'>Some Sighted Reviews from our users</h1>
                    <p className='text-[#7F7F80]'>What our customers say about us matters a lot to us</p>
                </div>

                <div className="my-6 grid 
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-2
                    lg:grid-cols-2
                    "
                >
                        {
                            reviews.length > 0 && 
                            reviews.map((item: Review, idx: number) => {
                                return (<div className={`my-3 mx-2 animate__animated ${idx % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight'}`} key={idx}>
                                            <ReviewTile  
                                                fullName={item?.fullName}
                                                review={item?.review}
                                                stars={item?.stars}
                                            />
                                        </div>
                                
                                    )
                            })
                        }
                    
                </div>
            </div>
        </>
    )
}

export default ReviewComp;