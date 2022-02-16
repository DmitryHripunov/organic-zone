<template>
  <div style="width: 100%">
    <div class="popup__group">
      <div class="title title_h3 title_indent-sm"
        :class="{'title_danger': submitStatus === false }"
      >
        <span v-if="submitStatus === true">
          Ваш платёж выполнен!
        </span>

        <span v-else>
          Платеж не выполнен!
        </span>
      </div>
    </div>

    <div class="popup__group">
      <p class="popup__desc" v-if="submitStatus === true">
          Спасибо за заказ!
      </p>

      <p class="popup__desc" v-else v-for="(error, index) in errorsSubmit[0]" :key="error[index]">
        <!-- Убедитесь в корректности введённых данных или обратитесь в ваш банк. -->
        {{ error[0] }}
      </p>
    </div>

    <div class="popup__group">
      <button class="btn btn_primary"
        @click="closePopup"    
      >
        Хорошо
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['open', 'submitStatus', "errorsSubmit"],

  methods: {
    closePopup() {
      this.$emit('update:open', false);
      document.body.style.paddingRight = '';
      document.body.classList.remove('no-scrolling');
    }
  }
};
</script>