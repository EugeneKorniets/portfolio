/* menu open/close control and no-js handler   start */
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var authorInfo = document.querySelector('.author-info');

if (navMain != null) {
  navMain.classList.remove('main-nav--nojs');
}

if (navToggle != null & navMain != null) {
  
  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      authorInfo.classList.add('hidden');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
      authorInfo.classList.remove('hidden');
    }
  });
}
/* menu open/close control and no-js handler   end */


/* circle progress bar start */
var circles = document.querySelectorAll('.about__circle');
var technology = document.querySelectorAll('.about__technology');
var percentage = document.querySelectorAll('.about__percentage');

circle();

function circle () {
  for (i = 0; i < circles.length; i++) {
    var percent = parseInt(percentage[i].innerHTML);
    percent = percent * 251 / 100;
    circles[i].innerHTML = '<svg width="100" height="100"><circle transform="rotate(-90)" style="stroke-dasharray:' + percent + ' 251px;" r="40" cx="-50" cy="50" /></svg>' + technology[i].outerHTML + percentage[i].outerHTML;
  };
};
/* circle progress bar start */