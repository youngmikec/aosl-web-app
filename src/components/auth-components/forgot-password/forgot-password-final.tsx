import React from 'react'
import { Link } from "react-router-dom";

//images
import logo from "../../../assets/images/logo-white.png";
import logoBlack from "../../../assets/images/logo.png";
import success from '../../../assets/images/high_five.png'
import googleIcon from "../../../assets/icons/google-icon.png";

type Prop = {
  changeStep: (data: number) => any
}

const ForgotPassword4 = ({changeStep}: Prop) => {
  return (
    <>
      <div className="auth-bg py-0 sm:py-8 md:py-8 lg:py-8">
        <div className='fixed left-5 md:left-8 lg:left-8 top-6 md:top-8 lg:top-8'>
          <div>
              <Link to='/' className='hidden sm:hidden md:block lg:block'>
                  <img src={logo} alt="logo" width="120px" height="120px" />
              </Link>
              <Link to='/' className='block sm:block md:hidden lg:hidden'>
                  <img src={logoBlack} alt="logo" width="120px" height="120px" />
              </Link>
          </div>
        </div>

        <div className="mx-auto w-full sm:w-11/12 md:w-7/12 lg:w-5/12 bg-white h-screen rounded-lg px-8 py-8">
          <div className="text-center">
              <div className="image ">
                  <img src={success} 
                  alt=""
                  className='mx-auto'
                    />
                
                <div className="text-center mb-18">
                    <div className=" justify-around text-center text-4xl font-bold mb-2 text-[#042f9c]">
                      Password Recovery Successful
                    </div>
                    <div className="text-center text-gray-400 mb-4">
                      Kindly return to sign in screen
                    </div>

                    {/* <div className="relative my-6 text-center">
                      <hr className="border-[#042f9c8f] w-full" />
                      <p className="text-[#042f9c] text-sm px-4 bg-white absolute -top-3 left-56">
                        or sign up with
                      </p>

                      <img src={googleIcon} className="my-4 mx-auto " alt="google" />
                    </div> */}

                  <div className="w-8/12 my-4 mx-auto text-center">
                    <Link to="/sign-in">
                      <button className="bg-[#042f9c] text-white mb-6 block w-full rounded-lg py-3 sm:py-3 md:py-5 lg:py-6">
                          Sign in
                      </button>
                    </Link>

                    <p className="text-[#042f9c8f] text-sm block my-4">
                      Already have an account?
                      <span className="text-[#042f9c] mx-2 font-bold">
                        <Link to="/sign-in">Sign in</Link>
                      </span>
                    </p>
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default ForgotPassword4