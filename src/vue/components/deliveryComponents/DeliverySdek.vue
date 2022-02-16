<template>
  <div class="order__delivery-info">
    <div class="order__delivery-conditions">
      <span class="order__delivery-price" v-if="sdek">
        <!-- {{ currentDeliveryDetail.price | numberFormat }} руб -->
      </span>

      <span class="order__delivery-date" v-if="sdek">
        <!-- {{ currentDeliveryDetail.date }} -->
        </span>
    </div>

    <button class="order__delivery-btn btn btn_primary btn_tiny"
      @click.prevent="sdekCallback"
    >
      Выбрать пункт выдачи
    </button>

    <div class="order__delivery-address" v-if="sdek">
      <!-- {{ currentDeliveryDetail.address }} -->
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import numberFormat from "../../helpers/numberFormat.js";

  export default {
    data() {
      return {
        sdek: null,
      };
    },

    methods: {
      ...mapActions('delivery', ['changeDeliveryItem']),

      getSdek() {
        const sdek = new ISDEKWidjet ({
                defaultCity: 'Новосибирск', //какой город отображается по умолчанию
                cityFrom: 'Омск', // из какого города будет идти доставка
                country: 'Россия', // можно выбрать страну, для которой отображать список ПВЗ
                link: 'forpvz', // id элемента страницы, в который будет вписан виджет
                path: 'https://widget.cdek.ru/widget/scripts/', //директория с библиотеками
                servicepath: 'http://yoursite.net/service.php' //ссылка на файл service.php на вашем сайте
            });

        return sdek;
      },

      sdekCallback() {
        this.getSdek();
      }
    },

    filters: {
      numberFormat,
    },
  };
</script>