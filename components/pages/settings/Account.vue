<template>
  <div class="form form--large form--large" data-validate>
    <form method="post" action="#">
      <fieldset class="form__block">
        <div class="form__description">
          <p class="title title--h4">Personal information</p>
          <div class="form__photo-container">
            <PhotoField
              label="Click to upload a profile picture"
              type="avatar"
              :api="$api.profile"
              :src="profile.profile_picture"
              :is-big="!isMobileDevice()"
            />
          </div>
        </div>
        <div class="form__content">
          <input-field
            value=""
            :label="$t('firstname').toString()"
            :placeholder="$t('firstname').toString()"
            id="input-first-name"
            name="input-first-name"
            minlength="2"
            v-model="formData.first_name"
            :errorMessage="errorsBag.first_name"
          ></input-field>
          <input-field
            value=""
            :label="$t('lastname').toString()"
            :placeholder="$t('lastname').toString()"
            id="input-last-name"
            name="input-last-name"
            minlength="2"
            v-model="formData.last_name"
            :errorMessage="errorsBag.last_name"
          ></input-field>
          <template v-if="isCustomer">
            <data-select-field
              :label="$t('dob').toString()"
              v-model="formData.birthdate"
              :errorMessage="errorsBag.birthdate"
            ></data-select-field>
          </template>
          <template v-else>
            <PhoneField v-model="formData.phoneData" :errorMessage="errorsBag.phoneData"></PhoneField>
            <input-field
              v-model="formData.job_role"
              label="Job role"
              placeholder="Job role"
              id="input-job-role"
              name="input-job-role"
              minlength="2"
              :errorMessage="errorsBag.job_role"
            ></input-field>
          </template>
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
import DataSelectField from "../../basic/form/DateSelectField.vue";
import PhotoField from "@/components/basic/form/PhotoField.vue";
import PhoneField from "@/components/basic/form/PhoneField.vue";
import {mapGetters} from "vuex";
export default {
  name: "Account",
  components: {
    InputField,
    DataSelectField,
    PhotoField,
    PhoneField
  },
  data: () => ({
    formId: "account",
    formData: {
      first_name: '',
      last_name: '',
      birthdate: null,
      phoneData: {
        phone: "",
        country_code: ""
      },
    },
    validationRules: {
      first_name: "required",
      last_name: "required",
    },
    screenWidth: ""
  }),

  mounted() {
    this.screenWidth = screen.width
    if (this.$auth.user.profile) {
      this.formData.first_name = this.profile.first_name;
      this.formData.last_name = this.profile.last_name;
      this.formData.birthdate = this.profile.birthdate;
      if(this.$auth.user.type === "company") {
        this.formData.job_role = this.profile.job_role;
      }
      this.formData.phoneData.phone = this.profile.phone;
      this.formData.phoneData.country_code = this.profile.country_code;
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
    isMobileDevice() {
      return this.screenWidth <= 760;
    },
    submitForm() {
      if(!this.isCustomer) {
        this.formData['phone'] = this.formData.phoneData.phone
        this.formData['country_code'] = this.formData.phoneData.country_code
        this.validationRules['phoneData'] = "phone";
        this.validationRules['job_role'] = "required";
      } else {
        this.validationRules['birthdate'] = "required";
      }
      if(this.validate(this.formId)) {
        this.$api.profile.updateProfile(this.formData).then((res) => {
          if (res.data.success) {
            this.$auth.fetchUser();
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .img-upload__preview {
    width: 200px;
    height: 200px;
  }
  @media (max-width: 767px) {
    .buttons-panel {
      width: 89vw;
    }
  }
</style>
