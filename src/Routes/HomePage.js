import React from 'react'

export const HomePage = () => {

  const Camera = async () => {
    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        const localVideo = document.getElementById("local-video");
        if (localVideo) {
          localVideo.srcObject = stream;
        }

        stream.getTracks().forEach(track => this.state.peerConnection.addTrack(track, stream));

      },
      error => {
        console.warn(error.message);
      }
    );
  }
  return (



    <div className='grid grid-cols-3 gap-8 mb-8'>

      <div></div>

      <div>
        <h1 className='text-3xl'>Homepage</h1>
        <button id="get-access" onClick={() => { Camera() }} className="btn">Camera</button>
        <video autoPlay id='local-video'/>
        <video autoplay></video>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>

      </div>

      <div></div>

    </div>

  )
}
