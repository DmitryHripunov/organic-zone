<template>
  <div class="delivery">
    <div class="delivery__city">
      Доставка в
      <span class="delivery__city-in">{{ cityName }}</span>

      <a @click="openPopup" class="product-page__inner-link">Изменить</a>
    </div>

    <ul class="delivery__list">
      <li class="delivery__item">
        <div class="delivery__top">
          <svg class="icon icon_size-24 icon_mr-8">
            <use xlink:href="#cdek"></use>
          </svg>

          <span class="delivery__company">Cамовывоз из пункта выдачи</span>
        </div>
        <span class="delivery__price">202 руб</span>
        <span class="delivery__date">до 17 октября</span>
      </li>

      <li class="delivery__item">
        <div class="delivery__top">
          <svg class="icon icon_size-24 icon_mr-8">
            <use xlink:href="#boxberry"></use>
          </svg>

          <span class="delivery__company"
            >Самовывоз из пункта выдачи Boxberry</span
          >
        </div>

        <span class="delivery__price">350 руб</span>
        <span class="delivery__date">до 19 октября</span>
      </li>

      <li class="delivery__item">
        <div class="delivery__top">
          <svg class="icon icon_size-24 icon_mr-8">
            <use xlink:href="#cdek"></use>
          </svg>

          <span class="delivery__company">Доставка курьером СДЭК</span>
        </div>
        <span class="delivery__price">350 руб</span>
        <span class="delivery__date">до 19 октября</span>
      </li>

      <li class="delivery__item">
        <div class="delivery__top">
          <svg class="icon icon_size-24 icon_mr-8">
            <use xlink:href="#russian-post"></use>
          </svg>

          <span class="delivery__company">Почта России</span>
        </div>
        <span class="delivery__price">350 руб</span>
        <span class="delivery__date">срок неизвестен</span>
      </li>

      <li class="delivery__item">
        <div class="delivery__top">
          <svg class="icon icon_size-24 icon_mr-8">
            <use xlink:href="#icon-box"></use>
          </svg>

          <span class="delivery__company"
            >Самовывоз из магазина (только для г. Королёв)</span
          >
        </div>

        <span class="delivery__price">бесплатно</span>
        <span class="delivery__date">доступно</span>
      </li>
    </ul>

    <popup-base :open.sync="citySelection" :title="titlePopupCity">
      <PopupContentCity :open.sync="citySelection" />
    </popup-base>
  </div>
</template>

<script>
import PopupBase from "../popupComponents/PopupBase.vue";
import PopupContentCity from "../popupComponents/PopupContentCity.vue";

export default {
  props: ["open"],

  components: { PopupBase, PopupContentCity },

  data() {
    return {
      citySelection: false,
      cityName: 'Москва',
      titlePopupCity: 'Ваш город',
    };
  },

  methods: {
    openPopup() {
      this.citySelection = true;
      document.body.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`;
      document.body.classList.add("no-scrolling");
    },
  },
};
</script>