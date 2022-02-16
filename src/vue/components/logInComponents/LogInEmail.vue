<template>
  <div
    class="popup__wrapper popup__wrapper_content"
    :class="{ 'is-email': currentLogIn === 'LogInEmail' }"
  >
    <div class="popup__top">
      <h3 class="title title_h3 title title_indent-sm">Войдите по почте</h3>
      <button class="popup__close js-close-popup"></button>
    </div>

    <div class="popup__group">
      <p class="popup__desc">Только для зарегистрированных пользователей</p>
    </div>

    <div class="popup__group">
      <div class="form">
          <FormInputField
            v-model="email"
            :v="$v.email"
            :placeholder="emailPlaceholder"
            :type="typeEmail"
            nameserv="#"
          />

          <FormPasswordField
            v-model="password"
            :v="$v.password"
            nameserv="#"
          />

        <div class="form__group">
          <a href="#" @click.prevent="submitHandler" class="btn btn_primary btn_fit"> Войти </a>
        </div>
      </div>
    </div>

    <div class="popup__group">
      <div class="popup__group-separator">
        <a @click.prevent="setMain" class="popup__action">
          Вернуться на главный экран
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import closePopup from '../../helpers/closePopup';
import { required, email, minLength } from 'vuelidate/lib/validators';
import FormInputField from '../formComponents/FormInputField.vue';
import FormPasswordField from '../formComponents/FormPasswordField.vue';

export default {
  props: ['currentLogIn'],
  components: { FormInputField, FormPasswordField },

  data() {
    return {
      email: '',
      emailPlaceholder: 'Электронная почта',
      typeEmail: 'email',

      password: '',

      submitStatus: false,
    };
  },

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(4) }
  },

  methods: {
    setMain() {
      this.$emit('update:currentLogIn', 'LogInMain');
    },
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        console.log('ERROR');
        return;
      }
      console.log('OK');
      closePopup('log-in');
    }
  },
};
</script>

<style>
.is-email {
  display: block;
}
</style>