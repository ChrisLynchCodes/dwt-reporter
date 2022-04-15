import { React, useState, useEffect } from 'react'
import { AddReport } from '../Context/Report/ReportActions';
import { GeoLocation } from '../Components/Location/GeoLocation';



export const CreateReportPage = () => {

  const [position, setPosition] = useState({ "latitude": "", "longitude": "", "accuracy": "", "altitude": "", "altitudeAccuracy": "", "heading": "", "speed": "" });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  //   // =========GEOLOCATION=======

  //   //Success
  //   const success = (position) => {
  //     setPosition(position.coords);
  //   }

  //   //Error
  //   const error = (error) => { alert(`ERROR(${error.code}): ${error.message}`); }

  // // //Options
  // //   const options = {
  // //     enableHighAccuracy: true,
  // //     maximumAge: 30000,
  // //     timeout: 27000
  // //   }

  //   //useEffect
  //   useEffect(() => {

  //     const watchID = navigator.geolocation.watchPosition(success, error);

  //   }, [])


  const handleSubmit = (e) => {
    const report = {
      "title": title,
      "description": description,
      "latitude": position.latitude,
      "longitude": position.longitude,
      "accuracy": position.accuracy
    }

    AddReport(report)
  }


  return (
    <div className='grid grid-cols-3 gap-8 mb-8'>
      <div>

      </div>

      <div>
        <h1 className='text-3xl mb-3'>Create Report</h1>

        <form onSubmit={(e) => { handleSubmit(e) }}>


          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Title</span>
            </label>
            <input onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Title" className="input input-bordered input-primary w-full max-w-xs" />
          </div>

          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <input onChange={(e) => { setDescription(e.target.value) }} type="text" placeholder="Description" className="input input-bordered input-primary w-full max-w-xs" />
          </div>


          <button className="btn btn-primary mt-3">Submit</button>
        </form>
        <br /> <br /> <br /> <br />
        <GeoLocation />

        <br /> <br /> <br /> <br />
        {/* <h1>Lat: {position.latitude}</h1>
        <h1>Long: {position.longitude}</h1>
        <h1>Accu: {position.accuracy}</h1> */}
      </div>
      <div>

      </div>


    </div>

  )
}
