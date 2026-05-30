import React, { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

// image
// style
import "./style.css";
import DashboardCard from './dashbord-card';
import { Order } from '../../../common';
import { getItem } from '../../../utils';
import Card from '../../../shared/card';
import { RETRIEVE_APP_REPORTS } from '../../../services/reports';
import image from '../../../assets/images/account-balance-bg.png';

const DashboardComp = () => {    
    const [loading, setLoading] = useState<boolean>(false);
    const [pendingOrders, setPendingOrders] = useState<number>(0);
    const [completedOrders, setCompletedOrders] = useState<number>(0);
    const [declinedOrders, setDeclinedOrders] = useState<number>(0);
    const [orderRecords, setOrderRecords] = useState<Order[] | []>([]);

    const retrieveAppReports = () => {
        setLoading(true);
        const user = getItem('clientD');
        RETRIEVE_APP_REPORTS(user?.id).then(res => {
            const { payload } = res.data;
            setLoading(false);
            setPendingOrders(payload.pendingOrders);
            setCompletedOrders(payload.completedOrders);
            setDeclinedOrders(payload.declinedOrders);
            setOrderRecords(payload.recentOrders);
            
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
        
    }

    useEffect(() => {
        retrieveAppReports();
    }, []);


    return (
        <>
            {/* <div>     */}
                {/* FIRST SECTION STARTS HERE */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <div>
                        <DashboardCard image={image} loading={loading} status='PENDING' title='Pending Applications' value={pendingOrders} />
                    </div>
                    <div>
                        <DashboardCard image={image} loading={loading} status='FAILED' title='Accepted Applications' value={declinedOrders} />
                    </div>
                    <div>
                        <DashboardCard image={image} loading={loading} status='COMPLETED' title='Total Orders' value={completedOrders} />
                    </div>

                </div>

                {/* service card */}
                {/* <section>

                    <div>
                        <h3 className='text-[#7F7F80] text-2xl font-semibold my-12'>Quick Actions</h3>

                        <div className='grid grid-cols-1 gap-4
                            sm:grid-cols-2  
                            md:grid-cols-2  
                            lg:grid-cols-4  
                            ' 
                        >
                            <div>
                                <ServiceCard
                                    title="Sell Crypto"
                                    subTitle='Sell your crypto currency'
                                    link='/sell-crypto'
                                    linkText='Sell'
                                    img={sell}
                                />

                            </div>

                            <div>
                                <ServiceCard
                                    title="Buy Crypto"
                                    subTitle='Buy your crypto currency'
                                    link='/buy-crypto'
                                    linkText='Buy'
                                    img={crypto}
                                />
                            </div> 

                            <div>
                                <ServiceCard
                                    title="Trade Giftcard"
                                    subTitle='Redeem your giftcard with us'
                                    link='/trade-giftcard'
                                    linkText='Convert'
                                    img={trade}
                                />
                                
                            </div>    
                             

                            <div>
                                <ServiceCard
                                    title="Airtime to Cash"
                                    subTitle='Convert your airtime to cash'
                                    link='/airtime'
                                    linkText='Convert'
                                    img={airtime}
                                />
                            </div>                           


                        </div>

                    </div>
                </section> */}
                {/* service card */}

                <section>
                    <div className='my-8'>
                        <h4 className='text-[#7F7F80] text-2xl font-semibold'>Recent Orders</h4>
                    </div>
                    <div>
                    <Card type='sm'>
                        <div className='overflow-x-scroll p-4'>
                            <table className='table table-auto w-full mx-auto border-spacing-y-4'>
                                <thead className=''>
                                    <tr className='border-spacing-y-4'>
                                        <th className='table-caption text-left'>#</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   orderRecords && orderRecords.length > 0 ?
                                        orderRecords.map((item: Order, idx: number) => {
                                            return <tr key={idx} className='my-4'>
                                            <td className="text-left border-spacing-y-4">{ idx + 1 }</td>
                                            <td className="text-left py-3">{ moment(item?.createdAt).format("DD-MM-YYYY") }</td>
                                            {/* <td className="text-left py-3">{ item?.orderType }</td> */}
                                            <td className="text-left py-3"><span className='line-through'>N</span>{ item?.amountReceivable } </td>
                                            <td className="text-left py-3">
                                                <span className={
                                                    (item.status === "COMPLETED") ? 'text-[#2CE71C]' : 'text-[#1cd9e7]'

                                                }>{ item.status }</span>
                                            </td>

                                        </tr>
                                        }) :

                                        <tr>
                                            <td colSpan={5} className="text-center py-3">No Recent Order available</td>
                                        </tr>
                                    }
                                </tbody>

                            </table>
                        </div>
                    </Card>
                    </div>
                </section>
            {/* </div> */}

            <ToastContainer />
        </>
    )
}

export default DashboardComp