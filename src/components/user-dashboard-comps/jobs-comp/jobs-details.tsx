import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { Job } from '../../../common/job';
import CustomDetailField from '../../CustomDetailField';
import { getFullName } from '../../../utils';
import ApplicationForm from '../application-comp/application-form';
import JobApplicationForm from '../../../pages/job-detail-page/JobApplicationForm';



type Props = {
    data?: Job
}
const JobsDetailComp: FC<Props> = ({ data }) => {
    const [applyForJob, setApplyForJob] = useState<boolean>(false);
    const [jobId, setJobId] = useState<string>('');

    const handleApplyForJob = (jobId?: string) => {
        setJobId(jobId ? jobId : '')
        setApplyForJob(true);
    }

    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                {
                    applyForJob ? <JobApplicationForm jobId={data ? data.id : ''} mode={'create'} record={null} /> :
                    <div>

                        <div className='text-center my-3'>
                            <h2 className='font-bold text-2xl'>Job/Training Detail Modal</h2>
                        </div>

                        <div >
                            <img src={data?.jobImage} className='mx-auto w-2/12' alt="job image" />
                        </div>

                        <div className='px-4 my-6'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CustomDetailField label='Job Title:' value={data?.title} />
                                <CustomDetailField label='Description:' value={data?.description} />
                                <CustomDetailField label='Job Type:' value={data?.type} />
                                <CustomDetailField label='Employeeing Company:' value={data?.companyName} />
                                <CustomDetailField label='Job Duration:' value={data?.termDuration} />
                                <CustomDetailField label='Job Work Mode:' value={data?.workMode} />
                                <CustomDetailField label='Status' value={data?.status} />
                                <CustomDetailField label='Created At:' value={moment(data?.createdAt).format("MM-DD-YYYY")} />
                                <CustomDetailField label='Created By:' value={getFullName(data?.createdBy)} />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button 
                                className='rounded-md bg-[#042f9c] text-white px-6 py-3'
                                onClick={() => handleApplyForJob(data?.id)}
                            >Apply for { data?.type === 'WORK' ? 'Job' : 'Training'}</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default JobsDetailComp;