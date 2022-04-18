import { React, useContext, useEffect, useState } from 'react';
import ReportContext from '../Context/Report/ReportContext';
import { AddReport, CreateReportsCollection, GetReports } from '../Context/Report/ReportActions';
import { Spinner } from '../Components/Layout/Spinner';
import { GeoLocationDisplay } from '../Components/Location/GeoLocationDisplay';
import { ReportItem } from '../Components/Report/ReportItem';
import moment from 'moment'

//TODO : add pages defined in notebook
//TODO : Home page loads reports from local storage if there are any. If not it loads an empty array
//TODO : Add a button to add a new report, to Home page.




export const HomePage = () => {

  const { reports, loading, reportDispatch } = useContext(ReportContext);




  useEffect(() => {


    const reports = GetReports();

    //if user has reports in local storage update component state.
    if (reports !== null && reports.length > 0) {
      reportDispatch({ type: 'SET_LOADING' });
      reportDispatch({ type: 'GET_REPORTS', payload: reports });
    } else {
      //set empty array in local storage
      CreateReportsCollection();
    }

  }, [reportDispatch]);



  if (!loading) {
    return (
      <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-8'>

        <div></div>

        <div>
          <h1 className='text-3xl mb-3'>Homepage</h1>

          {/* If there are reports display them else display a message. */}

          <div class="overflow-x-auto">
  <table class="table w-full table-compact">
    {/* <!-- head --> */}
    <thead>
      <tr>
  
        <th>Title</th>
        <th>Image</th>
        <th>Category</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {/* <!-- body --> */}
      <tr>
    
{/*         
        {
            reports.length > 0 ? reports.map((report) => (
           
              <>
              <td>{report.title}</td>
              <td>image</td>
              <td>category</td>
              <td>{moment(report.timestamp).format("MMMM Do YYYY")}{" "}</td>
              </>
          

             ))
              : <h1>No reports</h1>
          } */}
  
      </tr>
    
     
    </tbody>
  </table>
</div>

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
