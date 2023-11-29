const hambergerNav = document.querySelector('.hamberger-nav');
const hambergerAct = document.querySelector('.hamberger-click');
const closeButton = document.querySelector('.mob-menu-close');
const listButton = document.getElementsByClassName('list-btn');
const listSubmenu = document.getElementsByClassName('.list-submenu-area');
const prevSubButton = document.querySelectorAll('.pre-top-menu');

hambergerNav.addEventListener('click', () => {
    openHambergerMenu();
})

closeButton.addEventListener('click', () => {
    closeHambergerMenu();
})

for(let i = 0; i < listButton.length; i++) {
    listButton[i].addEventListener('click', () => {
        openSubmenu();
    })
}


function openHambergerMenu() {
    hambergerAct.classList.add('nav-active');
}

function closeHambergerMenu() {
    hambergerAct.classList.remove('nav-active');
}

function openSubmenu() {
    for(let i = 0; i < listSubmenu.length; i++)
    listSubmenu[i].classList.add('sublist-act');
}

function prevSubmenu() {
    listSubmenu.classList.remove('sublist-act');
}