import React,{useState} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from "axios";

import '../style.css';
import { ApiResponse } from "../../../common";
import logo from "../../../assets/images/logo-white.png";
import logoBlack from "../../../assets/images/logo.png";
import { SEND_PASSWORD_RESET_CODE } from '../../../services';
// import googleIcon from "../../../assets/icons/google-icon.png";
import { setItem } from "../../../utils";

type Prop = {
  changeStep: (data: number) => any
}
const ForgotPasswordComp = ({ changeStep }: Prop) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<{value: string, error: boolean}>({value: '', error: false});

    const inputCheck = (): boolean => {
      let isValid: boolean = true;
      if(email.value === '' || undefined || null){
          isValid = false;
          setEmail({...email, error: true});
      }else{
          setEmail({...email, error: false});
      }
      return isValid;
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

    const handleSendResetCode = () => {
      if(inputCheck()){
          setLoading(true);
          SEND_PASSWORD_RESET_CODE(email.value).then((res: AxiosResponse<ApiResponse>) => {
              setLoading(false);
              const { id } = res.data.payload;
              setItem('xxid', id);
              changeStep(2)
            }).catch(err => {
              setLoading(false);
              changeStep(1)
              const { message } = err.response.data;
              notify('error', message);
          })
        }
    }

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
            <div className='text-center my-20 md:my-10 lg:my-10'>
                <h1 className='text-3xl font-bold mb-4'>Forgot Password</h1>
                <p className='text-gray-400 my-4 text-sm'>Please input your email adress to fix the issue</p>
            </div> 

            <div className='my-10'>
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
            </div>

            <div className="w-8/12 my-4 mx-auto text-center">
              <button onClick={() => handleSendResetCode() }
              className="bg-[#042f9c] text-white mb-6 block w-full rounded-lg py-3 sm:py-3 md:py-5 lg:py-6">
                { loading ? 'sending' : 'Next' }
              </button>

              <p className="text-[#042f9c8f] text-sm block my-4">
                Already have an account?
                <span className="mx-2 text-[#042f9c] font-bold">
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

export default ForgotPasswordComp;
