// QUESTIONS

const questions = [
    {
      "question": "What is your attitude towards challenges and obstacles in life?",
      "answer1": "I see them as opportunities to grow and learn",
      "answer1Total": "1",
      "answer2": "I try to avoid them if possible",
      "answer2Total": "2",
      "answer3": "Agree",
      "answer3Total": "3"
    },
    {
      "question": "How do you approach taking risks in life?",
      "answer1": "I am always looking for ways to take risks and push my limits",
      "answer1Total": "1",
      "answer2": "I only take calculated risks",
      "answer2Total": "2",
      "answer3": "I prefer to play it safe and not take any",
      "answer3Total": "3"
    },
    {
      "question":
        "Select in which order you would value these \"Money, Love & Career",
      "answer1": "Love, Career, Money",
      "answer1Total": "1",
      "answer2": "Money, Career, Love",
      "answer2Total": "3",
      "answer3": "Career, Love, Money",
      "answer3Total": "2"
    },
    {
      "question": "Best Sentence to describe you?",
      "answer1": "You feel superior to other people",
      "answer1Total": "3",
      "answer2": "You consider yourself more practical than creative",
      "answer2Total": "2",
      "answer3":
        "Winning a debate matters less to you than making sure no one gets upset",
      "answer3Total": "1"
    },
    {
      "question": "How do you deal with change and uncertainty in life?",
      "answer1": "I actively seek out new experiences and challenges",
      "answer1Total": "1",
      "answer2": " \I try to adapt as best as I can",
      "answer2Total": "2",
      "answer3": "I avoid it and stick to familiar things",
      "answer3Total": "3"
    },
    {
      "question":
        "How do you handle stress and pressure in life?",
      "answer1":
        " I try to avoid situations that causes stress",
      "answer1Total": "3",
      "answer2": "I try to stay calm and manage it effectively",
      "answer2Total": "2",
      "answer3": "I thrive under pressure and it motivates me to perform better",
      "answer3Total": "1"
    },
    {
      "question": "What is your perspective on the concept of winning in life?",
      "answer1": "It is a way to measure progress but not everything",
      "answer1Total": "1",
      "answer2": "It is a measure of personal progress",
      "answer2Total": "2",
      "answer3": "It is not important",
      "answer3Total": "3"
    }
  ]
  
  
  let currentQuestion = 0;
  let score = [];
  let selectedAnswersData = [];
  const totalQuestions =questions.length;
  
  const container = document.querySelector('.quiz-container');
  const questionEl = document.querySelector('.question');
  const option1 = document.querySelector('.option1');
  const option2 = document.querySelector('.option2');
  const option3 = document.querySelector('.option3');
  const nextButton = document.querySelector('.next');
  const previousButton = document.querySelector('.previous');
  const restartButton = document.querySelector('.restart');
  const result = document.querySelector('.result');
  
  //Function to generate question 
  function generateQuestions (index) {
      //Select each question by passing it a particular index
      const question = questions[index];
      const option1Total = questions[index].answer1Total;
      const option2Total = questions[index].answer2Total;
      const option3Total = questions[index].answer3Total;
      //Populate html elements 
      questionEl.innerHTML = `${index + 1}. ${question.question}`
      option1.setAttribute('data-total', `${option1Total}`);
      option2.setAttribute('data-total', `${option2Total}`);
      option3.setAttribute('data-total', `${option3Total}`);
      option1.innerHTML = `${question.answer1}`
      option2.innerHTML = `${question.answer2}`
      option3.innerHTML = `${question.answer3}`
  }
  
  
  function loadNextQuestion () {
      const selectedOption = document.querySelector('input[type="radio"]:checked');
      //Check if there is a radio input checked
      if(!selectedOption) {
          alert('Please select your answer!');
          return;
      }
      //Get value of selected radio
      const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));
  
      ////Add the answer score to the score array
      score.push(answerScore);
  
      selectedAnswersData.push()
      
  
      const totalScore = score.reduce((total, currentNum) => total + currentNum);
  
      //Finally we incement the current question number ( to be used as the index for each array)
      currentQuestion++;
  
          //once finished clear checked
          selectedOption.checked = false;
      //If quiz is on the final question
      if(currentQuestion == totalQuestions - 1) {
          nextButton.textContent = 'Finish';
      }
      //If the quiz is finished then we hide the questions container and show the results 
      if(currentQuestion == totalQuestions) {
          container.style.display = 'none';
          result.innerHTML =
           `<h1 class="final-score">Your score: ${totalScore}</h1>
           <div class="summary">
              <h1>Summary</h1>
              <p>Possible - Personality Traits, see below for a summary based on your results:</p>
              <p>15 - 21- You Need Help, Talk to Therapist</p>
              <p>10 - 15 - Don't Give Up yet, you still have opportunities</p>
              <p>8 - 10 - Great!</p>
              <p>7 - You are going to WIN!</p>
          </div>
          <button class="restart">Restart Quiz</button>
           `;
          return;
      }
      generateQuestions(currentQuestion);
  }
  
  //Function to load previous question
  function loadPreviousQuestion() {
      //Decrement quentions index
      currentQuestion--;
      //remove last array value;
      score.pop();
      //Generate the question
      generateQuestions(currentQuestion);
  }
  
  //Fuction to reset and restart the quiz;
  function restartQuiz(e) {
      if(e.target.matches('button')) {
      //reset array index and score
      currentQuestion = 0;
      score = [];
      //Reload quiz to the start
      location.reload();
      }
  
  }
  
  
  generateQuestions(currentQuestion);
  nextButton.addEventListener('click', loadNextQuestion);
  previousButton.addEventListener('click',loadPreviousQuestion);
  result.addEventListener('click',restartQuiz);