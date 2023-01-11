<template>
  <div class="registration__intro">
    <h1 class="title title--h2 registration__title">Tell&nbsp;us about your company</h1>
    <p class="registration__subtitle">Present your company the best you can and let&nbsp;AI to&nbsp;do&nbsp;the rest</p>
    <div class="registration__form form" data-validate>
      <form method="post" action="#">
        <fieldset class="form__block">
          <div class="form__description">
            <p class="title title--h4">Primary information</p>
          </div>
          <div class="form__content">
            <PhotoField :api="$api.image" type="temp" :src="company.logo" v-model="logoSrc" />
            <InputField v-model="formData.name" placeholder="Company name" minlength="2" label="Name" required :errorMessage="errorsBag.name"/>
            <p class="form__groop-name">Company type <span class="color-silver">(choose one or more)</span></p>
            <div class="form__checkbox-buttons">
              <checkbox-field
                label="StartUp"
                value="startup"
                v-model="formData.type"
              ></checkbox-field>
              <checkbox-field
                label="Service IT company"
                value="service"
                v-model="formData.type"
              ></checkbox-field>
              <checkbox-field
                label="Product IT company"
                value="product"
                v-model="formData.type"
              ></checkbox-field>
              <checkbox-field
                label="Sustainable business with strong IT (Bank, Plant, Logistic etc)"
                value="business"
                v-model="formData.type"
              ></checkbox-field>
            </div>
            <multi-select-field
              v-model="formData.domains"
              :options="domainsList"
              :label="$t('industry').toString()"
              :placeholder="$t('industry').toString()"
            ></multi-select-field>
            <SelectField v-model="formData.numberOfEmployees" :options="numberOfEmployeesOptions" label="Number of employees" placeholder="Number of employees" :errorMessage="errorsBag.numberOfEmployees"></SelectField>
            <InputField label="Website" placeholder="Website" v-model="formData.website" required="required" :errorMessage="errorsBag.website"/>
          </div>
        </fieldset>
        <Location v-model="formData.locationData" :errorMessage="errorsBag.locationData"></Location>
        <fieldset class="form__block">
          <div class="form__description">
            <p class="title title--h4">Description</p>
            <p class="form__text">Tell others a&nbsp;bit more about your company:</p>
            <p class="form__text">What is&nbsp;your mission &amp;&nbsp;vision?</p>
            <p class="form__text">What are your core values? Which projects<br> are you working&nbsp;on? Make it&nbsp;a&nbsp;short pitch ;)</p>
          </div>
          <div class="form__content">
            <textarea-field
              v-model="formData.about"
              name="description"
              placeholder="Description"
              rows="8"
              :errorMessage="errorsBag.about"
            ></textarea-field>
          </div>
        </fieldset>
        <fieldset class="form__block">
          <div class="form__description">
            <p class="title title--h4">Benefits</p>
            <p class="form__text">Make sure to&nbsp;communicate the benefits you&rsquo;re offering to&nbsp;future candidates. It&nbsp;might sway <br> them towards you even more.</p>
          </div>
          <div class="form__content">
            <multi-select-field
              v-model="formData.benefits"
              :options="benefitsList"
              :label="$t('benefits').toString()"
              :placeholder="$t('benefits').toString()"
            ></multi-select-field>
          </div>
        </fieldset>
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
                    <input v-model="formData.linkedin" type="text" id="input-linkedin" name="input-link" minlength="2" placeholder="Link">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">Facebook</span>
                    <input v-model="formData.facebook" type="text" id="input-facebook" name="input-link" minlength="2" placeholder="Link">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">GitHub</span>
                    <input v-model="formData.github" type="text" id="input-github" name="input-link" minlength="2" placeholder="Link">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">StackOverFlow</span>
                    <input v-model="formData.stackoverflow" type="text" id="input-stackoverflow" name="input-link" minlength="2" placeholder="Link">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">Medium</span>
                    <input v-model="formData.medium" type="text" id="input-medium" name="input-link" minlength="2" placeholder="Link">
                  </label>
                </div>
              </li>
              <li>
                <div class="custom-input">
                  <label><span class="custom-input__label">Youtube</span>
                    <input v-model="formData.youtube" type="text" id="input-youtube" name="input-link" minlength="2" placeholder="Link">
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
import Location from "@/components/basic/common/Location.vue";
import PhotoField from "@/components/basic/form/PhotoField.vue";
import InputField from "@/components/basic/form/InputField.vue";
import CheckboxField from "@/components/basic/form/CheckboxField.vue";
import MultiSelectField from "@/components/basic/form/MultiSelectField.vue";
import SelectField from "@/components/basic/form/SelectField.vue";
import TextareaField from "@/components/basic/form/TextareaField.vue";
import { mapGetters } from "vuex"
export default {
  name: "Step2",
  components: {
    Location,
    PhotoField,
    InputField,
    CheckboxField,
    MultiSelectField,
    SelectField,
    TextareaField
  },
  mounted() {
    if (this.domainsList.length === 0) {
      this.$api.common.getDomains().then((res) => {
        if (res.data.success) {
          this.$store.dispatch('setDomains', res.data.data);
        }
      });
    }
    if (this.benefitsList.length === 0) {
      this.$api.common.getBenefits().then((res) => {
        if (res.data.success) {
          this.$store.dispatch('setBenefits', res.data.data);
        }
      });
    }

    if(this.$auth.user.companies) {
      if(this.$auth.user.companies[0]) {
        this.company = this.$auth.user.companies[0]
        this.id = this.company.id
        this.formData.linkedin = this.company.linkedin
        this.formData.facebook = this.company.facebook
        this.formData.github = this.company.github
        this.formData.stackoverflow = this.company.stackoverflow
        this.formData.medium = this.company.medium
        this.formData.youtube = this.company.youtube
        this.formData.name = this.company.name
        this.formData.type = this.company.type
        this.formData.numberOfEmployees = this.company.number_of_employees
        this.formData.website = this.company.website
        this.formData.locationData = this.company.location
        this.formData.benefits = this.company.benefits
        this.formData.domains = this.company.domains
        this.formData.about = this.company.about
      }
    }
  },

  data() {
    return {
      formId: "companyStep2",
      validationRules: {
        name: "required",
        numberOfEmployees: "required",
        website: "required",
        about: "required",
        locationData: "location"
      },
      formData: {
        linkedin: "",
        facebook: "",
        github: "",
        stackoverflow: "",
        medium: "",
        youtube: "",
        name: "",
        numberOfEmployees: '',
        type: [],
        benefits: [],
        domains: [],
        locationData: '',
        about: '',
        website: ''
      },
      id: null,
      company: "",
      logoSrc: "",
      numberOfEmployeesOptions: [
        { label: '1-9',value: '1-9' },
        { label: '10-24',value: '10-24' },
        { label: '25-49',value: '25-49' },
        { label: '50-99',value: '50-99' },
        { label: '100-999',value: '100-999' },
        { label: '1000+',value: '1000+' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      domainsList: 'getDomains',
      benefitsList: 'getBenefits',
      errors: 'errors/getErrorsBag'
    }),
    errorsBag() {
      return this.errors[this.formId];
    }
  },
  methods: {

    submit() {
      if(this.validate(this.formId)) {
        let data = {
          linkedin: this.formData.linkedin,
          facebook: this.formData.facebook,
          github: this.formData.github,
          stackoverflow: this.formData.stackoverflow,
          medium: this.formData.medium,
          youtube: this.formData.youtube,
          logoSrc: this.logoSrc,
          name: this.formData.name,
          type: this.formData.type,
          domains: this.formData.domains,
          number_of_employees: this.formData.numberOfEmployees,
          website: this.formData.website,
          country: this.formData.locationData.country,
          city: this.formData.locationData.city,
          about: this.formData.about,
          benefits: this.formData.benefits,
          step: 'companyJourney2',
        }
        if (this.id) {
          data.id = this.id;
        }
        this.$api.company.updateCompany(data).then((res) => {
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
