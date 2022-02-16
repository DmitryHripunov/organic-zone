<template>
  <div>
    <div class="popup__group">
      <p class="popup__desc">
        Вы точно хотите удалить выбранные товары?
        <!-- Отменить действие будет невозможно -->
      </p>
    </div>

    <div class="popup__group">
      <button @click.prevent="deleteCheckedProducts" class="btn btn_primary">Удалить</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ['open'],
  methods: {
    ...mapActions("basket", ["deleteProductsFromBasket"]),
    
    deleteCheckedProducts() {
      this.deleteProductsFromBasket();
      document.body.style.paddingRight = '';
      document.body.classList.remove('no-scrolling');
      this.$emit('update:open', false);
    },
  },
};
</script>