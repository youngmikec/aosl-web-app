import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import moment from 'moment';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import logo from '../../assets/images/logo-white.png';
import { Invoice } from "../../common/invoice";



type Props = {
  invoiceData: Invoice | null
}

type FormControl = {
  value: any,
  error: boolean,
  errMsg: string
}


const InvoiceForm: FC<Props> = ({ invoiceData }) => {

  const invoiceRef = useRef<HTMLDivElement>(null);
  const paypalBtnRef = useRef<HTMLButtonElement>(null);
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const [loading, setLoading] = useState<boolean>(false);
  const [printing, setPrinting] = useState<boolean>(false);
  const [clientName, setClientName] = useState<FormControl>({ value: '', error: true, errMsg: '' });
  const [clientEmail, setClientEmail] = useState<FormControl>({ value: '', error: true, errMsg: '' });
  const [clientPhone, setClientPhone] = useState<FormControl>({ value: '', error: true, errMsg: '' });
  const [clientAddress, setClientAddress] = useState<FormControl>({ value: '', error: true, errMsg: '' });

  const calculateTaxAmount = (amount?: number, tax?: number) => {
    return (tax && amount) ? (tax / 100) * amount : 0;
  }

  const inputCheck = (): boolean => {
    let isValid: boolean = true;

    if(clientName.value === '' || undefined || null){
      isValid = false;
      setClientName({ ...clientName, error: true, errMsg: 'name field is empty' });
    }else{
      setClientName({ ...clientName, error: false });
    }
    if(clientEmail.value === '' || undefined || null){
      isValid = false;
      setClientEmail({ ...clientEmail, error: true, errMsg: 'email field is empty' });
    }else{
      setClientEmail({ ...clientEmail, error: false });
    }

    if(clientPhone.value === '' || undefined || null){
      isValid = false;
      setClientPhone({ ...clientPhone, error: true, errMsg: 'Phone field is empty' });
    }else{
      setClientPhone({ ...clientPhone, error: false });
    }

    if(clientAddress.value === '' || undefined || null){
      isValid = false;
      setClientAddress({ ...clientAddress, error: true, errMsg: 'Adrress field is empty' });
    }else{
      setClientAddress({ ...clientAddress, error: false });
    }

    return isValid;
  }

  const populateClientFields = (data: Invoice | null) => {
    if(!data) return
    setClientName({ value: data?.clientName || '--', error: false, errMsg: '' });
    setClientEmail({ value: data?.clientEmail || '--', error: false, errMsg: '' });
    setClientPhone({ value: data?.clientPhone || '--', error: false, errMsg: '' });
    setClientAddress({ value: data?.clientAddress || '--', error: false, errMsg: '' });

    inputCheck();
  }

  const handleMakePayment = () => {
    if(paypalBtnRef.current === null) return;
    setLoading(true);
    paypalBtnRef.current.click();
    
  }

  const handlePrintInvoice = useCallback(() => {
    if(invoiceRef.current === null) return;
    setPrinting(true)
    toPng(invoiceRef.current, { cacheBust: true, })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `${clientName.value !== '' ? `${clientName.value}-invoice` : 'invoice'}.png`
      link.href = dataUrl
      link.click()
      setPrinting(false);
    })
    .catch((err) => {
      setPrinting(false)
      console.log(err)
    });
  }, [invoiceRef, clientName]);

  useEffect(() => {
    if(invoiceData){
      populateClientFields(invoiceData)
    }
  }, [invoiceData]);


  return (
    <>
      <div className="w-full p-8 bg-white rounded-lg shadow-xl max-h-max" ref={invoiceRef}>
        <div className="w-full p-4 border-[1px] border-[#BFBFBF]">
          <div className="flex justify-between mb-4">
            <div>
              <img src={logo} width={'80px'} height={"80px"} alt="logg" />
            </div>

            <div>
              <h1 className="text-[#042f9c] text-4xl font-bold">Invoice</h1>
            </div>
          </div>

          <div className="flex justify-between my-4">
            <div>
              <div className="my-2 flex flex-col gap-2">
                <div className="text-gray-600">
                  <input 
                    type="text" 
                    name="clientName"
                    placeholder='full name'
                    className={`border-0 focus:ring-0 focus:outline-none p-2 w-full
                      ${clientName.error ? 'border-[1px] border-red-500' : 'border-[#BFBFBF]'}
                    `} 
                    value={clientName.value}
                    onKeyUp={(e) => inputCheck()}
                    onChange={(e) => setClientName({ ...clientName, value: e.target.value })}
                  />
                </div>
                <div className="text-gray-600">
                  <input 
                    type="text" 
                    name="clientAddress"
                    placeholder='address'
                    className={` p-2 w-full
                      ${clientAddress.error ? 'border-[1px] border-red-500 ' : 'border-[#BFBFBF] border-0 focus:ring-0 focus:outline-none'}
                    `}
                    value={clientAddress.value}
                    onKeyUp={(e) => inputCheck()}
                    onChange={(e) => setClientAddress({ ...clientAddress, value: e.target.value })}
                  />
                </div>
                <div className="text-gray-600">
                  <input 
                    type="text" 
                    name="clientPhone"
                    placeholder='phone'
                    className={`border-0 focus:ring-0 focus:outline-none p-2 w-full
                      ${clientPhone.error ? 'border-[1px] border-red-500' : 'border-[#BFBFBF]'}
                    `}
                    value={clientPhone.value}
                    onKeyUp={(e) => inputCheck()}
                    onChange={(e) => setClientPhone({ ...clientPhone, value: e.target.value })}
                  />
                </div>
                <div className="text-gray-600">
                  <input 
                    type="email" 
                    name="clientEmail"
                    placeholder='email address'
                    className={`border-0 focus:ring-0 focus:outline-none p-2 w-full
                      ${clientEmail.error ? 'border-[1px] border-red-500' : 'border-[#BFBFBF]'}
                    `}
                    value={clientEmail.value}
                    onKeyUp={(e) => inputCheck()}
                    onChange={(e) => setClientEmail({ ...clientEmail, value: e.target.value })}
                  />
                </div>
                
              </div>
            </div>

            <div>
              <table className="border-separate border-spacing-1">
                <tr className="table-row">
                  <th className="bg-[#042f9c33] text-gray-700 text-left mr-4 table-cell px-2 ">Invoice No:</th>
                  <td className="bg-gray-100 text-right text-gray-600 text-[13px]">{invoiceData?.invoiceCode}</td>
                </tr>
                <tr>
                  <th className="bg-[#042f9c33] text-gray-700 text-left mr-4 table-cell px-2 ">Invoice Date</th>
                  <td className="bg-gray-100 text-right text-gray-600 text-[13px]">{moment(invoiceData?.issueDate).format('DD MMM YYYY')}</td>
                </tr>
                <tr>
                  <th className="bg-[#042f9c33] text-gray-700 text-left mr-4 table-cell px-2 ">Payment terms</th>
                  <td className="bg-gray-100 text-right text-gray-600 text-[13px]">Due on receipt</td>
                </tr>
                <tr>
                  <th className="bg-[#042f9c33] text-gray-700 text-left mr-4 table-cell px-2 ">Due Date</th>
                  <td className="bg-gray-100 text-right text-gray-600 text-[13px]">{moment(invoiceData?.dueDate).format('DD MMM YYYY')}</td>
                </tr>
                {/* <tr>
                  <td className="">Total Due</td>
                  <td className="">{invoiceData?.totalDue}</td>
                </tr> */}
              </table>
              
            </div>
          </div>

          {
            (clientEmail.value !== '' || undefined || null) && (
            <div className="my-4">
              <h1 className="text-[#042f9c] italic text-lg font-bold">Bill to</h1>
              <p className="text-gray-600 italic">{clientEmail.value}</p>
            </div>

            )
          }

          {/* product description */}
          <div className="my-4 pb-12 border-b-2 border-[#BFBFBF]">
            <table className="w-full">
              <thead className='bg-[#042f9c] text-white'>
                <tr className="table-row">
                  <th className="text-left text-cell">Description</th>
                  <th className="text-left">Quantity</th>
                  <th className="text-left">Unit Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  invoiceData?.services?.map((item, index) => {
                    return (
                      <tr key={index} className={`table-row ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} py-4`}>
                        <td className="text-left">{item?.name}</td>
                        <td className="text-left">{item?.quantity}</td>
                        <td className="text-left">${item?.amount}</td>
                        <td className="text-right">${(item?.totalAmount)}</td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>
          </div>,

          <div className="my-4">
            <table className="w-full">
              <thead className=''>
                <tr className="table-row">
                  <th className="text-left">Note to recipient(s)</th>
                  <th className="text-left">Sub Total</th>
                  <th className="text-right">${invoiceData?.subTotal || 0}</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`table-row py-4`}>
                  <td className="text-left"></td>
                  <td className="text-left">Tax({invoiceData?.tax})%</td>
                  <td className="text-right">${calculateTaxAmount(invoiceData?.subTotal, invoiceData?.tax)}</td>
                </tr>
                <tr className={`table-row py-4 bg-[#042f9c33]`}>
                  <td className="text-left"></td>
                  <td className="text-left">Total</td>
                  <td className="text-right">${invoiceData?.totalAmount || 0}</td>
                </tr>
                
                
              </tbody>
            </table>
          </div>
          {/* product description */}
        </div>

        <div className="mt-8 flex justify-start gap-4 w-full">
          <div>
            <button 
              onClick={() => handleMakePayment() } 
              className='bg-[#042f9c] text-white mb-6 block w-full px-6 rounded-md py-2 sm:py-2 md:py-3 lg:py-3'
            >
                { isPending ? 'processing' : 'Pay invoice' }
            </button>

            <div className="">
              <PayPalButtons />
            </div>
          </div>

          <div>
            <button 
              onClick={() => handlePrintInvoice() } 
              className='bg-[#042f9c33] text-gray-500 mb-6 block w-full px-6 rounded-md py-2 sm:py-2 md:py-3 lg:py-3'
            >
                { printing ? 'processing' : 'Print' }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default InvoiceForm;