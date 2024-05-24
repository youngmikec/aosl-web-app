import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import HeroSection from '../../shared/users-frontend/hero-section';
import { RETREIVE_INVOICE_BY_CODE } from '../../services/invoice';
import { Invoice } from '../../common/invoice';
import InvoiceForm from './InvoiceData';
import AppLoader from '../../components/app-loader';


const InvoicePage = () => {
  const params = useParams();
  const invoiceId: string | any = params['invoiceId'];

  const [loading, setLoading] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);

  const retreiveInvoiceDetail = () => {
    setLoading(true);
    RETREIVE_INVOICE_BY_CODE(invoiceId).then(res => {
      setLoading(false);
      const { success, message, payload } = res.data;
      if(success){
        setInvoiceData(payload[0]);
        console.log('message', message);
      }
    })
    .catch(err => {
      setLoading(false);
      const { message } = err.response.data;
      console.log('error', message);
    });

  }

  useEffect(() => {
    retreiveInvoiceDetail();
  }, [])

  useEffect(() => {
    
  }, [invoiceId])

  return (
    <>
      { loading &&  <AppLoader color='#042f9c' /> }

      <HeroSection>
          <div className="flex justify-center items-center w-full min-h-[350px]">
              <div>
                  <h3 className='text-5xl font-bold my-8 text-white'>Invoice</h3>
              </div>
          </div>
      </HeroSection>

      {/* Invoice Form section */}
      <div className='mt-4 mx-auto w-10/12 mb-8'>
        <InvoiceForm invoiceData={invoiceData} />
      </div>
      {/* Invoice Form section */}


        
    </>
  )
}

export default InvoicePage;