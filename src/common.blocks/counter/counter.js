/*eslint-disable*/
const amountBlockList = document.querySelectorAll('.js-counter');

amountBlockList.forEach((elem) => {
  let
    minus = elem.querySelector('.js-counter-decrement'),
    plus = elem.querySelector('.js-counter-increment'),
    input = elem.querySelector('.counter__field'),
    maxInputValue = input.getAttribute('max'),
    minInputValue = input.getAttribute('min');

  if (window.innerWidth < 768) {
    input.setAttribute('value', '');
  }

  minus.onclick = function () {
    if (minInputValue != null) {
      minInputValue = Number(minInputValue);
      if (input.value > minInputValue) input.value--;
    } else {
      input.value--;
    }
  };

  plus.onclick = function () {
    if (maxInputValue != null) {
      maxInputValue = Number(maxInputValue);
      if (input.value < maxInputValue) input.value++;
    } else {
      input.value++;
    }
  };

  input.oninput = function () {
    if (minInputValue != null) {
      minInputValue = Number(minInputValue);
      if (input.value < minInputValue) input.value = minInputValue;
    }
    if (maxInputValue != null) {
      maxInputValue = Number(maxInputValue);
      if (input.value > maxInputValue) input.value = maxInputValue;
    }
  };
});