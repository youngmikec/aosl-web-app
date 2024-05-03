import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CREATE_APPLICATION } from '../../services/applications';

const JobApplicationForm = ({ jobId }: { jobId: string}) => {

  const resumeRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<{value: string, error: boolean, errMsg: string}>({value: '', error: false, errMsg: ''});
  const [loading, setLoading] = useState<boolean>(false);
  const certLevels: string[] = ["MSC", "PHD", "HIGHSCHOOL", "BSC", "DEGREE", "DOCTORATE"];

  const [formData, setFormData] = useState(
    {
      job: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      state: "",
      nationality: "",
      role: "",
      certLevel: "",
      address: "",
      experienceYears: 1,
      biography: "",
      skills: "",
      resume: "",
      status: "APPLIED"
  });

  const openResumeFile = () => {
    return resumeRef.current?.click();
  }

  const handleFileRead = async (event: any) => {
    const file = event.target.files[0];
    const base64: any = await convertBase64(file);
    setResumeFile({...resumeFile, value: base64});
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

  const removeResumeImage = () => {
    setResumeFile({value: '', error: false, errMsg: ''});
  }

  const formValidationSchema = () => Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    nationality: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
    certLevel: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    experienceYears: Yup.number().required('Required'),
    biography: Yup.string().required('Required'),
    skills: Yup.string().required('Required'),
  })

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: formValidationSchema(),
    onSubmit: (values) => {
      setLoading(true);
      const payload = {
        ...values,
        job: jobId || '',
        resume: resumeFile.value
      };
      CREATE_APPLICATION(payload).then(res => {
        setLoading(false);
        const { message, success, payload } = res.data;
        if(success) {
          // notify('success', message);
          // resetForm();
          setResumeFile({value: '', error: false, errMsg: ''});
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('error =>', err);
      })
    }
  })

  return (
    <>
      <div className='w-full bg-white border-[1px] border-[#BFBFBF] rounded-lg p-4'>

        <div
            className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                resumeFile.error ? 'error-border' : 'input-border'
            } px-4 py-2 relative`}
        >
            {resumeFile.value && <span onClick={() => removeResumeImage()} className='absolute top-2 cursor-pointer right-3 z-10'>X</span>}
            {
                resumeFile.value ? 
                <div className='flex justify-center items-center'>
                    <img src={resumeFile?.value} width="30%" className='cursor-pointer' alt="uploaded" onClick={() => openResumeFile()} />
                </div> :
                <button className='text-center text-[#7F7F80]' onClick={() => openResumeFile()}>
                    + <br /> Upload Resume or CV
                </button>
            }
            <input 
                type="file" 
                className='hidden'
                ref={resumeRef}
                onChange={(e) => handleFileRead(e)}
            />
        </div>

        <form id='form' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
            <div className="my-3">
                <label htmlFor="name" className="text-[#BFBFBF] text-sm block">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  className={`bg-white text-[#6A6A6A] border-2 ${(touched.firstName && errors.firstName) ? 'error-border' : 'input-border'
                  } rounded-md px-4 py-2 w-full`}
                />
            </div>

            <div className="my-3">
                <label htmlFor="shortName" className="text-[#BFBFBF] text-sm block">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  className={`bg-white text-[#6A6A6A] border-2 
                  ${(touched.lastName && errors.lastName) ? 'error-border' : 'input-border'}
                  rounded-md px-4 py-2 w-full`}
                />
            </div>

            <div className="my-3">
              <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={`bg-white text-[#6A6A6A] border-2 
                ${(touched.email && errors.email) ? 'error-border' : 'input-border'}
                rounded-md px-4 py-2 w-full`}
              />
            </div>

            <div className="my-3">
              <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                Address*
              </label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                className={`bg-white text-[#6A6A6A] border-2 
                ${(touched.address && errors.address) ? 'error-border' : 'input-border'}
                rounded-md px-4 py-2 w-full`}
              />
            </div>

            <div className="my-3">
                <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                  Phone Number*
                </label>
                <input
                    type="text"
                    name="phoneNumber"
                    min={0}
                    value={values.phoneNumber}
                    onChange={handleChange}
                    className={`bg-white text-[#6A6A6A] border-2 
                    ${(touched.phoneNumber && errors.phoneNumber) ? 'error-border' : 'input-border'} 
                    rounded-md px-4 py-2 w-full`
                    }
                />
            </div>

            <div className="my-3">
                <label htmlFor="walletAddress" className="text-[#BFBFBF] text-sm block">
                  State*
                </label>
                <input
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    className={`bg-white text-[#6A6A6A] border-2 
                    ${(touched.state && errors.state) ? 'error-border' : 'input-border'} 
                    rounded-md px-4 py-2 w-full`}
                />
            </div>

            <div className="my-3">
                <label htmlFor="exchangePlatform" className="text-[#BFBFBF] text-sm block">
                  Nationality*
                </label>
                <input
                    type="text"
                    name="nationality"
                    value={values.nationality}
                    onChange={handleChange}
                    className={`bg-white text-[#6A6A6A] border-2 
                    ${(touched.nationality && errors.nationality) ? 'error-border' : 'input-border'}
                    rounded-md px-4 py-2 w-full`}
                />
            </div>

            <div className="my-3">
                <label htmlFor="bankName" className="text-[#BFBFBF] text-sm block">
                  Role*
                </label>
                <input
                    type="text"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    className={`bg-white text-[#6A6A6A] border-2 
                    ${(touched.role && errors.role) ? 'error-border' : 'input-border'}
                    rounded-md px-4 py-2 w-full`}
                />
            </div>

            <div className="my-3">
                <label htmlFor="accountName" className="text-[#BFBFBF] text-sm block">
                    Certification Level*
                </label>
                <select 
                  name="certLevel" 
                  value={values.certLevel} 
                  onChange={handleChange} 
                  id="certLevel" 
                  className={`bg-white text-[#6A6A6A] border-2 
                  ${(touched.certLevel && errors.certLevel) ? 'error-border' : 'input-border'}
                  rounded-md px-4 py-2 w-full`}
                >
                  {
                    certLevels.map((item: string, idx: number) => {
                      return <option key={idx} value={item}>{item}</option>
                    })
                  }
                </select>
            </div>

            <div className="my-3">
                <label htmlFor="accountNumber" className="text-[#BFBFBF] text-sm block">
                    Years of Experience*
                </label>
                <input
                    type="number"
                    name="experienceYears"
                    value={values.experienceYears}
                    onChange={handleChange}
                    className={`bg-white text-[#6A6A6A] border-2 
                    ${(touched.experienceYears && errors.experienceYears) ? 'error-border' : 'input-border'}
                    rounded-md px-4 py-2 w-full`}
                />
            </div>
            <div className="my-3">
                <label htmlFor="accountNumber" className="text-[#BFBFBF] text-sm block">
                    Skills*
                </label>
                <input
                    type="text"
                    placeholder='skill1, skill2, skill3'
                    name="skills"
                    value={values.skills}
                    onChange={handleChange}
                    className={`bg-white text-[#6A6A6A] border-2 
                    ${(touched.skills && errors.skills) ? 'error-border' : 'input-border'}
                    rounded-md px-4 py-2 w-full`}
                />
            </div>
          </div>

          <div className="my-3">
              <label htmlFor="accountNumber" className="text-[#BFBFBF] text-sm block">
                Tell us about you*
              </label>
              <textarea
                rows={5}
                name="biography"
                value={values.biography}
                onChange={handleChange}
                className={`bg-white text-[#6A6A6A] border-2 
                ${(touched.biography && errors.biography) ? 'error-border' : 'input-border'}
                rounded-md px-4 py-2 w-full`}
              >
              </textarea>
              
          </div>

          <div className="my-3 text-center">
              <button
                disabled={loading}
                type="submit"
                className="bg-[#042f9c] text-white py-1 px-10 rounded-2xl"
              >
                  {loading ? "Processing..." : "Apply"}
              </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default JobApplicationForm;