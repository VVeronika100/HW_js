let title = document.createElement('title');
title.innerHTML = 'HW-js_8'
let meta = document.createElement('meta');
meta.setAttribute('charset', 'UTF-8');

document.head.appendChild(title);
document.head.appendChild(meta);

let section = document.createElement('section');
section.classList.add('option');
document.body.appendChild(section);

let divContainer = document.createElement('div');
divContainer.classList.add('option__container')
section.appendChild(divContainer);

let hTitle = document.createElement('h2');
hTitle.innerHTML = 'Choose Your Option';
let pTitle = document.createElement('p');
pTitle.innerHTML = ('But I must explain to you how all this mistaken idea of denouncing');
let cards = document.createElement('div');
cards.classList.add('option__cards');

divContainer.appendChild(hTitle);
divContainer.appendChild(pTitle);
divContainer.appendChild(cards);

let cardLeft = document.createElement('div');
cardLeft.classList.add('cards__item');
cardLeft.classList.add('cards__item-left');
let line = document.createElement('div');
line.classList.add('line');
let cardRight = document.createElement('div');
cardRight.classList.add('cards__item');
cardRight.classList.add('cards__item-right');

cards.appendChild(cardLeft);
cards.appendChild(line);
cards.appendChild(cardRight);

let h3Left = document.createElement('h3');
h3Left.innerHTML = 'FREELANCER';
let h2Left = document.createElement('h2');
h2Left.innerHTML = 'Initially designed to';
let pLeft = document.createElement('p');
pLeft.innerHTML = 'But I must explain to you how all this mistaken idea of denouncing';
let buttonLeft = document.createElement('a');
buttonLeft.innerHTML = 'START HERE';
buttonLeft.setAttribute('href', '#');
buttonLeft.classList.add('button');

cardLeft.appendChild(h3Left);
cardLeft.appendChild(h2Left);
cardLeft.appendChild(pLeft);
cardLeft.appendChild(buttonLeft);

let h3Right = document.createElement('h3');
h3Right.innerHTML = 'STUDIO';
let h2Right = document.createElement('h2');
h2Right.innerHTML = 'Initially designed to';
let pRight = document.createElement('p');
pRight.innerHTML = 'But I must explain to you how all this mistaken idea of denouncing';
let buttonRight = document.createElement('a');
buttonRight.innerHTML = 'START HERE';
buttonRight.setAttribute('href', '#');
buttonRight.classList.add('button');

cardRight.appendChild(h3Right);
cardRight.appendChild(h2Right);
cardRight.appendChild(pRight);
cardRight.appendChild(buttonRight);

let style = document.createElement('style');
style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

* {
    margin: 0;
    padding: 0;
}

h2 {
    font-family: 'Arvo';
    font-size: 36px;
    font-weight: normal;
    line-height: 48px;
    letter-spacing: normal;
    color: #212121;
}

h3, a {
    font-family: 'Montserrat';
    font-size: 12px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 2.4px;
    color: #9FA3A7;
}

p {
    font-family: 'Open Sans';
    font-size: 14px;
    font-weight: normal;
    line-height: 26px;
    letter-spacing: normal;
    color: #9FA3A7;
}

.option__container {
    max-width: 1280px;
    margin: 122px auto 139px;
    padding: 0 10px;
    text-align: center;
}

.option__container p {
    margin-top: 10px;
}

.option__cards {
    margin: 55px auto 0;
    display: flex;
    justify-content: space-between;
    border: 1px solid #E8E9ED;
    border-radius: 6px;
    height: 100%;
    max-width: 800px;
}


.cards__item {
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.line {
    width: 1px;
    background-color: #E8E9ED;
}

.option__cards h3,
.option__cards h2 {
    line-height: 46px;
}

.option__cards h3 {
    margin-top: 81px;
}

.option__cards h2,
.option__cards p {
    max-width: 210px;
}

.option__cards h2 {
    margin-top: 19px;
}

.option__cards p {
    font-size: 12px;
    line-height: 22px;
    margin-top: 25px;
}

.button {
    margin-top: 64.5px;
    margin-bottom: 93.5px;
    color: #212121;
    text-decoration: none;
    padding: 15.5px 25.5px 15.5px 25.5px;
    border: 3px solid #FFC80A;
    border-radius: 46px;
}

.cards__item:hover {
    background-color: #8F75BE;
    border-radius: 6px 0;
    cursor: pointer;
}

.cards__item-left:hover {
    border-radius: 6px 0 0 6px;
}

.cards__item-right:hover {
    border-radius: 0 6px 6px 0;
}

.cards__item:hover h2,
.cards__item:hover p,
.cards__item:hover .button {
    color: #fff;
}

.cards__item:hover h3 {
    color: #FFC80A;
}`

document.head.appendChild(style);
