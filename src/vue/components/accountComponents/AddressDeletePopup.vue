<template >
  <div>
    <div class="popup__group">
      <p class="popup__desc">
        Вы точно хотите удалить выбранный адрес? Отменить действие будет невозможно
      </p>
    </div>

    <div class="popup__group">
      <button @click.prevent="doDeleteAddress" class="btn btn_primary">Удалить</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import closePopup from '../../helpers/closePopup';

export default {
  methods: {
    ...mapActions('account', ['deleteAddress']),
    doDeleteAddress() {
      this.deleteAddress();
      closePopup('address-delete');
    }
  },
};
</script>