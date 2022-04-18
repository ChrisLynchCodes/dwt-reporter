import React, { useState, useContext } from 'react'
import Webcam from "react-webcam";
import ImageContext from '../Context/Image/ImageContext';




const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "environment"
};

export const WebcamCapturePage = () => {
  const webcamRef = React.useRef(null);

  const [imageSrc, setImageSrc] = useState('');
const {imageDispatch } = useContext(ImageContext);


  const capture = React.useCallback(() => {

    const imgSrc = webcamRef.current.getScreenshot();
    setImageSrc(imgSrc)
    
    imageDispatch({ type: 'GET_IMAGE', payload: imgSrc });
   

    


  }, [webcamRef, imageDispatch]
  );

  return (
    <div>



      <div className="webcam-img">

        {imageSrc === '' ?
          <Webcam audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            imageSmoothing={true}
            minScreenshotWidth={1920}
            minScreenshotHeight={1080}
            videoConstraints={videoConstraints} /> : <img alt='screenshot' src={imageSrc} />}
        {imageSrc !== '' ? <button onClick={(e) => { e.preventDefault(); setImageSrc('') }} className="btn btn-accent">Retake Image</button>
          : <button className='btn' onClick={(e) => { e.preventDefault(); capture(); }}>Capture</button>}


      </div>


    </div>
  );
};