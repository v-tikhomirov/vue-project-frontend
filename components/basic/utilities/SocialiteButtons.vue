<template>
  <div class="authorization-form__social">
    <p class="text" v-if="isLoginPage">Log in with</p>
    <p class="text" v-else>Sign up with</p>
    <div class="social">
      <ul class="social__list">
        <li class="social__item"><a class="social__link" @click="login('google')" aria-label="Log in with Google">
          <svg aria-hidden="true">
            <use xlink:href="#icon-google-auth"></use>
          </svg></a></li>
        <li class="social__item"><a class="social__link" @click="login('linkedin')" aria-label="Log in with Linkedin">
          <svg aria-hidden="true">
            <use xlink:href="#icon-in-auth"></use>
          </svg></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialiteButtons",
  props: {
    isCompanySignUp: 0,
    isAgreementAccepted: false,
    isLoginPage: true,
  },
  methods: {
    login(type) {
      if(this.isAgreementAccepted || this.isLoginPage)
      {
        let loginPage = this.isLoginPage ? 1 : 0
        location.href = process.env.API_BASE_URL + '/auth/redirect/' + type + '?isCompany=' + this.isCompanySignUp + "&isLogin=" + loginPage
      } else {
        this.$emit('agreementError')
      }
    }
  }
}
</script>

<style scoped>

</style>
