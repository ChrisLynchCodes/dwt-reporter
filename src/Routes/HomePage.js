import { React, useContext, useEffect } from 'react';
import ReportContext from '../Context/Report/ReportContext';
import { AddReport, CreateReportsCollection, GetReports } from '../Context/Report/ReportActions';
import { Spinner } from '../Components/Layout/Spinner';


//TODO : add pages defined in notebook
//TODO : Home page loads reports from local storage if there are any. If not it loads an empty array
//TODO : Add a button to add a new report, to Home page.




export const HomePage = () => {

  const { reports, report, loading, reportDispatch } = useContext(ReportContext);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     AddReport(report);

  //   }
  // const handleTitleChange = (e)=> {
  //     report.Title = e.target.value;
  //     console.log(report.Title);
  // }

  useEffect(() => {


    const reports = GetReports();

    //if user has reports in local storag.
    if (reports !== null && reports.length > 0) {
      reportDispatch({ type: 'SET_LOADING' });
      reportDispatch({ type: 'GET_REPORTS', payload: reports });
    } else {
      //set empty array in local storage
      CreateReportsCollection();

    }


  }, [reportDispatch]);



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

  if (!loading) {
    return (



      <div className='grid grid-cols-3 gap-8 mb-8'>

        <div></div>

        <div>
          <h1 className='text-3xl'>Homepage</h1>
          {/* <button id="get-access" onClick={() => { Camera() }} className="btn">Camera</button> */}
          {/* <video autoPlay id='local-video'/> */}
          {/* <form onSubmit={(e)=>{handleSubmit(e)}}>
          <input onChange={(e)=>{handleTitleChange(e)}} type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs"/>
          <button className="btn btn-primary">Primary</button>
          </form> */}
          {
            reports.length > 0 ? reports.map((report) => (<h1 key={report.id}>{report.title} + {report.description}</h1>))
            : <h1>No reports</h1>
          }

          {/* <button className="btn btn-secondary">Secondary</button>
    <button className="btn btn-accent">Accent</button> */}

        </div>
        <div></div>

      </div>

    )
  }
  else {
    return <Spinner />
  }

}
