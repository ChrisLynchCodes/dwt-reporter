import { React, useContext, useEffect, useState } from 'react';
import ReportContext from '../Context/Report/ReportContext';
import { AddReport, CreateReportsCollection, GetReports } from '../Context/Report/ReportActions';
import { Spinner } from '../Components/Layout/Spinner';
import { GeoLocationDisplay } from '../Components/Location/GeoLocationDisplay';
import { ReportItem } from '../Components/Report/ReportItem';
import moment from 'moment'
import {LastInsertedReportId} from '../Context/Report/ReportActions';
import { GetReport } from '../Context/Report/ReportActions';
import { db } from '../Context/db';
import { useLiveQuery } from 'dexie-react-hooks';
import ImageContext from '../Context/Image/ImageContext';
import { Share } from '../Components/Layout/Share';
import { Link } from 'react-router-dom';

//TODO : add pages defined in notebook
//TODO : Home page loads reports from local storage if there are any. If not it loads an empty array
//TODO : Add a button to add a new report, to Home page.




export const HomePage = () => {
  const imagesFromDb = useLiveQuery(
    () => db.images.toArray()
  );

  
  const { report, reports, loading, reportDispatch } = useContext(ReportContext);
  const { images, imageDispatch } = useContext(ImageContext);





  useEffect(() => {
console.log(report)

    const reports = GetReports();
    imageDispatch({ type: 'GET_IMAGES', payload: imagesFromDb });
   
    //if user has reports in local storage update component state.
    if (reports !== null && reports.length > 0) {
      reportDispatch({ type: 'SET_LOADING' });
      reportDispatch({ type: 'GET_REPORTS', payload: reports });
      reportDispatch({ type: 'SET_LOADING' });
      const lastReportId = LastInsertedReportId();
      const report = GetReport(lastReportId);
      reportDispatch({ type: 'GET_REPORT', payload: report });
    } else {
      //set empty array in local storage
      CreateReportsCollection();
    }

  }, [reportDispatch, imageDispatch, imagesFromDb, report]);



  if (!loading) {
    return (
      
            
      
      <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center'>
        <div>

        </div>

       

        <div>

<div className='b-20'>

</div>
        



          <h1 className='text-3xl'>Welcome to DWT Reporter</h1>
          <p className='text-lg'>Report on nature and wildlife that you encounter.</p>
          
        <div className="mt-5 mb-5 mockup-phone p-0 border-primary">
  <div className="camera"></div> 
  <div className="display">
    <div className="artboard artboard-demo phone-1">
  
{report.title !== "" ? <div>
<div className='mb-5'>
            <h1 className='text-2xl'>{report.title}</h1>
            <h1 className='text-1xl'>{report.description}</h1>
            </div>
          
            <Link to='/userreport'  state={{ from: report.id }}>
            {images !== undefined && images.length > 0 ? images.map((image) => (
              image.id === report.imageId ? <div class="avatar">
                <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={image.image} alt='report' />
                </div>
              </div> : null)) : null}
                                    </Link>
           


              <h1 className='text-1xl mt-2'>{moment(report.timestamp).format("llll")}</h1>

              <div class="stats shadow">
    <div className="stat">
    <div className="stat-title text-primary">Reports Created</div>
    <div className="stat-value text-primary">{reports !== undefined && reports.length > 0 ? reports.length : 0}</div>
     </div>
  
</div>
</div> 
:(<><h1 className='text-2xl'>Create a report to get started</h1><h1 className='text-1xl'>Your most recent report will appear here</h1></>)
}
    </div>
  </div>
</div>
<p className='text-primary mb-3'>Remember you can go back and edit reports if you want to add some extra information or a photograph</p>
<Link to='/createreport' className='btn btn-primary btn-sm mr-10 rounded-btn'>
               Create Report
              </Link>
              <Link to='/userreports' className='btn btn-secondary ml-10 btn-sm rounded-btn'>
                My Reports
              </Link>
        </div>

<div>
  </div>      




   
      </div>
      
      
      
      
      
      
      
      
     
    )
  }
  else {
    return <Spinner />
  }

}


    //       {/* <button id="get-access" onClick={() => { Camera() }} className="btn">Camera</button> */}
    //       {/* <video autoPlay id='local-video'/> */}
          

    //       {/* <button className="btn btn-secondary">Secondary</button>
    // <button className="btn btn-accent">Accent</button> */}

    

  // const Camera = async () => {
  //   navigator.getUserMedia(
  //     { video: true, audio: true },
  //     stream => {
  //       const localVideo = document.getElementById("local-video");
  //       if (localVideo) {
  //         localVideo.srcObject = stream;
  //       }

  //       stream.getTracks().forEach(track => this.state.peerConnection.addTrack(track, stream));

  //     },
  //     error => {
  //       console.warn(error.message);
  //     }
  //   );
  // }
    //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     AddReport(report);

  //   }
  // const handleTitleChange = (e)=> {
  //     report.Title = e.target.value;
  //     console.log(report.Title);
  // }
