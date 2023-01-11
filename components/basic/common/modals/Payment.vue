<template>
  <div class="modal modal--preload modal--payment" data-modal="payment" :class="isOpen ? 'is-active' : ''">
    <div class="modal__wrapper">
      <div class="modal__overlay" data-close-modal></div>
      <div class="modal__content">
        <h1 class="modal__title">Payment details
          <svg class="modal__title-icon" width="124" height="27" aria-hidden="true">
            <use xlink:href="#icon-payment"></use>
          </svg>
        </h1>
        <div class="modal__text">
          <p>How many contacts would you like to purchase?</p>
        </div>
        <form method="post" action="#">
          <div class="modal__cards">
            <div class="pay-card">
              <p class="pay-card__price"><span class="color-silver">$</span>20<span class="pay-card__count">/contact</span></p>
              <p class="pay-card__count color-silver">1 contact</p>
              <p class="pay-card__text">Open one contact of a candidate suggested to you by our smart algorithm</p>
              <button class="btn btn--blue pay-card__button" type="button" @click="pay(1)"><span class="btn__text">Pay $20</span>
              </button>
              <input class="pay-card__radio" type="radio" id="id-20" name="price-card" checked>
              <label class="pay-card__label" for="id-20"></label>
            </div>
            <div class="pay-card">
              <p class="pay-card__price"><span class="color-silver">$</span>15<span class="pay-card__count">/contact</span></p>
              <p class="pay-card__count color-silver">40 contacts</p>
              <p class="pay-card__text">Open <b>40</b> AI-driven matches to fill your team with professionals</p>
              <button class="btn btn--blue pay-card__button" type="button" @click="pay(40)"><span class="btn__text">Pay $600</span>
              </button>
              <input class="pay-card__radio" type="radio" id="id-15" name="price-card">
              <label class="pay-card__label" for="id-15"></label>
            </div>
            <div class="pay-card pay-card--special">
              <p class="pay-card__price"><span class="color-silver">$</span>10<span class="pay-card__count">/contact</span></p>
              <p class="pay-card__count color-silver">100 contacts</p>
              <p class="pay-card__text">Open <b>100</b> AI-driven matches to create a dream team </p>
              <button class="btn btn--blue pay-card__button" type="button" @click="pay(100)"><span class="btn__text">Pay $1000</span>
              </button>
              <input class="pay-card__radio" type="radio" id="id-10" name="price-card">
              <label class="pay-card__label" for="id-10"></label>
            </div>
            <button class="btn btn--blue modal__form-button" type="button"><span class="btn__text">Pay $20</span>
            </button>
          </div>
        </form>
        <button class="modal__close-btn" type="button" aria-label="Close popup" data-close-modal @click="closePopup">
          <svg width="13" height="13" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Payment",
  props: {
    isOpen: {
      default: false
    },
    api: {
      type: Object,
      required: true
    },
    cvId: {
      type: String,
      required: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('closed')
    },
    pay(amountOfContacts) {
      this.api.getSession(amountOfContacts, this.cvId)
        .then((res) => {
          if (res.data.session) {
            location.href = res.data.session.url
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
