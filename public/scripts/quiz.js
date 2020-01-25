(function() {
  const myQuestions = [
    {
      question: "What is your favourite food?",
      answers: {
        a: "Chocolate",
        b: "Pasta",
        c: "Sushi, obviously"
      },
      correctAnswer1: "a",
      correctAnswer2: "b",
      correctAnswer3: "c"
    },
    {
      question: "What is your hobby?",
      answers: {
        a: "Watching TV shows",
        b: "Romantic dinners, dating",
        c: "Yoga"
      },
      correctAnswer1: "a",
      correctAnswer2: "b",
      correctAnswer3: "c"
    },
    {
      question: "What's your favourite drink?",
      answers: {
        a: "Beer",
        b: "Wine",
        c: "Green tea"
      },
      correctAnswer1: "a",
      correctAnswer2: "b",
      correctAnswer3: "c"
    },
    {
      question: "How you would describe yourself?",
      answers: {
        a: "Just normal person",
        b: "Funny and friendy",
        c: "Modern and knowledgeable"
      },
      correctAnswer1: "a",
      correctAnswer2: "b",
      correctAnswer3: "c"
    },
    {
      question: "Who is your best friend?",
      answers: {
        a: "TV",
        b: "My partner",
        c: "Everyone"
      },
      correctAnswer1: "a",
      correctAnswer2: "b",
      correctAnswer3: "c"
    }
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
        </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect1 = 0;
    let numCorrect2 = 0;
    let numCorrect3 = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = "input[name=question" + questionNumber + "]:checked";
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer1) {
        // add to the number of correct answers
        numCorrect1++;
      } else if (userAnswer === currentQuestion.correctAnswer2) {
        // add to the number of correct answers
        numCorrect2++;
      } else if (userAnswer === currentQuestion.correctAnswer3) {
        // add to the number of correct answers
        numCorrect3++;
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    if (numCorrect1 > numCorrect2 && numCorrect1 > numCorrect3) {
      resultsContainer.innerHTML = "You will find your happiness soon!";
    } else if (numCorrect2 > numCorrect1 && numCorrect2 > numCorrect3) {
      resultsContainer.innerHTML =
        "The love of your life is just around the corner, go and have a look!";
    } else if (numCorrect3 > numCorrect1 && numCorrect3 > numCorrect2) {
      resultsContainer.innerHTML =
        "Someone handsome is waiting for you, make a first step!";
    } else if (numCorrect3 == numCorrect1 && numCorrect3 > numCorrect2) {
      resultsContainer.innerHTML = "In next year you will buy a pet!";
    } else if (numCorrect2 == numCorrect1 && numCorrect2 > numCorrect3) {
      resultsContainer.innerHTML =
        "Soon you will meet someone who will change you forever!";
    } else {
      resultsContainer.innerHTML = "Next year you will win a lot of money";
    }

    // show number of correct answers out of total
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  // pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
