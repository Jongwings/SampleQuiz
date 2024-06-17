document.addEventListener('DOMContentLoaded', function () {
    const speechButton = document.getElementById('speech-button');
    const transcriptDiv = document.getElementById('transcript');
    const questionContainer = document.querySelector('.image-container');
    const questionLabel = document.querySelector('.image-label');
    const timerSpan = document.getElementById('timer');
    const modal = document.getElementById('result-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalButton = document.getElementById('modal-button');
    let timerInterval;
    let recognition;
    let currentQuestionIndex = 0;
    let questions = [];

    // Function to start the timer
    function startTimer(duration, display) {
        let timer = duration, seconds;
        clearInterval(timerInterval); // Clear any existing timer
        timerInterval = setInterval(() => {
            seconds = parseInt(timer, 10);
            display.textContent = `${seconds} sec`;

            if (--timer < 0) {
                clearInterval(timerInterval);
                handleEndOfTimer();
            }
        }, 1000);
    }

    // Function to handle end of timer
    function handleEndOfTimer() {
        speechButton.disabled = true;
        speechButton.style.opacity = 0.5;
        if (recognition && recognition.recognizing) {
            recognition.stop();
        }
        timerSpan.textContent = "Time's up!";
        checkAnswer(transcriptDiv.textContent, true); // Pass true to indicate the timer ended
    }

    // Function to fetch and display questions
    function displayQuestion(question) {
        questionLabel.textContent = question.question;
        questionContainer.innerHTML = `
            <div class="image-label">${question.question}</div>
            <img src="assets/images/Level1/${question.image}" alt="${question.question}">
        `;
        transcriptDiv.textContent = ""; // Clear previous transcript
        speechButton.disabled = false;
        speechButton.style.opacity = 1.0;
        startTimer(15, timerSpan); // Start the 15-second timer for each question
    }

    // Function to check the answer
    function checkAnswer(transcript, timerEnded = false) {
        const currentQuestion = questions[currentQuestionIndex];
        if (transcript.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
            clearInterval(timerInterval); // Stop the timer if the answer is correct
            if (currentQuestionIndex < questions.length - 1) {
                showModal('Correct Answer!', 'Next');
            } else {
                showModal('Quiz Completed!', 'Reload');
            }
        } else if (timerEnded) {
            // If the timer has ended and the answer is incorrect
            showModal('Wrong Answer! Try Again.', 'Reload');
        } else {
            // If the answer is incorrect but the timer is still running
            recognition.start();
        }
    }

    // Function to show the modal with a message and a button
    function showModal(message, buttonText) {
        modalMessage.textContent = message;
        modalButton.textContent = buttonText;
        modal.style.display = 'block';
        modalButton.onclick = function () {
            modal.style.display = 'none';
            if (buttonText === 'Next') {
                currentQuestionIndex++;
                displayQuestion(questions[currentQuestionIndex]);
            } else if (buttonText === 'Reload') {
                currentQuestionIndex = 0; // Reset to first question
                displayQuestion(questions[currentQuestionIndex]);
            }
        };
    }

    // Fetch questions from the JSON file
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion(questions[0]);
        });

    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition. Please use Google Chrome.');
    } else {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'ta-IN';

        recognition.onstart = function () {
            speechButton.style.opacity = 0.5; // Indicate it's listening
            recognition.recognizing = true;
        };

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            transcriptDiv.textContent = transcript; // Display the transcript in the footer
            checkAnswer(transcript); // Check the answer as soon as we get a result
        };

        recognition.onerror = function (event) {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = function () {
            speechButton.style.opacity = 1.0; // Reset opacity
            recognition.recognizing = false;
        };

        speechButton.addEventListener('click', function () {
            if (!speechButton.disabled) {
                recognition.start();
            }
        });
    }
});
