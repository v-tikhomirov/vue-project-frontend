<template>
  <div class="modal modal--preload modal--done" :class="isOpen ? 'is-active' : ''">
    <div class="modal__wrapper">
      <div class="modal__overlay" data-close-modal></div>
      <div class="modal__content">
        <h1 class="modal__title">Payment has done!</h1>
        <div class="modal__text">
          <p>You have bought new credits. Your balance is: <strong>{{ $auth.user.companies[0].balance }}</strong> credits </p>
          <p>You can spent it by opening contacts of the chosen cv.</p>
        </div>
        <div class="modal__buttons">
          <button class="btn btn--blue modal__button" type="button" data-close-modal><span class="btn__text" @click="closePopup">Close</span>
          </button>
        </div>
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
  name: "SuccessPayment.vue",
  props: {
    isOpen: {
      type: Boolean
    }
  },
  methods: {
    closePopup() {
      this.$emit('closed')
    },
  }
}
</script>

<style scoped>

</style>
