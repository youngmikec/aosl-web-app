import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bars, SpinningCircles, Circles, Rings } from 'react-loading-icons'



import { Job } from '../../common/job';
import { RETREIVE_JOBS_PUBLIC } from '../../services/jobs';
import HeroSection from '../../shared/users-frontend/hero-section';
import JobCard from '../../components/frontend-components/job-card';


const JobSearchPage = () => {
  const params = useParams();
  const jobId: string | any = params['jobId'];

  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [trainings, setTrainings] = useState<Job[]>([]);

  const retreiveJobsTraingings = () => {
    setLoading(true);
    RETREIVE_JOBS_PUBLIC().then(res => {
      setLoading(false);
      const { message, payload } = res.data;
      console.log('message', message);
      const jobsData = payload.filter((job: Job) => job.type === 'WORK');
      const trainingsData = payload.filter((job: Job) => job.type === 'TRAINING');
      jobsData && setJobs(jobsData);
      trainingsData && setTrainings(trainingsData);
    })
    .catch(err => {
      setLoading(false);
      const { message } = err.response.data;
      console.log('error', message);
    });

  }

  useEffect(() => {
    retreiveJobsTraingings();
  }, [])

  useEffect(() => {
    
  }, [jobId])

  return (
    <>
      <HeroSection>
          <div className="flex justify-center items-center w-full min-h-[350px]">
              <div>
                  <h3 className='text-5xl font-bold my-8 text-white'>AOSL Jobs / Traingings</h3>
              </div>
          </div>
      </HeroSection>

        {/* Jobs section */}
        <div className='mt-4 mx-auto w-10/12 mb-8'>
          <div className="mb-4">
            <p className="text-[#121212d3] text-lg font-semibold">Job opening in ASOL</p>
          </div>

          { 
            
            loading ? 
            <div className="w-full flex justify-center items-center">
              <SpinningCircles fontSize={2} color='#ffffff' />
            </div> : 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {
                jobs.length > 0 ? jobs.map((item: Job, idx: number) => {
                  return <JobCard key={item.code + idx} job={item} />
                }) :

                <div className="w-full flex justify-center items-center">
                  <p>No Record</p>
                </div>
              }
            </div>
          }

        </div>
        {/* Jobs section */}


        {/* Training section */}
        <div className='my-4 mx-auto w-10/12 mb-8'>
          <div className="mb-4">
            <p className="text-[#121212d3] text-lg font-semibold">Trainings in ASOL</p>
          </div>
          {
            loading ? 
              <div className="w-full flex justify-center items-center">
                <SpinningCircles fontSize={2} color='#ffffff' />
              </div> :
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                  trainings.length > 0 ? trainings.map((item: Job, idx: number) => {
                    return <JobCard key={item.code + idx} job={item} />
                  }) :

                <div className="w-full flex justify-center items-center">
                  <p>No Record</p>
                </div>
              }
            </div>
          }
        </div>
        {/* Training section */}
    </>
  )
}

export default JobSearchPage