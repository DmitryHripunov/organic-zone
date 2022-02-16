const headerOfferBtn = document.querySelector('.js-header-offer-btn');
if (headerOfferBtn) {
  headerOfferBtn.addEventListener('click', () => {
    document.querySelector('.header-offer').style.display = 'none';
  });
}

