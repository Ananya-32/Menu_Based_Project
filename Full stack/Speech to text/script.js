window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const output = document.getElementById('output');

let isRecording = false;

startBtn.addEventListener('click', () => {
    recognition.start();
    isRecording = true;
    updateButtons();
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
    isRecording = false;
    updateButtons();
});

recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');

    output.textContent = transcript;
});

recognition.addEventListener('end', () => {
    if (isRecording) recognition.start();  // Continue recording if not stopped
});

function updateButtons() {
    startBtn.disabled = isRecording;
    stopBtn.disabled = !isRecording;
}
