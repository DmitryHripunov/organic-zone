<template>
  <div
    class="popup__wrapper popup__wrapper_content"
    :class="{ 'is-promo': currentLogIn === 'LogInPromo' }"
  >
    <div class="popup__top">
      <h3 class="title title_h3 title title_indent-sm">Введите код</h3>
      <button class="popup__close js-close-popup"></button>
    </div>

    <div class="popup__group">
      <p class="popup__desc">
        Мы отправили код подтверждения на номер:
        <br />
        {{ phoneNumber }}

        <a class="popup__colored-link" @click.prevent="setMain"> Изменить </a>
      </p>
    </div>

    <div class="popup__group" v-if="currentLogIn === 'LogInPromo'">
      <Promo :tel="phoneNumber" :is-reload="true" @code-repeat="codeRepeat" />
    </div>

    <!-- <div class="popup__group">
      <div class="popup__group-separator">
        <a @click.prevent="setEmail" class="popup__action">
          Войти по почте
        </a>
      </div>
    </div> -->
  </div>
</template>

<script>
  import Promo from '../services/Promo.vue'

  export default {
    props: ['currentLogIn', 'phoneNumber'],

    components: { Promo },

    methods: {
      setEmail() {
        this.$emit('update:currentLogIn', 'LogInEmail');
      },
      setMain() {
        this.$emit('update:currentLogIn', 'LogInMain');
      },
      codeRepeat() {
        this.$emit('code-repeat');
      },
    },

  };
</script>

<style>
  .is-promo {
    display: block;
  }
</style>
