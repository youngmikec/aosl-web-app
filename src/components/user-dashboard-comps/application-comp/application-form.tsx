import React, { useState, useRef, FC } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import { Application } from '../../../common/application';
import { CREATE_JOBS } from '../../../services/jobs';
import { ApiResponse } from '../../../common';
import { ADD_TO_JOBS } from '../../../store/jobs-training';


type Props = {
  mode: string;
  record?: Application
}

const ApplicationForm: FC<Props> = ({ mode, record }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [jobImage, setJobImage] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [title, setTitle] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [type, setType] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [description, setDescription] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [companyName, setCompanyName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [termDuration, setTermDuration] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [paymentDuration, setPaymentDuration] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [paymentMethod, setPaymentMethod] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [jobRequirements, setJobRequirements] = useState<{value: string[], error: boolean }>({value: [], error: false});

    const fileRef = useRef<HTMLInputElement>(null);

    const openFile = () => {
        return fileRef.current?.click();
    }

    const removeImage = () => {
      setJobImage({value: '', error: false});
    }

    const handleFileRead = async (event: any) => {
      const file = event.target.files[0];
      const base64: any = await convertBase64(file);
      setJobImage({...jobImage, value: base64});
    }

    const convertBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
        resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
      })
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

    const inputCheck = (): boolean => {
      let isValid: boolean = true;
      if (title.value === "" || undefined || null) {
        isValid = false;
        setTitle({ ...title, error: true });
      } else {
        setTitle({ ...title, error: false });
      }

      if (type.value === "" || undefined || null) {
        isValid = false;
        setType({ ...type, error: true });
      } else {
        setType({ ...type, error: false });
      }
      
      if (companyName.value === "" || undefined || null) {
        isValid = false;
        setCompanyName({ ...companyName, error: true });
      } else {
        setCompanyName({ ...companyName, error: false });
      }

      if (description.value === "" || undefined || null) {
        isValid = false;
        setDescription({ ...description, error: true });
      } else {
        setDescription({ ...description, error: false });
      }

      if (termDuration.value === "" || undefined || null) {
        isValid = false;
        setTermDuration({ ...termDuration, error: true });
      } else {
        setTermDuration({ ...termDuration, error: false });
      }
      if (paymentDuration.value === "" || undefined || null) {
        isValid = false;
        setPaymentDuration({ ...paymentDuration, error: true });
      } else {
        setPaymentDuration({ ...paymentDuration, error: false });
      }

      if (paymentMethod.value === "" || undefined || null) {
        isValid = false;
        setPaymentMethod({ ...paymentMethod, error: true });
      } else {
        setPaymentMethod({ ...paymentMethod, error: false });
      }

      if (jobImage.value === "" || undefined || null) {
        isValid = false;
        setJobImage({ ...jobImage, error: true });
      } else {
        setJobImage({ ...jobImage, error: false });
      }
      return isValid;
    };

    const clearFormStates = () => {
      setJobImage({value: '', error: false});
      setTitle({value: '', error: false});
      setCompanyName({value: '', error: false});
      setType({value: '', error: false});
      setDescription({value: '', error: false});
      setTermDuration({value: '', error: false});
      setPaymentDuration({value: '', error: false});
      setPaymentMethod({value: '', error: false});
      setJobRequirements({value: [], error: false});
    }

    const handleSubmit = () => {
        if (inputCheck()) {
            setLoading(true);
            const data = { 
              title: title.value,
              type: type.value,
              jobImage: jobImage.value,
              companyName: companyName.value,
              description: description.value,
              termDuration: termDuration.value,
              paymentDuration: paymentDuration.value,
              paymentMethod: paymentMethod.value,
              jobRequirements: jobRequirements.value
            };
          CREATE_JOBS(data)
            .then((res: AxiosResponse<ApiResponse>) => {
                const { message, payload } = res.data;
                setLoading(false);
                notify("success", message);
                dispatch(ADD_TO_JOBS(payload));
                clearFormStates();
            })
            .catch((err: any) => {
                const { message } = err.response.data;
                notify("error", message);
                setLoading(false);
            });
        }else {
            notify("error", `Fill in all required fields`);
        }  
    };


    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-3'>
                <div>
                    <div
                        className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                            jobImage.error ? 'error-border' : 'input-border'
                        } px-4 py-2 relative`}
                    >
                        {jobImage.value && <span onClick={() => removeImage()} className='absolute top-2 cursor-pointer right-3 z-10'>X</span>}
                        {
                            jobImage.value ? 
                            <img src={jobImage?.value} width="30%" className='cursor-pointer' alt="uploaded" onClick={() => openFile()} /> :
                            <button className='text-center text-[#7F7F80]' onClick={() => openFile()}>
                                + <br /> Choose file (jpg, jpeg, png)
                            </button>
                        }
                        <input 
                            type="file" 
                            className='hidden'
                            ref={fileRef}
                            onChange={(e) => handleFileRead(e)}
                        />
                    </div>
                </div>

                {/* <div>
                    <div id='form'>

                        <div className="my-3">
                            <label htmlFor="name" className="text-[#BFBFBF] text-sm block">
                                Airtime Name*
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={name.value}
                                onChange={(e) =>
                                    setName({ ...name, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    name.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="shortName" className="text-[#BFBFBF] text-sm block">
                                Airtime short Name*
                            </label>
                            <input
                                type="text"
                                name="shortName"
                                value={shortName.value}
                                onChange={(e) =>
                                    setShortName({ ...shortName, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    shortName.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                                Rate In percentage (%)*
                            </label>
                            <input
                                type="number"
                                name="rate"
                                min={0}
                                value={rate.value}
                                onChange={(e) =>
                                    setRate({ ...rate, value: parseInt(e.target.value) })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    rate.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="txnNetwork" className="text-[#BFBFBF] text-sm block">
                                Transaction Network*
                            </label>
                            <input
                                type="text"
                                name="txnNetwork"
                                value={txnNetwork.value}
                                onChange={(e) =>
                                    setTxnNetwork({ ...txnNetwork, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    txnNetwork.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="txnNetworkNumber" className="text-[#BFBFBF] text-sm block">
                                Transaction Network Number*
                            </label>
                            <input
                                type="text"
                                name="txnNetworkNumber"
                                value={txnNetworkNumber.value}
                                onChange={(e) =>
                                    setTxnNetworkNumber({ ...txnNetworkNumber, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    txnNetworkNumber.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3 text-center">
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-[#042f9c] text-white py-1 px-10 rounded-2xl"
                            >
                                {loading ? "Processing..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>

            <ToastContainer />
        </>
    )
}

export default ApplicationForm;