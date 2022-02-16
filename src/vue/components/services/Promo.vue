<template>
  <div>
    <div class="popup__group">
      <div class="form">
        <div
          class="form__group"
          :class="{
            'has-error': errors,
          }"
        >
          <input
            class="form__input"
            type="text"
            placeholder="Введите код"
            v-model.trim="setPromo"
            :maxlength="maxlength"
            autocomplete="off"
          />
          <div v-for="(error, index) in errors" :key="index" class="help-text">
            {{ error }}
          </div>
        </div>

        <div class="form__group" v-show="currentTime === 0">
          <a
            @click.prevent="sendCodeRepeat"
            class="btn btn_secondary btn_fit js-change-content-btn"
          >
            Получить повторно
          </a>
        </div>
      </div>
    </div>

    <div class="popup__group">
      <p class="popup__desc">
        Получить новый код можно через <span>0 : {{ currentTime }} c.</span>
      </p>
    </div>

    <div class="form__group" v-if="isActivePromo">
      <p class="popup__desc">код подтвержден</p>
    </div>
  </div>
</template>

<script>
  import { required, minLength } from "vuelidate/lib/validators";
  import closePopup from '../../helpers/closePopup';

  const START_TIME = 60;
  const PROMO = 'admin';

  export default {
    props: ['open', 'tel', 'isReload'],
    data() {
      return {
        currentTime: START_TIME,
        timer: null,
        promo: '',
        isActivePromo: false,
        maxlength: 6,
        errors: null,
      };
    },

    computed: {
      setPromo: {
        get() {
          return this.promo;
        },
        set(value) {
          this.promo = value;
          if (value !== PROMO) return;

          this.$emit('update:open', false);
          closePopup('log-in');
        },
      },
    },

    methods: {
      startTimer() {
        if (this.currentTime <= 1) {
          this.currentTime = START_TIME;
        }
        this.timer = setInterval(() => {
          this.currentTime--;
        }, 1000);
      },
      stopTimer() {
        clearInterval(this.timer);
      },
      async login() {
        const response = await Vue.axios.post('/site/login/', {
          LoginForm: { code: this.promo, phone: this.tel },
        });
        if (response.data.success) {
          this.errors = null;
          if (this.isReload) {
            window.location.assign('/');
          } else {
            this.$emit('update:open', false);
            closePopup('log-in');
            this.$emit('code-confirm', this.promo);
          }
        } else {
          this.errors = response.data.errors.login;
        }
      },
      sendCodeRepeat() {
        this.$emit('code-repeat');
        this.startTimer();
      },
    },
    validations: {
      code: { required, minLength: minLength(6) },
    },
    watch: {
      currentTime(time) {
        if (time === 0) {
          this.stopTimer();
        }
      },
      promo() {
        if (this.promo.length === this.maxlength) {
          this.login();
        }
      },
    },
    mounted() {
      this.startTimer();
    },
    destroyed() {
      this.stopTimer();
    },
  };
</script>
