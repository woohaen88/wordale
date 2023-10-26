"use strict";
const answer = "APPLE";
let index = 0;
let attempts = 0;
let timer;

function handleEnter() {
  let inputList = [];
  for (let i = 0; i < 5; i++) {
    const item = document.querySelector(`.box[data-index='${attempts}${i}']`);
    inputList.push(item.innerText);
    if (answer.includes(item.innerText)) {
      if (answer[i] === item.innerText) {
        item.style.backgroundColor = "lightgreen";
      } else item.style.backgroundColor = "skyblue";
    }
  }

  if (answer === inputList.join("")) success();
  nextLine();
}

function appStart() {
  startTimer();
  window.addEventListener("keydown", (e) => {
    const key = e.key;
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.box[data-index='${attempts}${index}']`
    );

    if (keyCode === 8) backspace();
    else if (index === 5) {
      if (keyCode === 13) handleEnter();
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  });
}

function success() {
  alert("성공!!");
  clearInterval(timer);
}

function nextLine() {
  attempts++;
  if (attempts === 6) gameOver();
  index = 0;
}

function gameOver() {
  alert("실패!!");
}

function backspace() {
  if (index > 0) {
    const preBlock = document.querySelector(
      `.box[data-index='${attempts}${index - 1}']`
    );
    preBlock.innerText = "";
    index--;
  }
}

function startTimer() {
  const start = new Date();
  timer = setInterval(() => {
    const end = new Date();
    const during = new Date(end - start);
    const m = during.getMinutes().toString().padStart(2, "0");
    const s = during.getSeconds().toString().padStart(2, "0");
    const timeDiv = document.querySelector(".time--text");
    timeDiv.innerText = `${m}:${s}`;
  }, 1000);
}

appStart();
