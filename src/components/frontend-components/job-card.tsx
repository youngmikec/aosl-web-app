import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../common/job';

import defaultJobImage from '../../assets/images/PA-img2.jpg';

type Props = {
  job: Job
}

const JobCard: FC<Props> = ({ job }) => {
  const navigate = useNavigate();

  const goToJobDetails = () => {
    navigate(`/jobs-details/${job.id}`);
  }

  return (
    <>
      <div 
        className="bg-[#f5f3f3] rounded-lg w-full min-h-[150px] hover:scale-105 hover:ease-in delay-150 
        hover:shadow-md shadow-sm p-4 cursor-pointer"
        onClick={goToJobDetails}
      >
        <div className="w-full min-h-fit mb-4 flex justify-center items-center">
          <img src={job ? job.jobImage : defaultJobImage} className="object-contain rounded-lg" alt="job image" />
        </div>

        <div>
          <p className="text-[#042f9c] text-lg font-semibold text-['lato'] my-2 text-justify">{job ? job.title : 'Job Title'}</p>

          <p 
            className="text-[#636363] text-sm my-2 text-justify text-['lato']"
          >
            Description: {job ? job.description.length > 50 ? job.description.slice(0, 50) + '...' : job.description : 'Job Description'}
          </p>
          <p 
            className="text-[#636363] text-sm my-2 text-justify text-['lato']"
          >
            Job Status: <span className='text-[#042f9c] font-bold'>{job ? job.status : 'Job Description'}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default JobCard;