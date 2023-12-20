function headerExpand() {

    
    const headerExpand = document.querySelector('header > div');
    const listHoverActive = document.getElementsByClassName('main-menu-list');
    
    for(let i = 0; i < listHoverActive.length; i++) {
        listHoverActive[i].addEventListener('mouseover', () => {
            removeActive();
            listHoverActive[i].classList.add('hover-active');
        })
        listHoverActive[i].addEventListener('mouseleave', () => {
            removeActive();
        })
    }
    
    function removeActive() {
        for(let i = 0; i < listHoverActive.length; i++) {
            listHoverActive[i].classList.remove('hover-active');
        }
    }
}

