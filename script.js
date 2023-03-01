import { data } from './data.js';
// console.log(data)
//! Select my elements
let flagImgDiv = document.querySelector(".flag-img");
let flagOptions = document.querySelector(".flag-options ul");
let flagImg = document.querySelector(".flag-img img");
let flagList = document.querySelectorAll(".flag-options ul li");
let score = document.querySelector("h3>span");
let scoreDiv = document.querySelector(".score");
let correctAns = document.querySelector(".score .correct span");
let incorrectAns = document.querySelector(".score .incorrect span");
let btnNewGame = document.querySelector("#newGame");
let countSpan = document.querySelector(".count>span");
let countDiv = document.querySelector(".count");
let scoreBox = document.querySelector(".box");
let count = 10;
countSpan.innerText = count;

//! My variables
let questions = data.sort(() => Math.random() - Math.random()).slice(0, 10);
console.log(questions);// 10 random questions
let currentQuestion = 0;
let correctAnswers = 0;
let answer = "";


//Start going through the Array questions
const startGame = () => {
  nextQuestion(questions[currentQuestion]);
};

//loop between questions
const nextQuestion = (obj) => {
    if(currentQuestion < 10){
        flagImg.src = `img/${obj.img}`;

        for (let i = 0; i < flagList.length; i++){ 
            flagList[i].innerHTML = obj.options[i];
            flagList[i].classList.remove("selected", "success", "wrong");     
        }
        answer = obj.correctAnswer;
        console.log(answer);

        currentQuestion++;
        countSpan.innerText = count;
        count--;
        
    }   
}

//Event listener to options and move to next question in the array
flagList.forEach(li => {
    li.classList.remove("selected", "success", "wrong");
    li.addEventListener("click", () => {
        li.classList.add("selected")

        setTimeout(() => {
          checkAnswer(answer);
        }, 500);
         
        setTimeout(() => {
            nextQuestion(questions[currentQuestion]);
        }, 1000)

        
        showResult()
     
       
    });
});



//Check answer
const checkAnswer = (rightAnswer) => {
    for( let i = 0; i < flagList.length; i++){
        let chosenAnswer;
        if(flagList[i].classList.contains("selected")){
            chosenAnswer = flagList[i].textContent;
            console.log(chosenAnswer)
            if (chosenAnswer === rightAnswer) {
              flagList[i].classList.add("success");
              correctAnswers++;
              score.innerHTML = correctAnswers;
            } else {
              flagList[i].classList.add("wrong");
            }
        }
    }
}

//show result
const showResult = () => {
    if(count === 0) { // Run only when you get to the last question
        flagOptions.innerHTML = "";
        flagImgDiv.innerHTML = "";
        scoreDiv.style.display = "flex";
        correctAns.innerHTML = correctAnswers;
        incorrectAns.innerHTML = 10 - correctAnswers;
        scoreBox.innerHTML = ""

    } 

}


//Start The Game
window.addEventListener("load", startGame);

//To Generate A New Game
btnNewGame.addEventListener('click', () => {
    window.location.reload();
});


