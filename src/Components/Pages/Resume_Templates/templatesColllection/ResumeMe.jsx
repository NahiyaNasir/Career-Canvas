
import useUserTemplateData from '../../../../Hooks/useUserTemplateData';
import Resume12 from './Resume12';
import Resume11 from './Resume11';
import Resume10 from './Resume10';
import Resume9 from './Resume9';
import Resume8 from './Resume8';
import Resume7 from './Resume7';
import Resume6 from './Resume6';
import Resume5 from './Resume5';
import Resume4 from './Resume4';
import Resume3 from './Resume3';
import Resume2 from './Resume2';
import Resume1 from './Resume1';

const ResumeMe = () => {
  const data = useUserTemplateData();
  const lastData = data?.data?.[data?.data.length - 1]; // Get the last element safely
  console.log(lastData)
  const templateId = lastData?.templateId; // Extract templateId
  // const templateId = 11 
  console.log(templateId)

  if (!templateId) {
    return <p className='text-3xl text-center font-medium  mt-4 mb-4 text-green-600'>No data available...</p>; // Handle case where there's no data
  }
  if (!lastData) {
    return <p className='text-3xl text-center font-medium   mt-4 mb-4  text-green-600'>No data available...</p>; // Handle case where there's no data
  }
  
  if (templateId == 1 ) {
    return <Resume1 props={lastData} />;
  } else if (templateId == 2) {
    return <Resume2 props={lastData} />;
  } else if (templateId == 3) {
    return <Resume3 props={lastData} />;
  } else if (templateId == 4) {
    return <Resume4 props={lastData} />;
  } else if (templateId == 5) {
    return <Resume5 props={lastData} />;
  } else if (templateId == 6) {
    return <Resume6 props={lastData} />;
  } else if (templateId == 7) {
    return <Resume7 props={lastData} />;
  } else if (templateId == 8) {
    return <Resume8 props={lastData} />;
  } else if (templateId == 9) {
    return <Resume9 props={lastData} />;
  } else if (templateId == 10) {
    return <Resume10 props={lastData} />;
  } else if (templateId == 11) {
    return <Resume11 props={lastData} />;
  } else if (templateId == 12) {
    return <Resume12 props={lastData} />;
  } 
};

export default ResumeMe;
