import React, { FC } from 'react';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdEmojiTransportation } from "react-icons/md";
import { AiFillRightCircle } from "react-icons/ai";
import { FaNetworkWired } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



type Props = {
  title: string;
  description: string;
  icon: any;
}

const ProductServiceCard: FC<Props> = ({ title, description, icon }) => {
  const navigate = useNavigate();

  const goTo = (url: string) => navigate(url);

  return (
    <>
      <div className="bg-white shadow-xl min-h-[350px] pt-8 relative hover:scale-105 hover:ease-in delay-150">
        <div className="flex justify-center mb-8">
          { icon }
        </div>

        <div className='px-4 mb-10'>
          <h3 className="mt-4 mb-8 text-gray-500 text-2xl font-bold mx-auto text-center">{title}</h3>
          <p className='text-gray-500 text-sm font-medium mx-auto text-center'>{description}</p>
        </div>

        <div 
          onClick={() => goTo('/services/pa-services')}
          className="absolute bottom-0 left-0 right-0 px-6 py-2 mt-8 bg-[#042f9c] cursor-pointer"
        >
          <div className="flex justify-between">
            <p className="text-white">Learn More</p>
            <div className='p-1 rounded-full bg-white flex justify-center items-center'>
              <AiFillRightCircle className="text-[#042f9cd2]" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ProductServices = () => {
  const services: Props[] = [
    {
      title: 'PA Service',
      description: 'We offer part-time, full time and self employment personal assistant services',
      icon: <HiOutlineBuildingOffice2 className="text-5xl text-[#042f9c]" />
    },
    {
      title: 'Transportation Services',
      description: 'We offer transportation services to various destinations, ensuring safe and timely arrivals..',
      icon: <MdEmojiTransportation className="text-5xl text-[#042f9c]" />
    },
    {
      title: 'Training Services',
      description: 'We offer specialized health training to selected candidates, focusing on skill development.',
      icon: <FaNetworkWired className="text-5xl text-[#042f9c]" />
    },
    // {
    //   title: 'PA Service',
    //   description: 'We provide software licensed on subscription basis to our end users. This software has been developed  by Infinanze technologies gmbH to enhance the day to day routine of our users.',
    //   icon: <HiOutlineBuildingOffice2 className="text-5xl text-[#042f9c]" />
    // },
    // {
    //   title: 'PA Service',
    //   description: 'We provide software licensed on subscription basis to our end users. This software has been developed  by Infinanze technologies gmbH to enhance the day to day routine of our users.',
    //   icon: <HiOutlineBuildingOffice2 className="text-5xl text-[#042f9c]" />
    // },
    // {
    //   title: 'PA Service',
    //   description: 'We provide software licensed on subscription basis to our end users. This software has been developed  by Infinanze technologies gmbH to enhance the day to day routine of our users.',
    //   icon: <HiOutlineBuildingOffice2 className="text-5xl text-[#042f9c]" />
    // },
  ]
  return (
    <>
      <div className="w-full">
        <div className="mx-auto w-full sm:w-10/12 md:w-9/12 lg:w-8/12">
        <h3 className='text-[#042f9c] font-extrabold text-3xl mb-4 text-center'>Our Services</h3>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {
              services.length > 0 && services.map((row: Props, idx: number) => {
                return <ProductServiceCard key={idx} {...row} />
              })
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default ProductServices;