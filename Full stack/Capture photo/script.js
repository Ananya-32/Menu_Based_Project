const videoElement = document.getElementById('video');
const captureButton = document.getElementById('capture-btn');
const stopButton = document.getElementById('stop-btn');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const canvasContext = canvas.getContext('2d');
let stream;

// Access the camera
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
    } catch (err) {
        console.error('Error accessing camera: ', err);
        alert('Error accessing the camera: ' + err.message);
    }
}

// Capture a photo
function capturePhoto() {
    if (stream) {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvasContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        photo.src = dataURL;
    }
}

// Stop the camera stream
function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
    }
}

// Start the camera when the page loads
startCamera();

// Capture the photo when the button is clicked
captureButton.addEventListener('click', capturePhoto);

// Stop the camera when the "Stop Stream" button is clicked
stopButton.addEventListener('click', stopCamera);
