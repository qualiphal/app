
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
    let file = await dataUrlToFile(picture, 'cap.jpg');
    var formdata = new FormData();
    formdata.append("image", file);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://qualiphal-detector1.herokuapp.com/", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        Swal.fire({
          icon: 'info',
          title: 'Result',
          text: `Our prediction is ${result['freshness']}% fresh.`,
        })
      })
      .catch(error => console.log('error', error));

}


async function dataUrlToFile(dataUrl, fileName) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/jpg' });
}

