import React,{useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';

// style
import './style.css';

//icons and images
import coin from '../../assets/images/hompage_coin.png'
import { BsTelephoneFill } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import {BsEnvelopeFill} from "react-icons/bs";

// components
import HeroSection from '../../shared/users-frontend/hero-section';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';
import { ApiResponse } from '../../common';
import { CREATE_MAIL } from '../../services';
import ContactUsForm from './contact-us-form';

const ContactUsComp = () => {
    const[toggle,setToggle] = useState(true);
    const[toggle1,setToggle1] = useState(true);
    const[toggle2,setToggle2] = useState(true);
    
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
            <HeroSection>
                <div className="flex justify-center flex-row">
                    <div className='py-4 w-full my-8 '>
                        <div className='mt-8'>
                            <h3 className='text-5xl font-bold mt-8 mb-4 text-white text-center'>We’re Available 24/7 to Attend <br /> To Our Customer</h3>
                            <p className='text-sm font-semibold text-center w-3/4 mt-4 mb-6 mx-auto text-white'>Get answers to any question or inquiry you might have</p>
                            <img src={coin} alt="" className=' my-8 mx-auto animate-pulse duration-75'  />
                        </div>
                    </div>
                </div>
            </HeroSection>

            <div className="my-12">
                <ContactUsForm />
            </div>

            <div className='my-4'>
                <JoinUs />
            </div>

            <Footer />
            <ToastContainer />
        </>
    )
}

export default ContactUsComp;