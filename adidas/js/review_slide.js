const reSlideWrap = document.querySelector('.review-slide');
const reSlideImg = document.querySelector('.review-list');
const rePrev = document.querySelector('.review-prev');
const reNext = document.querySelector('.review-next');
const reSlideView = document.querySelector('.review-wrap');

let reViewCount = 4;
let reSlideImgSize = 0; 
let reGapSize = 0;
let index = 0;
let moveActivate = true;

reSlideApply(false);

// 리사이징

// 슬라이드 이동

function reSlideApply(animation) {
    reSlideWrap.computedStyleMap.transfrm = `translateX(calc((${reSlideImgSize} - ${reGapSize}) * ${index}))`;
}

// 버튼(클릭) 이동

rePrev.addEventListener('click', rePrevMove);
reNext.addEventListener('click', reNextMove);

function rePrevMove() {
    if(moveActivate) {
        moveActivate = false;
        index--;
        if(index < 0) {
            index = 0;
        }
        reSlideApply(true);

        setTimeout(() => {
            moveActivate = true;
        }, 500);
    }
}

function reNextMove() {
    if(moveActivate) {
        moveActivate = false;
        index++;
        if(index > reSlideWrap.childElementCount - reViewCount) {
            index = reSlideWrap.childElementCount - reViewCount;
        }
        reSlideApply(true);

        setTimeout(() => {
            moveActivate = true;
        }, 500);
    }
}

// 클론 생성