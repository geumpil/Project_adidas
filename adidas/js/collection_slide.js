function collectionSlide() {

    const collectionSlideWrap = document.querySelector('.slide-banner');
    const collectionSlideImg = document.querySelectorAll('.slide-banner-list');
    const collectionSlideView = document.querySelector('.slide-banner-area');
    const collectionPrev = document.querySelector('.prev');
    const collectionNext = document.querySelector('.next');
    const dotButtonArea = document.querySelector('.dot-button');
    
    const colRealSlideCount = collectionSlideImg.length;
    const slideSpeed = 500;
    let index = 1;
    let slideImgWidth;
    let colMoveAble = true;
    let loopInterval;
    
    
    colInit();
    makeClone();
    colMakeBtn();
    colSlideApply(false);
    
    // 리사이징
    
    function colInit() {
        slideImgWidth = 850;
        if(window.innerWidth < 744) {
            slideImgWidth = window.innerWidth - 16 * 2;
        } else if(window.innerWidth < 1364) {
            slideImgWidth = window.innerWidth - 32 * 2;
        }
    
    }
    
    window.addEventListener('resize', ()=>{
        colInit();
        colSlideApply(false);
    })
    
    
    // 슬라이드 이동
    
    function colSlideApply(animation) {
        if(animation){
            collectionSlideWrap.style.transition = `${slideSpeed}ms`;
        }else {
            collectionSlideWrap.style.transition = '0ms';
        }
        collectionSlideWrap.style.transform = `translateX(-${slideImgWidth*index}px)`;
        colButtonUpdate();
        resetInterval();
    }
    
    // 버튼 클릭 이동
    
    collectionPrev.addEventListener('click', colPrev);
    collectionNext.addEventListener('click', colNext);
    
    function colPrev() {
        if(colMoveAble) {
            colMoveAble = false;
            index--;
            colSlideApply(true);
    
            setTimeout(() => {
                if(index < 1) {
                    index = colRealSlideCount;
                    colSlideApply(false);
                }
                colMoveAble = true;
            }, slideSpeed);
        }
    }
    
    function colNext() {
        if(colMoveAble){
            colMoveAble = false; 
            index++;
            colSlideApply(true);
    
            setTimeout(() => {
                if(index > colRealSlideCount){
                    index = 1
                    colSlideApply(false);
                }
                colMoveAble = true;
            }, slideSpeed);
        }
    }
    
    // 슬라이드 버튼 생성
    
    function colMakeBtn(){
        for(let i = 0; i < colRealSlideCount; i++) {
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
        }
    
        if(index < 1) {
            dotButtonArea.lastElementChild.classList.add('act');
        } else if(index > colRealSlideCount) {
            dotButtonArea.firstElementChild.classList.add('act');
        } else {
            dotButtonArea.children[index - 1].classList.add('act');
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
    
    // 자동 슬라이드
    
    function resetInterval(){
        clearInterval(loopInterval);
    
        loopInterval = setInterval(() => {
            colNext();
        }, 4000);
    }
    
}

