<template>
  <div class="form form--large form--large" data-validate>
    <form method="post" action="#">
      <fieldset class="form__block">
        <div class="form__description">
          <p class="title title--h4">Additional links</p>
        </div>
        <div class="form__content">
          <ul>
            <li>
              <input-field
                v-model="formData.link_to_linkedin"
                minlength="2"
                placeholder="Link"
                id="input-linkedin"
                :label="$t('linkedin').toString()"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.link_to_facebook"
                minlength="2"
                placeholder="Link"
                id="input-facebook"
                :label="$t('facebook').toString()"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.link_to_github"
                minlength="2"
                placeholder="Link"
                id="input-github"
                :label="$t('github').toString()"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.link_to_stackoverflow"
                minlength="2"
                placeholder="Link"
                id="input-stackoverflow"
                :label="$t('stackoverflow').toString()"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.link_to_medium"
                minlength="2"
                placeholder="Link"
                id="input-medium"
                :label="$t('medium').toString()"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.link_to_other"
                minlength="2"
                placeholder="Link"
                id="input-other"
                :label="$t('other').toString()"
              ></input-field>
            </li>
          </ul>
        </div>
      </fieldset>
      <div class="form__buttons buttons-panel">
        <button class="btn btn--icon-left form__button" type="button" @click="$router.push('/')">
          <span class="btn__text">Cancel</span>
          <span class="btn__icon">
            <svg width="14" height="14" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </span>
        </button>
        <button class="btn btn--blue form__button" type="button"><span class="btn__text" @click="submitForm">Save changes</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InputField from "../../basic/form/InputField.vue";
export default {
  name: "Links",
  components: {InputField},
  data: () => ({
    formData: {
      link_to_linkedin: '',
      link_to_facebook: '',
      link_to_github: '',
      link_to_stackoverflow: '',
      link_to_medium: '',
      link_to_other: '',
    }
  }),
  mounted() {
    if (this.$auth.user.profile) {
      this.formData.link_to_linkedin = this.profile.link_to_linkedin;
      this.formData.link_to_facebook = this.profile.link_to_facebook;
      this.formData.link_to_github = this.profile.link_to_github;
      this.formData.link_to_stackoverflow = this.profile.link_to_stackoverflow;
      this.formData.link_to_medium = this.profile.link_to_medium;
      this.formData.link_to_other = this.profile.link_to_other;
    }
  },
  methods: {
    submitForm() {
      this.$api.profile.updateProfile(this.formData).then((res) => {
        if (res.data.success) {
          this.$auth.fetchUser();
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
