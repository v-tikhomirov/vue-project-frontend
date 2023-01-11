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
          </div>
          <div class="status__bar">
            <div class="status__bar-color" style="width:100%"></div>
          </div>
        </div>
        <Step1 @next-step="nextStep" show-password button-label="Done"></Step1>
      </div>
    </main>
  </div>
</template>

<script>
import Step1 from "@/components/pages/journey/company/Step1.vue"
export default {
  name: "InvitedUser",
  components: {
    Step1
  },
  data() {
    return {
    }
  },
  methods: {
    nextStep(stepNumber) {

    }
  }
}
</script>

<style scoped>

</style>
