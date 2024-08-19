import { FC, useState, useEffect } from "react";
import Player from 'lottie-react';
import { useNavigate, useSearchParams } from "react-router-dom";


import AppLoader from "../../components/app-loader";
import Footer from "../../shared/users-frontend/footer";
import successAnimationData from '../../assets/json/success-animation.json';
import { CONFIRM_AND_CAPTURE_INVOICE_ORDER } from "../../services/invoice";


const PaypalCheckoutPage: FC = () => {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();


    const [status, setStatus] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [payerId, setPayerId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<any>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const confirmAndCheckoutOrder = (orderId: string | null) => {
        if(orderId){
            setLoading(true);
            CONFIRM_AND_CAPTURE_INVOICE_ORDER(orderId)
            .then(res => {
                console.log('Response =>', res);
                setLoading(false);
                const { payload } = res.data;
                setMessage(payload?.message);
            })
            .catch(err => {
                setLoading(false);
                setIsError(true);
                setErrorMessage(err.response.message);
            })

        }
    }

    const goToHome = (path: string) => {
        navigate(path)
    }

    useEffect(() => {
        if(params){
            const status = params.get('status');
            const token = params.get('token');
            setStatus(status);
            setOrderId(token);
            setPayerId(params.get('PayerID'));

            if(status === 'suceess'){
                confirmAndCheckoutOrder(token)
            }
        }
    }, []);


    return loading 
        ? (<AppLoader color='#042f9c' /> ) : 
        (
            <>
                <div className="h-[100vh] w-full flex justify-center items-center">
                    {
                        !isError && (
                            <div className="block">

                                <div className="my-4 flex justify-center">
                                    <Player
                                        autoplay
                                        loop
                                        animationData={successAnimationData}
                                        style={{ height: '200px', width: '500px' }}
                                    />
                                </div>

                                <div dangerouslySetInnerHTML={{__html: message}}>
                                </div>

                                <div className='my-8 text-center'>
                                    <button 
                                        className='rounded-lg mt-4 mb-8 text-white bg-[#042f9c] py-4 px-7 hover:border-[1px] hover:border-[#042f9c] hover:bg-white hover:text-[#042f9c]'
                                        onClick={() => goToHome('/')}
                                    >
                                        Go Home
                                    </button>
                                </div>
                            </div>
                        )

                        
                    }
                </div>

                <Footer />
            </>
        )
}

export default PaypalCheckoutPage;