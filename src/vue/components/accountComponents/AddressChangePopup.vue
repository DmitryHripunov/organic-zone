<template >
  <div class="popup__wrapper">
    <div class="popup__top">
      <h3 class="title title_h3 title_indent-sm">Изменить адрес доставки</h3>

      <button class="popup__close js-close-popup"></button>
    </div>

    <div class="popup__group" >
      <form class="form" @submit.prevent="submitChangeAddress">
        <div class="form__group">
          <input 
            class="form__input"
            type="text"
            :placeholder="
              this.oldData.city ? this.oldData.city : 'Город, регион'
            "
            v-model="cityChange"
          />
        </div>

        <div class="form__group">
          <input
            class="form__input"
            type="text"
            :placeholder="this.oldData.index ? this.oldData.index : 'Индекс'"
            v-model="indexChange"
          />
        </div>

        <div class="form__group">
          <input
            class="form__input"
            type="text"
            :placeholder="this.oldData.street ? this.oldData.street : 'Улица'"
            v-model="streetChange"
          />
        </div>

        <div class="form__group">
          <input
            class="form__input"
            type="text"
            :placeholder="
              this.oldData.buildingNumber
                ? this.oldData.buildingNumber
                : 'Дом, строение, корпус'
            "
            v-model="buildingNumberChange"
          />
        </div>

        <div class="form__group">
          <input
            class="form__input"
            type="text"
            :placeholder="
              this.oldData.apartmentNumber
                ? this.oldData.apartmentNumber
                : 'Квартира, офис'
            "
            v-model="apartmentNumberChange"
          />
        </div>

        <div class="form__group">
          <button class="btn btn_primary btn_fit">
            Именить адрес
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import closePopup from "../../helpers/closePopup";

export default {
  data() {
    return {
      city: "",
      index: "",
      street: "",
      buildingNumber: "",
      apartmentNumber: "",
    };
  },
  computed: {
    ...mapGetters("account", ["accountDetails"]),

    oldData() {
      return this.accountDetails.selectedAddress[0]
        ? this.accountDetails.selectedAddress[0]
        : [];
    },

    cityChange: {
      get() {
        return this.city;
      },
      set(value) {
        this.city = value;
      },
    },
    indexChange: {
      get() {
        return this.index;
      },
      set(value) {
        this.index = value;
      },
    },
    streetChange: {
      get() {
        return this.street;
      },
      set(value) {
        this.street = value;
      },
    },
    buildingNumberChange: {
      get() {
        return this.buildingNumber;
      },
      set(value) {
        this.buildingNumber = value;
      },
    },
    apartmentNumberChange: {
      get() {
        return this.apartmentNumber;
      },
      set(value) {
        this.apartmentNumber = value;
      },
    },
  },

  methods: {
    ...mapActions("account", ["changeAddress"]),

    submitChangeAddress() {
      this.changeAddress({
        city: this.city,
        index: this.index,
        street: this.street,
        buildingNumber: this.buildingNumber,
        apartmentNumber: this.apartmentNumber,
      });
      closePopup("address-change");
      this.city = "";
      this.index = "";
      this.street = "";
      this.buildingNumber = "";
      this.apartmentNumber = "";
    },
  },
 
};
</script>
