const fileUploader = document.getElementById('file-uploader');
// const reader = new FileReader();
const imageGrid = document.querySelector('.form__file-grid');

function setBase64(file, input) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    input.setAttribute('value', reader.result);
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
}

if (fileUploader) {
  fileUploader.addEventListener('change', (event) => {
    if (document.querySelectorAll('.form__file-item').length &&
        document.querySelectorAll('.form__file-item').length >= 9) {
      fileUploader.setAttribute('disabled', 'disabled');
    }
    // eslint-disable-next-line prefer-destructuring
    const files = event.target.files;
    const file = files[0];

    if (!file) return;
    const img = document.createElement('img');
    const item = document.createElement('div');
    const btn = document.createElement('div');

    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', `Review[files][${file.name}]`);
    input.setAttribute('id', file.lastModified);
    setBase64(file, input);

    item.setAttribute('data-id', file.lastModified);
    item.classList.add('form__file-item');
    img.classList.add('form__file-img');
    btn.classList.add('form__file-btn');
    imageGrid.prepend(input);
    imageGrid.prepend(item);
    item.prepend(img);
    item.prepend(btn);
    img.src = URL.createObjectURL(file);
    img.alt = file.name;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      item.remove();
      input.remove();

      if (document.querySelectorAll('.form__file-item').length &&
        document.querySelectorAll('.form__file-item').length >= 9) {
        fileUploader.removeAttribute('disabled');
      }
    });
  });
}

const filterList = document.querySelectorAll('.filter__list');

if (filterList.length > 0) {
  for (let i = 0; i < filterList.length; i++) {
    const checkAllBtn = filterList[i].querySelector('.js-check-all');
    const check = filterList[i].querySelectorAll('.js-check');
    if (checkAllBtn) {
      checkAllBtn.addEventListener('click', () => {
        check.forEach((el) => {
          // eslint-disable-next-line no-unused-expressions
          checkAllBtn.checked === true ? el.checked = true : el.checked = false;
        });
      });
    }
  }
}

