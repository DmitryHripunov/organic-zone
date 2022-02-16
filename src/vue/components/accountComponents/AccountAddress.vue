<template>
  <div class="account__body">
    <ul class="account__body-list"  v-if="this.getAddress && this.getAddress.length">
      <li
        class="account__body-item"
        v-for="item in this.getAddress"
        :key="item.id"
        
      >
        <h4 class="title title_h4 title_indent-16">
          {{ item.city }}
        </h4>

        <div class="account__info-group">
          <div class="account__text">
            {{ item.index }}, {{ item.street }}
            <span v-if="item.buildingNumber">, д.</span>
            {{ item.buildingNumber }}
            <span v-if="item.apartmentNumber">кв.</span>
            {{ item.apartmentNumber }}
          </div>
        </div>

        <div class="account__info-group account__info-group_actions">
          <a 
            @click="doSelectAddress(item.id)"
            href="#"
            data-target="#address-change"
            class="account__action js-open-popup"
            >
            Изменить
          </a>

          <a
            @click="doSelectAddress(item.id)"
            href="#"
            data-target="#address-delete"
            class="account__action js-open-popup"
          >
            Удалить
          </a>
        </div>
      </li>

      <li class="account__body-item">
        <button class="btn btn_secondary js-open-popup"
          data-target="#address-add"
        >
        Добавить адрес
      </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      currentAddress: [],
    }
  },

  computed: {
    ...mapGetters("account", ["accountDetails"]),

    getAddress() {
      return this.accountDetails.address
    }
  },

  methods: {
    ...mapActions('account', ['selectedAddress']),

    doSelectAddress(id) {
      this.selectedAddress(id);
    },
  },
};
</script>