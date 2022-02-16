<template>
  <div class="form">
    <div class="form__group">
      <button type="submit" class="form__search-btn">
        <svg class="icon icon_size-24 icon_color-gray">
          <use xlink:href="#search"></use>
        </svg>
      </button>

      <input 
        v-model="city"
        type="search" 
        class="form__input js-focus-input" 
        placeholder="Поиск города"
        id="suggest-popup"
        @focus="suggestView.state.unfreeze()"
      >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        city: '',
        suggestView: null,
      };
    },

    methods: {
      suggestionList() {
        this.suggestView = new ymaps.SuggestView('suggest-popup', {
          results: 3,
          offset: [0, 0],
        });

        this.suggestView.events.add("select", (e) => {
          const cityInfo = e.get("item").displayName.split(',');
          const index = 0;
          this.city = cityInfo[index];
          this.$emit('city-select', this.city);
          this.suggestView.state.freeze();
        });
      },
    },
    created() {
      ymaps.ready(this.suggestionList);
    },
  };
</script>
