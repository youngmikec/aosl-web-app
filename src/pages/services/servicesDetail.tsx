import React from 'react';
import { useParams } from 'react-router-dom';
import PAserviceComp from '../../components/frontend-components/pa-service-comp';

const ServicesDetailPage = () => {
  const params = useParams();
  const service = params['service'];
  

  return (
    <>
      {
        service === 'PA-services' && <PAserviceComp />
      }
    </>
  )
}

export default ServicesDetailPage;