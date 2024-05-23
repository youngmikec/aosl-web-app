import { User } from "./user";
import { PAYMENT_METHOD, ORDER_STATUS } from "./enums";

export type Order = {
    id: string;
    orderCode: string;
    sendersPhone: string;
    amount: number;
    amountReceivable: number;
    user: User;
    status: ORDER_STATUS
    proofImage: string;
    paymentMethod: PAYMENT_METHOD,
    network: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    walletAddress: string;
    platform: string;
    createdBy: User;
    createdAt: Date;
    approvedBy: User;
    updatedBy: User;
    updatedAt: Date;
    deleted: boolean;
    deletedAt: Date;
    deletedBy: User;
}