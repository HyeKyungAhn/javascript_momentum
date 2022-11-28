const loginForm = document.querySelector('.loginContainer');
const loginInput = document.querySelector('#loginForm input');
const greeting = document.querySelector('.greeting');
const todoContainer = document.querySelector('.todoContainer');
const clockContainer = document.querySelector('#clock');

const USERNAME_POSITION_BEGIN = 0;
const USERNAME_POSITION_END = 1;
const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

const greetingTexts = [
    {
        text: '아 오늘도 파이팅이야',
        varPosition: 0
    },
    {
        text: '이는 원래 그렇게 이뻤나?',
        varPosition: 0
    },
    {
        text: '아 힘들지? 5분만 더 하자',
        varPosition: 0
    },
    {
        text: '아 너는 잘 할 수 있어. 못해도 새로운걸 배우는거야.',
        varPosition: 0
    },
    {
        text: '이는 문화를 바꿀 사람이야',
        varPosition: 0
    },
    {
        text: '아 자기연민에 빠지지 말자',
        varPosition: 0
    },
    {
        text: '정신차리자 ',
        varPosition: 1
    },
    {
        text: '아 오늘 기분은 어때?',
        varPosition: 0
    },
    {
        text: '아 오늘을 살자!',
        varPosition: 0
    },
    {
        text: '이는 하나님 딸래미',
        varPosition: 0
    },
];


if(localStorage.getItem('username')===null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    todoContainer.classList.add(HIDDEN_CLASSNAME);
    clockContainer.classList.add(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', onLoginSubmit);
} else {
    clockContainer.classList.add('clock');
    const username = localStorage.getItem(USERNAME_KEY);
    showGreeting(username);
}


function onLoginSubmit(info){
    const username = loginInput.value;
    
    info.preventDefault();
    
    loginForm.classList.add(HIDDEN_CLASSNAME);
    todoContainer.classList.remove(HIDDEN_CLASSNAME);
    clockContainer.classList.remove(HIDDEN_CLASSNAME);
    clockContainer.classList.add('clock');
    showGreeting(username);
    localStorage.setItem(USERNAME_KEY, username);
}

function showGreeting(username){
    const ranNum = Math.floor(Math.random() * greetingTexts.length);
    const greetingTextObj = greetingTexts[ranNum];
    const greetingText = greetingTextObj.text;

    if(greetingTextObj.varPosition===0){
        greeting.innerText = `${username}${greetingText}`;
    } else {
        greeting.innerText = `${greetingText}${username}`;
    }

    greeting.classList.remove(HIDDEN_CLASSNAME);
}


