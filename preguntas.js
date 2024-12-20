// Referencia al archivo JSON de preguntas y respuestas
const urlPreguntasRespuestas = './preguntas_respuestas.json';

// Elementos del DOM
const chatDisplay = document.getElementById('chat-display');
const chatInputSection = document.getElementById('chat-input-section');

// Variables para manejar las preguntas
let preguntas = [];
let currentIndex = 0;

// Cargar preguntas y respuestas del archivo JSON
fetch(urlPreguntasRespuestas)
    .then(response => response.json())
    .then(data => {
        preguntas = data.preguntas;
        mostrarPreguntas();
    })
    .catch(error => console.error('Error al cargar preguntas:', error));

// Mostrar un grupo de 3 preguntas
function mostrarPreguntas() {
    chatInputSection.innerHTML = ''; // Limpiar botones anteriores

    // Obtener las siguientes 3 preguntas
    const grupoPreguntas = preguntas.slice(currentIndex, currentIndex + 3);

    grupoPreguntas.forEach(pregunta => {
        const btn = document.createElement('button');
        btn.classList.add('question-btn');
        btn.textContent = pregunta.pregunta;
        btn.onclick = () => enviarPregunta(pregunta.pregunta);
        chatInputSection.appendChild(btn);
    });

    // Incrementar el índice para las siguientes preguntas
    currentIndex += 3;

    // Reiniciar índice si llegamos al final
    if (currentIndex >= preguntas.length) {
        currentIndex = 0;
    }
}

// Enviar una pregunta y mostrar la respuesta
function enviarPregunta(preguntaSeleccionada) {
    const respuestaEncontrada = preguntas.find(p => p.pregunta === preguntaSeleccionada);

    // Mostrar la respuesta en el cuadro de chat
    if (respuestaEncontrada) {
        chatDisplay.innerHTML = `<p><strong>Tú:</strong> ${preguntaSeleccionada}</p><p><strong>Bot:</strong> ${respuestaEncontrada.respuesta}</p>`;
    } else {
        chatDisplay.innerHTML = `<p><strong>Tú:</strong> ${preguntaSeleccionada}</p><p><strong>Bot:</strong> Lo siento, no entiendo tu pregunta.</p>`;
    }

    // Actualizar las preguntas después de enviar
    mostrarPreguntas();
}
