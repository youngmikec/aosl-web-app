import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { CREATE_MAIL } from '../../services';
import { ApiResponse } from '../../common';
import bgImg from '../../assets/images/ac-img.jpg';


const ContactUsForm = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [fullname, setFullname] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [phone, setPhone] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [email, setEmail] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [subject, setSubject] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [message, setMessage] = useState<{value: string, error: boolean}>({value: '', error: false});

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if(fullname.value === '' || undefined || null){
            isValid = false;
            setFullname({...fullname, error: true});
        }else{
            setFullname({...fullname, error: false});
        }
        if(phone.value === '' || undefined || null){
            isValid = false;
            setPhone({...phone, error: true});
        }else{
            setPhone({...phone, error: false})
        }
        if(email.value === '' || undefined || null){
            isValid = false;
            setEmail({...email, error: true});
        }else{
            setEmail({...email, error: false})
        }
        if(subject.value === '' || undefined || null){
            isValid = false;
            setSubject({...subject, error: true});
        }else{
            setSubject({...subject, error: false})
        }
        if(message.value === '' || undefined || null){
            isValid = false;
            setMessage({...message, error: true});
        }else{
            setMessage({...message, error: false})
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

    const clearStates = ( ) => {
        setLoading(false);
        setFullname({value: '', error: false});
        setPhone({value: '', error: false});
        setEmail({value: '', error: false});
        setSubject({value: '', error: false});
        setMessage({value: '', error: false});
    }

    const handleSendMail = () => {
        setLoading(true);
        if(inputCheck()){
            const data = { 
                fullName: fullname.value,
                phone: phone.value,
                email: email.value,
                subject: subject.value,
                message: message.value,
            };
            CREATE_MAIL(data).then((res: AxiosResponse<ApiResponse>) => {
                setLoading(false);
                const { success, message } = res.data;
                if(success){
                    setLoading(false);
                    notify('success', message);
                    clearStates();
                }
                
            }).catch(err => {
                setLoading(false);
                const { message } = err.response.data;
                notify('error', message);
            })
        }
        setLoading(false);
    }

  return (
    <>
      <div className="min-h-[600px] p-8 pb-12">

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto w-full sm:w-10/12 md:w-9/12 lg:w-8/12">
          <div className="flex justify-center items-center">
            <img src={bgImg} className="w-full" alt="" />
          </div>

          <div className=" bg-[#042f9c] min-h-[500px] py-12 px-8">
            <div className="mb-10">
              <p className="text-sm text-white">GET IN TOUCH</p>
              <h1 className="text-3xl font-semibold text-white">FILL THE FORM BELOW</h1>
            </div>

            <div>
              <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                <div className="text-white">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full py-4 px-2 bg-white text-black rounded-md my-4"
                    value={fullname.value}
                    onChange={(e) => setFullname({...fullname, value: e.target.value})}
                  />
                </div>
                <div className="text-white">
                  <input 
                    type="text" 
                    placeholder="Email" 
                    className="w-full py-4 px-2 bg-white text-black rounded-md my-4" 
                    value={email.value} 
                    onChange={(e) => setEmail({...email, value: e.target.value})}/>
                </div>
                <div className="text-white">
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    className="w-full py-4 px-2 bg-white text-black rounded-md my-4" 
                    value={phone.value}
                    onChange={(e) => setPhone({...phone, value: e.target.value})}
                  />
                </div>

                <div className="text-white">
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full py-4 px-2 bg-white text-black rounded-md my-4" 
                    value={subject.value} 
                    onChange={(e) => setSubject({...subject, value: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <input 
                  type="text" 
                  placeholder="Message" 
                  className="w-full py-4 px-2 bg-white text-black rounded-md my-4" 
                  value={message.value}
                  onChange={(e) => setMessage({...message, value: e.target.value})}
                />
              </div>

              <div>
                <button 
                  onClick={handleSendMail} 
                  className='rounded-lg mt-4 mb-8 text-white bg-[#4575f062] 
                  py-4 px-7 hover:bg-white hover:text-[#042f9c]'
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default ContactUsForm;