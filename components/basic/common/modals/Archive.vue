<template>
  <div class="modal modal--archive" data-modal="archive" :class="isOpen ? 'is-active' : ''">
    <div class="modal__wrapper">
      <div class="modal__overlay" data-close-modal=""></div>
      <div class="modal__content">
        <h1 class="modal__title">Move to archive</h1>
        <div class="modal__text">
          <p>Would you like to move this job offer to archive?</p>
          <p>We won’t suggest any other matches.</p>
        </div>
        <div class="modal__buttons">
          <button class="btn btn--icon-left modal__button" type="button" data-close-modal=""><span class="btn__text">Cancel</span><span class="btn__icon">
                <svg width="13" height="13" aria-hidden="true">
                  <use xlink:href="#icon-close"></use>
                </svg></span>
          </button>
          <button class="btn btn--blue modal__button" type="button" data-close-modal=""><span class="btn__text">Done</span>
          </button>
        </div>
        <button class="modal__close-btn" type="button" aria-label="Закрыть попап" data-close-modal="">
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
  name: "Archive",
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
