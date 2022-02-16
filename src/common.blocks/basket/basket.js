const basketCheckAll = document.querySelector('.js-basket-check-all');

if (basketCheckAll) {
  const check = document.querySelectorAll('.js-basket-check');
  basketCheckAll.addEventListener('click', () => {
    check.forEach((el) => {
      // eslint-disable-next-line no-unused-expressions
      basketCheckAll.checked === true ? el.checked = true : el.checked = false;
    });
  });
}

