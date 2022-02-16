const scrollBtn = document.querySelector('.js-nav-btn');
const navArray = document.querySelectorAll('.nav__link');

scrollBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (scrollBtn.classList.contains('nav__btn_right')) {
    navArray[navArray.length - 1].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });

    navArray[0].classList.remove('is-view');
    scrollBtn.classList.remove('nav__btn_right');
    scrollBtn.classList.add('nav__btn_left');
  } else {
    navArray[0].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });

    navArray[navArray.length - 1].classList.remove('is-view');
    scrollBtn.classList.remove('nav__btn_left');
    scrollBtn.classList.add('nav__btn_right');
  }
}, true);

const container = document.querySelector('.container').offsetWidth;
const stingWidth = [];

for (let i = 0; i < navArray.length; i++) {
  const elWidth = navArray[i].offsetWidth + 24;
  stingWidth.push(elWidth);
}

const result = stingWidth.reduce((sum, current) => sum + current, 0);

if (result < container) {
  document.querySelector('.nav__btn').style.display = 'none';
}

// function elementInViewport(el) {
//   const bounds = el.getBoundingClientRect();
//   return (
//     (bounds.left + bounds.width > 0) &&
//     (window.innerWidth - bounds.left > 0)
//   );
// }

// const el = document.querySelector('.is-view');
// const bounds = el.getBoundingClientRect();
// document.querySelector('.nav').addEventListener('scroll', () => {
//   // const inViewport = elementInViewport(el);

//   if (bounds.left + bounds.width > 0) {
//     navArray[0].classList.remove('is-view');
//     navArray[navArray.length - 1].classList.add('is-view');
//     scrollBtn.classList.remove('nav__btn_right');
//     scrollBtn.classList.add('nav__btn_left');
//   } else if ((window.innerWidth - bounds.left > 0)) {
//     navArray[navArray.length - 1].classList.remove('is-view');
//     navArray[0].classList.add('is-view');
//     scrollBtn.classList.remove('nav__btn_left');
//     scrollBtn.classList.add('nav__btn_right');
//   }
// });

