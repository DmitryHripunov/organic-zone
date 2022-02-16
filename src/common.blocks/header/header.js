const header = document.querySelector('.header');
const headerOffer = document.querySelector('.header-offer');
const headerBody = document.querySelector('.header__body');
const navHeight = document.querySelector('.header__nav');
const headerTop = document.querySelector('.header__nav');
const body = document.querySelector('.body');

if (headerTop) {
  const headerTopHeight = headerTop.offsetHeight ? headerTop.offsetHeight : 0;
  const totalHeight = (navHeight.offsetHeight) +
    headerBody.offsetHeight + headerTopHeight;
  // let lastScrollTop = 0;

  const setHeader = () => {
    const topPos = window.pageYOffset;

    if (topPos > headerOffer.offsetHeight + headerTopHeight + 8) {
      document.getElementById('confirm-city').style.display = 'none';
      header.classList.add('is-moved');
      header.style.transform = `translateY(${-headerOffer.offsetHeight}px)`;
      body.style.paddingTop = `${totalHeight}px`;
    } else {
      document.getElementById('confirm-city').style.display = '';
      header.classList.remove('is-moved');
      header.style.transform = '';
      body.style.paddingTop = '';
    }

    // if (topPos > totalHeight + headerTopHeight) {
    //   header.classList.add('is-hidden');
    // }
    // if (topPos < lastScrollTop) {
    //   header.classList.remove('is-hidden');
    // }
    // lastScrollTop = topPos;
  };

  if (window.innerHeight <= document.querySelector('.main').offsetHeight) {
    document.addEventListener('scroll', setHeader, true);
  } else {
    document.removeEventListener('scroll', setHeader);
  }
}
