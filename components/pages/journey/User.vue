<template>
  <div class="wrapper">
    <main>
      <div class="registration">
        <div class="status">
          <div class="container status__intro">
            <div class="status__logo">
              <svg class="logo" width="128" height="23" aria-hidden="true">
                <use xlink:href="#logo"></use>
              </svg>
            </div>
            <ul class="status__list">
              <li class="status__item" :class="step === 1 ? 'is-current' : ''">
                <div class="status__number">1</div>
                <div class="status__name">Account</div>
              </li>
              <li class="status__item" :class="step === 2 ? 'is-current' : ''">
                <div class="status__number">2</div>
                <div class="status__name">About</div>
              </li>
              <li class="status__item" :class="step === 3 ? 'is-current' : ''">
                <div class="status__number">3</div>
                <div class="status__name">Additional links</div>
              </li>
            </ul>
          </div>
          <div class="status__bar">
            <div class="status__bar-color" style="width:33%" v-if="step === 1"></div>
            <div class="status__bar-color" style="width:67%" v-else-if="step === 2"></div>
            <div class="status__bar-color" style="width:100%" v-else-if="step === 3"></div>
          </div>
        </div>
        <Step1 v-if="step === 1" @next-step="nextStep"></Step1>
        <Step2 v-else-if="step === 2" @next-step="nextStep"></Step2>
        <Step3 v-else-if="step === 3" @next-step="nextStep"></Step3>
      </div>
    </main>
  </div>
</template>

<script>
import Step1 from './user/Step1.vue'
import Step2 from './user/Step2.vue'
import Step3 from './user/Step3.vue'
export default {
  name: "User",
  head() {
    return {
      title: "Sign Up",
    }
  },
  components: {
    Step1,
    Step2,
    Step3
  },
  data() {
    return {
      step: 1
    }
  },
  methods: {
    nextStep(stepNumber) {
      this.step = stepNumber
    }
  }
}
</script>

<style scoped>

</style>
