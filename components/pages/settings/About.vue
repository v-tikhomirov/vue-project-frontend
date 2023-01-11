<template>
  <div class="form form--large form--large" data-validate>
    <form method="post" action="#">
      <fieldset class="form__block">
        <div class="form__description">
          <p class="title title--h4">Contacts</p>
        </div>
        <div class="form__content">
          <phone-field
            v-model="formData.phoneData"
            :errorMessage="errorsBag.phoneData"
          ></phone-field>
          <input-field
            minlength="2"
            :label="$t('whatsapp').toString()"
            :placeholder="$t('whatsapp').toString()"
            :optional="true"
            v-model="formData.whatsapp"
          ></input-field>
          <input-field
            minlength="2"
            :label="$t('telegram').toString()"
            :placeholder="$t('telegram').toString()"
            :optional="true"
            v-model="formData.telegram"
          ></input-field>
        </div>
      </fieldset>
      <location
        v-model="formData.locationData"
        :errorMessage="errorsBag.locationData"
      ></location>
      <div class="form__buttons buttons-panel">
        <button class="btn btn--icon-left form__button" type="button" @click="$router.push('/')">
          <span class="btn__text">Cancel</span><span class="btn__icon">
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlink:href="#icon-close"></use>
                    </svg></span>
        </button>
        <button class="btn btn--blue form__button" type="button"><span class="btn__text" @click="submitForm">Save changes</span>
        </button>
      </div>
      <messages :value="actionMessage"></messages>
    </form>
  </div>
</template>

<script>
import PhoneField from "../../basic/form/PhoneField.vue";
import InputField from "../../basic/form/InputField.vue";
import Location from "../../basic/common/Location.vue";
import Messages from "../../basic/form/Messages.vue";
import {mapGetters} from "vuex";
export default {
  name: "About",
  components: {Messages, Location, InputField, PhoneField},
  data: () => ({
    formId: "about",
    formData: {
      phoneData: {
        country_code: '',
        phone: ''
      },
      whatsapp: '',
      telegram: '',
      locationData: {}
    },
    validationRules: {
      phoneData: "phone",
      locationData: "location",
    },
  }),
  mounted() {
    if (this.$auth.user.profile) {
      this.formData.phoneData.country_code = this.profile.country_code;
      this.formData.phoneData.phone = this.profile.phone;
      this.formData.whatsapp = this.profile.whatsapp;
      this.formData.telegram = this.profile.telegram;
      this.formData.locationData = {
        country: this.profile.country_id,
        city: this.profile.city_id
      };
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
  methods: {
    submitForm() {
      this.resetMessage();
      if(this.validate(this.formId))
      {
        const data = {
          whatsapp: this.formData.whatsapp,
          telegram: this.formData.telegram,
          country_id: this.formData.locationData.country,
          city_id: this.formData.locationData.city,
          country_code: this.formData.phoneData.country_code,
          phone: this.formData.phoneData.phone,
        };
        this.$api.profile.updateProfile(data).then((res) => {
          if (res.data.success) {
            this.$auth.fetchUser();
            this.setSuccessMessage();
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
