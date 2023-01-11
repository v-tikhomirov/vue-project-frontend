<template>
  <div class="form form--large" data-validate>
    <form method="post" action="#">
      <fieldset class="form__block">
        <div class="form__description">
          <p class="title title--h4">Primary information</p>
        </div>
        <div class="form__content">
          <PhotoField :api="$api.company" type="company" :src="formData.logo" v-model="formData.logoSrc" />
          <input-field
            v-model="formData.name"
            :label="$t('companyname').toString()"
            :placeholder="$t('companyname').toString()"
            name="company-name"
            :minlength="2"
            :required="true"
            :errorMessage="errorsBag.name"
          ></input-field>
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
          <select-field
            :options="employee_options"
            v-model="formData.numberOfEmployees"
            :label="$t('employeesnumber').toString()"
            :placeholder="$t('employeesnumber').toString()"
            name="select-number-employees"
            id="select-number-employees"
            :errorMessage="errorsBag.numberOfEmployees"
          ></select-field>
          <input-field
            v-model="formData.website"
            :label="$t('website').toString()"
            :placeholder="$t('website').toString()"
            id="input-website"
            name="input-website"
            minlength="2"
            :required="true"
            :errorMessage="errorsBag.website"
          ></input-field>
        </div>
      </fieldset>
      <location
        v-model="formData.locationData"
        :errorMessage="errorsBag.locationData"
      ></location>
      <fieldset class="form__block">
        <div class="form__description">
          <p class="title title--h4">Description</p>
          <p class="form__text">Tell others a&nbsp;bit more about your company:</p>
          <p class="form__text">What is&nbsp;your mission &amp;&nbsp;vision?</p>
          <p class="form__text">What are your core values? Which projects are&nbsp;you working&nbsp;on? Make it&nbsp;a&nbsp;short pitch ;)</p>
        </div>
        <div class="form__content">
          <textarea-field
            v-model="formData.about"
            :errorMessage="errorsBag.about"
            name="description"
            placeholder="Description"
            rows="8"
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
            :options="benefits"
            v-model="formData.benefits"
            :label="$t('benefits').toString()"
            :placeholder="$t('benefits.placeholder').toString()"
            name="select-benefits"
            id="select-benefits"
          ></multi-select-field>
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
import PhotoField from "../../basic/form/PhotoField.vue";
import InputField from "../../basic/form/InputField.vue";
import CheckboxField from "../../basic/form/CheckboxField.vue";
import SelectField from "../../basic/form/SelectField.vue";
import MultiSelectField from "../../basic/form/MultiSelectField.vue";
import TextareaField from "../../basic/form/TextareaField.vue";
import Location from "../../basic/common/Location.vue";
import {mapGetters} from "vuex";
export default {
  name: "About",
  components: {
    PhotoField,
    InputField,
    CheckboxField,
    SelectField,
    MultiSelectField,
    TextareaField,
    Location
  },
  data: () => ({
    formId: "companyStep2",
    formData: {
      locationData: {
        country: "",
        city: ""
      },
      name: '',
      description: '',
      type: []
    },
    validationRules: {
      name: "required",
      numberOfEmployees: "required",
      website: "required",
      about: "required",
      locationData: "location"
    },
    employee_options: [
      { label: '1-9',value: '1-9' },
      { label: '10-24',value: '10-24' },
      { label: '25-49',value: '25-49' },
      { label: '50-99',value: '50-99' },
      { label: '100-999',value: '100-999' },
      { label: '1000+',value: '1000+' },
    ]
  }),
  computed: {
    ...mapGetters({
      domains: 'getDomains',
      benefits: 'getBenefits'  ,
      errors: 'errors/getErrorsBag'
    }),
    errorsBag() {
      return this.errors[this.formId];
    }
  },
  created() {
    if (process.client) {
      this.$api.company.getDetails().then((res) => {
        if (res.data.success) {
          this.formData = res.data.data;
          this.formData.locationData = res.data.data.location
          this.formData.numberOfEmployees = res.data.data.number_of_employees
        }
      })
      if (this.benefits.length === 0) {
        this.$api.common.getBenefits().then((res) => {
          if (res.data.success) {
            this.$store.dispatch('setBenefits', res.data.data);
          }
        });
      }
    }
  },
  watch: {
    'formData.logoSrc' () {
      this.formData.logo = this.formData.logoSrc
    }
  },
  methods: {
    submitForm() {
      if(this.validate(this.formId)) {
        let data = {
          logoSrc: this.logoSrc,
          name: this.formData.name,
          type: this.formData.type,
          domains: this.formData.domains,
          number_of_employees: this.formData.numberOfEmployees,
          website: this.formData.website,
          location: this.formData.locationData,
          about: this.formData.about,
          benefits: this.formData.benefits,
          step: 'about',
          id: this.formData.id
        }
        console.log(data)
        this.$api.company.updateCompany(data).then((res) => {
          if (res.data.success) {
            //console.log(res.data);
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
