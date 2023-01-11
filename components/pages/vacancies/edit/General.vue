<template>
  <form>
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
        ></input-field>
        <multi-select-field
          v-model="formData.industry"
          :options="domains"
          :label="$t('industry').toString()"
          :placeholder="$t('industry').toString()"
        ></multi-select-field>
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
        <template v-if="formData.office_type !== 'remote'">
          <p class="form__groop-name">Would you like to&nbsp;offer a&nbsp;relocation?</p>
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
        <input-field
          v-if="formData.is_ready_to_relocate === 'yes'"
          v-model="formData.relocation_benefits"
          label="Relocation benefits (optional)"
          name="relocation-benefits"
          minlength="2"
          placeholder="Relocation benefits"
        ></input-field>
      </div>
    </fieldset>
    <location
      alt-text="Choose an office location for this job"
      v-model="formData.location"
    ></location>
    <language
      v-model="formData.languages"
    ></language>
    <fieldset class="form__block">
      <div class="form__description">
        <p class="title title--h4">Salary</p>
        <p class="form__text"><b>Salary</b> range is used to find the best match for your offer. Salary field will be shown in the job description.<br><br></p>
        <p class="form__text"><b>Salary max.</b> field will be used to match you with candidates, whose salary expectations are less than or equal to the maximum you specified.</p>
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
        ></select-field>
        <input-field
          v-model="formData.desired_salary"
          :label="$t('salary').toString()"
          :placeholder="$t('in.selected.currency').toString()"
          type="number"
          name="salary"
          minlength="2"
        ></input-field>
        <input-field
          v-model="formData.max_salary"
          :label="$t('salary.max').toString()"
          :placeholder="$t('in.selected.currency').toString()"
          type="number"
          name="salary-max"
          minlength="2"
        ></input-field>
      </div>
    </fieldset>
    <fieldset class="form__block">
      <div class="form__description">
        <p class="title title--h4">Description</p>
        <p class="form__text">Use this opportunity to give extra details about your job offer. Specify responsabilities, state your expectations and a skill set that is required for this position.</p>
      </div>
      <div class="form__content">
        <textarea-field
          v-model="formData.description"
          :placeholder="$t('enter.job.description').toString()"
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
          :options="benefits"
          :label="$t('benefits').toString()"
          :placeholder="$t('benefits.placeholder').toString()"
        ></multi-select-field>
      </div>
    </fieldset>
  </form>
</template>

<script>
import Location from "~/components/basic/common/Location.vue";
import Language from "~/components/basic/common/Language.vue";
import RadioButtonField from "~/components/basic/form/RadioButtonField.vue";
import InputField from "~/components/basic/form/InputField.vue";
import MultiSelectField from "~/components/basic/form/MultiSelectField.vue";
import SelectField from "~/components/basic/form/SelectField.vue";
import TextareaField from "~/components/basic/form/TextareaField.vue";
import {mapGetters} from 'vuex';

export default {
  name: "General",
  components: {
    SelectField,
    Language,
    Location,
    RadioButtonField,
    InputField,
    MultiSelectField,
    TextareaField
  },
  props: {
    value: {
      required: false
    }
  },
  data: () => ({
    formData: {
      position: '',
      industry: '',
      office_type: '',
      is_ready_to_relocate: '',
      relocation_benefits: '',
      location: {},
      currency: 'USD',
      desired_salary: '',
      max_salary: '',
      description: '',
      benefits: '',
      languages: []
    }
  }),
  computed: {
    ...mapGetters({
      domains: 'getDomains',
      benefits: 'getBenefits'
    })
  },
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
  mounted(){
    if (this.domains.length === 0) {
      this.$api.common.getDomains().then((res) => {
        if (res.data.success) {
          this.$store.dispatch('setDomains', res.data.data);
        }
      });
    }
    if (this.benefits.length === 0) {
      this.$api.common.getBenefits().then((res) => {
        if (res.data.success) {
          this.$store.dispatch('setBenefits', res.data.data);
        }
      });
    }
    if (this.$store.getters["vacancy/getDraft"]) {
      this.formData = Object.assign({},this.$store.getters["vacancy/getDraft"]);
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
