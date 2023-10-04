// Your script here.
const textInput = document.getElementById('text-to-speech-input');
const voicesDropdown = document.getElementById('voices');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const rateInput = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitchInput = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');

let synth = window.speechSynthesis;
let voices = [];

// Fetch available voices and populate the dropdown
function populateVoices() {
    voices = synth.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.startsWith('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

populateVoices();

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoices;
}

// Start speaking when the Start button is clicked
startButton.addEventListener('click', () => {
    if (synth.speaking) {
        return;
    }

    const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
    const utterance = new SpeechSynthesisUtterance(textInput.value);
    utterance.voice = selectedVoice;
    utterance.rate = parseFloat(rateInput.value);
    utterance.pitch = parseFloat(pitchInput.value);

    synth.speak(utterance);
});

// Stop speaking when the Stop button is clicked
stopButton.addEventListener('click', () => {
    synth.cancel();
});

// Update rate and pitch values when sliders are adjusted
rateInput.addEventListener('input', () => {
    rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener('input', () => {
    pitchValue.textContent = pitchInput.value;
});

