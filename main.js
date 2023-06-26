// Initialize SpeechSynthesisUtterance object
const msg = new SpeechSynthesisUtterance();

// Get references to DOM elements
const textInput = document.getElementById("text-input");
const speakBtn = document.getElementById("speak-btn");
const voiceSelect = document.getElementById("voice-select");

let voices = [];

// Populate voice list dropdown
function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    voices.forEach((voice) => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        if (voice.default) {
            option.selected = true;
        }
        voiceSelect.appendChild(option);
    });
}
populateVoiceList();

// Update voice list when voices change
window.speechSynthesis.onvoiceschanged = () => {
    populateVoiceList();
};

// Set message properties
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 1; // 0 to 2

// Handle voice selection
voiceSelect.addEventListener("change", () => {
    const selectedVoice = voices.find(
        (voice) => voice.name === voiceSelect.value
    );
    msg.voice = selectedVoice;
});

// Handle button click event
speakBtn.addEventListener("click", () => {
    msg.text = textInput.value;
    window.speechSynthesis.speak(msg);
});
