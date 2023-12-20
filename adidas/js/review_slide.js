function reviewSlide() {

    const reSlideWrap = document.querySelector('.review-slide');
    const reSlideImg = document.querySelectorAll('.review-list');
    // 쿼리셀렉터올(영업부) 선언한 시점에 영업부인 사람
    // 쿼리셀렉터를 2022년에 선언헀다
    // 그러면 2022년도에 영업부였던 사람들이 계속 선택되어있다(퇴사해도 상관없음)

    // 겟엘레멘츠바이클래스네임(영업부) 선언한 시점은 상관없고 현재 영업부인사람
    // 위방식은 실시간으로 명단이 갱신되는 리스트
    // 누군가 퇴사하면 리스트에서 빠지고 입사하면 리스트에 들어온다
    const rePrev = document.querySelector('.review-prev');
    const reNext = document.querySelector('.review-next');
    const reSlideView = document.querySelector('.review-wrap');
    const reRealSlideCount = reSlideImg.length;
    const reSlideSpeed = 700;
    let reViewCount;
    let reSlideImgSize;
    let reGapSize = 20;
    let index = 4;
    let moveActivate = true;
    let reviewLoopInterval;
    let viewGapCount;

    reInit();
    reMakeClone();
    reSlideApply(false);
    reviewResize();


    // 리사이징
    function setSlideContentsWidth(width) {
        for(let i = 0; i < reSlideWrap.childElementCount ; i ++){
            reSlideWrap.children[i].style.width =`${width}px`
            console.log(reSlideImg[i])
        }

    }

    function reInit() {
        if(window.innerWidth < 744) {
            reViewCount = 2; 
            reGapSize = 10
            
        } else if(window.innerWidth < 1364) {
            reViewCount = 3;
            reGapSize = 20

        } else {
            reGapSize = 20
            reViewCount = 4;
        }
        
        console.log(`이잉? : ${reSlideView.getBoundingClientRect().width}`)
        viewGapCount = reViewCount - 1;
        reSlideImgSize = (reSlideView.getBoundingClientRect().width - viewGapCount * reGapSize) / reViewCount;
        setSlideContentsWidth(reSlideImgSize);
        reSlideApply(false);
    }

    function reviewResize() {
        window.addEventListener('resize', reInit);
    }

    // 슬라이드 이동

    function reSlideApply(animation) {
        if(animation) {
            reSlideWrap.style.transition = `${reSlideSpeed}ms`;
        } else {
            reSlideWrap.style.transition = '0ms';
        }
        reSlideWrap.style.transform = `translateX(${-(reSlideImgSize + reGapSize) * index}px`;
        reviewResetInterval();
    }

    // 버튼(클릭) 이동

    rePrev.addEventListener('click', rePrevMove);
    reNext.addEventListener('click', reNextMove);

    function rePrevMove() {
        if(moveActivate) {
            moveActivate = false;
            index--;
            reSlideApply(true);

            setTimeout(() => {
                if(index < reViewCount) {
                    index = reRealSlideCount - 1 + reViewCount;
                    reSlideApply(false);
                }
                moveActivate = true;
            }, reSlideSpeed);
        }
    }

    function reNextMove() {
        if(moveActivate) {
            moveActivate = false;
            index++;
            reSlideApply(true);

            setTimeout(() => {
                if(index > reRealSlideCount - 1 + reViewCount) {
                    index = reViewCount;
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

}