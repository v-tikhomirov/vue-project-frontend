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
            <InputField v-model="formData.firstName" label="First name" :required="true" :errorMessage="errorsBag.firstName"></InputField>
            <InputField v-model="formData.lastName" label="Last name" :required="true" :errorMessage="errorsBag.lastName"></InputField>
            <PhoneField v-model="formData.phoneData" :errorMessage="errorsBag.phoneData"></PhoneField>
            <InputField v-model="formData.jobRole" minlength="2" label="Job role" placeholder="Job role" :required="true" :errorMessage="errorsBag.jobRole"></InputField>
          </div>
        </fieldset>
        <fieldset class="form__block" v-if="showPassword">
          <div class="form__description">
            <p class="title title--h4">Password</p>
          </div>
          <div class="form__content">
            <PasswordField v-model="formData.password" label="Password" :required="true"></PasswordField>
            <PasswordField v-model="formData.confirmPassword" label="Confirm password" :required="true"></PasswordField>
          </div>
        </fieldset>
        <div class="form__buttons buttons-panel registration__buttons">
          <button class="btn btn--blue btn--icon-right form__button" type="button" @click="submit"><span class="btn__text">{{ buttonLabel }}</span><span class="btn__icon">
                      <svg width="14" height="13" aria-hidden="true">
                        <use xlink:href="#icon-arrow-right"></use>
                      </svg></span>
          </button>
        </div>
      </form>
    </div>
    <div class="registration__image"><img src="img/content/background-account.png" srcset="img/content/background-account@2x.png 2x" width="648" height="530" alt="picture">
    </div>
  </div>
</template>

<script>
import PhotoField from "@/components/basic/form/PhotoField.vue";
import PhoneField from "@/components/basic/form/PhoneField.vue";
import InputField from "@/components/basic/form/InputField.vue";
import PasswordField from "@/components/basic/form/PasswordField.vue";
import {mapGetters} from "vuex";
export default {
  name: "Step1",
  components: {
    PasswordField,
    PhotoField,
    PhoneField,
    InputField
  },
  props: {
    showPassword: {
      type: Boolean,
      default: false,
      required: false
    },
    buttonLabel: {
      type: String,
      required: false,
      default: "Next"
    }
  },
  data() {
    return {
      validationRules: {
        firstName: "required",
        lastName: "required",
        phoneData: "phone",
        jobRole: "required"
      },
      formId: "step1",
      formData: {
        firstName: '',
        lastName: '',
        phoneData: {},
        jobRole: '',
        password: '',
        confirmPassword: ''
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
  created() {
    this.formData.jobRole = this.$auth.user.profile.job_role
    this.formData.firstName = this.$auth.user.profile.first_name
    this.formData.lastName = this.$auth.user.profile.last_name
    if(!!this.$auth.user.profile.country_code) this.formData.phoneData.country_code = this.$auth.user.profile.country_code
    if(!!this.$auth.user.profile.phone) this.formData.phoneData.phone = this.$auth.user.profile.phone
  },
  methods: {
    submit() {
      if(this.showPassword) {
        this.validationRules['password'] = "required"
        this.validationRules['confirmPassword'] = "required"
      }
      if(this.validate(this.formId)) {
        if (this.showPassword && this.password !== this.confirmPassword) return false
        let data = {
          country_code: this.formData.phoneData.country_code,
          phone: this.formData.phoneData.phone,
          first_name: this.formData.firstName,
          last_name: this.formData.lastName,
          job_role: this.formData.jobRole,
        }
        if (this.showPassword) {
          data['password'] = this.formData.password
        }
        if (this.$auth.user.is_invited === 1) {
          data['is_journey_finished'] = 1
        }
        this.$api.profile.updateProfile(data).then((res) => {
          if (res.data.success) {
            this.$auth.fetchUser()
            if (!this.showPassword) {
              this.$emit('next-step', 2)
            }
          }
        })
      }
    },
  }
}
</script>

<style scoped>
  .registration__buttons.form__buttons {
    left: 59.5%;
  }
</style>
