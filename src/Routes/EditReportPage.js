import { React, useContext, useEffect, useState } from 'react';
import ReportContext from '../Context/Report/ReportContext';
import { AddReport, GetReport, GetReports, } from '../Context/Report/ReportActions';
import { getCurrentLocation } from '../Components/Location/LocationLogic';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment'
import { WebcamCapturePage } from './WebcamCapturePage';
import { addImage, removeImage } from '../Context/db';
import ImageContext from '../Context/Image/ImageContext';
import { LastInsertedReportId, EditReportImageId } from '../Context/Report/ReportActions';
import AlertContext from '../Context/Alert/AlertContext';
import { db } from '../Context/db';
import { Spinner } from '../Components/Layout/Spinner';
import { EditReport } from '../Context/Report/ReportActions';




export const EditReportPage = () => {

  const { report, reportDispatch } = useContext(ReportContext);
  const { image, imageDispatch, loading } = useContext(ImageContext);
  const { setAlert } = useContext(AlertContext);

  const location = useLocation();
  const { from } = location.state;

  //  const [position, setPosition] = useState({ "latitude": "", "longitude": "", "accuracy": "", "altitude": "", "altitudeAccuracy": "", "heading": "", "speed": "" });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');


  let navigate = useNavigate();



  useEffect(() => {

    //set loading to true

    //get report from local storage by id
    const report = GetReport(from);
    //update component state with report
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

  }, [reportDispatch, imageDispatch, from]);


  const handleClear = () => {
    removeImage(report.imageId)
    imageDispatch({ type: 'GET_IMAGE', payload: "" });
  }




  const handleSubmit = (e) => {
    e.preventDefault();

    //ensure fields arent empty
    if (title === '' || description === '' || category === '') {

      setAlert('The Title, Description, and Category are required', 'error')

    } else {

      //the edited report fields
      const report = {
        "title": title,
        "description": description,
        "imageId": "",
        "category": category
      }

      //add report to local storage - before location call back function is called below
      EditReport(from, report)


      if (image !== '') {

        addImage(image, function (imageId) {

          
          // edit with image report idimageId
          EditReportImageId(from, imageId);


        });
      }



      //navigate to report page

      navigate("/", { replace: true })


    }




  }
  if (loading) {
    return <Spinner />
  } else {
    return (
      <>

        <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          <div>

          </div>

          <div>

            <h1 className='text-3xl mb-3'>Edit Report</h1>
            {/* If image is not empty display avatar of image */}
            {image !== "" ? <div><div class="avatar">
              <div class="w-24 rounded">
                {image.image === undefined ? <img src={image} alt='report' /> : <img src={image.image} alt='report' />}
              </div>

            </div>  <button className='btn btn-accent' onClick={() => { handleClear() }} >Clear</button></div> : null}
            <form onSubmit={(e) => { handleSubmit(e); }}>

              {/* Category dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select class="select select-bordered select-primary w-full max-w-xs" defaultValue={report.category} onChange={(e) => (setCategory(e.target.value))}>
                  <option value="">Select a category</option>
                  <option>Mammal</option>
                  <option>Bird</option>
                  <option>Plant</option>
                  <option>Insect</option>
                  <option>Fish</option>
                  <option>Amphibian</option>
                  <option>Fungi</option>
                  <option>Reptile</option>



                </select>
              </div>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Title</span>
                </label>
                <input onChange={(e) => { setTitle(e.target.value); }} type="text" defaultValue={report.title} placeholder="Title" className="input input-bordered input-primary w-full max-w-xs" />
              </div>

              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>
                <textarea onChange={(e) => { setDescription(e.target.value); }} defaultValue={report.description} type="text" placeholder="Description" className="textarea input-bordered input-primary w-full max-w-xs" />
              </div>


              <div>
                <button type='submit' className="btn btn-primary mt-3 mr-5">Confirm Edit</button>
                <label for="my-modal" class="btn modal-button">Capture Image</label>


                <input type="checkbox" id="my-modal" class="modal-toggle" />
                <div class="modal">
                  <div class="modal-box">
                    <WebcamCapturePage />
                    <label for="my-modal" class="btn">Finish</label>
                  </div>
                </div>
              </div>
            </form>

            {/* <DeviceStorageAccess /> */}
          </div>
        </div>
      </>
    )
  }



}
