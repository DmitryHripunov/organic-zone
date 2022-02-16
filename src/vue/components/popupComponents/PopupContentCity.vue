<template>
  <div>
     <div class="popup__group">
      <SearchCities />
     </div>

    <div class="popup__group">
      <ul class="popup__hashtags-list">
        <li class="popup__hashtags-item">Москва</li>
        <li class="popup__hashtags-item">Санкт-Петербург</li>
        <li class="popup__hashtags-item">Новосибирск</li>
        <li class="popup__hashtags-item">Екатеринбург</li>
        <li class="popup__hashtags-item">Казань</li>
        <li class="popup__hashtags-item">Нижний Новгород</li>
        <li class="popup__hashtags-item">Самара</li>
        <li class="popup__hashtags-item">Владивосток</li>
      </ul>
    </div>

    <div class="popup__group popup__group_end">
      <button class="btn btn_secondary btn_word-wrap">
        Выбрать
      </button>
    </div>
  </div>
</template>

<script>
import SearchCities from "../searchComponents/SearchCities.vue";

export default {
  components: { SearchCities },
};
</script>