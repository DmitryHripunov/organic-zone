<template>
  <div class="popup popup_fill" id="choice-city">
    <div class="popup__wrapper">
      <div class="popup__top">
        <h3 class="title title_h3 title_indent-sm">Ваш город</h3>

        <button class="popup__close js-close-popup"></button>
      </div>

      <div class="popup__group">
        <search-cities
          ref="searchCities"
          @city-select="citySelect($event)"
        ></search-cities>
      </div>

      <div class="popup__group">
        <ul class="popup__hashtags-list">
          <li @click="setCity('Москва')" class="popup__hashtags-item">
            Москва
          </li>
          <li @click="setCity('Санкт-Петербург')" class="popup__hashtags-item">
            Санкт-Петербург
          </li>
          <li @click="setCity('Новосибирск')" class="popup__hashtags-item">
            Новосибирск
          </li>
          <li @click="setCity('Екатеринбург')" class="popup__hashtags-item">
            Екатеринбург
          </li>
          <li @click="setCity('Казань')" class="popup__hashtags-item">
            Казань
          </li>
          <li @click="setCity('Нижний Новгород')" class="popup__hashtags-item">
            Нижний Новгород
          </li>
          <li @click="setCity('Самара')" class="popup__hashtags-item">
            Самара
          </li>
          <li @click="setCity('Владивосток')" class="popup__hashtags-item">
            Владивосток
          </li>
        </ul>
      </div>

      <div class="popup__group popup__group_end">
        <button
          @click="onUpdateCity"
          type="button"
          class="btn btn_secondary btn_word-wrap"
        >
          Выбрать город
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import SearchCities from '../searchComponents/SearchCities.vue';

  export default {
    components: {
      SearchCities,
    },
    data() {
      return {
        inputCity: '',
      };
    },
    methods: {
      ...mapActions('user', ['updateCity']),
      citySelect(city) {
        this.inputCity = city;
      },
      setCity(city) {
        this.inputCity = city;
        this.$refs.searchCities.suggestView.state.freeze();
        this.$refs.searchCities.city = city;
      },
      onUpdateCity() {
        this.updateCity({ city: this.inputCity });
        $('.js-close-popup').click();
      },
    },
  };
</script>
