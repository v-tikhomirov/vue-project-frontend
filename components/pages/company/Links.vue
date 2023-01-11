<template>
  <div class="form form--large" data-validate>
    <form method="post" action="#">
      <fieldset class="form__block">
        <div class="form__description">
          <p class="title title--h4">Additional links</p>
          <p class="form__text">Share your social media links</p>
        </div>
        <div class="form__content">
          <ul>
            <li>
              <input-field
                v-model="formData.linkedin"
                :label="$t('linkedin').toString()"
                id="input-linkedin"
                name="input-link"
                minlength="2"
                placeholder="Link"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.facebook"
                :label="$t('facebook').toString()"
                id="input-facebook"
                name="input-link"
                minlength="2"
                placeholder="Link"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.github"
                :label="$t('github').toString()"
                id="input-github"
                name="input-link"
                minlength="2"
                placeholder="Link"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.stackoverflow"
                :label="$t('stackoverflow').toString()"
                id="input-stackoverflow"
                name="input-link"
                minlength="2"
                placeholder="Link"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.medium"
                :label="$t('medium').toString()"
                id="input-medium"
                name="input-link"
                minlength="2"
                placeholder="Link"
              ></input-field>
            </li>
            <li>
              <input-field
                v-model="formData.youtube"
                :label="$t('youtube').toString()"
                id="input-youtube"
                name="input-link"
                minlength="2"
                placeholder="Link"
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
        <button class="btn btn--blue form__button" type="button" @click="submitForm">
          <span class="btn__text">Save changes</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InputField from "../../basic/form/InputField.vue";
export default {
  name: "Links",
  components: {
    InputField
  },
  data: () => ({
    formData: {
      id: null,
      linkedin: '',
      facebook: '',
      github: '',
      stackoverflow: '',
      medium: '',
      youtube: '',
    }
  }),
  created() {
    if (process.client) {
      this.$api.company.getLinks().then((res) => {
        if (res.data.success) {
          this.formData = res.data.data;
        }
      })
    }
  },
  methods: {
    submitForm() {
      this.formData.step = 'links';
      this.$api.company.updateCompany(this.formData).then((res) => {
        if (res.data.success) {
          console.log(res.data);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
