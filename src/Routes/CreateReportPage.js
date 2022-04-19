import { React, useContext, useEffect, useState } from 'react';
import ReportContext from '../Context/Report/ReportContext';
import { AddReport, CreateReportsCollection, GetReports, } from '../Context/Report/ReportActions';
import { DeviceStorageAccess } from '../Components/FileSystem/DeviceStorageAccess';
import { getCurrentLocation } from '../Components/Location/LocationLogic';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment'
import { Camera2 } from '../Components/Camera/Camera2';
import Webcam from "react-webcam";
import { WebcamCapturePage } from './WebcamCapturePage';
import { addImage } from '../Context/db';
import ImageContext from '../Context/Image/ImageContext';
import { LastInsertedReportId, EditReportImageId } from '../Context/Report/ReportActions';
import AlertContext from '../Context/Alert/AlertContext';




export const CreateReportPage = () => {
  const { report, reportDispatch } = useContext(ReportContext);
  const { image, imageDispatch } = useContext(ImageContext);
  const { setAlert } = useContext(AlertContext);


  //  const [position, setPosition] = useState({ "latitude": "", "longitude": "", "accuracy": "", "altitude": "", "altitudeAccuracy": "", "heading": "", "speed": "" });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');


  let navigate = useNavigate();

  //ensure user has reports collection in local storage
  useEffect(() => {

    imageDispatch({ type: 'GET_IMAGE', payload: "" });
    const reports = GetReports();

    //if user has reports in local storage update component state.
    if (reports !== null && reports.length > 0) {
      reportDispatch({ type: 'SET_LOADING' });
      reportDispatch({ type: 'GET_REPORTS', payload: reports });
    } else {
      //set empty array in local storage
      CreateReportsCollection();
    }

  }, [reportDispatch, imageDispatch]);





  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === '' || description === '' || category === '') {

      setAlert('The Title, Description, and Category are required', 'error')

    } else {
      const report = {
        "title": title,
        "description": description,
        "timestamp": moment().format(),
        "latitude": "",
        "longitude": "",
        "accuracy": "",
        "altitude": "",
        "altitudeAccuracy": "",
        "heading": "",
        "speed": "",
        "imageId": "",
        "category": category
      }

      //add report to local storage - before location call back function is called below
      AddReport(report)

      //fets the current location and update the reports in the app state after successful location call back
      getCurrentLocation(function (reports) {

        reportDispatch({ type: 'GET_REPORTS', payload: reports });
      });



      if (image !== '') {

        addImage(image, function (imageId) {

          //get last inserted report id
          const lastInsertId = LastInsertedReportId();
          // edit report imageId
          EditReportImageId(lastInsertId, imageId);


        });
      }



      //navigate to report page

      navigate("/", { replace: true })


    }




  }


  return (
    <>

      <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
        <div>

        </div>

        <div>

          <h1 className='text-3xl mb-3'>Create Report</h1>
          {image !== "" ? <div><div class="avatar">
            <div class="w-24 rounded">
              <img src={image} alt='report' />

            </div>

          </div>  <button className='btn btn-accent' onClick={() => { imageDispatch({ type: 'GET_IMAGE', payload: "" }); }} >Clear</button></div> : null}
          <form onSubmit={(e) => { handleSubmit(e); }}>

            {/* Category dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select class="select select-bordered select-primary w-full max-w-xs" onChange={(e) => (setCategory(e.target.value))}>
<option disabled>Select a category</option>
                <option>Mamal</option>
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
              <input onChange={(e) => { setTitle(e.target.value); }} type="text" placeholder="Title" className="input input-bordered input-primary w-full max-w-xs" />
            </div>

            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Description</span>
              </label>
              <textarea onChange={(e) => { setDescription(e.target.value); }} type="text" placeholder="Description" className="textarea input-bordered input-primary w-full max-w-xs" />
            </div>


            <div>
              <button type='submit' className="btn btn-primary mt-3 mr-5">Submit</button>
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




        <br /> <br /> <br /> <br />




      </div>
    </>
  )
}
