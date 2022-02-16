const commentAnchor = $('.js-comments');
const characteristicsAnchor = $('.js-char');

function scrollToBlock(e) {
  e.preventDefault();
  const href = $(this).attr('href');
  const hrefHeight = $(this).height();
  const offset = $(href).offset().top - hrefHeight;

  $('body,html').animate({
    scrollTop: offset,
  }, 500);
}

commentAnchor.on('click', scrollToBlock);
characteristicsAnchor.on('click', scrollToBlock);
