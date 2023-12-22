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
  

  let currentQuestion = 0;
  let score = 0;

  function startQuiz() {
    const username = document.getElementById('username').value;
    if (username !== '') {
        document.getElementById('usernameContainer').style.display = 'none';
        displayQuestion();
    }   else {
        alert('Please enter a username to start the MMA quiz')
    }
  }

  function displayQuestion() {
    const quizSection = document.getElementById('quizSection');
    const currentQuizData = quizData[currentQuestion];

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

  function checkAnswer(answer) {
    const currentQuizData = quizData[currentQuestion];
    if (answer === currentQuizData.answer) {
        score++;
        displayFeedback("Correct!", true);
    }   else {
        displayFeedback(`Incorrect! The correct answer is ${currentQuizData.answer}.`, false);
    }
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        displayQuestion();
    }   else {
        displayResult();
    }
  }

  function displayFeedback(message, isCorrect) {
    const feedbackSection = document.getElementById('feedbackSection');
    feedbackSection.innerHTML = `<p>${message}</p>`;
    if (isCorrect) {
        feedbackSection.style.color = 'green';
    }   else {
        feedbackSection.style.color = 'red';
    }
  }

 function displayResult() {
    const scoreSection = document.getElementById('scoreSection');
    scoreSection.innerHTML = `<h2>Quiz Complete</h2><p>Your score: ${score}/${quizData.length}</p><button onclick="tryAgain()">Try Again</button>`;
  
    if (score === 10) {
      const audio = document.getElementById('celebrationAudio');
      audio.style.display = 'block';
      audio.play();
    }
  }
  


  function tryAgain() {
    currentQuestion = 0;
    score = 0;

    let feedbackSection = document.getElementById('feedbackSection');
    let scoreSection = document.getElementById('scoreSection');
    let usernameContainer = document.getElementById('usernameContainer');


    feedbackSection.innerHTML = '';
    scoreSection.innerHTML = '';
    usernameContainer.style.display = '';

    displayQuestion();


  }
