<template>
  <div
    class="popup__wrapper popup__wrapper_content"
    :class="{ 'is-main': currentLogIn === 'LogInMain' }"
  >
    <div class="popup__top">
      <h3 class="title title_h3 title title_indent-sm">
        Войдите или зарегистрируйтесь
      </h3>
      <button class="popup__close js-close-popup"></button>
    </div>

    <div class="popup__group popup__group_center">
      <form class="form">
        <div
          class="form__group"
          :class="{
            'has-error': $v.tel.$error || errors,
          }"
        >
          <input
            type="tel"
            class="form__input"
            placeholder="Телефон"
            v-model.trim="$v.tel.$model"
            nameserv="Order[tel]"
            :ref="phone && 'phone'"
          />
          <div v-for="(error, index) in errors" :key="index" class="help-text">
            {{ error }}
          </div>
        </div>

        <div class="form__group">
          <a @click.prevent="setPromo" class="btn btn_primary btn_fill">
            Получить код
          </a>
        </div>
      </form>
    </div>

    <div class="popup__group">
      <div class="popup__group-separator">Или</div>
    </div>

    <div class="popup__group">
      <div class="form">
        <div class="form__group">
          <a href="#" class="popup__action popup__action_bordered">
            <svg class="icon icon_mr-8 icon_size-32">
              <use xlink:href="#chrome"></use>
            </svg>
            Вход через Google
          </a>
        </div>

        <div class="form__group">
          <a href="#" class="popup__action popup__action_bordered">
            <svg class="icon icon_mr-8 icon_size-32">
              <use xlink:href="#vk"></use>
            </svg>
            Вход через ВКонтакте
          </a>
        </div>

        <div class="form__group">
          <a href="#" class="popup__action popup__action_bordered">
            <svg class="icon icon_mr-8 icon_size-32">
              <use xlink:href="#fb"></use>
            </svg>
            Вход через Facebook
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { required, minLength } from "vuelidate/lib/validators";
  import Inputmask from "inputmask";

  export default {
    props: ['currentLogIn', 'phoneNumber'],
    data() {
      return {
        tel: "",
        phone: true,
        errors: null,
      };
    },
    validations: {
      tel: { required, minLength: minLength(18) },
    },

    methods: {
      async setPromo() {
        this.$v.$touch();
        if (this.$v.$error) return;

        const response = await Vue.axios.post('/api/login/send-code/', {
          LoginForm: { phone: this.tel },
        });

        if (response.data.success) {
          this.$emit('update:phoneNumber', this.tel);
          this.$emit('update:currentLogIn', 'LogInPromo');
        } else {
          this.errors = response.data.errors.phone;
        }
      },
      // setEmail() {
      //   this.$emit('update:currentLogIn', 'LogInEmail');
      // },
    },

    mounted() {
      if (this.phone) {
        const im = new Inputmask("+7 (999) 999 99 99", {
          placeholder: " ",
        });

        im.mask(this.$refs.phone);
      }
    },
  };
</script>

<style>
  .is-main {
    display: block;
  }
</style>
