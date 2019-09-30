
let questionNum = 0;
let score = 0;

function startQuiz() {
    //Event listener on button
    //Hide text or images so that new content can be loaded
    $('.start-box').show();
    $('.other-box').hide();
    $('.start-box').on('click', '.startButton', event => {
        $('.start-box').hide(); //Hides start page
        shuffleQuizQuestions(questions); //Shuffles the quiz questions
        loadQuestion(questionNum);
        $('.question-box').show();
    })
}

function loadQuestion(questionIndex){
    generateQuestion(questionIndex);
    updateQuestionNum(questionIndex);
}

function generateQuestion(questionIndex){
    //Loads the creates template for question and answers
    $('.question-box').empty(); 
    let section = `
    <section class="question-text">
        <p>${questions[questionIndex].text}</p>
    </section>`;

    const formHtml =`
    <form id='question-form'>
        <ul>
            ${questions[questionIndex].answers.map((answer, i) => 
            `<li>
                <input required 
                    type="radio" 
                    id="answer${i}" name="question${questionIndex}" value=${i}>
                <label for ="answer${i}">${answer.text}</label>
            </li>`
            ).join('')} 
        </ul>
        <button type='submit' class='submitButton'>Submit</button>
    </form>`; //.map creates array, need .join to knit array together
    
    const form = $(formHtml); //creates new node
    $('.question-box').append(section);
    $('.question-box').append(form);
    

    form.on('submit', event => {
        event.preventDefault();
        $('.answer-box').empty(); //Ensures that answer box empties right after form is submitted
        questionNum++
        let answer = $('input:checked').val();
        let correctness = questions[questionIndex].answers[answer].correct
        if (correctness === true) {
            correctAnswer(questionIndex);
        }
        else {
            wrongAnswer(questionIndex);
        }
            
        $('.answer-box').append(
            `<button type="button" class="nextButton">
                Next
            </button>`
        )
        
        $('.question-box').hide();
        $('.answer-box').show();
        
        if (questionNum < questions.length) {
          $('.nextButton').on('click', event => {
            $('.answer-box').hide();
            loadQuestion(questionNum);
            $('.question-box').show();
            })
        } 
        else {
          //displays the results page
          $('.nextButton').on('click', event => {
            $('.answer-box').hide();
            displayResults();
          })
        }
        })
 
}

//make sure that the questions don't repeat
function shuffleQuizQuestions (questions) {
    return shuffle(questions).map(question => {
      question.answers = shuffle(question.answers)
      return question
    })
  }

function shuffle(a) {
    //Shuffles the order of the answers or the questions
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function updateQuestionNum (num) {
    num++;
    $('.question-num').text(num);
}

function updateScore() {
    //updates and increments score
    score++;
    $('.current-score').text(score);
}


function correctAnswer(questionIndex) {
    //Run this if answer[correct] === true
    const answerMessage = `
        <section class="answer-text"> 
            <p>Yes! This is the correct answer</p>
        </section>
    `
    $('.answer-box').append(answerMessage);
    updateScore();
    loadAnswerImage(questionIndex)
}

function wrongAnswer(questionIndex) {
    //if not answer is not correct
    //load correct answer
    const answerMessage = `
        <section class="answer-text">
            <p>Sorry, this isn't the right answer.</p>
        </section>`
    
   const rightAnswer = questions[questionIndex].answers.find(answer => answer.correct === true);
   $('.answer-box').append(answerMessage);
   loadAnswerImage(questionIndex)
   $('.answer-box').append(
       `<section class="answer-text">
        <p>The correct answer is: ${rightAnswer.text}</p>
       </section>
       `)
       
}

function loadAnswerImage (questionIndex) {
    //loads the answer images
    let image = "";
    if (questions[questionIndex].image === "papyrus") {
        image = `
        <img class='answer-image' src='Images/Iliad Papyrus_114.jpg' alt="Iliad papyrus">` 
    }
    else if (questions[questionIndex].image === "Epidaurus") {
        image = `
        <img class='answer-image' src='Images/Epidaurus-theater.jpg' alt="Theater at epidaurus">` 
    }
    else if (questions[questionIndex].image === "krater") {
        image = `
        <img class='answer-image' src='Images/Terracotta-krater.jpg' alt="Greek terracotta krater">` 
    }
    else if (questions[questionIndex].image === "horse") {
        image = `
        <img class='answer-image' src='Images/horse.jpg' alt="Image of Trojan horse on Mykonos vase">` 
    }
    else if (questions[questionIndex].image === "kylix") {
        image = `
        <img class='answer-image' src='Images/Terracotta-kylix.jpg' alt="terracotta kylix"> ` 
    }
    else if (questions[questionIndex].image === "volute") {
        image = `
        <img class='answer-image' src='Images/Volute-krater.jpg' alt="Terracotta volute-krater">` 
    }
    else if (questions[questionIndex].image === "greecemap") {
        image = `
        <img class='answer-image' src='Images/Ancient-greece-map.gif' alt="Map of Ancient Greece">` 
    }
    else if (questions[questionIndex].image === "dancer") {
        image = `
        <img class='answer-image' src='Images/Dancer.jpg' alt="Bronze statue of dancer">` 
    }
    else if (questions[questionIndex].image === "warmap") {
        image = `
        <img class='answer-image' src='Images/PeloponnesianWarMap.jpg' alt="Map of Peloponnesian war">` 
    }
    else {
        image = `
        <img class='answer-image' src='Images/marble-little-girl.jpg' alt="little girl with dove">`
    }

    $('.answer-box').append(image);
}



function displayResults () {
    //Display score
    //Display different responses based on score
    $('.result-box').empty();

    let finalScore = `
    <section class="result-text">
        <p>Your final score was ${score}/10</p>
    </section>
    `
    $('.result-box').append(finalScore);
    
    if (score >= 8) {
        let resultMessage = `
        <img src="Images/Athènes_Acropole_Caryatides.JPG" alt="Caryatid porch of the Erechtheion">
        <section class="result-text">
        <p>Wow! You truly are a lover of the Classics and Ancient Greece.</p>
        </section>`
        $('.result-box').append(resultMessage).show();
    }
    else if (score >= 5) {
        let resultMessage = `
        <img src="Images/Parthenon_540.png" alt="Parthenon">
        <section class="result-text">
        <p>Nice try! Though I think you may need to review some things.</p>
        </section>`
        $('.result-box').append(resultMessage).show();
    }
    else {
        let resultMessage = `
        <img src="Images/theater-masks.jpg" alt="Greek theater masks">
        <section class="result-text">
        <p>Were you paying attention to your professor in class?</p>
        </section>`
        $('.result-box').append(resultMessage).show();
    }
    
    let restartButton = 
    `<button type="button" class="restartButton">
        restart
    </button>`;

    $('.result-box').append(restartButton);

    $('.restartButton').click(event => {
        questionNum = 0;
        score = 0;
        $('.question-num').text(questionNum);
        $('.current-score').text(score);
        startQuiz();
    })
  
}

$(startQuiz)
