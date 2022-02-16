<template>
  <div>
    <div
      class="popup popup_tiny confirm-city js-confirm-city"
      id="confirm-city"
    >
      <div class="popup__wrapper">
        <div class="popup__top">
          <h3 class="title title_h4 title_indent-16">
            Ваш город {{ userCity }}?
          </h3>

          <button class="popup__close js-close-confirm-city"></button>
        </div>

        <div class="popup__buttons">
          <button
            type="button"
            class="
              btn btn_primary btn_tiny btn_indent-right
              js-close-confirm-city
            "
            @click="onUpdateCity"
          >
            Да
          </button>
          <button
            type="button"
            class="btn btn_secondary btn_tiny js-open-popup"
            data-target="#choice-city"
          >
            Выбрать город
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters('user', ['userCity', 'cookieUserCity']),
    },
    methods: {
      ...mapActions('user', ['updateCity']),
      onUpdateCity() {
        this.updateCity({ city: this.userCity });
      },
    },
    mounted() {
      if (!this.cookieUserCity) {
        const questionCity = document.getElementById('confirm-city');
        questionCity.classList.add('is-opened');
      }
    },
  };
</script>
