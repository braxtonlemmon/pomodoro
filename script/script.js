//VARIABLES
const actionButtons = document.querySelectorAll('.button')
const timeButtons = document.querySelectorAll('.knob')
const timerDisplay = document.querySelector('.timer')
const sessDisplay = document.querySelector('.sess-time')
const breakDisplay = document.querySelector('.break-time')
const workLight = document.querySelector('.work')
const breakLight = document.querySelector('.break')

let timeSetting = 25;
let breakSetting = 5;
let min = timeSetting;
let sec = 0;
let play = false;

//FUNCTIONS
function countdown(e) {
    action = e.target.id;
    let tick = setInterval(function() {
        switch (action) {
            case "pause":
                clearInterval(tick);
                break;
            case "stop":
                clearInterval(tick);
                reset();
                break;
            case "play":
                if (play == false) {play = true};    
                break;
            default:
                break;
        };

        if (play) {
                if (sec > 0) {
                    sec -= 1;
                } else {
                    min -= 1;
                    sec = 59;
                };
                timerDisplay.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
                
                if (min == 0 && sec == 0) {
                    clearInterval(tick);
                    reset();
                };
            };
    }, 1000);
};

function reset() {
    play = false;
    timeSetting = 25;
    breakSetting = 5;
    min = timeSetting;
    sec = 0;
    timerDisplay.textContent = "25:00";
    sessDisplay.textContent = "25:00";
    breakDisplay.textContent = "5:00";
};

function increment(e) {
    level = e.target.id;
    if (!play) {
        switch (level) {
            case "sess-down":
                timeSetting -= 1;
                sessDisplay.textContent = `${timeSetting}:00`;
                min = timeSetting;
                break;
            case "sess-up":
                timeSetting += 1;
                sessDisplay.textContent = `${timeSetting}:00`;
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
reset();
actionButtons.forEach((button) => {button.addEventListener('click', countdown)});

timeButtons.forEach((button) => {button.addEventListener('click', increment)});


