const collectionSlideWrap = document.querySelector('.slide-banner');
const collectionSlideImg = document.querySelectorAll('.slide-banner-list');
const collectionSlideView = document.querySelector('.slide-banner-area');
const collectionPrev = document.querySelector('.prev');
const collectionNext = document.querySelector('.next');
const dotButtonArea = document.querySelector('.dot-button');

const colRealSlideCount = collectionSlideImg.length;
let index = 0;
let slideImgWidth = '-850px';
let colMoveAble = true;

// makeClone();
colMakeBtn();
colSlideApply(false);


// 슬라이드 이동

function colSlideApply(animation) {
    collectionSlideWrap.style.transform = `translateX(calc(${slideImgWidth} * ${index}))`;
    colButtonUpdate();
}

// 버튼 클릭 이동

collectionPrev.addEventListener('click', colPrev);
collectionNext.addEventListener('click', colNext);

function colPrev() {
    if(colMoveAble) {
        colMoveAble = false;
        index--;
        if(index < 0) {
            index = 0;
        }
        colSlideApply(true);

        setTimeout(() => {
            colMoveAble = true;
        }, 500);
    }
}

function colNext() {
    if(colMoveAble){
        colMoveAble = false; 
        index++;
        if(index > collectionSlideWrap.childElementCount){
            index = collectionSlideWrap.childElementCount
        }
        colSlideApply(true);

        setTimeout(() => {
            colMoveAble = true;
        }, 500);
    }
}

// 슬라이드 버튼 생성

function colMakeBtn(){
    for(let i = 0; i < collectionSlideWrap.childElementCount; i++) {
        const dotBtn = document.createElement('div');
        dotBtn.classList.add('dot');
        dotBtn.addEventListener('click', ()=> {
            index = i;
            colSlideApply(true);
        })
        dotButtonArea.appendChild(dotBtn);
    }
}

// 현재 슬라이드 버튼 활성화

function colButtonUpdate() {
    for(let i = 0; i < dotButtonArea.childElementCount; i++) {
        dotButtonArea.children[i].classList.remove('act');
        dotButtonArea.children[index].classList.add('act');
    }
}

// 클론 생성

function makeClone() {
    const frontCopy = [];
    const behindCopy = [];

    for(let i = 0; i < 1; i++) {
        frontCopy.push(collectionSlideImg[i].cloneNode(true));
        behindCopy.push(collectionSlideImg[collectionSlideImg.length - 1 - i].cloneNode(true));
    }

    for(let i = 0; i < 1; i++) {
        collectionSlideWrap.insertBefore(behindCopy[i],collectionSlideWrap.firstChild);
        collectionSlideWrap.appendChild(frontCopy[i]);
    }
}