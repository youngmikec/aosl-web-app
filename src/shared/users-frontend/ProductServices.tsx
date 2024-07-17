import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdEmojiTransportation } from "react-icons/md";
import { AiFillRightCircle } from "react-icons/ai";
import { FaNetworkWired } from "react-icons/fa";
import { BiCabinet } from "react-icons/bi";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { TbDatabaseImport } from "react-icons/tb";



type Props = {
  title: string;
  description: string;
  icon: any;
}

const ProductServiceCard: FC<Props> = ({ title, description, icon }) => {
  const navigate = useNavigate();

  const goTo = (url: string) => navigate(url);

  const sluggifyText = (text: string): string => text.toLowerCase().split(' ').join('-');

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
          onClick={() => goTo(`/services/${sluggifyText(title)}`)}
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

const ProductServices: FC<{showFullServices?: boolean}> = ({ showFullServices = false }) => {
  const services: Props[] = [
    {
      title: 'PA Services',
      description: 'We offer part-time, full time and self employment personal assistant services',
      icon: <HiOutlineBuildingOffice2 className="text-5xl text-[#042f9c] animate__animated animate__rubberBand" />
    },
    {
      title: 'Transportation Services',
      description: 'We offer transportation services to various destinations, ensuring safe and timely arrivals..',
      icon: <MdEmojiTransportation className="text-5xl text-[#042f9c] animate__animated animate__rubberBand" />
    },
    {
      title: 'Training Services',
      description: 'We offer specialized health and social care training to selected candidates, focusing on skill development.',
      icon: <FaNetworkWired className="text-5xl text-[#042f9c] animate__animated animate__rubberBand" />
    },
    {
      title: 'Consultancy Services',
      description: 'We provide comprehensive support for coordinating audits, government tendering, and registration with regulatory bodies. Additionally, we offer robust support for HR personnel, ensuring streamlined operations and enhanced productivity.',
      icon: <BiCabinet className="text-5xl text-[#042f9c] animate__animated animate__rubberBand" />
    },
    {
      title: 'Accommodation Support Services',
      description: 'We specialize in providing exceptional accommodation support services. We assist clients in finding suitable housing options that meet their specific needs and preferences, whether for short-term stays or long-term arrangements.',
      icon: <BsFillHouseDoorFill className="text-5xl text-[#042f9c] animate__animated animate__rubberBand" />
    },
    {
      title: 'Importing and Exporting',
      description: 'We specialize in providing comprehensive importing and exporting services to businesses worldwide. Our expertise encompasses the entire supply chain, from sourcing high-quality products from trusted international suppliers to managing the logistics of shipping and customs clearance.',
      icon: <TbDatabaseImport className="text-5xl text-[#042f9c] animate__animated animate__rubberBand" />
    },
    {
      title: 'Media and Publication Services',
      description: 'we offer a wide range of media and publication services designed to enhance your brand’s visibility and impact. We produce high-quality publications, from magazines and newsletters to digital content and social media campaigns.',
      icon: <TbDatabaseImport className="text-5xl text-[#042f9c] animate__animated animate__rubberBand" />
    },
  ];

  const [servicesData, setServicesData] = useState<Props[]>([]);

  useEffect(() => {
    showFullServices ? setServicesData(services) : setServicesData(services.slice(0, 3))
  }, [showFullServices])
  return (
    <>
      <div className="w-full">
        <div className="mx-auto w-full sm:w-10/12 md:w-9/12 lg:w-8/12">
        <h3 className='text-[#042f9c] font-extrabold text-3xl mb-4 text-center animate__animated animate__backInDown'>Our Services</h3>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 animate__animated animate__fadeInRight">
            {
              servicesData.map((row: Props, idx: number) => {
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