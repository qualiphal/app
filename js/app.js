
const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
// const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement);

window.addEventListener('load', async () => {
    webcam.start()
    .then(result =>{
      console.log("webcam started");
    })
    .catch(err => {
      console.log(err);
  });
});

async function check(){
    Swal.fire({
      icon: undefined,
      title: 'Processing Image.',
      html: `<img src='#' id='capimg' style='max-width: -webkit-fill-available;'/>`,
    })
    let picture = webcam.snap(); //Base4 of image.
    document.querySelector('#capimg').src = picture;
    console.log(picture);
}
