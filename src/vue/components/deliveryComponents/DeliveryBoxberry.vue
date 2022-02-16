<template>
  <div class="order__delivery-info">
    <div class="order__delivery-conditions">
      <span class="order__delivery-price" v-if="boxberry">
        {{ boxberry.price ? boxberry.price : 0 | numberFormat }} руб
      </span>

      <span class="order__delivery-date" v-if="boxberry">
        {{ boxberry.period ? boxberry.period : "срок неизвестен" }}
      </span>
    </div>

    <button
      @click.prevent="boxBerryCallback"
      class="order__delivery-btn btn btn_primary btn_tiny"
    >
      Выбрать пункт выдачи
    </button>

    <div class="order__delivery-address" v-if="boxberry">
      {{ boxberry.address }}
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import numberFormat from "../../helpers/numberFormat.js";

  export default {
    props: ['address'],
    data() {
      return {
        boxberry: null,
      };
    },
    computed: {
      ...mapGetters('user', ['userCity']),
    },
    methods: {
      ...mapActions('delivery', ['changeDeliveryItem']),

      getBoxberry(result) {
        if (result) {
          this.boxberry = result;
          this.$emit('update:address', result.address);
          this.changeDeliveryItem(result);
        }
      },

      boxBerryCallback() {
        boxberry.open(this.getBoxberry, '', this.userCity);
      },
    },

    filters: {
      numberFormat,
    },
  };
</script>
