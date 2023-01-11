<template>
  <fieldset class="form__block">
    <div class="form__description">
      <p class="title title--h4">Language</p>
    </div>
    <div class="form__content">
      <div v-for="(item, i) in formData" :class="[ i > 0 ? 'form__additional' : '']">
        <button v-if="i > 0" class="btn btn--only-icon btn--border-none form__btn-close" type="button" aria-label="Close select additional language" @click="removeLanguage(i)">
          <span class="btn__text"></span>
          <span class="btn__icon">
              <svg width="12" height="12" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
              </svg>
          </span>
        </button>
        <select-field
          :options="languages"
          v-model="formData[i].language_id"
          :label="i === 0 ? $t('select.language').toString() : $t('select.language.additional').toString()"
          :placeholder="$t('language').toString()"
          @change="handleChange"
          :errorMessage="errorMessage"
        ></select-field>
        <select-field
          v-model="formData[i].level"
          :options="level"
          :label="i === 0 ? $t('choose.level').toString() : $t('choose.level.additional').toString()"
          :placeholder="$t('level').toString()"
          @change="handleChange"
          :errorMessage="errorMessage"
        ></select-field>
      </div>
      <button class="btn btn--icon-left btn--border-none form__btn-add" type="button" @click="addLanguage">
        <span class="btn__text">Add new</span>
        <span class="btn__icon">
          <svg width="16" height="16" aria-hidden="true">
            <use xlink:href="#icon-plus"></use>
          </svg>
        </span>
      </button>
    </div>
  </fieldset>
</template>

<script>
import SelectField from "../form/SelectField.vue";
import {mapGetters} from "vuex";
export default {
  name: "Language",
  components: {
    SelectField
  },
  props: {
    value: {
      type: Array,
      required: false
    },
    errorMessage: {
      required: false,
      default: () => ({})
    }
  },
  data: () => ({
    formData: [
      {
        language_id: '',
        level: ''
      }
    ],
    // languages: [],
    level: [
      {
        value: 'a1',
        label: 'A1'
      },
      {
        value: 'a2',
        label: 'A2'
      },
      {
        value: 'b1',
        label: 'B1'
      },
      {
        value: 'b2',
        label: 'B2'
      },
      {
        value: 'c1',
        label: 'C1'
      },
      {
        value: 'c2',
        label: 'C2'
      }
    ]
  }),
  watch: {
    value() {
      this.setFormData();
    }
  },
  computed: {
    ...mapGetters({
      languages: 'getLanguages'
    })
  },
  mounted() {
    if (this.languages.length === 0) {
      this.$api.common.getLanguages().then((res) => {
        if (res.data.success) {
          this.$store.dispatch('setLanguages', res.data.data)
        }
      });
    }
  },
  methods: {
    setFormData() {
      if (this.value && this.value.length > 0) {
        this.formData = this.value;
      }
    },
    addLanguage() {
      this.formData.push({
        language_id: '',
        level: ''
      });
    },
    removeLanguage(index) {
      this.formData.splice(index,1);
    },
    handleChange() {
      this.$emit('input', this.formData);
      this.$emit('change', this.formData);
    }
  }
}
</script>

<style scoped>

</style>
