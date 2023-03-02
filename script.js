import { data } from './data.js';
// console.log(data)
//! Select my elements
let flagImgDiv = document.querySelector(".flag-img");
let flagOptions = document.querySelector(".flag-options ul");
let flagImg = document.querySelector(".flag-img img");
let flagList = document.querySelectorAll(".flag-options ul li");
let score = document.querySelector("#player-score > span");
let scoreDiv = document.querySelector(".score");
let correctAns = document.querySelector(".score .correct span");
let incorrectAns = document.querySelector(".score .incorrect span");
let btnNewGame = document.querySelector("#newGame");
let countSpan = document.querySelector(".count>span");
let countDiv = document.querySelector(".count");
let scoreBox = document.querySelector(".box");
let count = 10;//counting down from 10th to 1st question
countSpan.innerText = count;

//! My variables
let questions = data.sort(() => Math.random() - Math.random()).slice(0, 10);
console.log(questions);// 10 random questions
let currentQuestion = 0; // from 0 to 10
let correctAnswers = 0; //score
let answer = "";// player selection


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
        // console.log(answer);

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
          checkAnswer(answer); //check the selected answer
        }, 500);
         
        setTimeout(() => {
            nextQuestion(questions[currentQuestion]); // next question
        }, 1000)

        setTimeout(() => {
            showResult() // show results after 10 questions 
        }, 600);
          
       
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

//show results
const showResult = () => {
    if(count === 0) { // Run only when you get to the last question
        flagOptions.innerHTML = "";
        flagImgDiv.innerHTML = "";
        scoreDiv.style.display = "flex";
        correctAns.innerHTML = correctAnswers;
        incorrectAns.innerHTML = 10 - correctAnswers;
        scoreBox.innerHTML = "";
        console.log(correctAnswers);//Player Score
        scoreBox.innerHTML = `<h2>Your score is: ${correctAnswers}</h2>`; 

    } 
}
//=========================Day#3==========================//
//save and display best scores/////////////////////////////
let board = document.querySelector("#board");
let saveBtn = document.querySelector("#save");
let nameInput = document.querySelector("#name");
let ol = document.createElement("ol")
// let yourScore = correctAnswers;
let highScores = [
  { name: "Adam", score: 9 },
  { name: "John", score: 8 },
  { name: "Maria", score: 10 },
  { name: "Kim", score: 5 },
];

// you can only click the save button if you enter a name
nameInput.addEventListener("keydown", () => {
    saveBtn.disabled = !nameInput.value;
    saveBtn.style.cursor = "pointer";
})
//save the player name and score
saveBtn.addEventListener("click", function(e) {
    e.preventDefault();
    let newPlayer = {
        name: nameInput.value,
        score: correctAnswers
    }
    highScores.push(newPlayer);
    highScores.sort((player1,player2) => {
        return player2.score - player1.score
    });
    console.log(highScores);
    board.innerHTML = "";
    

    ol.innerHTML = highScores.map(player => {
        return `<li>${player.name} - ${player.score}</li>`
    }).join("")
    board.appendChild(ol);
    saveBtn.innerText="Score Saved";
   scoreBox.innerHTML = `<h2>High Scores</h2>`; 


})


//Start The Game
window.addEventListener("load", startGame);

//To Generate A New Game
btnNewGame.addEventListener('click', () => {
    window.location.reload();
});


