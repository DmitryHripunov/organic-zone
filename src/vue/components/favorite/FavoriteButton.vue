<template>
  <div :class="{ 'product-page__feature-item': isMode('product-page') }">
    <button
      v-if="isMode('card__favorite')"
      type="button"
      class="card__favorite-btn"
      :class="{ 'is-active': isExist(productId) }"
      @click="updateFavoriteQuantity({ productId: productId })"
    >
      <svg class="card__favorite-svg icon icon_color-gray icon_size-20">
        <use v-if="isExist(productId)" xlink:href="#heart_fill"></use>
        <use v-else xlink:href="#heart"></use>
      </svg>
    </button>

    <!-- card-mini -->
    <button
      v-if="isMode('card-mini')"
      type="button"
      class="card-mini__favorite-btn"
      :class="{ 'is-active': isExist(productId) }"
      @click="updateFavoriteQuantity({ productId: productId })"
    >
      <svg class="card-mini__favorite-svg icon icon_color-gray icon_size-20">
        <use v-if="isExist(productId)" xlink:href="#heart_fill"></use>
        <use v-else xlink:href="#heart"></use>
      </svg>
    </button>

    <!-- product-page -->
    <button
      v-if="isMode('product-page')"
      class="product-page__feature-item"
      type="button"
      :class="{ 'is-active': isExist(productId) }"
      @click="updateFavoriteQuantity({ productId: productId })"
    >
      <svg class="icon icon_color-gray icon_block product-page__feature-svg">
        <use v-if="isExist(productId)" xlink:href="#heart_fill"></use>
        <use v-else xlink:href="#heart"></use>
      </svg>

      <span class="product-page__feature-icon-text hidden-mobile">
        Добавить в избранное
      </span>
    </button>

    <!-- basket -->
    <button
      v-if="isMode('basket')"
      type="button"
      class="basket__btn-delete basket__btn-delete_fav"
      :class="{ 'is-active': isExist(productId) }"
      @click="updateFavoriteQuantity({ productId: productId })"
    >
      <svg class="icon icon_color-dark icon_size-16">
        <use v-if="isExist(productId)" xlink:href="#heart_fill"></use>
        <use v-else xlink:href="#heart"></use>
      </svg>
      <span class="hidden-mobile"> В избранное </span>
    </button>

    <!-- basket-drop-down -->
    <button
      v-if="isMode('basket-drop-down')"
      type="button"
      class="basket__btn-delete basket__btn-delete_fav"
      :class="{ 'is-active': isExist(productId) }"
      @click="updateFavoriteQuantity({ productId: productId })"
    >
      <svg class="icon icon_color-dark icon_size-16">
        <use v-if="isExist(productId)" xlink:href="#heart_fill"></use>
        <use v-else xlink:href="#heart"></use>
      </svg>
    </button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: {
      showMode: {
        type: String,
        default: 'card__favorite',
      },
      productId: {
        type: Number,
      },
    },
    computed: {
      ...mapGetters('favorite', ['favoriteKeys']),
    },
    methods: {
      ...mapActions('favorite', ['updateFavoriteQuantity']),
      isMode(type) {
        return this.showMode === type;
      },
      isExist(productId) {
        if (!productId) return false;

        const keys = this.favoriteKeys;
        return keys.indexOf(productId.toString()) !== -1;
      },
    },
  };
</script>

