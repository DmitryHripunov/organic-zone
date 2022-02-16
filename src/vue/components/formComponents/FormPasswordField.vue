<template >
  <div class="form__group"
      :class="{
      'has-error': v.$error,
    }"
  >
    <label class="form__label form__label_block"
      v-if="label"
    >
      {{ label }}
      <span class="form__label-decor">*</span>
    </label>

    <input
      type="password"
      class="form__input"
      placeholder="Пароль"
      @blur="v.$touch()"
      :name="nameserv"
      v-model.trim="v.$model"
    />

    <span class="help-text" v-if="v.$error">Обязательное поле</span>

    <span class="form__password-icon"
      :class="{'is-active': password.length > 0}"
      v-if="icon"
      @click="switchVisibility"
    >
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    v: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      default: "",
    },
    nameserv: {
      type: String,
      default: "",
    },
    icon: Boolean,
    registration: Boolean,
  },

  computed: {
    name: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    passwordBlur() {
      this.v.$touch()
    }
  },
}
</script>