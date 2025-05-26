let timerDuration = 25 * 60;
let currentTime = timerDuration;
let timerInterval = null;
const bonfire_sound = new Audio('bonfire_audio.mp3');

// Manda para a tela do menu
function goMenu() {
  window.location.href = "main.html";
}

function appInfo() {
  const div = document.getElementById('info-text');

  if (div.style.display === 'none' || div.style.display === '') {
    div.innerText = "This is a study app that uses the Pomodoro technique, which consists of studying for 25 minutes with full focus, followed by a 5-minute break. This cycle helps maintain concentration and prevent mental fatigue. I hope this app is helpful for your studies!";
    div.style.display = 'block'; // mostra a div
  } else {
    div.style.display = 'none'; // oculta a div
  }
}

// resetar o timer para 25 minutos
function setTimer() {
  clearInterval(timerInterval); // Para qualquer contagem anterior com clearInterval.
  currentTime = timerDuration; // Restaura o tempo para os 25 minutos originais.
  updateDisplay(); // Atualiza a exibição do tempo.
  timerInterval = null; // Limpa a variável timerInterval.
  bonfire_sound.pause();
}

function startTimer() {
  if (timerInterval !== null) return; // Garante que o timer só comece se ainda não estiver rodando.

  // setInterval serve para executar uma função repetidamente em um intervalo fixo de tempo.
  timerInterval = setInterval(() => { // Inicia um setInterval que executa a cada 1000 milissegundos (1 segundo).
    if (currentTime <= 0) { // Se currentTime chegar a 0, para o timer e reseta.
      clearInterval(timerInterval);
      timerInterval = null;
      // setTimer();
      return;
    }
    currentTime--; // Caso contrário, decrementa 1 segundo.
    updateDisplay(); // Atualiza o display com o novo tempo.
  }, 1000);
  bonfire_sound.play();
  bonfire_sound.loop = true;
  bonfire_sound.volume = 0.2;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerDuration == currentTime;
  updateDisplay();
  bonfire_sound.pause();
  timerInterval = null;
}

function updateDisplay() {
  const minutes = Math.floor(currentTime / 60); // Divide o tempo atual (em segundos) por 60 para pegar os minutos inteiros.
  const seconds = currentTime % 60; // Pega o resto da divisão por 60 para obter os segundos restantes.
  document.getElementById('timer-display').textContent = // Acessa o elemento HTML com o id "timer-display".
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Transforma o número em string e adiciona zeros à esquerda se necessário, para garantir 2 dígitos.
}

updateDisplay(); // Mostra 25:00 na tela logo que o script é carregado.
