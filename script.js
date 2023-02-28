import { data } from './data.js';
// console.log(data)
//! Select my elements
let flagOptions = document.querySelector(".flag-options ul");
let flagImg = document.querySelector(".flag-img img");
let flagList = document.querySelectorAll(".flag-options ul li");
let score = document.querySelector("h3>span");
let countSpan = document.querySelector(".count>span");
let count = 10;
countSpan.innerText = count;

//! My variables
let questions = data.sort(() => Math.random() - Math.random()).slice(0, 10);
console.log(questions);// 10 random questions
let allQuestions= 10;
let currentQuestion = 0;
let scoreNum = 0;
let correctAnswers = 0;
let wrongAnswer = 0;
let answer = "";


//Start going through the Array questions
const startGame = () => {
  nextQuestion(questions[currentQuestion]);
};

//loop between questions
const nextQuestion = (obj) => {
    if(currentQuestion < allQuestions){
        flagImg.src = `img/${obj.img}`;

        for (let i = 0; i < flagList.length; i++){ 
            flagList[i].innerHTML = obj.options[i]        
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
        checkAnswer(answer);
         
        nextQuestion(questions[currentQuestion]);
    });
});



//Check answer
const checkAnswer = (rightAnswer) => {
    for( let i = 0; i < flagList.length; i++){
        let chosenAnswer = "";
        if(flagList[i].classList.contains("selected")){
            chosenAnswer = flagList[i];
            if(chosenAnswer === rightAnswer ){
                flagList[i].classList.add("success");
                correctAnswers++
                score.innerHTML = correctAnswers;
            } else {
                flagList[i].classList.add("wrong")
            }
        }
    }
}


//Start The Game
window.addEventListener("load", startGame);


