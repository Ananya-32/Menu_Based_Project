const videoElement = document.getElementById('video');
const stopButton = document.getElementById('stop-btn');
let stream;

// Check for mediaDevices and getUserMedia support
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    async function startCamera() {
        try {
            // Request access to the camera
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
        } catch (err) {
            console.error('Error accessing camera: ', err);
            alert('Error accessing the camera: ' + err.message);
        }
    }

    function stopCamera() {
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());  // Stop all video tracks
            videoElement.srcObject = null;          // Clear the video source
        }
    }

    // Start the camera when the page loads
    startCamera();

    // Stop the camera when the "Stop Stream" button is clicked
    stopButton.addEventListener('click', stopCamera);

} else {
    console.error('getUserMedia is not supported in this browser.');
    alert('Your browser does not support getUserMedia. Please update your browser or use a different one.');
}
