import { React, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { GetReport, RemoveReport } from '../Context/Report/ReportActions';
import ReportContext from '../Context/Report/ReportContext';
import { db, removeImage } from '../Context/db';
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
  let navigate = useNavigate();
  const imagesFromDb = useLiveQuery(
    () => db.images.toArray()
  );

  // Still loading.


  useEffect(() => {

    reportDispatch({ type: 'CLEAR_REPORTS' });

    reportDispatch({ type: 'SET_LOADING' });
    const report = GetReport(from);
    reportDispatch({ type: 'GET_REPORT', payload: report });

    //get images from local storage by reports image id
    const getImage = async () => {

      const image = await db.images.get(report.imageId);

      if (image !== undefined) {
        //update component state with image
        imageDispatch({ type: 'GET_IMAGE', payload: image });

      } else {
        //update component state with empty image to stop spinner - loading = false
        imageDispatch({ type: 'GET_IMAGE', payload: "" });
      }


    }
    //call getImage
    getImage()


  }, [reportDispatch, from, imageDispatch]);


  const handleDelete = () => {

    removeImage(report.imageId);
    RemoveReport(report.id);
    navigate("/userreports", { replace: true })
  }

  if (!imagesFromDb) return null; // Still loading.
  else {

    return (
      <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-8'>


        <div >
        <Link to='/userreports' className='btn btn-accent'  state={{ from: report.id }}>
           Back
                                    </Link>
          <div className='text-center'>
          <img class="mask mask-square" src={image.image} alt='report' />

            <h1 className='text-2xl mt-3 text-center text-bold'>{report.title}</h1>

            <p className='overline'>{moment(report.timestamp).format("llll")} </p>
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
          <Link to='/editreport' className="btn btn-primary mr-3" state={{ from: report.id }}>
            Edit
          </Link>

          <label for="my-modal" class="btn modal-button">Delete Report</label>


          <input type="checkbox" id="my-modal" class="modal-toggle" />
          <div class="modal">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Are you sure? This will be permenant</h3>

              <div class="modal-action">
                <button for="my-modal" onClick={()=>(handleDelete())} class="btn">Confrim</button>
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

