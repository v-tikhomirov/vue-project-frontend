<template>
  <div class="registration__intro">
    <h1 class="visually-hidden">Additional links</h1>
    <div class="registration__form form" data-validate>
      <form method="post" action="#">
        <fieldset class="form__block">
          <div class="form__description">
            <p class="title title--h4">Additional links</p>
            <p class="form__text">Fill in&nbsp;your social media links or&nbsp;skip this step for now.</p>
            <p class="form__text">You&rsquo;ll be&nbsp;able to&nbsp;change it&nbsp;in&nbsp;the settings later</p>
          </div>
          <div class="form__content">
            <ul>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">Linkedin</span>
                    <input type="text" id="input-linkedin" name="input-link" minlength="2" placeholder="Link" v-model="formData.linkedin">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">Facebook</span>
                    <input type="text" id="input-facebook" name="input-link" minlength="2" placeholder="Link" v-model="formData.facebook">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">GitHub</span>
                    <input type="text" id="input-github" name="input-link" minlength="2" placeholder="Link" v-model="formData.github">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">StackOverflow</span>
                    <input type="text" id="input-stackoverflow" name="input-link" minlength="2" placeholder="Link" v-model="formData.stackoverflow">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">Medium</span>
                    <input type="text" id="input-medium" name="input-link" minlength="2" placeholder="Link" v-model="formData.medium">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">Other</span>
                    <input type="text" id="input-other" name="input-link" minlength="2" placeholder="Link" v-model="formData.other">
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </fieldset>
        <div class="form__buttons buttons-panel registration__buttons">
          <button class="btn btn--icon-left form__button" type="button" @click="back"><span class="btn__text">Back</span><span class="btn__icon">
                      <svg width="14" height="13" aria-hidden="true">
                        <use xlink:href="#icon-arrow-left"></use>
                      </svg></span>
          </button>
          <button class="btn btn--blue btn--icon-right form__button" type="button" @click="submit"><span class="btn__text" >Complete</span><span class="btn__icon">
                      <svg width="14" height="13" aria-hidden="true">
                        <use xlink:href="#icon-arrow-right"></use>
                      </svg></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step3",
  data() {
    return {
      formData: {
        linkedin: "",
        facebook: "",
        github: "",
        stackoverflow: "",
        medium: "",
        other: ""
      }
    }
  },
  mounted() {
    this.formData.linkedin = this.$auth.user.profile.link_to_linkedin
    this.formData.facebook = this.$auth.user.profile.link_to_facebook
    this.formData.github = this.$auth.user.profile.link_to_github
    this.formData.stackoverflow = this.$auth.user.profile.link_to_stackoverflow
    this.formData.medium = this.$auth.user.profile.link_to_medium
    this.formData.other = this.$auth.user.profile.link_to_other
  },
  methods: {
    submit() {
      let data = {
        link_to_linkedin: this.formData.linkedin,
        link_to_facebook: this.formData.facebook,
        link_to_github: this.formData.github,
        link_to_stackoverflow: this.formData.stackoverflow,
        link_to_medium: this.formData.medium,
        link_to_other: this.formData.other,
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

</style>
