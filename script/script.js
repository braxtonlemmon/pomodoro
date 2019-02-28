//VARIABLES
const playButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const stopButton = document.querySelector('#stop');
const timeButtons = document.querySelectorAll('.knob');
const timerDisplay = document.querySelector('.timer');
const sessDisplay = document.querySelector('.sess-time');
const breakDisplay = document.querySelector('.break-time');
const workLight = document.querySelector('.work');
const breakLight = document.querySelector('.break');
const dots = document.querySelectorAll('.circle');

let timeSetting = 25;
let breakSetting = 5;
let min = timeSetting;
let sec = 0;
let go = false;
let pause = false;
let tick;
let counter = 0;
let worked = true;
let theDots = [];

//FUNCTIONS
function run() {
    if (!go) {
        go = true;
        theDots[0].classList.add('dot');
        tick = setInterval(function() {
            if (sec > 0) {
                sec -= 1;
            } else {
                min -= 1;
                sec = 59;
            };
            timerDisplay.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
            transition();
        }, 1000); 
    }   
};

function transition() {
    if (min == 0 && sec == 0) {
        counter += 1;
        clearInterval(tick);
        if (counter <= 8) {
            if (worked == true) {
                worked = false;
                smallReset(breakSetting); 
            } else {
                worked = true;
                smallReset(timeSetting)  
            };
        } else {
            timerDisplay.textContent = "COMPLETE!";
        };
    };
};

function hardReset() {
    clearInterval(tick);
    pause = false;
    go = false;
    timeSetting = 25;
    breakSetting = 5;
    min = timeSetting;
    sec = 0;
    timerDisplay.textContent = "25:00";
    sessDisplay.textContent = "25:00";
    breakDisplay.textContent = "5:00";
    workLight.classList.remove('light');
    breakLight.classList.remove('light');
    counter = 0;
    theDots.forEach((dot) => (dot.classList.remove('dot')));
};

function smallReset(minutes) {
    pause = false;
    go = false;
    sec = 0;
    min = minutes;
    breakLight.classList.toggle('light');
    workLight.classList.toggle('light');
    timerDisplay.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
    run();
};

function rest() {
    if (go == true) {
        go = false;
        pause = true;
    };
    clearInterval(tick);
};

function increment(e) {
    level = e.target.id;
    if (!go && !pause) {
        switch (level) {
            case "sess-down":
                timeSetting -= 1;
                sessDisplay.textContent = `${timeSetting}:00`;
                timerDisplay.textContent = `${timeSetting}:00`;
                min = timeSetting;
                break;
            case "sess-up":
                timeSetting += 1;
                sessDisplay.textContent = `${timeSetting}:00`;
                timerDisplay.textContent = `${timeSetting}:00`;
                min = timeSetting;
                break;
            case "break-down":
                breakSetting -= 1;
                breakDisplay.textContent = `${breakSetting}:00`;
                break;
            case "break-up":
                breakSetting += 1;
                breakDisplay.textContent = `${breakSetting}:00`;
                break;
        }
    };
};

//TO RUN
hardReset();
workLight.classList.toggle('light');
pauseButton.addEventListener('click', rest);
playButton.addEventListener('click', run);
stopButton.addEventListener('click', hardReset);
timeButtons.forEach((button) => {button.addEventListener('click', increment)});
dots.forEach((dot) => {theDots.push(dot)});

