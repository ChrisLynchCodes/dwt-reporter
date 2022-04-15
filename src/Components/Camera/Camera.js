
//   const supported = 'mediaDevices' in navigator;
//   console.log(supported);
//   useEffect(() => {
//     const player = document.getElementById('player');
//     const canvas = document.getElementById('canvas');
//     const context = canvas.getContext('2d');
//     const captureButton = document.getElementById('capture');

//     const constraints = {
//       video: true,
//     };

//     captureButton.addEventListener('click', () => {
//       // Draw the video frame to the canvas.
//       context.drawImage(player, 0, 0, canvas.width, canvas.height);
//     });

//     // Attach the video stream to the video element and autoplay.
//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//       player.srcObject = stream;
//     });

//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//       player.srcObject = stream;
//     });
//     if ("geolocation" in navigator) {

//       console.log("Available");
//       navigator.geolocation.getCurrentPosition(function (position) {
//         setPosition(position.coords);


//       });

//     } else {

//       console.log("Not Available");

//     }
//   }, [])



// <canvas id="canvas" width="200" height="200"></canvas>
// <button className='btn btn-accent' id="capture">Capture</button>
//    <video id="player" controls autoplay></video>