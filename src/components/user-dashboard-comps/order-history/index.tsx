import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from "moment";

// icons
import Card from '../../../shared/card';
import { getItem } from '../../../utils';
import { RETREIVE_ORDERS } from '../../../services';
import { ApiResponse, Order, User } from '../../../common';
import transaction from '../../../assets/images/transaction.png';
import { INITIALIZE_ORDERS } from '../../../store/orders/orders';
import AppTable, { TableHeader } from '../../../shared/app-table';

const OrderHistoryComp = () => {
    const dispatch = useDispatch();
    // const ordersState = useSelector((state: RootState) => state.orderState.value);
    
    const [loading, setLoading] = useState<boolean>(false);
    const [orderRecords, setOrderRecords] = useState<Order[] | []>([]);
    const [tableRows, setTableRows] = useState<any[]>([]);

    const tableHeaders: TableHeader[] = [
        { key: 'sn', value: 'S/N' },
        { key: 'date', value: 'Date' },
        { key: 'crypto', value: 'Crypto' },
        { key: 'type', value: 'Order Type' },
        { key: 'amount', value: 'Amount' },
        { key: 'receivable', value: 'Receivable Amount' },
        { key: 'status', value: 'Status' },
    ];

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

    const retreiveOrders = () => {
        setLoading(true);
        const userDetail: User = getItem('clientD');
        const queryString: string = `?createdBy=${userDetail.id}&sort=-createdAt&populate=airtime,cryptocurrency,giftcard`;        RETREIVE_ORDERS(queryString).then((res: AxiosResponse<ApiResponse>) => {
            setLoading(false);
            const { success, message, payload } = res.data;
            if(success){
                notify('success', `${message} ${payload.length} records found!`);
                setOrderRecords(payload);
                dispatch(INITIALIZE_ORDERS(payload));
                const mappedDate = payload.map((item: Order, idx: number) => {
                    return {
                        sn: idx + 1,
                        date: moment(item?.createdAt).format("MM-DD-YYYY"),
                        crypto: item?.cryptocurrency?.shortName,
                        type: item?.orderType,
                        amount: `
                            ${item.orderType === 'SELL_CRYPTO' ? '$' : ''}
                            ${item.orderType === 'BUY_CRYPTO' ? 'NGN' : ''}
                            ${item.orderType === 'AIRTIME' ? 'NGN' : ''}
                            ${item.orderType === 'GIFTCARD' ? '$' : ''}
                            ${item?.amount}`,
                            receivable: `
                            ${item.orderType === 'AIRTIME' ? 'NGN' : ''}
                            ${item.orderType === 'SELL_CRYPTO' ? 'NGN' : ''} 
                            ${item.orderType === 'GIFTCARD' ? 'NGN' : ''}
                            ${item.orderType === 'BUY_CRYPTO' ? '$' : ''}
                            ${item?.amountReceivable}
                            ${item.orderType === 'BUY_CRYPTO' ? item?.cryptocurrency?.shortName : ''}
                            `,
                        status: <span className={
                            (item.status === "COMPLETED") ? 'text-[#2CE71C]' : 'text-[#1cd9e7]'
                        
                        }>{ item.status }</span>,
                    }
                });
                setTableRows(mappedDate);
            }
        }).catch((err: any) => {
            setLoading(false);
            const { message } = err.response.data;
            notify('error', message);
        })
    }

    useEffect(() => {
        retreiveOrders();
    }, [])

    return (
        <>
            <div className='px-3'>
                <h3 className='text-[#8652A4] text-4xl font-bold mt-3 mb-8'>Order History</h3>
                {/* filter section */}
                <div>

                </div>
                {/* filter section */}

                {/* table */}
                <div>
                    {
                        orderRecords.length > 0 ?
                        <AppTable 
                            tableHeaders={tableHeaders} 
                            tableRows={tableRows} 
                            showSearch={false} 
                        /> :
                        <Card type='lg'>
                            <div className='mt-2 h-32 w-full flex justify-center'>
                                <div className='h-48 my-auto'>
                                    <img src={transaction} alt="no transactions" width="100px" height="100px" />
                                </div>
                            </div>
                            <div className='w-full text-center'>
                                <p className='text-[#7F7F80]'>You currently do not have any transaction yet!</p>
                                <p className='text-[#8652A4] font-semibold'>Perform your first trade</p>
                            </div>
                        </Card>
                    }

                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default OrderHistoryComp;