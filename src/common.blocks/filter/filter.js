const filterBtn = $('.js-acc-btn');
const filterList = $('.js-acc-content');

filterBtn.on('click', (e) => {
  const curTarget = e.currentTarget;
  const slideItem = $(curTarget).siblings(filterList);
  slideItem.slideToggle(200);
  $(curTarget).toggleClass('is-active');
});

function errorLog(element, selector) {
  if (!element) {
    console.log(`${selector} not found in getCountProducts()`);
    return false;
  }
  return true;
}

function getCountProducts(typeFilter) {
  const currentUrl = window.location.pathname;
  const elCountProd = document.querySelector('#count-products');
  const elFormFilters = document.querySelector('#form-filters');
  const elCheckboxInputs = document.querySelectorAll('.js-checkbox-input');
  if (!errorLog(elFormFilters, '#form-filters')) {
    return;
  }
  if (!errorLog(elCountProd, '#count-products')) {
    return;
  }
  if (!errorLog(elCheckboxInputs.length, '.js-checkbox-input')) {
    return;
  }

  const isNotChecked = !$('.js-checkbox-input:checked').length;
  if (typeFilter === 'chars' && isNotChecked) {
    $(elCountProd).text('');
    return;
  }

  const formData = $(elFormFilters).serialize();
  $.ajax({
    method: 'GET',
    data: formData,
    url: currentUrl,
    dataType: 'json',
  }).done((data) => {
    $(elCountProd).text(data.countProduct);
  }).fail((data) => {
    console.log(data);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const elCheckboxInputs = document.querySelectorAll('.js-checkbox-input');
  errorLog(elCheckboxInputs.length, '.js-checkbox-input');

  if (elCheckboxInputs.length) {
    for (let i = 0; i < elCheckboxInputs.length; i++) {
      elCheckboxInputs[i].addEventListener('change', () => {
        getCountProducts('chars');
      });
    }
  }
});
