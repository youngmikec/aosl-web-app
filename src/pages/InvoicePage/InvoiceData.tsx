import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import moment from 'moment';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import logo from '../../assets/images/logo-white.png';
import { IService, Invoice } from "../../common/invoice";
import { INITIATE_INVOICE_PAYMENT } from '../../services/invoice';
import { ApiResponse, ICheckOutLink } from '../../common';
import { AxiosError, AxiosResponse } from 'axios';
import { formatCurrency } from '../../utils';



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
    setClientName({ value: data?.clientName || '', error: false, errMsg: '' });
    setClientEmail({ value: data?.clientEmail || '', error: false, errMsg: '' });
    setClientPhone({ value: data?.clientPhone || '', error: false, errMsg: '' });
    setClientAddress({ value: data?.clientAddress || '', error: false, errMsg: '' });
  }

  const handleMakePayment = () => {
    if(invoiceData){
      setLoading(true);
      const purchaseItems = invoiceData?.services.map((item: IService) => ({
        name: item.name,
        description: item.name,
        quantity: item.quantity.toString(),
        unit_amount: item.amount.toString()
      }));

  
      const payload = {
        purchaseItems,
        invoiceCode: invoiceData?.invoiceCode,
        totalAmount: invoiceData?.totalAmount.toString(),
        currency_code: invoiceData?.currency
    }
  
      INITIATE_INVOICE_PAYMENT(payload).then((res: AxiosResponse<ApiResponse>) => {
        const { data } = res;
        if(data.success){
          setLoading(false);
          notify('success', `${data.message}! Redirecting to Checkout`);
          const orderApprovalLink: ICheckOutLink = data.payload.links.find((item: ICheckOutLink) => item.rel === 'approve');
          if(orderApprovalLink){
            window.location.href = orderApprovalLink.href;
          }else {
            notify('error', 'Error occurred while loading checkout page');
          }
        }
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        notify('error', error.message);
      })
    }
    
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
                  <th className="bg-[#042f9c33] text-gray-700 text-left mr-4 table-cell px-2 py-2">Invoice No:</th>
                  <td className="bg-gray-100 text-right text-gray-600 text-[13px]">{invoiceData?.invoiceCode}</td>
                </tr>
                <tr>
                  <th className="bg-[#042f9c33] text-gray-700 text-left mr-4 table-cell px-2 py-2">Invoice Date</th>
                  <td className="bg-gray-100 text-right text-gray-600 text-[13px]">{moment(invoiceData?.issueDate).format('DD MMM YYYY')}</td>
                </tr>
                <tr>
                  <th className="bg-[#042f9c33] text-gray-700 text-left mr-4 table-cell px-2 py-2">Payment terms</th>
                  <td className="bg-gray-100 text-right text-gray-600 text-[13px]">Due on receipt</td>
                </tr>
                <tr>
                  <th className="bg-[#042f9c33] text-gray-700 text-left mr-4 table-cell px-2 py-2">Due Date</th>
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

          <div className="w-full flex justify-center my-4">
            <h1 className="text-[#042f9c] text-xl font-bold">AOSL Invoice</h1>
          </div>

          {/* product description */}
          <div className="my-4 pb-12 border-b-2 border-[#BFBFBF]">
            <table className="w-full">
              <thead className='bg-[#042f9c] text-white'>
                <tr className="table-row">
                  <th className="text-left text-cell py-3 px-2">Description</th>
                  <th className="text-left py-3 px-2">Quantity</th>
                  <th className="text-left py-3 px-2">Unit Price</th>
                  <th className="text-right py-3 px-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  invoiceData?.services?.map((item, index) => {
                    return (
                      <tr key={index} className={`table-row ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} py-4`}>
                        <td className="text-left py-3 px-2">{item?.name}</td>
                        <td className="text-left py-3 px-2">{item?.quantity}</td>
                        <td className="text-left py-3 px-2">{formatCurrency(item?.amount, invoiceData?.currency, 'en-GB')}</td>
                        <td className="text-right py-3 px-2">{formatCurrency(item?.totalAmount, invoiceData?.currency, 'en-GB')}</td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>
          </div>

          <div className="my-4">
            <table className="w-full">
              <thead className=''>
                <tr className="table-row">
                  <th className="text-left py-2">Note to recipient(s)</th>
                  <th className="text-left py-2">Sub Total</th>
                  <th className="text-right py-2">{formatCurrency((invoiceData?.subTotal || 0), invoiceData?.currency, 'en-GB')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`table-row py-4`}>
                  <td className="text-left py-3 px-2"></td>
                  <td className="text-left py-3 px-2">Tax({invoiceData?.tax})%</td>
                  <td className="text-right py-3 px-2">{
                      formatCurrency(
                        calculateTaxAmount(invoiceData?.subTotal, invoiceData?.tax),
                        invoiceData?.currency,
                        'en-GB'
                      )
                    }
                  </td>
                </tr>
                <tr className={`table-row py-4 bg-[#042f9c33]`}>
                  <td className="text-left py-3 px-2"></td>
                  <td className="text-left py-3 px-2 font-bold">Total</td>
                  <td className="text-right py-3 px-2 font-bold">{
                    formatCurrency(
                      (invoiceData?.totalAmount || 0),
                      invoiceData?.currency,
                      'en-GB'
                    )
                  }</td>
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
                { printing ? 'processing' : 'Download' }
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default InvoiceForm;