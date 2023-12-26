const slider = document.querySelectorAll('.product-view');


for(let i = 0; i < slider.length; i++) {
    makeSlider(slider[i]);
}


function makeSlider(slider) {

    const slideWrap = slider.querySelector('.items-wrap');
    const slideImg = slider.querySelector('.items-list');
    const prevButton = slider.querySelector('.items-prev');
    const nextButton = slider.querySelector('.items-next');
    const slideBar = slider.querySelector('.items-bar-area');
    const slideView = slider.querySelector('.items-slide-view');
    const maxCount = slider.querySelector('.total-item');
    const currentCount = slider.querySelector('.current-item');

    const buttonList = [];
    let maxIndex = 0
    let viewCount = 4;
    let slideImgSize;
    let gapSize = 20;
    let index = 0;
    let moveAble = true;
    let viewGapCount;
    // let loopInterval;


    init();
    slideApply(false);
    resizeView();
    setSlideMaxCount();

    // 리사이징

    function init() {
        if(window.innerWidth < 1364) {
            gapSize = 20;
            viewCount = 2;
        }else {
            viewCount = 4;
        }
        if(index > maxIndex) {
            index = maxIndex;
        }
        viewGapCount = viewCount - 1; 
        slideImgSize = (slideView.getBoundingClientRect().width - viewGapCount * gapSize) / viewCount; 
        setCurrentSlideCount();
        setSlideMaxCount();
        delBtn()
        makeBtn();
        slideApply(false);
    }

    function resizeView() {
        window.addEventListener('resize', init);
    }

    // 슬라이드 버튼 생성

    function makeBtn(){
        for(let i = 0; i < slideWrap.childElementCount-viewCount+1; i++) {
            const barBtn = document.createElement('div');
            barBtn.classList.add('items-bar');
            barBtn.addEventListener('click', ()=> {
                index = i;
                slideApply(true);
            })
            
            buttonList.push(barBtn);
            slideBar.appendChild(barBtn);

        }
    }

    // 슬라이드 버튼 삭제

    function delBtn() {
        for(let i = 0 ; i < buttonList.length ; i ++) {
            slideBar.removeChild(buttonList[i]);
        }
        buttonList.length = 0;
        
    }

    // 슬라이드 이동

    function slideApply(animation) {
        slideWrap.style.transform = `translateX(${-(slideImgSize + gapSize) * index}px`;
        setCurrentSlideCount();
        buttonUpdate();
    }

    // 현재 슬라이드 버튼 활성화

    function buttonUpdate() {
        for(let i = 0; i < slideBar.childElementCount; i++) {
            slideBar.children[i].classList.remove('activate');
            slideBar.children[index].classList.add('activate');
        }
    }

    // 슬라이드 현재, 총페이지 숫자

    function setCurrentSlideCount() {
        currentCount.innerText = `${String(index + 1).padStart(2,'0')}`;
    }
    function setSlideMaxCount() {
        maxIndex = slideWrap.childElementCount-viewCount;
        maxCount.innerText = `${String(maxIndex+1).padStart(2,'0')}`
    }

    // 버튼 클릭 이동

    prevButton.addEventListener('click', prev);
    nextButton.addEventListener('click', next);

    function prev() {
        if(moveAble) {
            moveAble = false;
            index--;
            if(index < 0) {
                index = 0;
            }
            slideApply(true);

            setTimeout(() => {
                moveAble = true;
            }, 500);
        }
    }

    function next() {
        if(moveAble){
            moveAble = false; 
            index++;
            if(index > slideWrap.childElementCount - viewCount){
                index = slideWrap.childElementCount - viewCount
            }
            slideApply(true);

            setTimeout(() => {
                moveAble = true;
            }, 500);
        }
    }


}