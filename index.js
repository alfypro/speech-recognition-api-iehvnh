import './style.css';
const output = document.querySelector('output');

const start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  clear = document.getElementById('clear');

let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

let SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;

let SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

let recognition = new SpeechRecognition(),
  speechRecognitionList = new SpeechGrammarList();

recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 1;

const startListening = () => {
  recognition.start();
  start.disabled = true;
};

const stopListening = () => {
  recognition.stop();
  start.disabled = false;
};

start.addEventListener('click', startListening);
stop.addEventListener('click', stopListening);
recognition.addEventListener('speechend', stopListening);

let final = '';

recognition.onresult = (e) => {
  let interim = '';

  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;

    if (e.results[i].isFinal) {
      final += transcript;
      stopListening();
    } else {
      interim += transcript;
    }
  }

  output.innerHTML = `${final} <i>${interim}</i>`;
};

clear.onclick = () => {
  output.innerHTML = final = '';
};
