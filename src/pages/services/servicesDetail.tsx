import { useParams } from 'react-router-dom';
import PAserviceComp from '../../components/frontend-components/services/pa-service-comp';
import TransportationServiceComp from '../../components/frontend-components/services/transportation-service-comp';
import TrainingServiceComp from '../../components/frontend-components/services/traing-service-comp';
import ConsultancyServiceComp from '../../components/frontend-components/services/consultancy-service-comp';
import AccommodationServiceComp from '../../components/frontend-components/services/accommodation-service-comp';
import ImportationServiceComp from '../../components/frontend-components/services/import-service-comp';
import MediaPublicationServiceComp from '../../components/frontend-components/services/media-service-comp';


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
        service === 'training-services' && <TrainingServiceComp />
      }
      {
        service === 'consultancy-services' && <ConsultancyServiceComp />
      }
      {
        service === 'accommodation-support-services' && <AccommodationServiceComp />
      }
      {
        service === 'importing-and-exporting' && <ImportationServiceComp />
      }
      {
        service === 'media-and-publication-services' && <MediaPublicationServiceComp />
      }
    </>
  )
}

export default ServicesDetailPage;