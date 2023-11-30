const slideWrap = document.querySelector('.items-wrap');
const slideImg = document.querySelector('.items-list');
const prevButton = document.querySelector('.items-prev');
const nextButton = document.querySelector('.items-next');
const slideBar = document.querySelector('.items-bar-area');
const slideView = document.querySelector('.items-slide-view');
const maxCount = document.querySelector('.total-item');
const currentCount = document.querySelector('.current-item');

const realSlideCount = slideImg.length;
let viewCount = 4;
let slideImgSize = '310px';
let gapSize = '20px';
let index = 0;
let loopInterval;


for(let i = 0; i < realSlideCount; i++) {
    const barBtn = document.createElement('div');
    barBtn.classList.add('items-bar');

    barBtn.addEventListener('click', ()=> {
        index = i + viewCount;
        slideApply(true);
    })
    slideBar.appendChild(barBtn);
}

slideApply(false);

function slideApply(animation) {
    slideWrap.style.transform = `translateX(calc((-${slideImgSize} - ${gapSize}) * ${index}))`
    buttonUpdate();
}

function buttonUpdate() {
    for(let i = 0; i < slideBar.childElementCount; i++) {
        slideBar.children[i].classList.remove('activate');
        slideBar.children[index].classList.add('activate');
    }
}


let moveAble = true;

prevButton.addEventListener('click', prev);
nextButton.addEventListener('click', next);

function prev() {
    if(moveAble) {
        moveAble = false;
        index--;
        if(index < 0) {
            index = 0;
        }
        setCurrentSlideCount();
        slideApply(true);

        setTimeout(() => {
            moveAble = true;
        }, 1000);
    }
}

function next() {
    if(moveAble){
        moveAble = false; 
        index++;
        if(index > slideWrap.childElementCount - viewCount){
            index = slideWrap.childElementCount - viewCount
        }
        setCurrentSlideCount();
        slideApply(true);

        setTimeout(() => {
            moveAble = true;
        }, 1000);
    }
}


setSlideMaxCount();

function setCurrentSlideCount() {
    console.log(currentCount.innerText = `${String(index + 1).padStart(2,'0')}`);
}
function setSlideMaxCount() {
    maxCount.innerText = `${String(slideWrap.childElementCount-viewCount+1).padStart(2,'0')}`
}

window.addEventListener('resize', ()=>{

    if(window.innerWidth < 744) {
        slideImgSize = '100vw';
        viewCount = 2;
    }else if(window.innerWidth < 1364) {
        slideImgSize = '100vw';
        viewCount = 3
    }else {
        viewCount = 4;
    }
    setCurrentSlideCount();
    setSlideMaxCount();
})