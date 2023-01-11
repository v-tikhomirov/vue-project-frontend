<template>
  <div class="registration__intro">
    <h1 class="title title--h2 registration__title">Let&rsquo;s get started</h1>
    <p class="registration__subtitle">Fill in&nbsp;your personal details and proceed with setting up&nbsp;an&nbsp;account</p>
    <div class="form registration__form" data-validate>
      <form method="post" action="#">
        <fieldset class="form__block">
          <div class="form__description">
            <p class="title title--h4">Personal information</p>
          </div>
          <div class="form__content">
            <PhotoField
              label="Click to upload a profile picture"
              type="avatar"
              :api="$api.profile"
              :src="profile.profile_picture"
            />
            <InputField
              v-model="formData.firstName"
              label="First name"
              :required="true"
              :errorMessage="errorsBag.firstName"
            ></InputField>
            <InputField
              v-model="formData.lastName"
              label="Last name"
              :required="true"
              :errorMessage="errorsBag.lastName"
            ></InputField>
            <date-select-field v-model="formData.birthdate" :label="$t('dob').toString()"></date-select-field>
          </div>
        </fieldset>
        <div class="form__buttons buttons-panel registration__buttons">
          <button class="btn btn--blue btn--icon-right form__button" type="button" @click="submit"><span
            class="btn__text">Next</span><span class="btn__icon">
              <svg width="14" height="13" aria-hidden="true">
                <use xlink:href="#icon-arrow-right"></use>
              </svg></span>
          </button>
        </div>
      </form>
    </div>
    <div class="registration__image">
      <img src="img/content/background-account.png"
           srcset="img/content/background-account@2x.png 2x" width="648" height="530"
           alt="picture">
    </div>
  </div>
</template>

<script>
import DateSelectField from "~/components/basic/form/DateSelectField.vue";
import PhotoField from "~/components/basic/form/PhotoField.vue";
import InputField from "@/components/basic/form/InputField.vue";
import {mapGetters} from 'vuex';
export default {
  name: "Step1",
  components: {
    DateSelectField,
    PhotoField,
    InputField
  },
  data() {
    return {
      formId: "step1",
      formData: {
        birthdate: null,
        firstName: null,
        lastName: null,
      },
      validationRules: {
        firstName: "required",
        lastName: "required"
      }
    }
  },
  computed: {
    ...mapGetters({
      errors: 'errors/getErrorsBag'
    }),
    errorsBag() {
      return this.errors[this.formId];
    }
  },
  mounted() {
    this.formData.firstName = this.profile.first_name
    this.formData.lastName = this.profile.last_name
    this.formData.birthdate = this.profile.birthdate
  },
  methods: {

    submit() {
      this.resetMessage();
      if(this.validate("step1")) {
        let data = {
          first_name: this.formData.firstName,
          last_name: this.formData.lastName,
          birthdate: this.formData.birthdate
        }
        this.$api.profile.updateProfile(data).then((res) => {
          if (res.data.success) {
            this.$auth.fetchUser()
            this.$emit('next-step', 2)
          }
        })
      }
    },
    dateChanged(date) {
      this.birthdate = date
    }
  }
}
</script>

<style scoped>
  .registration__buttons.form__buttons {
    left: 59.5%;
  }
</style>
