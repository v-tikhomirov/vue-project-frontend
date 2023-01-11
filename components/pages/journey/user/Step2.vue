<template>
  <div class="registration__intro">
    <h1 class="title title--h2 registration__title">Tell&nbsp;us about yourself</h1>
    <p class="registration__subtitle">We&nbsp;would like to&nbsp;know more about you, so&nbsp;we&nbsp;can match you with the best offers</p>
    <div class="form registration__form" data-validate>
      <form method="post" action="#">
        <fieldset class="form__block">
          <div class="form__description">
            <p class="title title--h4">Contacts</p>
          </div>
          <div class="form__content">
            <PhoneField v-model="formData.phoneData" :error-message="errorsBag.phoneData"></PhoneField>
            <div class="custom-input">
              <label><span class="custom-input__label">WhatsApp <span class="color-silver">(optional)</span></span>
                <input type="text" name="Whatsapp" minlength="2" placeholder="Whatsapp" v-model="formData.whatsapp">
              </label>
            </div>
            <div class="custom-input">
              <label><span class="custom-input__label">Telegram <span class="color-silver">(optional)</span></span>
                <input type="text" name="telegram" minlength="2" placeholder="Telegram" v-model="formData.telegram">
              </label>
            </div>
          </div>
        </fieldset>
        <Location v-model="formData.locationData" form-id="applicantStep2" :error-message="errorsBag.locationData"></Location>
        <div class="form__buttons buttons-panel registration__buttons">
          <button class="btn btn--icon-left form__button" type="button" @click="back"><span class="btn__text">Back</span><span class="btn__icon">
                      <svg width="14" height="13" aria-hidden="true">
                        <use xlink:href="#icon-arrow-left"></use>
                      </svg></span>
          </button>
          <button class="btn btn--blue btn--icon-right form__button" type="button" @click="submit"><span class="btn__text">Next</span><span class="btn__icon">
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
import PhoneField from "@/components/basic/form/PhoneField.vue";
import Location from "@/components/basic/common/Location.vue";
import {mapGetters} from 'vuex';
export default {
  name: "Step2",
  components: {
    PhoneField,
    Location
  },
  data() {
    return {
      formId: "applicantStep2",
      formData: {
        phoneData: {},
        whatsapp: '',
        telegram: '',
        locationData: {}
      },
      validationRules: {
        phoneData: "phone",
        locationData: "location"
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
    this.formData.whatsapp = this.$auth.user.profile.whatsapp
    this.formData.telegram = this.$auth.user.profile.telegram
    if(!!this.$auth.user.profile.country_id) this.formData.locationData.country = this.$auth.user.profile.country_id
    if(!!this.$auth.user.profile.city_id) this.formData.locationData.city = this.$auth.user.profile.city_id
    if(!!this.$auth.user.profile.country_code) this.formData.phoneData.country_code = this.$auth.user.profile.country_code
    if(!!this.$auth.user.profile.phone) this.formData.phoneData.phone = this.$auth.user.profile.phone
  },
  methods: {
    submit() {
      if(this.validate(this.formId)) {
        let data = {
          country_code: this.formData.phoneData.country_code,
          phone: this.formData.phoneData.phone,
          country_id: this.formData.locationData.country,
          city_id: this.formData.locationData.city,
          whatsapp: this.formData.whatsapp,
          telegram: this.formData.telegram
        }
        this.$api.profile.updateProfile(data).then((res) => {
          if (res.data.success) {
            this.$auth.fetchUser()
            this.$emit('next-step', 3)
          }
        })
      }
    },
    back() {
      this.$emit('next-step', 1)
    }
  }
}
</script>

<style scoped>

</style>
