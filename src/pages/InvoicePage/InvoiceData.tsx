import { FC } from 'react';

import logo from '../../assets/images/logo-white.png';
import { Invoice } from "../../common/invoice";



type Props = {
  invoiceData: Invoice | null
}


const InvoiceForm: FC<Props> = ({ invoiceData }) => {
  return (
    <>
      <div className="w-full p-8 bg-white rounded-lg shadow-xl max-h-max">
        <div className="w-full p-4 border-[1px] border-[#BFBFBF]">
          <div className="flex justify-between mb-4">
            <div>
              <img src={logo} width={'80px'} height={"80px"} alt="logg" />
            </div>

            <div>
              <h1 className="text-[#042f9c] text-2xl font-bold">Invoice</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InvoiceForm;