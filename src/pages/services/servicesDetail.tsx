import React from 'react';
import { useParams } from 'react-router-dom';
import PAserviceComp from '../../components/frontend-components/services/pa-service-comp';
import TransportationServiceComp from '../../components/frontend-components/services/transportation-service-comp';
import TrainingServiceComp from '../../components/frontend-components/services/traing-service-comp';

const ServicesDetailPage = () => {
  const params = useParams();
  const service = params['service'];
  

  return (
    <>
      {
        service === 'pa-services' && <PAserviceComp />
      }
      {
        service === 'transportation-services' && <TransportationServiceComp />
      }
      {
        service === 'training' && <TrainingServiceComp />
      }
    </>
  )
}

export default ServicesDetailPage;