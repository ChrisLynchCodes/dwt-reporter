import { React, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { GetReport } from '../Context/Report/ReportActions';
import ReportContext from '../Context/Report/ReportContext';
import { db } from '../Context/db';
import { useLiveQuery } from 'dexie-react-hooks';
import ImageContext from '../Context/Image/ImageContext';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { Map } from '../Components/Location/Map';

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

    reportDispatch({ type: 'CLEAR_REPORTS' });

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
      <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-8'>


        <div >
          <div className='text-center'>
            {imagesFromDb.map(image => (
              image.reportId === report.id ? <img class="mask mask-square" src={image.image} alt='report' />
                : null
            ))}

            <h1 className='text-2xl mt-3 text-center text-bold'>{report.title}</h1>

            <p className='overline'>{moment(report.timeStamp).format("llll")} </p>
          </div>


          <div className='mt-5'>
            {report.category !== null ? <p className='font-bold'>Category: <span className='font-normal'>{report.category}</span></p> : null}
            {report.description !== null ? <p className='font-bold'>Description: <span className='font-normal'>{report.description}</span></p> : null}
            {report.latitude !== null ? <p className='font-bold'>Latitude: <span className='font-normal'> {report.latitude} °</span></p> : null}
            {report.longitude !== null ? <p className='font-bold'>Longitude: <span className='font-normal'> {report.longitude} °</span></p> : null}
            {report.accuracy !== null ? <p className='font-bold'>Accuracy:  <span className='font-normal'>{report.accuracy}</span></p> : null}
            {report.altitude !== null ? <p className='font-bold'>Altitude:  <span className='font-normal'>{report.altitude}</span></p> : null}
            {report.altitudeAccuracy !== null ? <p className='font-bold'>Altitude Accuracy:  <span className='font-normal'>{report.altitudeAccuracy}</span></p> : null}
            {report.heading !== null ? <p className='font-bold'>Heading:  <span className='font-normal'>{report.heading}</span></p> : null}
            {report.speed !== null ? <p className='font-bold'>Speed:  <span className='font-normal'>{report.speed}</span></p> : null}
          </div>




        </div>
        <div >
          <Map latitude={report.latitude} longitude={report.longitude} reportTitle={report.title} />
        </div>

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

