import React, { FC } from 'react';
import moment from 'moment';
import { Application } from '../../../common/application';
import CustomDetailField from '../../CustomDetailField';
import { getFullName } from '../../../utils';


type Props = {
    data?: Application | null
}
const ApplicationDetailComp: FC<Props> = ({ data }) => {

    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Job Application Detail Modal</h2>
                </div>

                <div >
                    <img src={data?.resume} className='mx-auto w-2/12' alt="Uploaded resume" />
                </div>

                <div className='px-4 my-6'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomDetailField label='First Name:' value={data?.firstName} />
                        <CustomDetailField label='Last Name:' value={data?.lastName} />
                        <CustomDetailField label='Email:' value={data?.email} />
                        <CustomDetailField label='Phone:' value={data?.phoneNumber} />
                        <CustomDetailField label='State' value={data?.state} />
                        <CustomDetailField label='Nationality:' value={data?.nationality} />
                        <CustomDetailField label='Job Title:' value={data?.job?.title} />
                        <CustomDetailField label='Job Type:' value={data?.job?.type} />
                        <CustomDetailField label='Employeeing Company:' value={data?.job?.companyName} />
                        <CustomDetailField label='Role:' value={data?.role} />
                        <CustomDetailField label='Certification:' value={data?.certLevel} />
                        <CustomDetailField label='Skills:' value={data?.skills} />
                        <CustomDetailField label='Years of Experience:' value={data?.experienceYears} />
                        <CustomDetailField label='Status' value={data?.status} />
                        <CustomDetailField label='Created At:' value={moment(data?.createdAt).format("MM-DD-YYYY")} />
                        <CustomDetailField label='Created By:' value={getFullName(data?.createdBy)} />
                    </div>
                    <CustomDetailField label='Job Description:' value={data?.job?.description} />
                </div>
            </div>
        </>
    )
}

export default ApplicationDetailComp;