<template>
  <div class="modal modal--done" data-modal="done-vacancy" :class="isOpen ? 'is-active' : ''">
    <div class="modal__wrapper">
      <div class="modal__overlay" data-close-modal=""></div>
      <div class="modal__content">
        <h1 class="modal__title">Done!</h1>
        <div class="modal__text">
          <p>The vacancy has been published.</p>
          <p>You can post this job on social media.</p>
          <p>It would give your offer more attention by attracting programmers who use social networks.</p>
        </div>
        <div class="modal__block">
          <h2>Share</h2>
          <div class="social">
            <ul class="social__list">
              <li class="social__item"><a class="social__link" href="#" aria-label="go to our linkedin">
                <svg width="39" height="39" aria-hidden="true">
                  <use xlink:href="#icon-linkedin2"></use>
                </svg></a></li>
              <li class="social__item"><a class="social__link" href="#">
                <svg width="39" height="39" aria-hidden="true">
                  <use xlink:href="#icon-twitter2"></use>
                </svg></a></li>
              <li class="social__item"><a class="social__link" href="#" aria-label="go to our facebook">
                <svg width="39" height="39" aria-hidden="true">
                  <use xlink:href="#icon-facebook2"></use>
                </svg></a></li>
            </ul>
          </div>
        </div>
        <div class="modal__block">
          <h2>Copy link</h2>
          <div class="copy-link">
            <div class="copy-link__field"><span class="copy-link__address">https://www.ruta.com/vacancy{{ vacancyId }}</span><span class="copy-link__status" v-if="isCopied">Link copied</span>
              <button class="copy-link__btn" type="button" @click="copy">
                <svg width="24" height="24" aria-hidden="true">
                  <use xlink:href="#icon-copy"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="modal__buttons">
          <button class="btn btn--blue modal__button" type="button" data-close-modal=""><span class="btn__text">Close</span>
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
  name: "DoneVacancy",
  props: {
    isOpen: {
      default: false
    },
    vacancyId: {
      required: true
    }
  },
  data() {
    return {
      isCopied: false
    }
  },
  methods: {
    copy() {
      navigator.clipboard.writeText("https://www.ruta.com/vacancy" + this.vacancyId)
      this.isCopied = true
    },
    closePopup() {
      this.$emit('closed')
    },

  }
}
</script>

<style scoped>

</style>
