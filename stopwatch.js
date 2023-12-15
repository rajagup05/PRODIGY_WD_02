
const resetButton = document.querySelector(".reset");
const playButton = document.querySelector(".play");
const lapButton = document.querySelector(".lap");
const clearButton = document.querySelector(".lap-clear-button");
const minute = document.querySelector(".minute");
const second = document.querySelector(".sec");
const centiSecond = document.querySelector(".msec");
const laps = document.querySelector(".laps");


let isPlay = false;
let min;
let sec;
let centiSec;
let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;
let lapItem = 0;
let isReset = false;

const toggleButton = () => {
    resetButton.classList.remove("hidden");
    lapButton.classList.remove("hidden");

}

const play = () => {

    if (!isPlay && !isReset) {
        playButton.innerHTML = "pause";

        min = setInterval(() => {
            minute.innerHTML = ++minCounter + " :";
        }, 60 * 1000);

        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML = ++secCounter + " :";
        }, 1000);

        centiSec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = ++centiCounter;
        }, 10);

        isPlay = true;
        isReset = true;


    } else {
        playButton.innerHTML = "play";

        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);

        isPlay = false;
        isReset = false;
    }
    toggleButton();
}


const reset = () => {
    isReset = true;
    secCounter = 0;
    centiCounter = 0;
    play();
    clearAll();
    resetButton.classList.add("hidden");
    lapButton.classList.add("hidden");
    second.innerHTML = "&nbsp0 :";
    centiSecond.innerHTML = "&nbsp0";
    minute.innerHTML = "0 :";

}

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerHTML = "#" + ++lapItem;
    timeStamp.innerHTML = minCounter + " :" + secCounter + " :" + centiCounter;

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");

}

const clearAll = () => {
    lapItem = 0;
    laps.innerHTML = '';
    laps.append(clearButton);

    clearButton.classList.add("hidden");

}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);