<template>
  <div style="width: 100%">
    <div class="popup__group">
      <p class="popup__desc">
        Мы отправили код подтверждения на номер: <br />
        {{ phoneNumber }}
      </p>
    </div>

    <Promo
      :open.sync="isOpen"
      :tel="phoneNumber"
      @code-confirm="emitCodeConfirm($event)"
      @code-repeat="codeRepeat"
    />
  </div>
</template>

<script>
  import Promo from '../services/Promo.vue'

  export default {
    props: ["phoneNumber", "open"],

    components: { Promo },

    computed: {
      isOpen: {
        get() {
          return this.open;
        },
        set() {
          this.$emit('update:open', false);
        },
      },
    },
    methods: {
      emitCodeConfirm($event) {
        this.$emit('code-confirm', $event);
      },
      codeRepeat() {
        this.$emit('code-repeat');
      },
    },
  };
</script>
