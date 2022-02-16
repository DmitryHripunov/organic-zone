const $btn = $('.js-menu-btn');
const $catalog = $('.js-menu');
const $catalogWrapper = $('.menu__submenu-wrapper');
const $item = $('.js-menu-item-dropdown');
const modOpened = 'is-opened';
const mainNavContent = $('.js-submenu');

$item.click((e) => {
  const target = $(e.currentTarget);
  $item.removeClass('is-opened');
  target.addClass('is-opened');
  mainNavContent.removeClass('is-active').eq(target.index()).addClass('is-active');

  if ($catalog.hasClass(modOpened)) {
    $catalog.css('width', '100%');
    $catalogWrapper.css('width', '100%');
  }
});

// open catalog
function openCatalog() {
  $catalog.fadeIn(150);
  $catalog.addClass(modOpened);
  $(mainNavContent).first().addClass('is-active');
  $catalog.css('width', '100%');
  $($item).first().addClass('is-opened');
}

// close catalog
function closeCatalog() {
  $catalog.fadeOut(150);
  $catalog.removeClass(modOpened);
  $catalog.css('width', 'auto');
  $catalogWrapper.css('width', 'auto');
  $('.js-menu-item-dropdown').removeClass(modOpened);
}

function catalog() {
  $btn.unbind('click').click(() => {
    if (!$catalog.hasClass(modOpened)) {
      $($btn).addClass('is-active');
      $('.js-menu-svg').attr('xlink:href', '#close');
      openCatalog();
    } else if ($catalog.hasClass(modOpened)) {
      mainNavContent.removeClass('is-active');
      $($btn).removeClass('is-active');
      $('.js-menu-svg').attr('xlink:href', '#burger-bulets');
      closeCatalog();
    }
  });
}

catalog();
