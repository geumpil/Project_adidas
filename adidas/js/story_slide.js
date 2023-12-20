function storySlide() {

    const storySlideWrap = document.querySelector('.story-slide');
    const storySlideImage = document.querySelectorAll('.story-slide-list');
    const storySlideView = document.querySelector('.story-contents');
    const storyPrev = document.querySelector('.story-prev');
    const storyNext = document.querySelector('.story-next');
    const storyNowPage = document.querySelector('.now-page');
    const storyTotalPage = document.querySelector('.total-page');
    const progressBar = document.querySelector('.bar')
    const storySlideSpeed = 500;
    const intervalSpeed = 8000;
    const intervalGap = 200;
    
    let index = 0;
    let maxIndex = storySlideWrap.childElementCount;
    let slideHeight = storySlideImage[0].getBoundingClientRect().height;
    let storyMoveAble = true;
    let storyLoopInterval;
    
    progressBar.style.animationDuration = `${intervalSpeed-intervalGap}ms`
    storyInit();
    storySlideApply();
    setTotalPageCount();
    
    // 리사이징
    
    function storyInit() {
        if(window.innerWidth < 744) {
            slideImageWidth = window.innerWidth - 16 * 2;
        } else if(window.innerWidth < 1364) {
            slideImageWidth = window.innerWidth - 32 * 2;
        } else {
            slideImageWidth = 1300;
        }
        slideHeight = storySlideImage[0].getBoundingClientRect().height;
        storySlideWrap.style.height = `${slideHeight}px`
    }
    
    window.addEventListener('resize', () => {
        storyInit();
        storySlideApply();
    })
    
    // 슬라이드 이동
    
    function storySlideApply() {
        for(let i = 0 ; i < storySlideWrap.childElementCount ; i ++) {
            storySlideWrap.children[i].classList.remove('active');
        }
        storySlideWrap.children[index].classList.add('active')
    
        progressBar.classList.remove('active');
        setTimeout(() => {
            progressBar.classList.add('active');
        }, intervalGap);
    
        storyResetInterval();
        setNowPageCount();
    }
    
    // 버튼 이동
    
    storyPrev.addEventListener('click', storyPrevButton);
    storyNext.addEventListener('click', storyNextButton);
    
    function storyPrevButton() {
        if(storyMoveAble) {
            storyMoveAble = false;
            index--;
            if(index < 0) {
                index = storySlideWrap.childElementCount - 1;
            }
            storySlideApply();
            setTimeout(() => {
                storyMoveAble = true;
            }, storySlideSpeed);
        }
    }
    
    function storyNextButton() {
        if(storyMoveAble) {
            storyMoveAble = false;
            index++;
            if(index > storySlideWrap.childElementCount-1) {
                index = 0;
            }
            storySlideApply();
            setTimeout(() => {
                storyMoveAble = true;
            }, storySlideSpeed);
        }
    }
    
    // 페이지 뷰
    
    function setNowPageCount() {
        storyNowPage.innerText = `${String(index + 1).padStart(2, '0')}`;
    }
    
    function setTotalPageCount() {
        storyTotalPage.innerText = `${String(maxIndex).padStart(2, '0')}`;
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
        }, intervalSpeed);
    }  
    
}



