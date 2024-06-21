let input = localStorage.getItem('input')

function returnText() {
  input = document.getElementById("userInput").value
  localStorage.setItem('input', input)
  alert(input)
}

console.log(localStorage.getItem('input'));


var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
console.log('Day of year: ' + day);

let result = getWeekNumber(new Date());
console.log("result[1]", result[1]);

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
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