import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';
import PageBtnContainer from './PageBtnContainer';
import ReactToPrint from 'react-to-print';
import { CButton } from '@coreui/react-pro';
import React, { useState } from 'react';
const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const [showPrint, setShowPrint] = useState(false);
  const componentRef = React.useRef(null);

  const { jobs, totalJobs, numOfPages } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <ReactToPrint
        trigger={() => {
          return <CButton color={'secondary'}>Print</CButton>;
        }}
        content={() => componentRef.current}
        documentTitle='title'
        onBeforePrint={() => {
          return setShowPrint(true);
        }}
        onAfterPrint={() => setShowPrint(false)}
        removeAfterPrint={false}
      />
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div ref={componentRef} className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
