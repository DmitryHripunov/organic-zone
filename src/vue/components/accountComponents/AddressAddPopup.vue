<template>
  <div class="popup__wrapper">
    <div class="popup__top">
      <h3 class="title title_h3 title_indent-sm">Добавьте адрес доставки</h3>

      <button class="popup__close js-close-popup"></button>
    </div>

    <div class="popup__group" >
      <form class="form"
        @submit.prevent="submitNewAddress"
        @keydown.enter.prevent="returnFalse"
      >
        <div class="form__group">
          <FormInputField
            v-model="city"
            :v="$v.city"
            :placeholder="cityPlaceholder"
            :type="typeText"
            nameserv="Order[city]"
          />
        </div>

        <div class="form__group">
          <FormInputField
            v-model="index"
            :placeholder="indexPlaceholder"
            :type="typeNumber"
            :v="$v.index"
            nameserv="Order[index]"
          />
        </div>

        <div class="form__group">
          <FormInputField
            v-model="street"
            :v="$v.street"
            :placeholder="streetPlaceholder"
            :type="typeText"
            nameserv="Order[street]"
          />
        </div>

        <div class="form__group">
          <FormInputField
            v-model="buildingNumber"
            :v="$v.buildingNumber"
            :placeholder="buildingNumberPlaceholder"
            :type="typeText"
            nameserv="Order[buildingNumber]"
          />
        </div>

        <div class="form__group">
          <FormInputField
            v-model="apartmentNumber"
            :v="$v.apartmentNumber"
            :placeholder="apartmentNumberPlaceholder"
            :type="typeText"
            nameserv="Order[apartmentNumber]"
          />
        </div>

        <div class="form__group">
          <button class="btn btn_primary btn_fit">
            Сохранить новый адрес
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import FormInputField from "../formComponents/FormInputField.vue";
import { mapActions } from "vuex";
import closePopup from "../../helpers/closePopup";

export default {
  components: { FormInputField },
  data() {
    return {
      city: "",
      index: "",
      street: "",
      buildingNumber: "",
      apartmentNumber: "",
      id: 3,

      cityPlaceholder: "Город, регион",
      indexPlaceholder: "Индекс",
      streetPlaceholder: "Улица",
      buildingNumberPlaceholder: "Дом, строение, корпус",
      apartmentNumberPlaceholder: "Квартира, офис",

      typeText: 'text',
      typeNumber: 'number',
    }
  },

  validations: {
    city: { required },
    street: { required, minLength: minLength(3) },
    buildingNumber: { required, minLength: minLength(3) },
    index: {},
    apartmentNumber: {},
  },

  methods: {
    ...mapActions('account', ['submitAddress']),

    submitNewAddress() {
      this.$v.$touch();
      if (this.$v.$error) {
          console.log(this.$v.$error);
          return;
      } else {
        this.submitAddress({
          id: this.id,
          city: this.city,
          index: this.index,
          street: this.street,
          buildingNumber: this.buildingNumber,
          apartmentNumber: this.apartmentNumber,
        });
        closePopup("address-add");
        window.location.reload();
      }
    },

    returnFalse() {
      return false;
    },
  }
}
</script>