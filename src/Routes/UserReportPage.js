import { React, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { GetReport } from '../Context/Report/ReportActions';
import ReportContext from '../Context/Report/ReportContext';
import { db } from '../Context/db';
import { useLiveQuery } from 'dexie-react-hooks';
import ImageContext from '../Context/Image/ImageContext';
import moment from 'moment'
import { Link } from 'react-router-dom';


//TODO Display a report in detail and allow the user to edit it and delete it

export const UserReportPage = () => {

  const { report, loading, reportDispatch } = useContext(ReportContext);
  const { image, imageDispatch } = useContext(ImageContext);
  const location = useLocation();
  const { from } = location.state;

  const imagesFromDb = useLiveQuery(
    () => db.images.toArray()
  );

  // Still loading.


  useEffect(() => {



    reportDispatch({ type: 'SET_LOADING' });
    const report = GetReport(from);
    reportDispatch({ type: 'GET_REPORT', payload: report });


  }, [reportDispatch, from, imageDispatch]);


  const handleDelete = () => {
//TODO Delete the report from the local storage and the associated image in the database - Redirect to my reports page
  }

  if (!imagesFromDb) return null; // Still loading.
  else {

    return (
      <div>

        <img class="mask mask-square" src={imagesFromDb[0].image} alt='report' />
        <h1 className='text-2xl mt-3 text-center text-bold'>{report.title}</h1>
        <div>{report.description}</div>
        <p>{moment(report.timeStamp).format("llll")} </p>


        {/* TODO Terinery check if null return null */}
        <p>longitude {report.longitude}</p>
        <p>latitude {report.latitude}</p>
        <p>accuracy {report.accuracy}</p>
        <p>accuracy {report.altitude}</p>
        <p>altitude {report.altitudeAccuracy}</p>
        <p>heading {report.heading}</p>
        <p>speed {report.speed}</p>
        <p>locationTimestap {report.locationTimestap}</p>

<div className='mt-3'>
<Link to='/userreport' className="btn btn-primary mr-3" state={{ from: report.id }}>
          Edit
        </Link>

        <label for="my-modal" class="btn modal-button">Delete Report</label>


        <input type="checkbox" id="my-modal" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Are you sure? This will be permenant</h3>

            <div class="modal-action">
              <button for="my-modal" onClick={handleDelete()} class="btn">Confrim</button>
              <label for="my-modal" class="btn">Go Back</label>
            </div>
          </div>
        </div>
</div>
     
      
      </div>


      //report item
    )
  }
}

