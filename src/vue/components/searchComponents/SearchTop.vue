<template>
  <div class="search-top js-search-form">
    <form class="search-top__form" method="GET" action="/search/">
      <vue-simple-suggest
        v-model="phrase"
        :list="suggestionList"
        @select="onSuggestSelect"
        :max-suggestions="4"
        :debounce="200"
        :min-length="3"
        :styles="autoCompleteStyle"
        ref="suggest"
        name="phrase"
      >
        <button
          class="search-top__mobile-btn js-search-top-btn hidden-desktop"
          type="button"
        >
          <svg class="icon icon_size-24 search-top__icon">
            <use class="js-search-svg" xlink:href="#search"></use>
          </svg>
        </button>

        <button type="submit" class="search-top__btn">
          <svg class="icon icon_size-24 search-top__icon">
            <use xlink:href="#search"></use>
          </svg>
        </button>

        <input
          class="search-top__input"
          type="search"
          placeholder="Искать на OrganicZone"
          name="phrase"
          autocomplete="off"
          :is-visible="true"
          ref="input"
        />

        <div slot="misc-item-above">
          <h3 class="title title_h4 suggestions__heading" v-if="count === 0">
            По вашему запросу ничего не найдено
          </h3>

          <h3 class="title title_h4 suggestions__heading title_indent-m" v-else>
            Результаты по каталогу
          </h3>

          <template v-if="dataCategory.length > 0 && count > 0">
            <a
              class="search-top__item search-top__item_link"
              :href="item.href"
              v-for="item in dataCategory"
              :key="item.id"
              @focus.stop="setLink(item.href)"
            >
              <svg class="icon icon_color-dark icon_mr-16 icon_size-16">
                <use xlink:href="#search"></use>
              </svg>

              {{ item.category_title }}

              <svg class="icon icon_color-dark icon_ml-16 icon_size-12">
                <use xlink:href="#arrow-right"></use>
              </svg>
            </a>
          </template>
        </div>

        <a
          class="search-top__item"
          slot="suggestion-item"
          slot-scope="{ suggestion }"
          :href="suggestion.href"
          v-if="count > 0"
        >
          <img
            :src="suggestion.src"
            :alt="suggestion.title"
            class="suggestions__img"
          />

          <div class="suggestions__title">
            {{ suggestion.title }}
          </div>

          <div class="suggestions__price">
            {{ suggestion.price }}

            <svg class="icon icon_color-dark icon_size-12">
              <use xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </a>

        <div slot="misc-item-below" class="suggestions__heading">
          <a
            @focus.stop="setLink(pathShowAll)"
            class="search-top__link-suggestion"
            :href="pathShowAll"
            v-if="count > 0"
          >
            Все результаты ({{ count }})

            <svg class="icon icon_color-primary icon_ml-16 icon_size-12">
              <use xlink:href="#arrow-right"></use>
            </svg>
          </a>

          <div class="suggestions__heading" v-else>
            Попробуйте изменить формулировку или воспользуйтесь нашим
            <a
              @focus.stop="setLink('/catalog/')"
              class="search-top__link-suggestion"
              href="/catalog/"
            >
              каталогом

              <svg class="icon icon_color-primary icon_ml-16 icon_size-12">
                <use xlink:href="#arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </vue-simple-suggest>
    </form>
  </div>
</template>

<script>
  import VueSimpleSuggest from 'vue-simple-suggest';

  const mockData = {
    results: [
      {
        title: 'Крем для лица для жирной и проблемной кожи',
        src: '/img/product-2.png',
        href: '/product/96319/',
        price: '329 ₽',
        id: 1,
      },
      {
        title: 'Гель для лица с эффектом абсорбции и деток Гель для лица с эффектом абсорбции и деток',
        src: '/img/product-1.jpg',
        price: '499 ₽',
        href: '/product/96319/',
        id: 2,
      },
      {
        title: 'Гиалуроновая сыворотка для лица для жирной кожи',
        src: '/img/product-2.png',
        price: '313 ₽',
        href: '/product/96319/',
        id: 3,
      },
      {
        title: 'Тоник для лица с АНА-кислотами для нормальной',
        src: '/img/product-2.png',
        price: '499 ₽',
        href: '/product/96319/',
        id: 4,
      },
    ],

    category: [
      {
        category_title: 'Для лица',
        id: 1,
      },
      {
        id: 2,
        category_title: 'Декоративная косметика'
      }
    ],
    count: 3,
  }

  export default {
    components: {
      VueSimpleSuggest,
    },

    data() {
      return {
        phrase: '',
        isLoading: false,
        count: null,
        error: null,
        dataCategory: [],

        autoCompleteStyle: {
          miscItemAbove: 'suggest-item',
          miscItemBelow: 'suggest-item',
        },
      };
    },

    watch: {
      isVisible(val) {
        if (val) {
          this.$refs.input.focus();
        }
      },
    },

    computed: {
      pathShowAll() {
        return `/search/?phrase=${this.phrase}`;
      },
    },

    methods: {
      async suggestionList() {
        this.isLoading = true;
        this.count = null;
        this.error = null;

        try {
          const response = await Vue.axios.get(`/api/search/?phrase=${this.phrase}`);

          this.dataCategory = response.data.category;
          this.count = response.data.count;
          return response.data.results;
        } catch (err) {
          console.error(err); // eslint-disable-line
          this.error = err.response.data.message || 'Потеряна связь с сервером';
        } finally {
          this.isLoading = false;
        }

        this.count = 0;
        return [];
        // this.dataCategory = mockData.category
        // this.count = mockData.count;
        // return mockData.results;
      },
      setLink(href) {
        window.location.assign(href);
      },
      onSuggestSelect({ href }) {
        window.location.href = href;
      },
    },
  };
</script>
