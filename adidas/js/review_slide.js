const reSlideWrap = document.querySelector('.review-slide');
const reSlideImg = document.querySelectorAll('.review-list');
const rePrev = document.querySelector('.review-prev');
const reNext = document.querySelector('.review-next');
const reSlideView = document.querySelector('.review-wrap');
const reRealSlideCount = reSlideImg.length;
const reSlideSpeed = 500;
let reViewCount;
let reSlideImgSize;
let reGapSize;
let reIndex = 4;
let moveActivate = true;
let reviewLoopInterval;

reInit();
reMakeClone();
reSlideApply(false);

// 리사이징

function reInit() {
    if(window.innerWidth < 744) {
        reViewCount = 2; 
    } else if(window.innerWidth < 1364) {
        reViewCount = 3;
        // reSlideImgSize = window.innerWidth;
        //100vh = window.innerHeight
        //100vw = window.innerWidth
        
    } else {
        reViewCount = 4;
        reSlideImgSize = '-310px';
        reGapSize = '20px';
    }
}

window.addEventListener('resize', () => {

})

// 슬라이드 이동

function reSlideApply(animation) {
    if(animation) {
        reSlideWrap.style.transition = `${reSlideSpeed}ms`;
    } else {
        reSlideWrap.style.transition = '0ms';
    }
    reSlideWrap.style.transform = `translateX(calc((${reSlideImgSize} - ${reGapSize}) * ${reIndex}))`;
    reviewResetInterval();
}

// 버튼(클릭) 이동

rePrev.addEventListener('click', rePrevMove);
reNext.addEventListener('click', reNextMove);

function rePrevMove() {
    if(moveActivate) {
        moveActivate = false;
        reIndex--;
        reSlideApply(true);

        setTimeout(() => {
            if(reIndex < reViewCount) {
                reIndex = reRealSlideCount - 1 + reViewCount;
                reSlideApply(false);
            }
            moveActivate = true;
        }, reSlideSpeed);
    }
}

function reNextMove() {
    if(moveActivate) {
        moveActivate = false;
        reIndex++;
        reSlideApply(true);

        setTimeout(() => {
            if(reIndex > reRealSlideCount - 1 + reViewCount) {
                reIndex = reViewCount;
                reSlideApply(false);
            }
            moveActivate = true;
        }, reSlideSpeed);
    }
}

// 클론 생성

function reMakeClone() {
    const frontCopy = [];
    const behindCopy = [];

    for(let i = 0; i < reViewCount; i++) {
        frontCopy.push(reSlideImg[i].cloneNode(true));
        behindCopy.push(reSlideImg[reSlideImg.length-1-i].cloneNode(true));
    }

    for(let i = 0; i < reViewCount; i++) {
        reSlideWrap.insertBefore(behindCopy[i], reSlideWrap.firstElementChild);
        reSlideWrap.appendChild(frontCopy[i]);
    }
}

// 자동 슬라이드

function reviewResetInterval(){
    reviewStopInterval();
    reviewStartInterval();

}

function  reviewStopInterval() {
    clearInterval(reviewLoopInterval);
}
function  reviewStartInterval() {
    reviewLoopInterval = setInterval(() => {
        reNextMove()
    }, 2000);
}


reSlideView.addEventListener('mouseenter',()=>{
    reviewStopInterval();
})

reSlideView.addEventListener('mouseleave',()=>{
    reviewStartInterval();
})