import { FC } from 'react';
import moment from 'moment';

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
              <h1 className="text-[#042f9c] text-4xl font-bold">Invoice</h1>
            </div>
          </div>

          <div className="flex justify-between my-4">
            <div>
              <div className="my-2">
                <p className="text-gray-600">John Doe</p>
                <p className="text-gray-600">8 Elm street cambridge, CB1 United Kingdom</p>
                <p className="text-gray-600">Phone: +44 123 456 789</p>
                <p className="text-gray-600">johndoe@gmail.com</p>
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

          <div className="my-4">
            <h1 className="text-[#042f9c] italic text-lg font-bold">Bill to</h1>
            <p className="text-gray-600 italic">johnDoe@gmail.com</p>
          </div>

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
                      <tr key={index} className="table-row">
                        <td className="text-left">{item?.name}</td>
                        <td className="text-left">{item?.quantity}</td>
                        <td className="text-left">{item?.amount}</td>
                        <td className="text-right">{(item?.totalAmount)}</td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>
          </div>
          {/* product description */}
        </div>
      </div>
    </>
  )
}

export default InvoiceForm;