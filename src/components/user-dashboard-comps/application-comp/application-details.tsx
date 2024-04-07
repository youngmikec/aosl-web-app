import React, { FC } from 'react';
import moment from 'moment';
import { Application } from '../../../common/application';


type Props = {
    data?: Application
}
const ApplicationDetailComp: FC<Props> = ({ data }) => {

    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Job Application Detail Modal</h2>
                </div>

                {/* <div >
                    <img src={airtime?.networkImage} className='mx-auto w-2/12' alt="airtime" />
                </div>

                <div className='px-4 my-6'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomDetailField label='Name:' value={airtime?.name} />
                        <CustomDetailField label='Short Name:' value={airtime?.shortName} />
                        <CustomDetailField label='Rate:' value={airtime?.rate} />
                        <CustomDetailField label='Transaction Network:' value={airtime?.txnNetwork} />
                        <CustomDetailField label='Transaction Number:' value={airtime?.txnNetwork} />
                        <CustomDetailField label='Status' value={airtime?.status} />
                        <CustomDetailField label='Created At:' value={moment(airtime?.createdAt).format("MM-DD-YYYY")} />
                        <CustomDetailField label='Created By:' value={getFullName(airtime?.createdBy)} />
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default ApplicationDetailComp;