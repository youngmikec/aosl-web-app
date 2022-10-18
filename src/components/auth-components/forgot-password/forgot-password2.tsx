import React,{useEffect,useState} from 'react'
import logo from "../../../assets/images/logo.png";
import googleIcon from "../../../assets/icons/google-icon.png";
import { Link } from "react-router-dom";
 
  type inputProps={
    type:string,
    placeholder:string,
    focus:boolean,
    value:string,
    id:Number
  }
  
  
const ForgotPassword2 = () => {


    const [inputs,setInput]=useState<inputProps[]>([
      {type:'text',placeholder:'0',focus:false,value:'',id:0},
      {type:'text',placeholder:'0',focus:true,value:'',id:1},
      {type:'text',placeholder:'0',focus:false,value:'',id:2},
      {type:'text',placeholder:'0',focus:false,value:'',id:3},
      {type:'text',placeholder:'0',focus:false,value:'',id:4}
    ])
     const [currentFocus,setCurrentFocus]=useState<Number|undefined>();

    const changeFocuse=(id:Number)=>{
      setCurrentFocus(undefined);
      const focusInput:inputProps[]=[...inputs];
      focusInput.map((e,i)=>{
         if(e.id==id){
          e.focus=true;
         }
      })
      setInput(focusInput);
    }

    const changeInput=(id:Number,value:string)=>{
      
      setCurrentFocus(id);
      const tempInput:inputProps[]=[...inputs];
      //  const currentObjec=tempInput.find((e:inputProps)=>e.id=id);
     

        tempInput.map((e,i)=>{
          if(e.id==id){
            
            e.value=value;
            e.focus=false;
          }

        });
        setInput(tempInput);
         
    }

   useEffect(()=>{
    if(currentFocus){
      changeFocuse(currentFocus&&currentFocus);
    }
   },[inputs])

  // let otp = document.querySelector('input') as HTMLInputElement;

  // otp.oninput = function() {
  //         if(otp.nextElementSibling && otp !== null) {
  //             otp.nextElementSibling.focus();
  //         }
  //     }
  

  return (
    <div className="container w-full bg-white  ">
      <img
        src={logo}
        alt=""
        width="120px"
        height="120px"
        className="ml-8 mt-10"
      />
      <div className="flex justify-center  w-screen">
      <div className=" w-10/12 sm:w-9/12 md:w-9/12 lg:w-5/12 mt-14  ">
        <div className="text-center mb-18">
          <div className=" justify-around text-center text-4xl font-bold mb-4 text-black ">
            Forgot Password
          </div>
          <div className="text-center text-gray-400 mb-14">
          Please, Enter the verification code sent to your registered email
          </div>
          <div className="text-center  mx-auto w-9/12 text-gray-400 uppercase flex justify-between otp ">
            {inputs.map((e,i)=>{
                return(
                  <input
                  type={e.type} 
                  maxLength={1}
                  autoFocus={e.focus}
                  placeholder={e.placeholder}
                  onChange={(b)=>changeInput(e.id,b.target.value)}
                  className="  rounded-md w-1/5 h-14 text-center ml-2 my-6  outline-none border-gray-400 border-solid border"
                />
                )
            })}
          
          
          </div>
        </div>

        <div className="relative my-6 text-center">
          <hr className="border-[#8652a48f] w-full" />
          <p className="text-[#8652A4] text-sm px-4 bg-white absolute -top-3 left-56">
            or sign up with
          </p>

          <img src={googleIcon} className="my-4 mx-auto " alt="google" />
        </div>

        <div className="w-8/12 my-4 mx-auto text-center">
          <button className="bg-[#8652A4] text-white mb-6 block w-full rounded-lg py-4">
            Verify
          </button>

          <p className="text-[#8652a48f] text-sm block my-4">
            Already have an account?
            <span className="text-[#8652A4] font-bold">
              <Link to="/sign-in">Sign in</Link>
            </span>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
  
}

export default ForgotPassword2