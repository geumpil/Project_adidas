const storySlideWrap = document.querySelector('.story-slide');
const storySlideImage = document.querySelectorAll('.story-slide-list');
const storySlideView = document.querySelector('.story-contents');
const storyPrev = document.querySelector('.story-prev');
const storyNext = document.querySelector('.story-next');
const storyNowPage = document.querySelector('.now-page');
const storyTotalPage = document.querySelector('.total-page');
const storyRealSlideCount = storySlideImage.length;
const storySlideSpeed = 500;

let storyIndex = 1;
let slideImageWidth;
let storyMoveAble = true;
// let storyLoopInterval;

storyInit();
storyMakeClone();
storySlideApply(false);

// 리사이징

function storyInit() {
    if(window.innerWidth < 744) {
        slideImageWidth = window.innerWidth - 16 * 2;
    } else if(window.innerWidth < 1364) {
        slideImageWidth = window.innerWidth - 32 * 2;
    } else {
        slideImageWidth = 1300;
    }
}

window.addEventListener('resize', () => {
    storyInit();
    storySlideApply(false);
})

// 슬라이드 이동

function storySlideApply(animation) {
    if(animation) {
        storySlideWrap.style.transition = `${storySlideSpeed}ms`;
    } else {
        storySlideWrap.style.transition = '0ms';
    }
    storySlideWrap.style.transform = `translateX(-${slideImageWidth * storyIndex}px)`;
    storyResetInterval();
}

// 버튼 이동

storyPrev.addEventListener('click', storyPrevButton);
storyNext.addEventListener('click', storyNextButton);

function storyPrevButton() {
    if(storyMoveAble) {
        storyMoveAble = false;
        storyIndex--;
        storySlideApply(true);

        setTimeout(() => {
            if(storyIndex < 1) {
                storyIndex = storyRealSlideCount;
                storySlideApply(false);
            }
            storyMoveAble = true;
        }, storySlideSpeed);
    }
}

function storyNextButton() {
    if(storyMoveAble) {
        storyMoveAble = false;
        storyIndex++;
        storySlideApply(true);

        setTimeout(() => {
            if(storyIndex > storyRealSlideCount) {
                storyIndex = 1;
                colSlideApply(false);
            }
            storyMoveAble = true;
        }, storySlideSpeed);
    }
}

// 클론 생성

function storyMakeClone() {
    const frontCopy = [];
    const behindCopy = [];

    for(let i = 0; i < 1; i++) {
        frontCopy.push(storySlideImage[i].cloneNode(true));
        behindCopy.push(storySlideImage[storySlideImage.length - 1 - i].cloneNode(true));
    }

    for(let i = 0; i < 1; i++) {
        storySlideWrap.insertBefore(behindCopy[i], storySlideWrap.firstElementChild);
        storySlideWrap.appendChild(frontCopy[i]);
    }
}

// 자동 슬라이드

function storyResetInterval() {
    storyStopInterval();
    storyStartInterval();
}

function storyStopInterval() {
    clearInterval(storyLoopInterval);
}

function storyStartInterval() {
    storyLoopInterval = setInterval(() => {
        storyNextButton();
    }, 3000);
}

storySlideView.addEventListener('mouseenter', () => {
    storyStopInterval();
})

storySlideView.addEventListener('mouseleave', () => {
    storyStartInterval();
})