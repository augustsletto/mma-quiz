/*jshint esversion: 6 */

// Quiz data containing questions, options, and correct answers
const quizData = [
    
    {
        question: "Who is known as the 'Father of MMA' and the founder of the UFC (Ultimate Fighting Championship)?",
        options: ["Dana White", "Royce Gracie", "Randy Couture","Ken Shamrock"],
        answer: "Dana White"
    },
    {
        question: "What does the term 'TKO' stand for in MMA?",
        options: ["Technical Knockdown","Technical Knockout","Total Knockout Outcome","Technical Kick Off"],
        answer:"Technical Knockout"
    },
    {
        question: "Who is often referred to as 'The Notorious' and is a former UFC double champion in two weight classes?",
        options: ["Khabib Nurmagomedov", "Tony Ferguson", "Nate Diaz", "Conor McGregor"],
        answer:"Conor McGregor"
    },
    {
        question: "Who holds the record for the fastest knockout in UFC history?",
        options: ["Jorge Masvidal", "Conor McGregor", "Duane Ludwig", "Ronda Rousey"],
        answer:"Jorge Masvidal"
    },
    {
        question: "Which submission hold did Royce Gracie famously use to win multiple fights in the early UFC events?",
        options: ["Rear-Naked Choke", "Kimura", "Triangle Choke", "Tony Ferguson"],
        answer:"Triangle Choke"
    },
    {
        question: "Who did Conor McGregor defeat to become the UFC Featherweight Champion in 2015?",
        options: ["Frankie Edgar", "Max Holloway", "Chad Mendes", "Jose Aldo"],
        answer:"Jose Aldo"
    },
    {
        question: "Which fighter goes by the nickname 'Bones' in the MMA world?",
        options: ["Daniel Cormier", "Jon Jones", "Alexander Gustafsson", "Anthony Johnson"],
        answer:"Jon Jones"
    },
    {
        question: "This fighter is known as 'Mighty Mouse.' Who is he?",
        options: ["Demetrious Johnson", "Henry Cejudo", "Joseph Benavidez", "Dominick Cruz"],
        answer:"Demetrious Johnson"
    },
    {
        question: "Who is referred to as 'El Cucuy' among MMA fans?",
        options: ["Dustin Poirier", "Khabib Nurmagomedov", "Justin Gaethje", "Tony Ferguson"],
        answer:"Tony Ferguson"
    },
    {
        question: "Which female fighter is known as 'Thug Rose'?",
        options: ["Cris Cyborg", "Joanna Jędrzejczyk ", "Rose Namajunas", "Valentina Shevchenko"],
        answer:"Rose Namajunas"
    }
    
    
];

let currentQuestion = 0; // Keeps track of the current question index
let score = 0; // Keeps track of the user's score
let timerInterval; // Variable to store the timer interval
const timeLimit = 10; // Time limit for each question in seconds
let answerSubmitted = false;

// Function to start the quiz
function startQuiz() {
    // Retrieve username input
    const username = document.getElementById('username').value.trim();
    // Check if username is not empty
    if (username !== '') {
        // Hide username input container and display the first question
        document.getElementById('usernameContainer').style.display = 'none';
        document.getElementById('quizSection').style.display = ''; // Make sure quiz section is visible
        displayQuestion();
    } else {
        // Alert the user to enter a username to start the quiz
        alert('Please enter a username to start the MMA quiz');
    }
}

// Function to start the timer
function startTimer() {
    let timeLeft = timeLimit;
    const timerBar = document.getElementById('timerBar');
    const timerDisplay = document.getElementById('timerDisplay');
    answerSubmitted = false;

    // Update the timer bar width based on time left
    function updateTimerBar() {
        const width = (timeLeft / timeLimit) * 100;
        timerBar.style.width = width + '%';
        if(timeLeft <= 3) {
            timerBar.style.backgroundColor = 'red';
            timerDisplay.style.color = 'red';
        } else {
            timerBar.style.backgroundColor = 'green';
            timerDisplay.style.color = 'green';
        }
    }

    // Update the timer display with remaining time
    function updateTimerDisplay() {
        timerDisplay.textContent = `${timeLeft} seconds`;
    }

    // Start the timer interval
    
    timerInterval = setInterval(() => {
        if (!answerSubmitted) { // Check if no answer has been submitted yet
            timeLeft--;
            updateTimerBar();
            updateTimerDisplay();

            if (timeLeft === 0) {
                clearInterval(timerInterval);
                displayFeedback("Time's up! Please try again.", false);
                setTimeout(tryAgain, 2000); // This can be adjusted as needed
            }
        } else {
            // If an answer has been submitted, clear the interval and prevent further countdown
            clearInterval(timerInterval);
        }
    }, 1000); // Update timer every second

    // Initial update of timer display
    updateTimerDisplay();
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval); // Clear the timer interval
}

// Function to display the current question and options
function displayQuestion() {
    const quizSection = document.getElementById('quizSection');
    const feedbackSection = document.getElementById('feedbackSection'); // Get feedback section

    // Clear previous feedback message
    feedbackSection.innerHTML = '';

    const currentQuizData = quizData[currentQuestion];
    // Display question and options in the quiz section
    quizSection.innerHTML = `
    <h2>Question ${currentQuestion + 1}</h2>
    <p>${currentQuizData.question}</p>
    <div id="timerBarContainer">
        <div id="timerBar"></div>
    </div>
    <p id="timerDisplay"></p>
    <ul>
        ${currentQuizData.options.map(option => `
            <li><button onclick="checkAnswer('${option}')">${option}</button></li>
        `).join('')}
    </ul>
    `;

    // Re-enable the option buttons now that new options are displayed
    const optionButtons = document.querySelectorAll('#quizSection ul li button');
    optionButtons.forEach(button => {
        button.disabled = false;
    });

    startTimer(); // Start the timer for the current question
}

// Function to check the selected answer against the correct answer
function checkAnswer(answer) {
    stopTimer(); // Stop the timer when the user selects an answer
    answerSubmitted = true;

    const optionButtons = document.querySelectorAll('#quizSection ul li button');
    optionButtons.forEach(button => {
        button.disabled = true;
    });


    // Compare selected answer with the correct answer
    const currentQuizData = quizData[currentQuestion];
    if (answer === currentQuizData.answer) {
        // Increment the score and display correct feedback
        score++;
        if (currentQuestion < quizData.length - 1) {
            displayFeedback("Correct!", true);
        }
    } else {
        // Display incorrect feedback with the correct answer
        if (currentQuestion < quizData.length - 1) {
            displayFeedback(`Incorrect! The correct answer is ${currentQuizData.answer}.`, false);
        }
    }
    currentQuestion++; // Move to the next question

    // Display next question or final score
    setTimeout(() => {
        if (currentQuestion < quizData.length) {
            displayQuestion(); // Display the next question
        } else {
            displayResult(); // Display the final score
        }
    }, 2000); // Delay to prevent immediate jumping to the next question
}

// Function to display feedback (correct or incorrect) after answering each question
function displayFeedback(message, isCorrect) {
    const feedbackSection = document.getElementById('feedbackSection');

    feedbackSection.innerHTML = `<p>${message}</p>`;
    // Set feedback text color based on correctness
    feedbackSection.style.color = isCorrect ? 'green' : 'red';
}

// Function to display the final quiz result
function displayResult() {
    const username = document.getElementById('username').value;
    const maxScore = quizData.length;
    saveHighScore(username, score); // Save the current score with the username
    updateHighScoreTable(); // Update the high score table display

    document.getElementById('quizSection').style.display = 'none'; // Hide quiz section
    const scoreSection = document.getElementById('scoreSection');
    

    let message;
    if (score === maxScore) {
        message = `Congratulations, ${username}! You got ${score} out of ${maxScore} correct! Perfect score!`;
    } else {
        message = `Nice try, ${username}! You got ${score} out of ${maxScore} correct!`;
    }

    scoreSection.innerHTML = `<h2>Quiz Complete</h2><p>${message}</p><button onclick="tryAgain()">Try Again</button><button onclick="newUser()">New User</button>`;

    if (score === maxScore) {
        const audio = document.getElementById('celebrationAudio');
        audio.style.display = 'block';
        audio.play();
    }
}

// Function to reset the quiz and start over for the same user
function tryAgain() {
    currentQuestion = 0; // Reset current question index
    score = 0; // Reset user's score
    document.getElementById('scoreSection').innerHTML = ''; // Clear score section
    document.getElementById('quizSection').style.display = ''; // Make sure quiz section is visible
    displayQuestion(); // Display the first question to start the quiz again
}

// Function for a new user to start the quiz
function newUser() {
    document.getElementById('username').value = ''; // Clear the username input
    document.getElementById('usernameContainer').style.display = ''; // Show username input container
    document.getElementById('scoreSection').innerHTML = ''; // Clear score section
    currentQuestion = 0; // Reset current question index
    score = 0; // Reset score
}

function saveHighScore(username, score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = { username, score };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function getHighScores() {
    return JSON.parse(localStorage.getItem('highScores')) || [];
}

function updateHighScoreTable() {
    const highScores = getHighScores();
    const highScoreTable = document.getElementById('highScoreTable'); // Ensure you have this element in your HTML

    // Take only the top 10 high scores
    const top10Scores = highScores.slice(0, 10);
    highScoreTable.innerHTML = `<h3>High Scores</h3><ul>${top10Scores.map((score, index) =>
        `<li>${index === 0 ? `<img src="https://res.cloudinary.com/dt4sw7qtl/image/upload/v1709057072/golden-belt_wbtbom.png" alt="Golden Belt" style="width: 20px; height: auto; margin-right: 5px;">` : ''}
    ${score.username} - ${score.score}/${quizData.length}</li>`).join('')}</ul>`;
}


document.addEventListener('DOMContentLoaded', (event) => {
    updateHighScoreTable(); // This updates and displays high scores as soon as the page loads
    
});
