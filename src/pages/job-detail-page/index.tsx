import { FC, useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';

import { Job } from '../../common/job';
import { RETREIVE_JOBS_PUBLIC } from '../../services/jobs';
import JobTrainingDetailComp from './JobTrainingDetailComp';
import HeroSection from '../../shared/users-frontend/hero-section';
import JobApplicationForm from './JobApplicationForm';

const JobDetailsPage: FC = () => {
  const params = useParams();
  const JobTrainingId: string = params['jobId'] || '';

  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [detailsData, setDetailsData] = useState<Job | null>(null);

  const retrieveJobTrainingDetails = (id: string) => {
    const searchQuery: string = `?_id=${id}`
    setLoading(true);
    RETREIVE_JOBS_PUBLIC(searchQuery).then(res => {
      setLoading(false);
      const { payload } = res.data;
      setDetailsData(payload[0]);
    })
    .catch(err => {
      setLoading(false);
      const { message } = err.response.data;
      console.log('error', message);
    });
  }

  useEffect(() => {
    console.log('JobTrainingId', JobTrainingId);
    retrieveJobTrainingDetails(JobTrainingId)
  }, [JobTrainingId]);


  return (
    <>
      <HeroSection>
          <div className="flex justify-center items-center w-full min-h-[350px]">
              <div>
                  <h3 className='text-5xl font-bold my-8 text-white'>AOSL Jobs / Traingings Details</h3>
              </div>
          </div>
      </HeroSection>

      <div className="mt-4 mx-auto w-10/12 mb-8">
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4">
          <div className="flex-2 flex-grow">
            {
              detailsData && <div>
                <JobTrainingDetailComp data={detailsData} />

                <div className="my-3 text-center">
                  <button
                    onClick={() => setShowForm(prev => !prev)}
                    type="submit"
                    className="bg-[#042f9c] text-white py-1 px-10 rounded-2xl"
                  >
                    { showForm ? 'Close Form' : 'Apply Now' }
                  </button>
                </div>
              </div>
            }
          </div>

          {
            showForm && (
              <div className="flex-1 flex-grow">
                <JobApplicationForm jobId={JobTrainingId} mode={'create'} record={null} />
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default JobDetailsPage;