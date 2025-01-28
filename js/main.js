// // https://opentdb.com/api.php?amount=10&category=23&difficulty=easy

// const category = Array.from(document.querySelectorAll(".btn-category"))
// const difficulty = Array.from(document.querySelectorAll(".btn-difficulty"))
// const amount = Array.from(document.querySelectorAll(".btn-amount"))
// const btnStart = document.getElementById("btnStart")




// let index = 0
// let cate, diff, amo;
// let dataBase = [];
// let allAnswer = []
// let score = 0;
// let answered = false;



// function removeOpacity(elm) {
//     elm.map(function (el) {
//         el.classList.remove('opacity-25')
//     })
// }

// category.map(function (elm) {
//     elm.addEventListener("click", function () {
//         removeOpacity(category)
//         elm.classList.add("opacity-25")
//         cate = elm.getAttribute("value").trim()
//     })
// })
// difficulty.map(function (elm) {
//     elm.addEventListener("click", function () {
//         removeOpacity(difficulty)
//         elm.classList.add("opacity-25")
//         diff = elm.getAttribute("value").trim()
//     })
// })
// amount.map(function (elm) {
//     elm.addEventListener("click", function () {
//         removeOpacity(amount)
//         elm.classList.add("opacity-25")
//         amo = elm.innerHTML.trim()
//     })
// })







// async function api(cate, diff, amo) {
//     let api = await fetch(`https://opentdb.com/api.php?amount=${amo}&category=${cate}&difficulty=${diff}`)
//     let data = await api.json()
//     dataBase = data.results
//     displayQuestion()
//     console.log((dataBase));




// }





// function displayQuestion() {
//     allAnswer = dataBase[index].incorrect_answers.concat(dataBase[index].correct_answer).sort()

//     cartona = `
// <div class="w-50 bg-body-tertiary mx-auto p-4 rounded-4 animate__animated animate__zoomIn">
//             <div class="d-flex justify-content-between flex-wrap gap-3">
//                 <span class="bg-success fs-4 fw-semibold p-3 rounded-3">${dataBase[index].category}</span>
//                 <span class="bg-warning fs-4 fw-semibold p-3 rounded-3">${index + 1} of ${dataBase.length} Question</span>
//             </div>
//             <h2 class="text-center mt-5">${dataBase[index].question}</h2>
//             <ul class = "w-100 list-unstyled m-0 d-flex flex-wrap text-center mt-5 gap-3">
//             ${allAnswer.map((choice) => `<li class = "mmm animate__animated">${choice}</li>`).join('')} 
//         </ul>

//             <h2 class="text-center mt-3">
//                 <i class="fa-regular fa-face-laugh"></i>
//                 Score : ${score}
//             </h2>

//         </div>

// `
//     document.querySelector(".question").innerHTML = cartona
//     const li = Array.from(document.querySelectorAll(".mmm"))
//     li.map((elm) => {
//         elm.addEventListener("click", function () {


//             if (!answered) {
//                 answered = true
//                 if (dataBase[index].correct_answer == elm.innerHTML) {
//                     elm.classList.add("bg-green", "animate__shakeY")
//                     score++




//                 } else {
//                     elm.classList.add("bg-danger", "animate__shakeX")
//                 }



//             }
//             nextQuest()


//         })
//     })

// }




// function nextQuest() {
//     setTimeout(() => {
//         index++
//         if (index < dataBase.length) {
//             answered = false

//             displayQuestion()



//         } else {
//             console.log(score);
//             document.querySelector(".question").classList.add("d-none")
//             document.getElementById("end").innerHTML = res()

//             if (score == dataBase.length) {
//                 fest()
//             }
//         }

//     }, 1000)

// }

// function res() {
//     return `<div class="w-50 bg-body-secondary mx-auto rounded-4 shadow-lg py-3 animate__animated animate__fadeInUp animate">
//         <h2 class="text-center">${score == dataBase.length ? `congratulations 💯` : `your score : ${score}`
//         }</h2 >
//     <div class="mt-4 d-flex justify-content-center"><button class="btn btn-info fw-semibold fs-4" onclick="window.location.reload()"><i class="fa-solid fa-arrows-rotate"></i> Try Again</button></div>
//     </div >

//     `
// }







// btnStart.addEventListener("click", function () {
//     if (cate && diff && amo) {



//         api(cate, diff, amo)
//         document.querySelector(".choices").classList.add("d-none")
//     }
//     else {
//         document.getElementById('msgError').classList.remove("d-none")
//     }

// })



// function fest() {
//     var end = Date.now() + (15 * 1000);

//     // go Buckeyes!
//     var colors = ['#bb0000', '#ffffff'];

//     (function frame() {
//         confetti({
//             particleCount: 2,
//             angle: 60,
//             spread: 55,
//             origin: { x: 0 },
//             colors: colors
//         });
//         confetti({
//             particleCount: 2,
//             angle: 120,
//             spread: 55,
//             origin: { x: 1 },
//             colors: colors
//         });

//         if (Date.now() < end) {
//             requestAnimationFrame(frame);
//         }
//     }());
// }
















// chat gpt refactor

const categoryBtns = Array.from(document.querySelectorAll(".btn-category"));
const difficultyBtns = Array.from(document.querySelectorAll(".btn-difficulty"));
const amountBtns = Array.from(document.querySelectorAll(".btn-amount"));
const btnStart = document.getElementById("btnStart");

let index = 0;
let category, difficulty, amount;
let questionData = [];
let score = 0;
let answered = false;

// Utility function to clear the opacity
function removeOpacity(elements) {
    elements.forEach(el => el.classList.remove('opacity-25'));
}

// Utility function to handle button selection
function handleButtonSelection(buttons, valueSetter) {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            removeOpacity(buttons);
            button.classList.add("opacity-25");
            valueSetter(button);
        });
    });
}

// Set category, difficulty, and amount based on user selection
handleButtonSelection(categoryBtns, (button) => category = button.getAttribute("value").trim());
handleButtonSelection(difficultyBtns, (button) => difficulty = button.getAttribute("value").trim());
handleButtonSelection(amountBtns, (button) => amount = button.innerHTML.trim());

// Fetch questions from the API
async function fetchQuestions(category, difficulty, amount) {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`);
        const data = await response.json();
        questionData = data.results;
        displayQuestion();
        for (let i = 0; i < questionData.length; i++) {
            console.log(questionData[i].correct_answer);

        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

// Display the current question and answers
function displayQuestion() {
    const currentQuestion = questionData[index];
    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

    const questionCard = `
        <div class="w-lg-50 w-75 bg-body-tertiary mx-auto p-4 rounded-4 animate__animated animate__zoomIn">
            <div class="d-flex justify-content-between flex-wrap gap-3">
                <span class="bg-success fs-4 fw-semibold p-3 rounded-3">${currentQuestion.category}</span>
                <span class="bg-warning fs-4 fw-semibold p-3 rounded-3">${index + 1} of ${questionData.length} Question</span>
            </div>
            <h2 class="text-center mt-5">${currentQuestion.question}</h2>
            <ul class="w-100 list-unstyled m-0 d-flex flex-wrap text-center mt-5 gap-3">
                ${allAnswers.map(choice => `<li class="answer-choice">${choice}</li>`).join('')}
            </ul>
            <h2 class="text-center mt-3">
                <i class="fa-regular fa-face-laugh"></i> Score: ${score}
            </h2>
        </div>
    `;

    document.querySelector(".question").innerHTML = questionCard;
    const answerChoices = Array.from(document.querySelectorAll(".answer-choice"));

    answerChoices.forEach(choice => {
        choice.addEventListener("click", () => handleAnswerChoice(choice, currentQuestion.correct_answer));
    });
}

// Handle the selection of an answer choice
function handleAnswerChoice(choice, correctAnswer) {
    if (!answered) {
        answered = true;
        const isCorrect = choice.innerHTML === correctAnswer;

        if (isCorrect) {
            choice.classList.add("bg-success", "animate__animated", "animate__shakeY");
            score++;
        } else {
            choice.classList.add("bg-danger", "animate__animated", "animate__shakeX");
        }

        nextQuestion();
    }
}

// Move to the next question or end the game
function nextQuestion() {
    setTimeout(() => {
        index++;
        if (index < questionData.length) {
            answered = false;
            displayQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// Show the result at the end of the game
function showResult() {
    document.querySelector(".question").classList.add("d-none");
    document.getElementById("end").innerHTML = getResultMessage();

    if (score === questionData.length) {
        showConfetti();
    }
}

// Generate the result message
function getResultMessage() {
    return `
        <div class="w-lg-50 w-75 bg-body-secondary mx-auto rounded-4 shadow-lg py-3 animate__animated animate__fadeInUp">
            <h2 class="text-center">${score === questionData.length ? "Congratulations 💯" : `Your score: ${score}`}</h2>
            <div class="mt-4 d-flex justify-content-center">
                <button class="btn btn-info fw-semibold fs-4" onclick="window.location.reload()">
                    <i class="fa-solid fa-arrows-rotate"></i> Try Again
                </button>
            </div>
        </div>
    `;
}

// Show confetti effect when the user wins
function showConfetti() {
    const endTime = Date.now() + (15 * 1000);
    const colors = ['#bb0000', '#ffffff'];

    (function animateConfetti() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors
        });

        if (Date.now() < endTime) {
            requestAnimationFrame(animateConfetti);
        }
    })();
}

// Start the quiz when the "Start" button is clicked
btnStart.addEventListener("click", () => {
    if (category && difficulty && amount) {
        fetchQuestions(category, difficulty, amount);
        document.querySelector(".choices").classList.add("d-none");
    } else {
        document.getElementById('msgError').classList.remove("d-none");
    }
});
