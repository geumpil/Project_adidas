const slideWrap = document.querySelectorAll('.items-wrap');
const slideImg = document.querySelectorAll('.items-list');
const prevButton = document.querySelectorAll('.items-prev');
const nextButton = document.querySelectorAll('.items-next');
const slideBar = document.querySelectorAll('.items-bar-area');
const slideView = document.querySelectorAll('.items-slide-view');

const realSlideCount = slideImg.length;
const viewCount = 4;
let slideImgSize = '310px';
let gapSize = '20px';
