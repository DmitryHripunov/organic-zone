$(document).ready(() => {
  // eslint-disable-next-line func-names
  $('.js-star').on('mouseover', function () {
    const onStar = parseInt($(this).data('value'));
    // eslint-disable-next-line func-names
    $(this).parent().children('.js-star').each(function (e) {
      if (e < onStar) {
        $(this).addClass('is-active');
      } else {
        $(this).removeClass('is-active');
      }
    });
    // eslint-disable-next-line func-names
  }).on('mouseout', function () {
    // eslint-disable-next-line func-names
    $(this).parent().children('i').each(function () {
      $(this).removeClass('is-active');
    });
  });

  function setRatingValue(inputSelector) {
    return (e) => {
      const starEl = e.target;
      const onStar = parseInt($(starEl).data('value'));
      const stars = $(starEl).parent().children('.js-star');

      $(inputSelector).attr('value', onStar);

      for (let i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('is-selected');
      }

      for (let j = 0; j < onStar; j++) {
        $(stars[j]).addClass('is-selected');
      }
    };
  }


  // eslint-disable-next-line func-names
  $('.js-star-conformity').on('click', setRatingValue('#review-assessment_conformity'));
  $('.js-star-delivery').on('click', setRatingValue('#review-assessment_quality_delivery'));
  $('.js-star-processing').on('click', setRatingValue('#review-assessment_speed_processing'));
});
