const images = ['iceland.jpg', 'italy.jpg', 'switzerland.jpg'];

const chosenImg = images[Math.floor(Math.random() * images.length)];

const bgImg = document.createElement('img');
bgImg.src = `img/${chosenImg}`;
// document.body.append(bgImg);

// const styleSheet = getStyleSheet();
const styleSheet = document.styleSheets[0];

// console.log(styleSheet);
const selector = '.appBG::before';
const styleText = `{content: "";position: absolute;display: block;z-index: -1;top: 0;left: 0; height: 100vh; width: 100vw; background: fixed no-repeat url('img/${chosenImg}') center; background-size: cover;}`;

// styleSheet.insertRule(`${selector} ${styleText}`,0);
console.log(document.styleSheets[0].media.mediaText)

let sheet = (function(){
    let style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    return style.sheet;
})();

sheet.insertRule(`${selector} ${styleText}`);


function getStyleSheet(){
    for(let i=0; i<document.styleSheets.length; i++){
        let sheet = document.styleSheets[i];
        if(sheet.title === 'mainStyle'){
            return sheet;
        }
    }
}


