import { React, useState, useEffect } from 'react'
import { AddReport } from '../Context/Report/ReportActions';
export const CreateReportPage = () => {


  const [position, setPosition] = useState({ "latitude": "", "longitude": "", "accuracy": "", "altitude": "", "altitudeAccuracy": "", "heading": "", "speed": "" });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const supported = 'mediaDevices' in navigator;
  console.log(supported);
  useEffect(() => {
    const player = document.getElementById('player');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const captureButton = document.getElementById('capture');
  
    const constraints = {
      video: true,
    };
  
    captureButton.addEventListener('click', () => {
      // Draw the video frame to the canvas.
      context.drawImage(player, 0, 0, canvas.width, canvas.height);
    });
  
    // Attach the video stream to the video element and autoplay.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      player.srcObject = stream;
    });

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      player.srcObject = stream;
    });
    if ("geolocation" in navigator) {

      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition(position.coords);


      });

    } else {

      console.log("Not Available");

    }
  }, [])

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
     
<canvas id="canvas" width="200" height="200"></canvas>
<button className='btn btn-accent' id="capture">Capture</button>
      </div>

      <div>
        <h1 className='text-3xl mb-3'>Create Report</h1>
        <video id="player" controls autoplay></video>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <label>Title</label>
          <input onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Title" class="input input-bordered input-primary w-full max-w-xs" />
          <label>Description</label>
          <input onChange={(e) => { setDescription(e.target.value) }} type="text" placeholder="Description" class="input input-bordered input-primary w-full max-w-xs" />
          <button className="btn btn-primary mt-3">Submit</button>
        </form>



        <br /> <br /> <br /> <br />
        <h1>Lat: {position.latitude}</h1>
        <h1>Long: {position.longitude}</h1>
        <h1>Accu: {position.accuracy}</h1>
      </div>
      <div>

      </div>


    </div>

  )
}
