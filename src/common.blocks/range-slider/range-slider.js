import noUiSlider from 'nouislider/dist/nouislider';
import wNumb from 'wnumb/wNumb';

// function formRefresh() {
//   $('.js-category-preloader').show();
//   $('.js-product-container').hide();
//   const form = $('.js-filter-form').closest('form');
//   const params = form.serialize();
//   const curUrl = $('.js-filter-form').attr('action');
//   const path = `${curUrl}?${params}`;
//   $.ajax({
//     method: 'GET',
//     url: path,
//     dataType: 'json',
//   }).done((response) => {
//     const data = JSON.parse(response);
//     $('.js-product-container').html(data.products);
//     $('.js-filter-counter').text(data.text);
//     $('.js-category-preloader').hide();
//     $('.js-product-container').show();
//   });
// }

document.addEventListener('DOMContentLoaded', () => {
  const priceControlList = document.querySelectorAll('.js-range-slider');

  if (priceControlList.length) {
    for (let i = 0; i < priceControlList.length; i++) {
      const keypressSlider = priceControlList[i].querySelector('.range-control');
      const input0 = priceControlList[i].querySelector('.range-input-0');
      const input1 = priceControlList[i].querySelector('.range-input-1');
      const inputs = [input0, input1];
      const noUiSliderMin = Number(input0.getAttribute('data-price-min'));
      const noUiSliderMax = Number(input1.getAttribute('data-price-max'));
      let noUiSliderCurrentMin = Number(input0.getAttribute('data-price-current-min'));
      let noUiSliderCurrentMax = Number(input1.getAttribute('data-price-current-max'));

      if (noUiSliderCurrentMin === '') {
        noUiSliderCurrentMin = noUiSliderMin;
      }

      if (noUiSliderCurrentMax === '') {
        noUiSliderCurrentMax = noUiSliderMax;
      }

      noUiSlider.create(keypressSlider, {
        start: [noUiSliderCurrentMin, noUiSliderCurrentMax],
        connect: true,
        format: wNumb({
          decimals: 0,
        }),
        range: {
          min: noUiSliderMin,
          max: noUiSliderMax,
        },
      });

      keypressSlider.noUiSlider.on('update', (values, handle) => {
        inputs[handle].value = values[handle];
      });
      // keypressSlider.noUiSlider.on('change', () => {
      //   formRefresh();
      // });
    }
  }
});

