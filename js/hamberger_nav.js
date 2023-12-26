function hambergerNavigation() {

    const hambergerNav = document.querySelector('.hamberger-nav');
    const hambergerAct = document.querySelector('.hamberger-click');
    const closeButton = document.getElementsByClassName('mob-menu-close');
    const listButton = document.getElementsByClassName('list-btn');
    const listSubmenu = document.getElementsByClassName('list-submenu-area');
    const prevSubButton = document.querySelectorAll('.pre-top-menu');
    
    hambergerNav.addEventListener('click', () => {
        openHambergerMenu();
    })
    
    for(let i = 0 ; i < closeButton.length ; i ++) {
        closeButton[i].addEventListener('click', () => {
            closeHambergerMenu();
        })
    }
    
    for(let i = 0; i < listButton.length; i++) {
        listButton[i].addEventListener('click', () => {
            console.log(
    
                listButton[i].parentElement.querySelector('.list-submenu-area').classList.add('sublist-act')
            )
        })
    }
    
    for(let i = 0 ; i < prevSubButton.length ; i ++) {
        prevSubButton[i].addEventListener('click',() => {
            prevSubmenu();
        })
    }
    
    
    function openHambergerMenu() {
        hambergerAct.classList.add('nav-active');
    }
    
    function closeHambergerMenu() {
        hambergerAct.classList.remove('nav-active');
    }
    
    // function openSubmenu(index) {
    //     listSubmenu[index].classList.add('sublist-act');
    // }
    
    function prevSubmenu() {
        for(let i = 0 ; i < listSubmenu.length ; i ++) {
    
            listSubmenu[i].classList.remove('sublist-act');
        }
    }
    
}

