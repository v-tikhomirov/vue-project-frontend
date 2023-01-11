<template>
  <form method="post" action="#">
    <fieldset class="form__block">
      <div class="form__description">
        <p class="title title--h4">Primary information</p>
      </div>
      <div class="form__content">
        <input-field
          v-model="formData.position"
          name="job-role"
          minlength="2"
          :label="$t('jobrole').toString()"
          :placeholder="$t('vacancy.position').toString()"
          :errorMessage="errorsBag.position"
        ></input-field>
        <multi-select-field
          v-model="formData.industry"
          :options="domains"
          :label="$t('industry').toString()"
          :placeholder="$t('industry').toString()"
          :errorMessage="errorsBag.industry"
        ></multi-select-field>

        <p class="form__groop-name">Preffered company type <span class="color-silver">(choose one or more)</span></p>
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
        <p class="form__groop-name">Select employment type</p>
        <div class="form__radio-buttons">
          <radio-button-field
            :label="$t('office.type.office').toString()"
            v-model="formData.office_type"
            id="office"
            radio-value="office"
            name="employment-type"
          ></radio-button-field>
          <radio-button-field
            :label="$t('office.type.remote').toString()"
            v-model="formData.office_type"
            id="remote"
            radio-value="remote"
            name="employment-type"
          ></radio-button-field>
          <radio-button-field
            :label="$t('office.type.hybrid.short').toString()"
            :tooltip="$t('office.type.hybrid.tooltip').toString()"
            v-model="formData.office_type"
            id="remote"
            radio-value="hybrid"
            name="employment-type"
          ></radio-button-field>
        </div>
        <p class="form__groop-name">I am currently</p>
        <div class="form__radio-buttons">
          <radio-button-field
            :label="$t('open.for.offers').toString()"
            v-model="formData.status"
            id="open"
            radio-value="open"
            name="searching-type"
          ></radio-button-field>
          <radio-button-field
            :label="$t('passive.search').toString()"
            v-model="formData.status"
            id="passively"
            radio-value="passive"
            name="searching-type"
          ></radio-button-field>
          <radio-button-field
            :label="$t('close.to.offers').toString()"
            v-model="formData.status"
            id="close"
            radio-value="close"
            name="searching-type"
          ></radio-button-field>
        </div>
        <template v-if="formData.office_type !== 'remote'">
          <p class="form__groop-name">Are you willing to&nbsp;relocate?</p>
          <div class="form__radio-buttons">
            <radio-button-field
              :label="$t('yes').toString()"
              v-model="formData.is_ready_to_relocate"
              id="relocate-yes"
              radio-value="yes"
              name="relocate-type"
            ></radio-button-field>
            <radio-button-field
              :label="$t('no').toString()"
              v-model="formData.is_ready_to_relocate"
              id="relocate-no"
              radio-value="no"
              name="relocate-type"
            ></radio-button-field>
          </div>
        </template>
      </div>
    </fieldset>
    <language
      v-model="formData.languages"
      :errorMessage="errorsBag.languages"
    ></language>
    <fieldset class="form__block">
      <div class="form__description">
        <p class="title title--h4">Salary</p>
        <p class="form__text">Salary range is&nbsp;used to&nbsp;find you the best offers. <br> Fill the <b>Salary</b> field to&nbsp;state your desired monthly salary. It&nbsp;will be&nbsp;shown in&nbsp;your&nbsp;CV.<br><br></p>
        <p class="form__text"><b>Salary min</b>. field will be&nbsp;used to&nbsp;match you with employers, who are willing to&nbsp;pay no&nbsp;less than the stated minimum (will not be&nbsp;publicly displayed in&nbsp;your&nbsp;CV).</p>
      </div>
      <div class="form__content">
        <select-field
          v-model="formData.currency"
          :options="[
                {
                  value: 'USD',
                  label: 'Dollar'
                }
              ]"
          :label="$t('select.currency').toString()"
          :placeholder="$t('currency').toString()"
          :errorMessage="errorsBag.currency"
        ></select-field>
        <input-field
          v-model="formData.desired_salary"
          :label="$t('salary').toString()"
          :placeholder="$t('in.selected.currency').toString()"
          type="number"
          name="salary"
          minlength="2"
          :errorMessage="errorsBag.desired_salary"
        ></input-field>
        <input-field
          v-model="formData.minimal_salary"
          :label="$t('salary.min').toString()"
          :placeholder="$t('in.selected.currency').toString()"
          type="number"
          name="salary-min"
          minlength="2"
          :errorMessage="errorsBag.minimal_salary"
        ></input-field>
      </div>
    </fieldset>
    <fieldset class="form__block">
      <div class="form__description">
        <p class="title title--h4">About you</p>
      </div>
      <div class="form__content">
        <textarea-field
          v-model="formData.about"
          :placeholder="$t('cv.about.placeholder').toString()"
          :errorMessage="errorsBag.about"
        ></textarea-field>
      </div>
    </fieldset>
  </form>
</template>

<script>
import Language from "~/components/basic/common/Language.vue";
import RadioButtonField from "~/components/basic/form/RadioButtonField.vue";
import InputField from "~/components/basic/form/InputField.vue";
import MultiSelectField from "~/components/basic/form/MultiSelectField.vue";
import SelectField from "~/components/basic/form/SelectField.vue";
import TextareaField from "~/components/basic/form/TextareaField.vue";
import CheckboxField from "~/components/basic/form/CheckboxField.vue";
import {mapGetters} from 'vuex';
export default {
  name: "Primary",
  components: {
    Language,
    RadioButtonField,
    InputField,
    MultiSelectField,
    SelectField,
    TextareaField,
    CheckboxField
  },
  props: {
    value: {
      required: false
    },
    formId: {
      required: true
    }
  },
  data: () => ({
    formData: {
      position: '',
      industry: '',
      type: [],
      office_type: '',
      status: '',
      is_ready_to_relocate: '',
      languages: [],
      currency: 'USD',
      desired_salary: '',
      minimal_salary: '',
      about: ''
    },
  }),
  watch: {
    formData: {
      handler(newVal) {
        this.$emit('input', newVal);
      },
      deep: true
    },
    value() {
      this.fillFormData()
    }
  },
  computed: {
    ...mapGetters({
      domains: 'getDomains',
      errors: 'errors/getErrorsBag'
    }),
    errorsBag() {
      return this.errors[this.formId];
    }
  },
  mounted(){
    if (this.domains.length === 0) {
      this.$api.common.getDomains().then((res) => {
        if (res.data.success) {
          this.$store.dispatch('setDomains', res.data.data);
        }
      });
    }
    this.fillFormData();
  },
  methods: {
    fillFormData() {
      if (!this._.isEqual(this.value, this.formData)) {
        this.formData = this.value;
      }
    },
  }
}
</script>

<style scoped>

</style>
