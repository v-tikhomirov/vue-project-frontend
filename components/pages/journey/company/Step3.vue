<template>
  <div class="registration__intro">
    <div class="registration__content">
      <p class="title title--h2">Congratulations</p>
      <h1 class="title title--h1">Registration is&nbsp;completed</h1>
      <h2 class="title title--h4">Invite your team</h2>
      <p class="registration__text">Make hiring process easier by&nbsp;inviting your team to&nbsp;Ruta. Your colleages will have full access to&nbsp;the workspace for free.</p>
      <InviteField></InviteField>
      <div class="registration__buttons buttons-panel registration__buttons">
        <button class="btn btn--icon-left registration__button" type="button" @click="back"><span class="btn__text">Back</span><span class="btn__icon">
                    <svg width="14" height="13" aria-hidden="true">
                      <use xlink:href="#icon-arrow-left"></use>
                    </svg></span>
        </button>
        <button class="btn btn--blue btn--icon-right registration__button" type="button" @click="submit"><span class="btn__text">Complete</span><span class="btn__icon">
                    <svg width="14" height="13" aria-hidden="true">
                      <use xlink:href="#icon-arrow-right"></use>
                    </svg></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import InviteField from "@/components/basic/form/InviteField.vue";
export default {
  name: "Step3",
  components: {
    InviteField
  },
  mounted() {
    this.$auth.fetchUser()
  },
  methods: {
    submit() {
      let data = {
        is_journey_finished: 1
      }
      this.$api.profile.updateProfile(data).then((res) => {
        if (res.data.success) {
          this.$auth.fetchUser()
        }
      })
    },
    back() {
      this.$emit('next-step', 2)
    }
  }
}
</script>

<style scoped>
  .registration .registration__content .registration__buttons {
    left: 47%;
  }
</style>
