<template>
  <fieldset class="form__block">
    <div class="form__description">
      <p class="title title--h4">{{ $t('location') }}</p>
      <p class="form__text" v-if="altText">{{ altText }}</p>
    </div>
    <div class="form__content">
      <select-field
        v-model="formData.country"
        :options="countries"
        :label="$t('country').toString()"
        :placeholder="$t('country').toString()"
        required="required"
        @change="handleCountryChange"
        :error-message="errorMessage"
      ></select-field>
      <select-field
        v-model="formData.city"
        required="required"
        :options="cities"
        :label="$t('city').toString()"
        :placeholder="$t('city').toString()"
        @change="handleCityChange"
        :error-message="errorMessage"
      ></select-field>
    </div>
  </fieldset>
</template>

<script>
import SelectField from "../form/SelectField.vue";
import { mapGetters } from 'vuex';

export default {
  name: "Location",
  components: {
    SelectField
  },
  props: {
    errorMessage: {
      required: false,
      default: () => ({})
    },
    altText: {
      type: String,
      required: false
    },
    value: {
      required: false
    },
    formId: {
      type: String
    }
  },
  data: () => ({
    formData: {
      city: '',
      country: ''
    },
  }),
  computed: {
    ...mapGetters({
      countries: 'getCountries',
      cities: 'getCities',
    }),
  },
  watch: {
    value(newValue) {
      this.setFormData(newValue);
    }
  },
  created() {
    if (process.client) {
      if (this.countries.length === 0) {
        this.$api.common.getCountries().then((res) => {
          if (res.data.success) {
            this.$store.dispatch('setCountries', res.data.data)
            if (this.value && this.value.hasOwnProperty('country')) {
              this.loadCities({value: this.value.country});
            }
          }
        });
      }
    }
  },
  mounted() {
    if (this.value) {
      this.setFormData(this.value);
    }
  },
  methods: {
    setFormData(value) {
      if (value && value.hasOwnProperty('city') && value.hasOwnProperty('country')) {
        this.formData = value;
        if (this.cities.length === 0) {
          this.loadCities({value: value.country});
        }
      }
    },
    handleCountryChange(item) {
      this.formData.city = '';
      this.loadCities(item);
      this.emitFirmData();
    },
    handleCityChange() {
      this.emitFirmData();
    },
    loadCities(item) {
      if(item.value) {
        this.$api.common.getCitiesByCountry(item.value).then((res) => {
          if (res.data.success) {
            this.$store.dispatch('setCities', res.data.data);
          }
        });
      }
    },
    emitFirmData() {
      this.$emit('input', this.formData);
      this.$emit('change', this.formData);
    }
  }
}
</script>

<style scoped>

</style>
