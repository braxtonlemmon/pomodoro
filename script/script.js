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
const dots = [...document.querySelectorAll('.circle')];
const beginSound = document.querySelector('.play');
const pauseSound = document.querySelector('.halt');
const doneSound = document.querySelector('.all-done');

let timeSetting = 25;
let breakSetting = 5;
let min = timeSetting;
let sec = 0;
let go = false;
let pause = false;
let tick;
let counter = 0;
let worked = true;
let quarter = 0;


//FUNCTIONS
function run() {
    
    if (!go) {
        (counter == 0) ? beginSound.play() : false;
        go = true;
        dots[quarter].classList.add('dot');
        tick = setInterval(function() {
            if (!(min == 0 && sec == 0)) {
                if (sec > 0) {
                    sec -= 1;
                } else {
                    min -= 1;
                    sec = 59;
                };    
            }
            timerDisplay.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
            transition();
        }, 1000); 
    }   
};

function transition() {
    if (min == 0 && sec == 0) {
        counter += 1;
        clearInterval(tick);
        if (counter < 7) {
            if (worked == true) {
                worked = false;
                pauseSound.play();
                smallReset(breakSetting); 
            } else {
                worked = true;
                quarter += 1; 
                beginSound.play();
                smallReset(timeSetting);

            };
        } else {
            clearInterval(tick);
            timerDisplay.textContent = "COMPLETE!";
            doneSound.play();
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
    workLight.classList.add('light');
    breakLight.classList.remove('light');
    counter = 0;
    dots.forEach((dot) => dot.classList.remove('dot'));
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
                if (timeSetting > 1) {
                    timeSetting -= 1;
                    sessDisplay.textContent = `${timeSetting}:00`;
                    timerDisplay.textContent = `${timeSetting}:00`;
                    min = timeSetting;
                };
                break;
            case "sess-up":
                if (timeSetting < 99) {    
                    timeSetting += 1;
                    sessDisplay.textContent = `${timeSetting}:00`;
                    timerDisplay.textContent = `${timeSetting}:00`;
                    min = timeSetting;
                };
                break;
            case "break-down":
                if (breakSetting > 1) {    
                    breakSetting -= 1;
                    breakDisplay.textContent = `${breakSetting}:00`;
                };
                break;
            case "break-up":
                if (breakSetting < 99) {    
                    breakSetting += 1;
                    breakDisplay.textContent = `${breakSetting}:00`;
                };
                break;
        }
    };
};

//TO RUN
hardReset();

pauseButton.addEventListener('click', rest);
playButton.addEventListener('click', run);
stopButton.addEventListener('click', hardReset);
timeButtons.forEach((button) => {button.addEventListener('click', increment)});

