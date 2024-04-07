import React, { useState, useRef, FC } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import { Job } from '../../../common/job';
import { CREATE_JOBS } from '../../../services/jobs';
import { ApiResponse } from '../../../common';
import { ADD_TO_JOBS } from '../../../store/jobs-training';


type Props = {
  mode: string;
  record?: Job
}

const JobForm: FC<Props> = ({ mode, record }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [jobImage, setJobImage] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [title, setTitle] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [type, setType] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [description, setDescription] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [companyName, setCompanyName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [termDuration, setTermDuration] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [paymentDuration, setPaymentDuration] = useState<{value: string, error: boolean }>({value: 'NONE', error: false});
    const [paymentMethod, setPaymentMethod] = useState<{value: string, error: boolean }>({value: 'PAYPAL', error: false});
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
                                + <br /> Choose file
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

                <div>
                    <div id='form'>

                      <div className="my-3">
                          <label htmlFor="title" className="text-[#BFBFBF] text-sm block">
                            Job title*
                          </label>
                          <input
                              type="text"
                              name="job title"
                              value={title.value}
                              onChange={(e) =>
                                setTitle({ ...title, value: e.target.value })
                              }
                              className={`bg-white text-[#6A6A6A] border-2 ${
                                title.error ? 'error-border' : 'input-border'
                              } rounded-md px-4 py-2 w-full`}
                          />
                      </div>

                      <div className="my-3">
                          <label htmlFor="companyName" className="text-[#BFBFBF] text-sm block">
                            Company Name*
                          </label>
                          <input
                              type="text"
                              name="companyName"
                              value={companyName.value}
                              onChange={(e) =>
                                setCompanyName({ ...companyName, value: e.target.value })
                              }
                              className={`bg-white text-[#6A6A6A] border-2 ${
                                companyName.error ? 'error-border' : 'input-border'
                              } rounded-md px-4 py-2 w-full`}
                          />
                      </div>

                      <div className="my-3">
                          <label htmlFor="jobtype" className="text-[#BFBFBF] text-sm block">
                            Job type*
                          </label>
                          <select
                              name="jobtype"
                              value={type.value}
                              onChange={(e) =>
                                setType({ ...type, value: e.target.value })
                              }
                              className={`bg-white text-[#6A6A6A] border-2 ${
                                type.error ? 'error-border' : 'input-border'
                              } rounded-md px-4 py-2 w-full`}
                          >
                            <option value="WORK">Work</option>
                            <option value="TRAINING">Training</option>
                          </select>
                      </div>

                      <div className="my-3">
                          <label htmlFor="termDuration" className="text-[#BFBFBF] text-sm block">
                            Job / Training Duration*
                          </label>
                          <input
                              type="text"
                              name="termDuration"
                              value={termDuration.value}
                              onChange={(e) =>
                                setTermDuration({ ...termDuration, value: e.target.value })
                              }
                              className={`bg-white text-[#6A6A6A] border-2 ${
                                termDuration.error ? 'error-border' : 'input-border'
                              } rounded-md px-4 py-2 w-full`}
                          />
                      </div>

                        <div className="my-3">
                            <label htmlFor="paymentDuration" className="text-[#BFBFBF] text-sm block">
                              Job/Training Payment*
                            </label>
                            <select
                                name="paymentDuration"
                                value={paymentDuration.value}
                                onChange={(e) =>
                                  setPaymentDuration({ ...type, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                  type.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            >
                              <option value="">select option</option>
                              <option value="NONE">None</option>
                              <option value="HOURLY">Hourly</option>
                              <option value="WEEKLY">Weekly</option>
                              <option value="MONTHLY">Monthly</option>
                              <option value="ANNUALY">Annualy</option>
                            </select>
                        </div>

                        <div className="my-3">
                            <label htmlFor="paymentMethod" className="text-[#BFBFBF] text-sm block">
                              Payment Method*
                            </label>
                            <select
                                name="paymentMethod"
                                value={paymentDuration.value}
                                onChange={(e) =>
                                  setPaymentMethod({ ...type, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                  type.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            >
                              <option value="">select option</option>
                              <option value="NONE">None</option>
                              <option value="BANK">Bank</option>
                              <option value="PAYPAL">Paypal</option>
                              
                            </select>
                        </div>

                        <div className="my-3">
                            <label htmlFor="txnNetworkNumber" className="text-[#BFBFBF] text-sm block">
                              Job Description*
                            </label>
                            <textarea
                              name="description"
                              value={description.value}
                              onChange={(e) =>
                                setDescription({ ...description, value: e.target.value })
                              }
                              className={`bg-white text-[#6A6A6A] border-2 ${
                                description.error ? 'error-border' : 'input-border'
                              } rounded-md px-4 py-2 w-full`}
                            >

                            </textarea>
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
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default JobForm;