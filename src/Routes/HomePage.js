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

//TODO : add pages defined in notebook
//TODO : Home page loads reports from local storage if there are any. If not it loads an empty array
//TODO : Add a button to add a new report, to Home page.




export const HomePage = () => {
  const imagesFromDb = useLiveQuery(
    () => db.images.toArray()
  );

  
  const { report, loading, reportDispatch } = useContext(ReportContext);
  const { images, imageDispatch } = useContext(ImageContext);





  useEffect(() => {


    const reports = GetReports();
    imageDispatch({ type: 'GET_IMAGES', payload: imagesFromDb });
   
    //if user has reports in local storage update component state.
    if (reports !== null && reports.length > 0) {
      reportDispatch({ type: 'SET_LOADING' });
      const lastReportId = LastInsertedReportId();
      const report = GetReport(lastReportId);
      reportDispatch({ type: 'GET_REPORT', payload: report });
    } else {
      //set empty array in local storage
      CreateReportsCollection();
    }

  }, [reportDispatch, imageDispatch, imagesFromDb]);



  if (!loading) {
    return (
      <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-8'>

        <div></div>

        <div>
          <h1 className='text-3xl mb-3'>Homepage</h1>

          {/* If there are reports display them else display a message. */}
         <h1 className='text-2xl'>{report.title}</h1>
         <h1 className='text-1xl'>{report.description}</h1>
         <p>{moment(report.timestamp).format("llll")} </p>
         {
         images !== undefined && images.length > 0 ? images.map((image) => (
              image.id === report.imageId ? <img src={image.image} alt={report}></img> : null)) : null
}


       
                                    

         

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
