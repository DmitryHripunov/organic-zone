// $(document).ready(() => {
//   // eslint-disable-next-line func-names
//   $('.js-star').on('mouseover', function () {
//     const onStar = parseInt($(this).data('value'));
//     // eslint-disable-next-line func-names
//     $(this).parent().children('.js-star').each(function (e) {
//       if (e < onStar) {
//         $(this).addClass('is-active');
//       } else {
//         $(this).removeClass('is-active');
//       }
//     });
//     // eslint-disable-next-line func-names
//   }).on('mouseout', function () {
//     // eslint-disable-next-line func-names
//     $(this).parent().children('i').each(function () {
//       $(this).removeClass('is-active');
//     });
//   });
//   // eslint-disable-next-line func-names
//   $('.js-star').on('click', function () {
//     const onStar = parseInt($(this).data('value'));
//     const stars = $(this).parent().children('.js-star');

//     $('.js-star-value').attr('value', onStar);

//     for (let i = 0; i < stars.length; i++) {
//       $(stars[i]).removeClass('is-selected');
//     }

//     for (let j = 0; j < onStar; j++) {
//       $(stars[j]).addClass('is-selected');
//     }
//   });
// });
