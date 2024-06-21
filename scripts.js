// INIT

let newUserData = {
    "inga" : {
        "day" : {
            "value" : 0,
            "count" : getDayNumber()
        },
        "week" : {
            "value" : 0,
            "count" : getWeekNumber()
        },
        "alltime" : 0
    },
    "oliver" : {
        "day" : {
            "value" : 0,
            "count" : getDayNumber()
        },
        "week" : {
            "value" : 0,
            "count" : getWeekNumber()
        },
        "alltime" : 0
    }
}

let userDataLocalStorage = localStorage.getItem('userData');

if(!userDataLocalStorage) {
    localStorage.setItem('userData', JSON.stringify(newUserData));
}

getDataFromLocalStorage();

function getDataFromLocalStorage() {
    let localUserData = JSON.parse(localStorage.getItem('userData'));
    for (const [key, value] of Object.entries(localUserData)) {
        if(key == "inga") {
            let inga = document.querySelector('.js-user-inga');
            if(value.day.count == getDayNumber()) {
                inga.querySelector('.js-day .js-number').textContent = value.day.value;
            } else {
                inga.querySelector('.js-day .js-number').textContent = 0;
            }
            if(value.week.count == getWeekNumber()) {
                inga.querySelector('.js-week .js-number').textContent = value.week.value;
            } else {
                inga.querySelector('.js-week .js-number').textContent = 0;
            }
            inga.querySelector('.js-alltime .js-number').textContent = value.alltime;
        } else if(key == "oliver") {
            let oliver = document.querySelector('.js-user-oliver');
            if(value.day.count == getDayNumber()) {
                oliver.querySelector('.js-day .js-number').textContent = value.day.value;
            } else {
                oliver.querySelector('.js-day .js-number').textContent = 0;
            }
            if(value.week.count == getWeekNumber()) {
                oliver.querySelector('.js-week .js-number').textContent = value.week.value;
            } else {
                oliver.querySelector('.js-week .js-number').textContent = 0;
            }
            oliver.querySelector('.js-alltime .js-number').textContent = value.alltime;
        }
    }
}


// CALCS

function getDayNumber() {
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    return day;
}

function getWeekNumber() {
    let d = new Date();
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo][1];
}


// DATE

let today = new Date();
let dd = String(today.getDate());
let mm = String(today.getMonth());
let yyyy = today.getFullYear();
let time = today.toLocaleTimeString();

months = new Array('Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember');
curMonth = months[mm];
today = dd + '. ' + curMonth + ' ' + yyyy + ' - ' + time;

document.querySelector('.js-date').textContent = today;


// USER

let activeUser;
let users = document.querySelectorAll('.js-user-button');

users.forEach(user => {
    user.addEventListener('click', () => {
        
        document.querySelectorAll('.j-user--active').forEach(user => {
            user.classList.remove('j-user--active');
        });
        
        user.closest('.js-user').classList.add('j-user--active');
        activeUser = user.getAttribute('data-user');
        
        document.body.classList.add('user-active');

        if(alltimeStatsActive) {
            toggleAllTimeStats();
        }
    });
});


// TASKS

let tasks = document.querySelectorAll('.js-task');

tasks.forEach(task => {
    task.addEventListener('click', () => {
        task.classList.add('j-task--done');
        task.classList.add('j-task--' + activeUser);
        countUp();
    });
});


// ALLTIMESTATS 

let alltimeButton = document.querySelector('.js-alltime-stats');
let alltimeStatsActive = false;

alltimeButton.addEventListener('click', () => {
    toggleAllTimeStats();
});

function toggleAllTimeStats () {
    alltimeStatsActive = alltimeStatsActive ? false : true;
    document.querySelector('.js-user-container').classList.toggle('j-user-container--active');
    alltimeButton.textContent == 'Show All-time-Stats' ? alltimeButton.textContent = 'Hide All-time-Stats' : alltimeButton.textContent = 'Show All-time-Stats';
}


// COUNT UP

function countUp() {

    let inga = document.querySelector('.js-user-inga');
    let ingaDay = inga.querySelector('.js-day .js-number').textContent;
    let ingaWeek = inga.querySelector('.js-week .js-number').textContent;
    let ingaAlltime = inga.querySelector('.js-alltime .js-number').textContent;

    let oliver = document.querySelector('.js-user-oliver');
    let oliverDay = oliver.querySelector('.js-day .js-number').textContent;
    let oliverWeek = oliver.querySelector('.js-week .js-number').textContent;
    let oliverAlltime = oliver.querySelector('.js-alltime .js-number').textContent;

    if(activeUser == "inga") {
        ingaDay++;
        ingaWeek++;
        ingaAlltime++;
    } else if(activeUser == "oliver") {
        oliverDay++;
        oliverWeek++;
        oliverAlltime++;
    }

    let changeUserData = {
        "inga" : {
            "day" : {
                "value" : ingaDay,
                "count" : getDayNumber()
            },
            "week" : {
                "value" : ingaWeek,
                "count" : getWeekNumber()
            },
            "alltime" : ingaAlltime
        },
        "oliver" : {
            "day" : {
                "value" : oliverDay,
                "count" : getDayNumber()
            },
            "week" : {
                "value" : oliverWeek,
                "count" : getWeekNumber()
            },
            "alltime" : oliverAlltime
        }
    }

    localStorage.setItem('userData', JSON.stringify(changeUserData));

    getDataFromLocalStorage();
} 
