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
  

  let currentQuestion = 0;// Keeps track of the current question index
  let score = 0;// Keeps track of the user's score

  // Function to start the quiz
  function startQuiz() {
    // Retrieve username input
    const username = document.getElementById('username').value;
    // Check if username is not empty
    if (username !== '') {
        // Hide username input container and display the first question
        document.getElementById('usernameContainer').style.display = 'none';
        displayQuestion();
    }   else {
        // Alert the user to enter a username to start the quiz
        alert('Please enter a username to start the MMA quiz');
    }
  }
// Function to display the current question and options
  function displayQuestion() {
    const quizSection = document.getElementById('quizSection');
    const currentQuizData = quizData[currentQuestion];
// Display question and options in the quiz section
    quizSection.innerHTML = `
    <h2>Question ${currentQuestion + 1}</h2>
    <p>${currentQuizData.question}</p>
    <ul>
      ${currentQuizData.options.map(option => `
        <li><button onclick ="checkAnswer('${option}')">${option}</button></li>
        `).join('')}
    </ul>
    `;
  }
// Function to check the selected answer against the correct answer
  function checkAnswer(answer) {
    // Compare selected answer with the correct answer
    const currentQuizData = quizData[currentQuestion];
    if (answer === currentQuizData.answer) {
        // Increment the score and display correct feedback
        score++;
        displayFeedback("Correct!", true);
    }   else {
        // Display incorrect feedback with the correct answer
        displayFeedback(`Incorrect! The correct answer is ${currentQuizData.answer}.`, false);
    }
      currentQuestion++;// Move to the next question

      // Display next question or final score
    if (currentQuestion < quizData.length) {
        displayQuestion();// Display the next question
    }   else {
        displayResult();// Display the final score
    }
  }
// Function to display feedback (correct or incorrect) after answering each question
  function displayFeedback(message, isCorrect) {
    const feedbackSection = document.getElementById('feedbackSection');
    feedbackSection.innerHTML = `<p>${message}</p>`;
    // Set feedback text color based on correctness
    if (isCorrect) {
        feedbackSection.style.color = 'green';
    }   else {
        feedbackSection.style.color = 'red';
    }
  }
// Function to display the final quiz result
 function displayResult() {
    const scoreSection = document.getElementById('scoreSection');
    // Display the quiz completion message and the user's score
    scoreSection.innerHTML = `<h2>Quiz Complete</h2><p>Your score: ${score}/${quizData.length}</p><button onclick="tryAgain()">Try Again</button>`;
  // Play celebration audio if the user scores full marks
    if (score === 10) {
      const audio = document.getElementById('celebrationAudio');
      audio.style.display = 'block';
      audio.play();
    }
  }
  

// Function to reset the quiz and start over
  function tryAgain() {
    currentQuestion = 0;// Reset current question index
    score = 0; // Reset user's score
// Clear feedback, score, and display username input container
    let feedbackSection = document.getElementById('feedbackSection');
    let scoreSection = document.getElementById('scoreSection');
    let usernameContainer = document.getElementById('usernameContainer');


    feedbackSection.innerHTML = ''; // Clear feedback section
    scoreSection.innerHTML = ''; // Clear score section
    usernameContainer.style.display = ''; // Display username input container

      displayQuestion(); // Display the first question to start the quiz again


  }
