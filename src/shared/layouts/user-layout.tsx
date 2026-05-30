import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import Navbar from '../navbar';
import Sidebar from '../sidebar';
import { ApiResponse, User } from '../../common';
import { RootState } from '../../store';
import { RETRIEVE_PROFILE } from '../../services';
import { SET_PROFILE_DATA } from '../../store/profile';
import LogoutComp from '../logout-comp';

type Props = {
    children: ReactNode
}

const UserLayout = ({children}: Props) =>  {
  const userProfile = useSelector((state: RootState) => state.profileState.value);
  const dispatch = useDispatch();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profile, setProfile] = useState<User | null>(null)

  const retreiveProfile = useCallback(() => {
      setLoadingProfile(true);
      RETRIEVE_PROFILE().then((res: AxiosResponse<ApiResponse>) => {
          setLoadingProfile(false);
          const { success, payload } = res.data;
          if(success){
              setProfile(payload);
              dispatch(SET_PROFILE_DATA(payload));
          }
      }).catch((err: any) => {
          setLoadingProfile(false);
          // const { message } = err.response.data;
      });
  }, [dispatch]);

  useEffect(() => {
      userProfile ? setProfile(userProfile) : retreiveProfile();
  }, [userProfile, retreiveProfile]);

  return (
    <>
      <div className='content-wrapper flex justify-start'>
          <div className='flex-2 hidden min-h-screen
              sm:hidden
              md:block
              lg:block'
          >
              <Sidebar />
          </div>
          <div className='flex-1'>
              <div className='h-max bg-[#f8f8f8]'>
                <Navbar profile={profile} loading={loadingProfile} />
                <div className="px-6">
                  { children }
                </div>
              </div>
          </div>
      </div>
      <LogoutComp />
    </>
  )
}

export default UserLayout;
