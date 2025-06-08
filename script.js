/* script.js */

let timeLeft = 600; // 10 minutos en segundos (10 * 60)
let timerInterval;
let currentQuarter = 1;
let possessionTeam = null; // null, 'a', or 'b'

// Función para actualizar la puntuación del equipo
function updateScore(team, points) {
    const scoreElement = document.getElementById(`team-${team}-score`);
    let score = parseInt(scoreElement.textContent);
    score += points;
    // Asegurarse de que el score siempre tenga dos dígitos
    scoreElement.textContent = String(score).padStart(2, '0');
}

// Función para actualizar las faltas colectivas
function updateFouls(team, change) {
    const foulsElement = document.getElementById(`team-${team}-fouls`);
    let currentFouls = parseInt(foulsElement.textContent);
    currentFouls = Math.max(0, currentFouls + change); // Evita faltas negativas
    foulsElement.textContent = currentFouls;
}

// Funciones para el control del temporizador
function startTimer() {
    if (timerInterval) return; // Evita iniciar múltiples temporizadores
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimeDisplay();
        if (timeLeft <= 0) {
            stopTimer();
            // Lógica para fin de cuarto si es necesario
            // nextQuarter(); // Podría llamarse automáticamente o con botón
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    timeLeft = 600; // Reinicia a 10 minutos
    updateTimeDisplay();
}

function updateTimeDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes; // Para formato 00:00
    document.getElementById('time').textContent = `${minutes}:${seconds}`;
}

// Función para avanzar al siguiente cuarto
function nextQuarter() {
    currentQuarter++;
    if (currentQuarter <= 4) { // Asume 4 cuartos regulares
        document.getElementById('quarter').textContent = `CUARTO ${currentQuarter}`;
    } else {
        document.getElementById('quarter').textContent = "TIEMPO EXTRA"; // O "FINAL"
    }
    resetTimer(); // Reinicia el tiempo para el nuevo cuarto
}

// Función para alternar la flecha de posesión
function togglePossession() {
    const possessionArrow = document.getElementById('possession-arrow');
    possessionArrow.classList.remove('active', 'left', 'right'); // Limpia clases previas

    if (possessionTeam === 'a') {
        possessionTeam = 'b';
        possessionArrow.textContent = '←';
        possessionArrow.classList.add('active', 'left');
    } else if (possessionTeam === 'b') {
        possessionTeam = 'a';
        possessionArrow.textContent = '→';
        possessionArrow.classList.add('active', 'right');
    } else { // Primera vez que se usa o se reinicia
        possessionTeam = 'a'; // O podrías empezar en 'b'
        possessionArrow.textContent = '→';
        possessionArrow.classList.add('active', 'right');
    }
}

// Inicializar el marcador al cargar la página
window.onload = function() {
    updateTimeDisplay(); // Asegura que el tiempo inicial sea 10:00
    document.getElementById('team-a-score').textContent = '00';
    document.getElementById('team-b-score').textContent = '00';
    document.getElementById('team-a-fouls').textContent = '0';
    document.getElementById('team-b-fouls').textContent = '0';
    document.getElementById('quarter').textContent = `CUARTO ${currentQuarter}`;
};

