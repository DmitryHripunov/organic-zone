// Реализовал в компоненте <favorite-button></favorite-button>
// const favoriteList = document.querySelectorAll('.js-favorite-btn');

// if (favoriteList && favoriteList.length > 0) {
//   favoriteList.forEach((favoriteItem) => {
//     favoriteItem.addEventListener('click', (e) => {
//       e.preventDefault();
//       const currentFavorite = e.currentTarget;
//       const currentSvg = currentFavorite.querySelector('use');
//       if (currentFavorite.classList.contains('is-active')) {
//         currentFavorite.classList.remove('is-active');
//         currentSvg.setAttribute('xlink:href', '#heart');
//       } else {
//         currentFavorite.classList.add('is-active');
//         currentSvg.setAttribute('xlink:href', '#heart_fill');
//       }
//     });
//   });
// }

// const addToCartBtn = document.querySelectorAll('.js-add-to-card');

// addToCartBtn.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     const curr = e.currentTarget;

//     curr.classList.add('is-loading');
//     curr.textContent = 'Loading...';

//     setTimeout(() => {
//       document.querySelector('.cart-btn__dropdown').classList.add('is-active');
//       document.querySelector('.cart-btn__action').classList.add('is-active');

//       curr.classList.remove('is-loading');
//       curr.textContent = 'В корзине';

//       setTimeout(() => {
//         document.querySelector('.cart-btn__dropdown').classList.remove('is-active');

//         curr.classList.remove('is-loading');
//         curr.setAttribute('disabled', 'disabled');
//         curr.textContent = 'В корзине';
//       }, 2000);
//     }, 1000);
//   });
// });
