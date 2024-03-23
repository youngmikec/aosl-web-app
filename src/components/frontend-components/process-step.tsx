import React from 'react';

import bgImg from '../../assets/images/PA-img1.jpg';

const ProcessStep = () => {
  return (
    <>
      <div className="min-h-[500px] p-8 pb-12 bg-[#042f9c]">
        <div className="my-12 text-center">
          <p className="text-2xl font-semibold text-white my-2">Enjoy seamless experience in four easy steps</p>
        </div>


        <div className="block w:flex lg:flex flex-grow justify-between gap-6 mx-auto w-full sm:w-10/12 md:w-9/12 lg:w-8/12">
          <div className="flex justify-center items-center">
            <img src={bgImg} className="h-[80%] rounded-lg" alt="" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
            <div className="text-white">
              <h1 className="text-5xl font-bold text-white">1.</h1>
              <p className="text-2xl font-semibold text-white my-2">Discovery</p>
              <p className="text-md font-normal text-white">Identifying the opportunities in problems and creating solutions to meet those demands.</p>
            </div>
            <div className="text-white">
              <h1 className="text-5xl font-bold text-white">2.</h1>
              <p className="text-2xl font-semibold text-white my-2">Planning</p>
              <p className="text-md font-normal text-white">Identifying the opportunities in problems and creating solutions to meet those demands.</p>
            </div>
            <div className="text-white">
              <h1 className="text-5xl font-bold text-white">3.</h1>
              <p className="text-2xl font-semibold text-white my-2">Execute</p>
              <p className="text-md font-normal text-white">Identifying the opportunities in problems and creating solutions to meet those demands.</p>
            </div>
            <div className="text-white">
              <h1 className="text-5xl font-bold text-white">4.</h1>
              <p className="text-2xl font-semibold text-white my-2">Deliver</p>
              <p className="text-md font-normal text-white">Identifying the opportunities in problems and creating solutions to meet those demands.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProcessStep;