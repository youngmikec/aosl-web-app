import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from "axios";

import { getItem } from "../../../utils";
import { ApiResponse } from "../../../common";
import { RESET_PASSWORD } from "../../../services";

// icons & logos
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { AiFillLeftCircle } from 'react-icons/ai';
import logo from "../../../assets/images/logo-white.png";
import logoBlack from "../../../assets/images/logo.png";
// import googleIcon from "../../../assets/icons/google-icon.png";

type Prop = {
  changeStep: (data: number) => any
}

const ForgotPassword3 = ({ changeStep }: Prop) => {
  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [pDisplay, setPDisplay] = useState<boolean>(false);
  const [isStrongPassword, setIsStrongPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<{value: string, error: boolean, msg: string}>({value: '', error: false, msg: ''});
  const [confirmPassword, setConfirmPassword] = useState<{value: string, error: boolean, msg: string}>({value: '', error: false, msg: ''});

  const inputCheck = (): boolean => {
      let isValid: boolean = true;
      
      if(password.value === '' || undefined || null){
          isValid = false;
          setPassword({...password, error: true, msg: 'password field is empty'});
      }else{
          setPassword({...password, error: false})
      }

      if(confirmPassword.value === '' || undefined || null){
          isValid = false;
          setConfirmPassword({...confirmPassword, error: true, msg: 'Confirm password field is empty'});
      }else{
        setConfirmPassword({...confirmPassword, error: false})
      }

      if((confirmPassword.value.length > 0) && (confirmPassword.value !== password.value)) {
          isValid = false;
          notify('error', "Password does not match")
        };


      return isValid;
  }

  const togglePasswordDisplay = () => {
    setPDisplay(!pDisplay);
  }

  const notify = (type: string, msg: string) => {
      if (type === "success") {
        toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
  
      if (type === "error") {
        toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
  };

  const validatePassword = (password: string): boolean => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(password);
  }

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword({...password, value: newPassword});
    const isValidPassword: boolean = validatePassword(newPassword);
    if(isValidPassword){
        setIsStrongPassword(isValidPassword);
    }
};

  const handleChangePassword = () => {
    if(inputCheck()){
          setLoading(true);
          const clientDetail = getItem('clientD');
          const data = { email: clientDetail.email, password: password.value};
          RESET_PASSWORD(data).then((res: AxiosResponse<ApiResponse>) => {
              setLoading(false);
              changeStep(4)
              console.log(res.data.message);
            }).catch((err: any) => {
              setLoading(false);
              const { message } = err.response.data;
              notify('error', message);
              changeStep(3);
          })
      }
  }


  useEffect(() => {
    if(password.value === '' || undefined || null){
        setPassword({...password, error: true, msg: 'password field is empty'});
    }else{
        setPassword({...password, error: false})
    }
    setIsStrongPassword(validatePassword(password.value))
  }, [password.value]);

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

        <div className='fixed right-8 top-8'>
            <div className='text-[#042f9c] md:text-white lg:text-white'>
                <p className='text-[#042f9c] md:text-white lg:text-white text-xl inline-flex cursor-pointer' onClick={() => changeStep(2)}>
                    <AiFillLeftCircle className='mr-2 my-auto' />
                    <span>Back</span>
                </p>
            </div>
        </div>

        <div className="mx-auto w-full sm:w-11/12 md:w-7/12 lg:w-5/12 bg-white h-screen rounded-lg px-8 py-8">
          <div className='text-center my-20 md:my-10 lg:my-10'>
              <h1 className='text-3xl font-bold mb-4'>New Password</h1>
              <p className='text-gray-400 my-4 text-sm'>Please input new password</p>
          </div>

          <div className='my-10'>
              <label htmlFor="password" className='font-bold text-gray-400'>PASSWORD</label>
              <div className={password.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                  <div className='flex' >
                      <input 
                          type={ pDisplay ? 'text' : 'password' } 
                          value={password.value}
                          onChange={handlePasswordChange}
                          className='w-full border-none px-4 py-2 text-gray-400 grow' 
                          placeholder='please enter your new password' 
                      />
                      <span className='mx-2 p-2 my-auto text-gray-400 text-lg' onClick={() => togglePasswordDisplay() }>
                          {
                              pDisplay ? <FiEyeOff /> : <FiEye />
                          }
                      </span>
                  </div>
              </div>
              {
                password.error &&
                <label htmlFor="password" className='text-red-400'>{password.msg}</label>
              }
              {   isStrongPassword ? (
                    <p className='text-green-500'>Strong password!</p>
                  ) : (
                    <p className='text-red-400'>
                      Password must contain at least 8 characters, including an uppercase letter, a number, and a special character.
                    </p>
                  )
              }
          </div>

          <div className='my-10'>
              <label htmlFor="confirmPassword" className='font-bold text-gray-400'>CONFIRM PASSWORD</label>
              <div className={confirmPassword.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                  <div className='flex' >
                      <input 
                          type={ pDisplay ? 'text' : 'password' } 
                          value={confirmPassword.value}
                          onChange={(e) => setConfirmPassword({...confirmPassword, value: e.target.value})}
                          className='w-full border-none px-4 py-2 text-gray-400 grow' 
                          placeholder='please confirm your password' 
                      />
                      {/* <span className='mx-2 p-2 my-auto text-gray-400 text-lg' onClick={() => togglePasswordDisplay() }>
                          {
                              pDisplay ? <FiEyeOff /> : <FiEye />
                          }
                      </span> */}
                  </div>
              </div>
              {
                confirmPassword.error &&
                <label htmlFor="password" className='text-red-400'>{confirmPassword.msg}</label>
              }
          </div>

          <div className="w-8/12 my-4 mx-auto text-center">
            <button 
              onClick={() => handleChangePassword()}
              className="bg-[#042f9c] text-white mb-6 block w-full rounded-lg py-3 sm:py-3 md:py-5 lg:py-6"
            >
              { loading ? 'loading...' : 'Submit' }
            </button>

            <p className="text-[#042f9c8f] text-sm block my-4">
              Already have an account?
              <span className="text-[#042f9c] mx-2 font-bold">
                <Link to="/sign-in">Sign in</Link>
              </span>
            </p>
          </div>

        </div>

      </div>

      <ToastContainer />
    </>
  );
};

export default ForgotPassword3;
