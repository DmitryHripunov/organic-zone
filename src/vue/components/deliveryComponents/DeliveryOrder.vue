<template>
  <form
    class="form"
    @submit.prevent="submit"
    @keydown.enter.prevent="returnFalse"
  >
    <div class="grid__wrapper grid__wrapper_revers-inner">
      <div class="grid__aside grid__aside_revers-inner basket">
        <div class="basket__info">
          <h3 class="title title_h3 title_indent-sm">Ваш заказ</h3>

          <BasketInfo :showWeight="showWeight" :showDelivery="showDelivery" />

          <button type="submit" class="btn btn_primary btn_fill">
            Перейти к оплате
          </button>
        </div>
      </div>

      <div class="grid__main grid__main_revers-inner">
        <div class="order">
          <ol class="order__list">
            <li class="order__item">
              <div class="order__step-title">Регион доставки</div>

              <div class="order__step-content">
                <label class="form__label form__label_block">
                  Укажите свой город
                  <span class="form__label-decor">*</span>
                </label>

                <div
                  class="form__group"
                  :class="{
                    'has-error': $v.searchCities.$error,
                  }"
                >
                  <button type="button" class="form__search-btn">
                    <svg class="icon icon_size-24 icon_color-gray">
                      <use xlink:href="#search"></use>
                    </svg>
                  </button>

                  <input
                    type="search"
                    name="Order[city]"
                    class="form__input js-focus-input"
                    placeholder="Поиск города"
                    id="suggest"
                    v-model.trim="$v.searchCities.$model"
                    @focus="onFocusSearchCities"
                  />

                  <span class="help-text" v-if="$v.searchCities.$error"
                    >Обязательное поле</span
                  >
                </div>
                <!-- Лишняя кнопка выбора города, пользователь может изменить город в поле города
                средствами yandex.suggest
                <div class="form__group">
                  <button class="btn btn_secondary">Изменить город</button>
                </div> -->
              </div>
            </li>

            <li class="order__item">
              <div class="order__step-title">Способ доставки</div>

              <div class="order__step-content">
                <div class="order__delivery">
                  <ul class="order__delivery-list">
                    <li class="order__delivery-item">
                      <label class="order__delivery-label">
                        <input
                          v-model="orderDelivery"
                          name="Order[delivery_type]"
                          type="radio"
                          class="order__delivery-input"
                          value="sdk"
                        />

                        <span class="order__delivery-radio"></span>

                        <svg class="icon icon_size-24 icon_mr-8">
                          <use xlink:href="#cdek"></use>
                        </svg>
                        <span class="order__delivery-company">СДЭК</span>
                      </label>

                      <transition name="fade">
                        <DeliverySdek v-show="currentDelivery === 'sdk'" />
                      </transition>
                    </li>

                    <li class="order__delivery-item">
                      <label class="order__delivery-label">
                        <input
                          v-model="orderDelivery"
                          name="Order[delivery_type]"
                          type="radio"
                          class="order__delivery-input"
                          value="russianPost"
                        />

                        <span class="order__delivery-radio"></span>

                        <svg class="icon icon_size-24 icon_mr-8">
                          <use xlink:href="#russian-post"></use>
                        </svg>
                        <span class="order__delivery-company"
                          >Почта России</span
                        >
                      </label>

                      <transition name="fade">
                        <div
                          class="order__delivery-info"
                          v-show="currentDelivery === 'russianPost'"
                        >
                          <div class="order__delivery-conditions">
                            <span class="order__delivery-price"
                              >{{
                                currentDeliveryDetail.price | numberFormat
                              }}
                              руб</span
                            >
                            <span class="order__delivery-date">{{
                              currentDeliveryDetail.date
                            }}</span>
                          </div>

                          <button
                            class="order__delivery-btn btn btn_primary btn_tiny"
                          >
                            Выбрать пункт выдачи
                          </button>

                          <div class="order__delivery-address">
                            {{ currentDeliveryDetail.address }}
                          </div>
                        </div>
                      </transition>
                    </li>

                    <li class="order__delivery-item">
                      <label class="order__delivery-label">
                        <input
                          v-model="orderDelivery"
                          name="Order[delivery_type]"
                          type="radio"
                          class="order__delivery-input"
                          value="boxberry"
                        />

                        <span class="order__delivery-radio"></span>

                        <svg class="icon icon_size-24 icon_mr-8">
                          <use xlink:href="#boxberry"></use>
                        </svg>
                        <span class="order__delivery-company">Boxberry</span>
                      </label>

                      <transition name="fade">
                        <DeliveryBoxberry
                          :address.sync="address"
                          v-show="currentDelivery === 'boxberry'"
                        />
                      </transition>
                    </li>

                    <!-- Даниил Тугаев, [06.12.2021 11:59]
                    Самовывоза вообще не будет пока -->
                    <!-- <li class="order__delivery-item">
                      <label class="order__delivery-label">
                        <input
                          v-model="orderDelivery"
                          name="Order[delivery_type]"
                          type="radio"
                          class="order__delivery-input"
                          value="pickup"
                        />

                        <span class="order__delivery-radio"></span>

                        <svg class="icon icon_size-24 icon_mr-8">
                          <use xlink:href="#icon-box"></use>
                        </svg>
                        <span class="order__delivery-company"
                          >Самовывоз из магазина (только для г. Пенза)</span
                        >
                      </label>

                      <transition name="fade">
                        <div
                          class="order__delivery-info"
                          v-show="currentDelivery === 'pickup'"
                        >
                          <button
                            class="order__delivery-btn btn btn_primary btn_tiny"
                          >
                            Выбрать пункт выдачи
                          </button>

                          <div class="order__delivery-address">
                            {{ currentDeliveryDetail.address }}
                          </div>
                        </div>
                      </transition>
                    </li> -->
                  </ul>
                </div>
              </div>
            </li>

            <li class="order__item">
              <div class="order__step-title">Способ оплаты</div>

              <div class="order__step-content">
                <div class="pay-options">
                  <div class="pay-options__group">
                    <input
                      v-model="paymentMethod"
                      name="Order[payment_method]"
                      value="online"
                      checked
                      type="radio"
                      id="pay-1"
                      class="pay-options__option"
                    />

                    <label for="pay-1" class="pay-options__label"></label>

                    <div class="pay-options__heading">
                      Оплата на сайте банковской картой
                    </div>

                    <ul class="pay-options__cards">
                      <li class="pay-options__card">
                        <svg class="pay-options__icon">
                          <use xlink:href="#mir-2"></use>
                        </svg>
                      </li>

                      <li class="pay-options__card">
                        <svg class="pay-options__icon">
                          <use xlink:href="#visa-2"></use>
                        </svg>
                      </li>

                      <li class="pay-options__card">
                        <svg class="pay-options__icon">
                          <use xlink:href="#mastercard-2"></use>
                        </svg>
                      </li>
                    </ul>
                  </div>
                  <!-- Даниил Тугаев, [06.12.2021 11:52]
                    [Переслано от Сайгушев]
                    оплата только банковской картой при формировании заказа -->
                  <!-- <div class="pay-options__group">
                    <input
                      v-model="paymentMethod"
                      name="Order[payment_method]"
                      value="cash"
                      type="radio"
                      id="pay-2"
                      class="pay-options__option"
                    />

                    <label for="pay-2" class="pay-options__label"></label>
                   
                    <div class="pay-options__heading">Оплата при получении</div>

                    <div class="pay-options__desc">
                      Банковской картой или наличными
                    </div>
                  </div> -->
                </div>
              </div>
            </li>

            <li class="order__item">
              <div class="order__step-title">Получатель</div>

              <div class="order__step-content">
                <FormInputField
                  v-model="name"
                  :v="$v.name"
                  :placeholder="namePlaceholder"
                  :type="typeText"
                  :label="namePlaceholder"
                  nameserv="Order[name]"
                  ref="nameError"
                />

                <FormInputField
                  v-model="surname"
                  :v="$v.surname"
                  :placeholder="surnamePlaceholder"
                  :type="typeText"
                  :label="surnamePlaceholder"
                  nameserv="Order[surname]"
                />

                <FormInputField
                  v-model="email"
                  :v="$v.email"
                  :placeholder="emailPlaceholder"
                  :type="typeEmail"
                  :label="emailPlaceholder"
                  nameserv="Order[email]"
                />

                <div
                  class="form__group form__group_line js-control-code"
                  :class="{
                    'has-error':
                      $v.tel.$error || errors || $v.codeConfirm.$error,
                    'has-success': codeConfirm,
                  }"
                >
                  <span>
                    <label class="form__label"
                      >Телефон
                      <span class="form__label-decor">*</span>
                    </label>

                    <input
                      type="tel"
                      class="form__input form__input_indent"
                      placeholder="Телефон"
                      name="Order[tel]"
                      :ref="phone && 'phone'"
                      v-model.trim="$v.tel.$model"
                      @input="codeConfirm = false"
                    />
                    <input type="hidden" v-model="$v.codeConfirm.$model" />

                    <div 
                      v-for="(error, index) in errors"
                      :key="index"
                      class="help-text"
                    >
                      {{ error }}
                    </div>

                    <div v-if="codeConfirm" class="help-text">
                      Телефон подтвержден
                    </div>

                    <div v-if="!codeConfirm" class="help-text">
                      Необходимо подтвердить телефон
                    </div>
                  </span>

                  <span>
                    <!-- label пустой, нужен для сетки -->
                    <label class="form__label form__label_transparent">1</label>
                    <button
                      :class="{'btn_disabled': codeConfirm }"
                      type="button"
                      class="btn btn_primary btn_fill"
                      @click.prevent="getCode"
                    > 
                      <span v-if="!codeConfirm">Получить код</span>
                      <span v-else>Телефон подтвержден</span>
                    </button>
                  </span>
                </div>

                <popup-base :open.sync="isOpenPromo" :title="promoPopupTitle">
                  <PopupContentPromo
                    :phoneNumber="tel"
                    :open.sync="isOpenPromo"
                    @code-confirm="setCodeConfirm($event)"
                    @code-repeat="getCode"
                  />
                </popup-base>

                <div class="form__group">
                  <label class="form__label form__label_block"
                    >Комментарий к заказу</label
                  >

                  <textarea
                    v-model="comment"
                    class="form__input form__input_textarea"
                    name="Order[text]"
                    placeholder="Вы можете написать уточнение к заказу"
                  >
                  </textarea>
                </div>

                <div class="form__group">
                  <label class="form__label-checkbox">
                    <input
                      type="checkbox"
                      :class="{
                        'has-error':
                          !$v.checkbox_1.$model && $v.checkbox_1.$dirty,
                      }"
                      class="form__checkbox"
                      v-model="$v.checkbox_1.$model"
                    />
                    <span class="form__checkbox-text"
                      >Согласен с
                      <a :href="offertaUrl" class="form__link"
                        >условиями оферты,</a
                      >и
                      <a :href="policyUrl" class="form__link"
                        >политикой конфиденциальности</a
                      >
                    </span>
                  </label>
                </div>

                <div class="form__group">
                  <label class="form__label-checkbox">
                    <input
                      type="checkbox"
                      :class="{
                        'has-error':
                          !$v.checkbox_2.$model && $v.checkbox_2.$dirty,
                      }"
                      class="form__checkbox"
                      v-model="$v.checkbox_2.$model"
                    />
                    <span class="form__checkbox-text">
                      Свяжитесь со мной по телефону для уточнения подробностей
                      по заказу
                    </span>
                  </label>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <popup-base :open.sync="isOpenOrderSubmit" :submitStatus="submitStatus">
      <PopupContentOrderSubmit
        :open.sync="isOpenOrderSubmit"
        :submitStatus="submitStatus"
        :errorsSubmit="errorsSubmit"
      />
    </popup-base>
  </form>
</template>

<script>
  import BasketInfo from "../BasketInfo.vue";
  import numberFormat from "../../helpers/numberFormat.js";
  import SearchCities from "../searchComponents/SearchCities.vue";
  import { mapGetters } from "vuex";
  import DeliveryBoxberry from "./DeliveryBoxberry.vue";
  import DeliverySdek from "./DeliverySdek.vue";
  import FormInputField from "../formComponents/FormInputField.vue";
  import PopupBase from '../popupComponents/PopupBase.vue';
  import PopupContentPromo from '../popupComponents/PopupContentPromo.vue';
  import PopupContentOrderSubmit from '../popupComponents/PopupContentOrderSubmit.vue'

  import { required, email } from "vuelidate/lib/validators";
  import Inputmask from "inputmask";

  export default {
    components: {
      BasketInfo,
      SearchCities,
      DeliveryBoxberry,
      DeliverySdek,
      FormInputField,
      PopupBase,
      PopupContentPromo,
      PopupContentOrderSubmit,
    },
    props: {
      policyUrl: {
        type: String,
        default: "#",
      },
      offertaUrl: {
        type: String,
        default: "#",
      },
      userInfo: {
        type: Object,
      },
    },
    data() {
      return {
        currentDelivery: false,
        showWeight: true,
        showDelivery: true,

        namePlaceholder: "Имя",
        surnamePlaceholder: "Фамилия",
        emailPlaceholder: "E-mail",

        typeText: "text",
        typeEmail: "email",

        name: this.$props.userInfo.name,
        surname: this.$props.userInfo.surname,
        email: this.$props.userInfo.email,
        tel: this.$props.userInfo.tel,
        searchCities: "",
        checkbox_1: true,
        checkbox_2: true,
        paymentMethod: "online",
        comment: "",

        address: "тест", // TODO: заполнить, когда пользователь выберет пункт доставки

        phone: true,
        codeConfirm: '',

        isOpenPromo: false,
        promoPopupTitle: 'Введите код',

        isOpenOrderSubmit: false,
        submitStatus: false,
        errorsSubmit: [],
        errors: null,
      };
    },
    validations: {
      name: { required },
      surname: { required },
      email: { required, email },
      checkbox_1: { required },
      checkbox_2: { required },
      searchCities: { required },
      tel: { required },
      codeConfirm: { required },
    },
    methods: {
      async submit() {
        this.$v.$touch();
        if (this.$v.$error) {
          setTimeout(() => {
            const errorItem = document.querySelectorAll('.has-error');
            this.$scrollTo(errorItem[0], { offset: -100 });
          }, 0);
        } else {
          const response = await Vue.axios.post('/api/cart/execute/', this.buildPostData());
          if (response.data) {
            if (response.data.success === false) {
              this.submitStatus = false;
              this.isOpenOrderSubmit = true;
              this.errorsSubmit.push(response.data.errors)
              document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
              document.body.classList.add('no-scrolling');
            } else {
              this.submitStatus = true;
              window.location.assign(response.data.messages.redirectUrl[0]);
            }
          }
        }
      },
      setCodeConfirm($event) {
        Vue.set(this, 'codeConfirm', $event);
      },
      onFocusSearchCities() {
        this.suggestion = window.getYaSuggestion();
        this.suggestion.events.add(['select'], (event) => {
          const obItem = event.get('item');
          this.searchCities = obItem.value;
        });
      },
      returnFalse() {
        return false;
      },
      async getCode() {
        if (!this.$v.tel.$invalid) {
          const response = await Vue.axios.post('/api/login/send-code/', {
            LoginForm: { phone: this.tel },
          });
          if (response.data.success) {
            this.isOpenPromo = true;
            document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
            document.body.classList.add('no-scrolling');
            this.errors = null;
          } else {
            this.errors = response.data.errors.phone;
          }
        } else {
          document.querySelector('.js-control-code').classList.add('has-error');
        }
      },
      buildPostData() {
        return {
          Order: {
            tel: this.tel,
            name: this.name,
            email: this.email,
            text: this.comment,
            address: this.address,
            surname: this.surname,
            city: this.searchCities,
            code_confirm: this.codeConfirm,
            payment_method: this.paymentMethod,
            delivery_type: this.currentDelivery,
          },
        };
      },
    },
    computed: {
      ...mapGetters("delivery", ["deliveryDetail", "currentDeliveryDetail"]),
      ...mapGetters('user', ['userCity']),
      orderDelivery: {
        get() {
          return this.currentDelivery;
        },
        set(value) {
          this.currentDelivery = value;
        },
      },
    },
    filters: {
      numberFormat,
    },

    mounted() {
      if (this.phone) {
        const im = new Inputmask("+7 (999) 999 99 99", {
          placeholder: " ",
        });

        im.mask(this.$refs.phone);
      }
      this.searchCities = this.userCity || '';
    },
  };
</script>

<style >
  .fade-enter-active {
    animation: fade 0.2s reverse ease-out;
  }

  .fade-leave-active {
    animation: fade 0s ease-in;
  }

  @keyframes fade {
    0% {
      opacity: 1;
      transform-origin: top top;
    }
    100% {
      opacity: 0;
    }
  }
</style>
