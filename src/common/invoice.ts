import { INVOICE_STATUS, PAYMENT_METHOD, PAYMETN_GATEWAY } from "./enums"
import { User } from "./user"

export type IService = {
  _id: string,
  serviceId: string,
  name: string,
  amount: number
  quantity: number
  totalAmount: number
}




export type Invoice = {
  id: string,
  invoiceCode: string,
  issueDate: Date,
  dueDate: Date,
  clientName: string,
  clientEmail: string,
  clientPhone: string,
  clientAddress: string,
  invoiceUrl: string,
  services: IService[],
  status: INVOICE_STATUS,
  companyName: string,
  // companyAddress: string,
  companyPhone: string,
  companyEmail: string,

  subTotal: number,
  tax: number,
  discount: number, // in percentage
  totalAmount: number,
  amountPaid: number,
  balanceAmount: number,
  currency: string,
  paymentMethod: PAYMENT_METHOD,
  paymentGateway: PAYMETN_GATEWAY,

  createdBy: User,
  updatedBy: User,
  deleted: boolean,
  deletedAt: Date,
  deletedBy: User,
}