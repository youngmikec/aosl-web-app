import { FC } from 'react';
import moment from 'moment';
import { Job, JobType } from '../../common/job';

type Props = {
  data: Job
}

const JobTrainingDetailComp: FC<Props> = ({ data }) => {
  return (
    <>
      <div className="w-full bg-white border-[1px] border-[#BFBFBF] rounded-lg py-4">
        <div className="w-full border-t-[1px] border-[#BFBFBF] p-4">
          <div className="flex justify-start gap-4">
            <div>
              <img 
                src={data.jobImage} 
                width={300} 
                height={300} 
                alt="job/traing image"
                className='rounded-md'
              />
            </div>
            <div className='flex flex-grow flex-col gap-4'>
              <h1 className="text-[#042f9c] font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl">{data.title}</h1>
              <p>Company Name : {data.companyName}</p>
              <p className='text-gray-400 -mt-4'>{data.title}</p>
              <div className="flex flex-row gap-4">
                <p className='text-gray-400 flex items-center'>Job Status :</p><span className="bg-blue-200 text-blue-800 max-w-max my-2 rounded-md px-4 py-1 text-center">{data.status}</span>
              </div>
              <div className="flex flex-row gap-4">
                <p className='text-gray-400 flex items-center'>Payment Duration :</p><span className="bg-blue-200 text-blue-800 max-w-max my-2 rounded-md px-4 py-1 text-center">{data.paymentDuration}</span>
              </div>
              <h1 className="text-[#5a5a5a] text-sm">{moment(data.createdAt).format('DD MMM YYYY')}</h1>
            </div>
          </div>
        </div>
      
        <div className="w-full border-t-[1px] border-[#BFBFBF] p-4">
          <h1 className="text-[#5a5a5a] font-bold text-xl">{data.type === JobType.WORK ? 'Job' : 'Training'} Description</h1>
          <p className="text-[#5a5a5a] text-sm my-3 text-justify">{data.description}</p>


          <div className="my-2">
            <p className="text-[#5a5a5a] text-sm my-3 text-justify">
              <span className="font-bold">Renumeration :</span>
              {data.renumeration}
            </p>
            <p className="text-[#5a5a5a] text-sm my-3 text-justify">
              <span className="font-bold">Duration :</span>
              {data.termDuration}
            </p>
            <p className="text-[#5a5a5a] text-sm my-3 text-justify">
              <span className="font-bold">{data.type === JobType.WORK ? 'Job' : 'Training'} Mode :</span>
              {data.workMode || 'N/A'}
            </p>
          </div>
        </div>

        <div className="w-full border-t-[1px] border-[#BFBFBF] p-4">
          <h1 className="text-[#5a5a5a] font-bold text-xl">{data.type === JobType.WORK ? 'Job' : 'Training'} Requirements</h1>
          {
            data.jobRequirements.length > 0 ? data.jobRequirements.map((item: string, index: number) => (
              <div key={index}>
                <p className="text-[#5a5a5a] text-sm my-3 text-justify">{item}</p>
              </div>
            )) :
              <p className="text-[#5a5a5a] text-sm my-3 text-justify">No Requirements</p>
          }
        </div>
      </div>
    </>
  )
}

export default JobTrainingDetailComp;