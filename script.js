import { data } from "./data.js";
// console.log(data)
//! Select my elements
const audio = document.querySelector("#myAudio");
const muted = document.querySelector(".muted");
const flagImgDiv = document.querySelector(".flag-img");
const flagOptions = document.querySelector(".flag-options ul");
const flagImg = document.querySelector(".flag-img img");
const flagList = document.querySelectorAll(".flag-options ul li");
const score = document.querySelector("#player-score > span");
const scoreDiv = document.querySelector(".score");
const correctAns = document.querySelector(".score .correct span");
const incorrectAns = document.querySelector(".score .incorrect span");
const btnNewGame = document.querySelector("#newGame");
const countSpan = document.querySelector(".count>span");
const scoreBox = document.querySelector(".box");
let count = 10; //counting down from 10th to 1st question
countSpan.innerText = count;

//! My variables
let questions = data.sort(() => Math.random() - Math.random()).slice(0, 10);
console.log(questions); // 10 random questions
let currentQuestion = 0; // from 0 to 10
let correctAnswers = 0; //score
let answer = ""; // player selection

//Start going through the Array questions
const startGame = () => {
  nextQuestion(questions[currentQuestion]);
};

//Starting with questions[0] ==> loop between questions,
const nextQuestion = (obj) => {
  if (currentQuestion < 10) {
    flagImg.src = `img/${obj.img}`;

    for (let i = 0; i < flagList.length; i++) {
      // display the 4 options(choices)
      flagList[i].innerHTML = obj.options[i];
      flagList[i].classList.remove("selected", "success", "wrong");
    }
    answer = obj.correctAnswer;
    // console.log(answer);

    currentQuestion++;
    countSpan.innerText = count;
    count--;
  }
};

//Event listener to options and move to next question in the array
flagList.forEach((li) => {
  li.classList.remove("selected", "success", "wrong");
  li.addEventListener("click", () => {
    li.classList.add("selected");

    setTimeout(() => {
      checkAnswer(answer); //check the selected answer
    }, 500);

    setTimeout(() => {
      nextQuestion(questions[currentQuestion]); // next question
    }, 1000);

    setTimeout(() => {
      showResult(); // show results after 10 questions
    }, 600);
  });
});

//Check answer
const checkAnswer = (rightAnswer) => {
  for (let i = 0; i < flagList.length; i++) {
    let chosenAnswer;
    if (flagList[i].classList.contains("selected")) {
      chosenAnswer = flagList[i].textContent;
      // console.log(chosenAnswer)
      if (chosenAnswer === rightAnswer) {
        flagList[i].classList.add("success");
        correctAnswers++;
        score.innerHTML = correctAnswers;
      } else {
        flagList[i].classList.add("wrong");
      }
    }
  }
};

//show results
const showResult = () => {
  if (count === 0) {
    // Run when you get to the last question
    flagOptions.innerHTML = "";
    flagImgDiv.innerHTML = "";
    scoreDiv.style.display = "flex";
    correctAns.innerHTML = correctAnswers;
    incorrectAns.innerHTML = 10 - correctAnswers;
    scoreBox.innerHTML = "";
    // console.log(correctAnswers);//   Player Score
    scoreBox.innerHTML = `<h2>Your score is: ${correctAnswers}</h2>`;

    audio.setAttribute("src", "audio/soft-piano.mp3");
    audio.play();
    muted.innerHTML = "";
  }
};
//=========================Day#3==========================//
//save and display best scores/////////////////////////////
const board = document.querySelector("#board");
const saveBtn = document.querySelector("#save");
const nameInput = document.querySelector("#name");
const ol = document.createElement("ol");
// Score = correctAnswers;
let highScores = [
  { name: "Adam", score: 5 },
  { name: "David", score: 7 },
  { name: "Maria", score: 9 },
  { name: "Nadia", score: 3 },
];

// you can only click the save button if you enter a name
nameInput.addEventListener("keydown", () => {
  saveBtn.disabled = !nameInput.value;
  saveBtn.style.cursor = "pointer";
  saveBtn.classList.add("reuse");
});
//save the player name and score
saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let newPlayer = {
    name: nameInput.value,
    score: correctAnswers,
  };
  highScores.push(newPlayer);
  highScores.sort((player1, player2) => {
    return player2.score - player1.score;
  });
  // console.log(highScores);
  highScores[0].name = `🥇 ${highScores[0].name}`;
  highScores[1].name = `🥈 ${highScores[1].name}`;
  highScores[2].name = `🥉 ${highScores[2].name}`;
  board.innerHTML = "";

  ol.innerHTML = highScores
    .map((player) => {
      return `<li>${player.name} = ${player.score}</li>`;
    })
    .join("");
  board.appendChild(ol);
  saveBtn.innerText = "Score Saved";
  scoreBox.innerHTML = `<h2>Best Players</h2>`;

  saveBtn.setAttribute("disabled", "true");
  saveBtn.classList.remove("reuse");
  saveBtn.style.cursor = "default";

  audio.setAttribute("src", "audio/happy-day-113985.mp3");
  audio.play();
  muted.innerHTML = "";
});

//Hide the audio Player / volume
window.onload = function () {
  audio.volume = 0.1;
};
//mute/unmute check if the audio playing
muted.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    muted.innerText = "🔊";
  } else {
    audio.pause();
    muted.innerText = "🔇";
  }
});

//Start The First Game
window.addEventListener("load", startGame);

//To Generate A New Game
btnNewGame.addEventListener("click", () => {
  window.location.reload();
});
