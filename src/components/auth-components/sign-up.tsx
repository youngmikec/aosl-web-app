import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';

import logo from '../../assets/images/logo-white.png';
import logoBlack from '../../assets/images/logo.png';
// import googleIcon from '../../assets/icons/google-icon.png';
import './style.css';
import { SIGN_UP_USER } from '../../services';
import { ApiResponse } from '../../common';
import { setItem } from '../../utils';

//icons
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { AiFillLeftCircle } from 'react-icons/ai';
import { COUNTRIES } from '../../constants/countries';


const SignUpComp = () => {
    const url: any = process.env.REACT_APP_BASE_URL || '';
    const [loading, setLoading] = useState<boolean>(false);

    const [pDisplay, setPDisplay] = useState<boolean>(false);
    const [cpDisplay, setCPDisplay] = useState<boolean>(false);
    const [isDefault, setIsDefault] = useState<boolean>(true);
    const [isStrongPassword, setIsStrongPassword] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<{value: string, error: boolean, msg: string}>({value: '', error: false, msg: ''});
    const [lastName, setLastName] = useState<{value: string, error: boolean, msg: string}>({value: '', error: false, msg: ''});
    const [phone, setPhone] = useState<{value: string, error: boolean, msg: string}>({value: COUNTRIES[0].code, error: false, msg: ''});
    const [country, setCountry] = useState<{value: string, error: boolean, msg: string}>({value: COUNTRIES[0].name, error: false, msg: ''});
    const [email, setEmail] = useState<{value: string, error: boolean, msg: string}>({value: '', error: false, msg: ''});
    const [password, setPassword] = useState<{value: string, error: boolean, msg: string}>({value: '', error: false, msg: ''});
    const [confirmPassword, setConfirmPassword] = useState<{value: string, error: boolean, msg: string}>({value: '', error: false, msg: ''});

    const firstStageCheck = (): boolean => {
        let isValid: boolean = true;
        if(firstName.value === '' || undefined || null){
            isValid = false;
            setFirstName({...firstName, error: true, msg: 'first name field is empty'});
        }else{
            setFirstName({...firstName, error: false});
        }

        if(lastName.value === '' || undefined || null){
            isValid = false;
            setLastName({...lastName, error: true, msg: 'last name field is empty'});
        }else{
            setLastName({...lastName, error: false})
        }

        if(phone.value === '' || undefined || null){
            isValid = false;
            setPhone({...phone, error: true, msg: 'phone field is empty'});
        }else{
            setPhone({...phone, error: false})
        }

        if(country.value === '' || undefined || null){
            isValid = false;
            setCountry({...country, error: true, msg: 'country field is empty'});
        }else{
            setCountry({...country, error: false})
        }

        return isValid;
    }

    const secondStageCheck = (): boolean => {
        let isValid: boolean = true;
        if(email.value === '' || undefined || null){
            isValid = false;
            setEmail({...email, error: true, msg: 'email field is empty'});
        }else{
            setEmail({...email, error: false})
        }

        if(password.value === '' || undefined || null){
            isValid = false;
            setPassword({...password, error: true, msg: 'password field is empty'});
        }else{
            setPassword({...password, error: false})
        }

        if(confirmPassword.value === '' || undefined || null){
            isValid = false;
            setConfirmPassword({...confirmPassword, error: true, msg: 'confirm password field is empty'});
        }else{
            setConfirmPassword({...confirmPassword, error: false})
        }

        return isValid;
    }

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

    const inputCheck = () => {
        return (firstStageCheck() && secondStageCheck()) ? true : false;
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

  const handleSetPhoneCode = (name: string) => {
    const country = COUNTRIES.find(country => country.name === name);
    if(country){
        setPhone({...phone, value: country.code});
    }
  }
    
    const handleSignUp = () => {
        setLoading(true);
        if(inputCheck()){
            const data = {
                firstName: firstName.value,
                lastName: lastName.value,
                phone: phone.value,
                email: email.value, 
                password: password.value,
                country: country.value
            };

            SIGN_UP_USER(data).then((res: AxiosResponse<ApiResponse>) => {
                setLoading(false);
                const { id } = res.data.payload;
                setItem('xxid', id);
                window.location.href = '/verify';
            }).catch((err: any) => {
                setLoading(false);
                const { message } = err.response.data;
                notify('error', message);
            })
        }
    }

    const togglePasswordDisplay = () => {
        setPDisplay(!pDisplay);
    }
    const toggleConfirmPassDisplay = () => {
        setCPDisplay(!cpDisplay);
    }

    useEffect(() => {
        if(password.value === '' || undefined || null){
            setPassword({...password, error: true, msg: 'password field is empty'});
        }else{
            setPassword({...password, error: false})
        }
        setIsStrongPassword(validatePassword(password.value))
    }, [password.value]);

    useEffect(() => {
        if(confirmPassword.value === '' || undefined || null){
            setConfirmPassword({...confirmPassword, error: true, msg: 'confirm password field is empty'});
        }else{
            setConfirmPassword({...confirmPassword, error: false})
        }
    }, [confirmPassword.value]);

    return (
        <>
            <div className='auth-bg py-0 sm:py-8 md:py-8 lg:py-8'>
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

                {
                    !isDefault && 
                    <div className='fixed right-8 top-8'>
                        <div className='text-white'>
                            <p className='text-white text-xl inline-flex cursor-pointer' onClick={() => setIsDefault(true)}>
                                <AiFillLeftCircle className='mr-2 my-auto' />
                                <span>Back</span>
                            </p>
                        </div>
                    </div>
                }

                {
                    isDefault ?
                    <div className="mx-auto w-full sm:w-11/12 md:w-7/12 lg:w-5/12 bg-white min-h-screen h-max rounded-lg px-8 py-8">
                        <div className='text-center my-20 md:my-10 lg:my-10'>
                            <h1 className='text-3xl font-bold mb-4'>Sign UP</h1>
                            <p className='text-gray-400 my-4 text-sm'>To sign up please enter the following details</p>
                        </div>

                        <div className='my-8'>
                            <label htmlFor="firstName" className='font-bold text-gray-400'>First name</label>
                            <div className={firstName.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                                <input 
                                    type="text" 
                                    value={firstName.value}
                                    onChange={(e) => setFirstName({...firstName, value: e.target.value})}
                                    className='w-full border-0 px-4 py-2 text-gray-400' 
                                    placeholder='please enter your first name' 
                                />
                            </div>
                            {
                                firstName.error &&
                                <label htmlFor="firstName" className='text-red-400'>{firstName.msg}</label>
                            }
                        </div>

                        <div className='my-8'>
                            <label htmlFor="lastName" className='font-bold text-gray-400'>Last Name</label>
                            <div className={lastName.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                                <input 
                                    type="text" 
                                    value={lastName.value}
                                    onChange={(e) => setLastName({...lastName, value: e.target.value})}
                                    className='w-full border-0 px-4 py-2 text-gray-400' 
                                    placeholder='please enter your last name' 
                                />
                            </div>
                            {
                                lastName.error &&
                                <label htmlFor="lastName" className='text-red-400'>{lastName.msg}</label>
                            }
                        </div>

                        <div className='my-8'>
                            <label htmlFor="Phone" className='font-bold text-gray-400'>Phone Number</label>
                            <div className={phone.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                                <input 
                                    type="text" 
                                    value={phone.value}
                                    onChange={(e) => setPhone({...phone, value: e.target.value})}
                                    className='w-full border-0 px-4 py-2 text-gray-400' 
                                    placeholder='please enter your phone number' />
                            </div>
                            {
                                phone.error &&
                                <label htmlFor="phone" className='text-red-400'>{phone.msg}</label>
                            }
                        </div>

                        <div className='my-8'>
                            <label htmlFor="country" className='font-bold text-gray-400'>Country</label>
                            <div className={country.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                                <select 
                                    name="country" 
                                    id="country" 
                                    className='w-full border-0 px-4 py-2 text-gray-400'
                                    onChange={(e) => {
                                        setCountry({...country, value: e.target.value})
                                        handleSetPhoneCode(e.target.value)
                                    }}
                                >
                                    {
                                        COUNTRIES.map((country, indx: number) => <option key={indx} value={country.name}>{country.name}</option>)
                                    }
                                </select>
                            </div>
                            {
                                country.error &&
                                <label htmlFor="country" className='text-red-400'>{country.msg}</label>
                            }
                        </div>

                        {/* <div className="relative my-8 text-center">
                            <hr className='border-[#042f9c8f] w-full' />
                            <p className='text-[#042f9c] text-sm px-4 bg-white absolute -top-3 left-24 sm:left-60 md:left-32 lg:left-56 xl:left-80 '>or sign in with</p>
                            <img src={googleIcon} className="my-4 mx-auto" alt="google" />
                        </div> */}

                        <div className="w-8/12 my-4 mx-auto text-center">
                            <button 
                                onClick={() => {
                                    if(firstStageCheck()){
                                        setIsDefault(false);
                                    }
                                } } 
                                className='bg-[#042f9c] text-white mb-6 block w-full rounded-lg py-3 sm:py-3 md:py-5 lg:py-6'
                            >
                                Next
                            </button>
                            <p className='text-[#042f9c8f] text-sm block my-4'>Already have an account?   
                                <span className='text-[#042f9c] mx-2 font-bold'><Link to="/sign-in">Sign in</Link></span>
                            </p>
                        </div>
                    </div> :

                    <div>
                        <div className='fixed right-8 top-8'>
                            <div className='text-[#042f9c] md:text-white lg:text-white'>
                                <p className='text-[#042f9c] md:text-white lg:text-white text-xl inline-flex cursor-pointer' onClick={() => setIsDefault(true)}>
                                    <AiFillLeftCircle className='mr-2 my-auto' />
                                    <span>Back</span>
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto w-full sm:w-11/12 md:w-7/12 lg:w-5/12 bg-white h-screen rounded-lg px-8 py-8">  
                            <div className='text-center my-20 md:my-10 lg:my-10'>
                                <h1 className='text-3xl font-bold mb-4'>Sign UP</h1>
                                <p className='text-gray-400 my-4 text-sm'>To sign up please enter the following details</p>
                            </div>

                            <div className='my-8'>
                                <label htmlFor="email" className='font-bold text-gray-400'>Email</label>
                                <div className={email.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                                    <input 
                                        type="email" 
                                        value={email.value}
                                        onChange={(e) => setEmail({...email, value: e.target.value})}
                                        className='w-full border-0 px-4 py-2 text-gray-400' 
                                        placeholder='please enter your email' 
                                    />
                                </div>
                                {
                                    email.error &&
                                    <label htmlFor="email" className='text-red-400'>{email.msg}</label>
                                }
                            </div>

                            <div className='my-8'>
                                <label htmlFor="password" className='font-bold text-gray-400'>Password</label>
                                <div className={password.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                                    <div className='flex' >
                                        <input 
                                            type={ pDisplay ? 'text' : 'password' } 
                                            value={password.value}
                                            onChange={handlePasswordChange}
                                            className='w-full border-none px-4 py-2 text-gray-400 grow' 
                                            placeholder='please enter your password' 
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

                            <div className='my-8'>
                                <label htmlFor="confirmPassword" className='font-bold text-gray-400'>Confirm password</label>
                                <div className={confirmPassword.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                                    <div className="flex">
                                        <input 
                                            type={ cpDisplay ? 'text' : 'password' } 
                                            value={confirmPassword.value}
                                            onChange={(e) => setConfirmPassword({...confirmPassword, value: e.target.value})}
                                            className='w-full border-0 px-4 py-2 text-gray-400' 
                                            placeholder='confirm your password' 
                                        />

                                        <span className='mx-2 p-2 my-auto text-gray-400 text-lg' onClick={() => toggleConfirmPassDisplay() }>
                                            {
                                                cpDisplay ? <FiEyeOff /> : <FiEye />
                                            }
                                        </span>

                                    </div>
                                </div>
                                {
                                    confirmPassword.error &&
                                    <label htmlFor="confirmPassword" className='text-red-400'>{confirmPassword.msg}</label>
                                }
                            </div>


                            {/* <div className="relative my-8 text-center">
                                <hr className='border-[#042f9c8f] w-full' />
                                <p className='text-[#042f9c] text-sm px-4 bg-white absolute -top-3 left-24 sm:left-60 md:left-32 lg:left-56 xl:left-80 '>or sign in with</p>
                                <img src={googleIcon} className="my-4 mx-auto" alt="google" />
                            </div> */}

                            <div className="w-8/12 my-4 mx-auto text-center">
                                <button 
                                    onClick={() => handleSignUp() } 
                                    className='bg-[#042f9c] text-white mb-6 block w-full rounded-lg py-3 sm:py-3 md:py-5 lg:py-6'
                                >
                                    { loading ? 'processing' : 'Sign up' }
                                </button>
                                <p className='text-[#042f9c8f] text-sm block mt-4 mb-8'>Already have an account?   
                                    <span className='text-[#042f9c] mx-2 font-bold'><Link to="/sign-in">Sign in</Link></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    

                }
                
            </div>

            <ToastContainer />
        </>
    )
}

export default SignUpComp;