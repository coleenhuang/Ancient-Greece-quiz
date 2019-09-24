const questions = [
    {   //Question 1
        text: "Μῆνιν ἄειδε, θεά, Πηληϊάδεω Ἀχιλῆος is the opening line of a famous work."
        + "What is that work called?",
        image: "krater",
        answers: [
            {
                text: "Seven Against Thebes",
                correct: false
            },
            {
                text: "The Iliad",
                correct: true
            },
            {
                text: "The Aeneid",
                correct: false
            },
            {
                text: "Agamemnon",
                correct: false
            }
        ]
    },
    {   //Question 2
        text: "Which of these was not a famous Greek playwright?",
        image: "Epidaurus",
        answers: [
            {
                text: 'Sophocles',
                correct: false
            },
            {
                text: 'Menander',
                correct: false
            },
            {
                text: 'Aeschylus',
                correct: false
            },
            {
                text: 'Democritus',
                correct: true
            }
        ]
    },
    {   //Question 3
        text: "Where is the reference to the Trojan horse located in the Iliad?",
        image: 'horse',
        answers: [
            {
                text: 'Book 24',
                correct: false
            },
            {
                text: 'Book 26',
                correct: false
            },
            {
                text: 'Book 12',
                correct: false
            },
            {
                text: 'You can find it in the Odyssey but not the Iliad',
                correct: true
            }
        ]
    },
    {   //Question 4
        text: "Which of these is the meter used for Greek epic poetry?",
        image: 'papyrus',
        answers: [
            {
                text: 'Dactylic hexameter',
                correct: true
            },
            {
                text: 'Iambic trimeter',
                correct: false
            },
            {
                text: 'Anapestic tetrameter',
                correct: false
            },
            {
                text: 'Trochaic tetrameter',
                correct: false
            }
        ]
    },
    {   //Question 5
        text: "Who was Ajax?",
        image: 'kylix',
        answers: [
            {
                text: 'Asynchronous Javascript and XML',
                correct: false
            },
            {
                text: "He was a hero in the Trojan war who quarreled with Odysseus " +
                "over Achilles' armour",
                correct: true
            },
            {
                text: "He killed his mother and her lover to avenge his father's death.",
                correct: false
            },
            {
                text: 'He was one of the seven champions that led the Argives against Thebes.',
                correct: false
            }
        ]
    },
    {   //Question 6
        text: "According to Plutarch, who said the famous phrase μολὼν λαβέ(molon labe)?",
        image: 'volute',
        answers: [
            {
                text: 'Agamemnon',
                correct: false
            },
            {
                text: "Pericles",
                correct: false
            },
            {
                text: 'Leonidas',
                correct: true
            },
            {
                text: 'Themistocles',
                correct: false
            }
        ]
    },
    {   //Question 7
        text: "Which of these cities is not located in the Peloponnese?",
        image: "greecemap",
        answers: [
            {
                text: 'Sparta',
                correct: false
            },
            {
                text: "Thebes",
                correct: true
            },
            {
                text: 'Corinth',
                correct: false
            },
            {
                text: 'Argos',
                correct: false
            }
        ]
    },
    {   //Question 8
        text: "The word psychology is derived from the Greek word ψυχή." 
        +" What does the word ψυχή mean?",
        image: "dancer",
        answers: [
            {
                text: 'Hope',
                correct: false
            },
            {
                text: "Soul",
                correct: true
            },
            {
                text: 'Head',
                correct: false
            },
            {
                text: 'Eyes',
                correct: false
            }
        ]
    },
    {   //Question 9
        text: "What was the Delian League?",
        image: "warmap",
        answers: [
            {
                text: 'An alliance of city-states led by Athens',
                correct: true
            },
            {
                text: "An alliance of city-states led by Sparta",
                correct: false
            },
            {
                text: 'An organization meant to promote free trade amongst different city states',
                correct: false
            },
            {
                text: 'An alliance formed to oppose Alexander the Great',
                correct: false
            }
        ]
    },
    {   //Question 10
        text: "Helen of Troy had a daughter with Menelaus, what was her name?",
        answers: [
            {
                text: 'Hermione',
                correct: true
            },
            {
                text: "Andromache",
                correct: false
            },
            {
                text: 'Cassandra',
                correct: false
            },
            {
                text: 'Antigone',
                correct: false
            }
        ]
    },
]

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
        <img class='answer-image' src='Images/Iliad Papyrus_114.jpg'>` 
    }
    else if (questions[questionIndex].image === "Epidaurus") {
        image = `
        <img class='answer-image' src='Images/Epidaurus-theater.jpg'>` 
    }
    else if (questions[questionIndex].image === "krater") {
        image = `
        <img class='answer-image' src='Images/Terracotta-krater.jpg'>` 
    }
    else if (questions[questionIndex].image === "horse") {
        image = `
        <img class='answer-image' src='Images/horse.jpg'>` 
    }
    else if (questions[questionIndex].image === "kylix") {
        image = `
        <img class='answer-image' src='Images/Terracotta-kylix.jpg'>` 
    }
    else if (questions[questionIndex].image === "volute") {
        image = `
        <img class='answer-image' src='Images/Volute-krater.jpg'>` 
    }
    else if (questions[questionIndex].image === "greecemap") {
        image = `
        <img class='answer-image' src='Images/Ancient-greece-map.gif'>` 
    }
    else if (questions[questionIndex].image === "dancer") {
        image = `
        <img class='answer-image' src='Images/Dancer.jpg'>` 
    }
    else if (questions[questionIndex].image === "warmap") {
        image = `
        <img class='answer-image' src='Images/PeloponnesianWarMap.jpg'>` 
    }
    else {
        image = `
        <img class='answer-image' src='Images/marble-little-girl.jpg'>`
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
        <section class="result-text">
        <p>Wow! You truly are a lover of the Classics and Ancient Greece.</p>
        </section>`
        $('.result-box').append(resultMessage).show();
    }
    else if (score >= 5) {
        let resultMessage = `
        <section class="result-text">
        <p>Nice try! Though I think you may need to review some things.</p>
        </section>`
        $('.result-box').append(resultMessage).show();
    }
    else {
        let resultMessage = `
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