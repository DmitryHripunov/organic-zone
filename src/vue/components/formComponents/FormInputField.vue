<template>
  <div
    class="form__group"
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
      :type="type"
      class="form__input"
      :placeholder="placeholder"
      v-model.trim="v.$model"
      :name="nameserv"
      @blur="v.$touch()"
    />

    <span class="help-text" v-if="v.$error">Обязательное поле</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    v: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    nameserv: {
      type: String,
      default: "",
    },
  },
  computed: {
    name: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
