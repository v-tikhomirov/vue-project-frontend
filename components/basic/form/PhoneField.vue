<template>
  <div class="custom-phone">
    <div class="not-empty custom-select custom-phone__country-code" :class="isOpen ? 'is-open' : '' ">
      <button class="custom-select__button" type="button" aria-label="Choose an option" v-if="!isOpen ? 'is-open' : ''" @click.stop="toggleBox()">
        <span class="custom-select__text">&nbsp;{{ selectedValue.dial_code }}
          <picture class="custom-select__item-icon">
            <source type="image/webp" :srcset="'flags/' + getImageLink(selectedValue) + '.svg'"><img :src="'flags/' + getImageLink(selectedValue) + '.svg'" width="24" height="24" alt="">
          </picture>
        </span>
        <span class="custom-select__icon"></span>
      </button>
      <input v-else class="phoneCodeInput" v-model="keywords" ref="phoneCodeInput"/>
      <ul class="custom-select__list" role="listbox" v-click-outside="closeOptions">
        <li class="custom-select__item" tabindex="0" aria-selected="true" role="option" v-for="code in phoneCodes" @click="selectValue(code)">{{ code.dial_code }}
          <picture class="custom-select__item-icon">
            <img :src="'flags/' + getImageLink(code) + '.svg'" width="24" height="24" alt="">
          </picture>
        </li>
      </ul>
    </div>
    <div :class="[errorMessage.key ? 'custom-input is-invalid' : 'custom-input']">
      <label><span class="custom-input__label">Phone number</span>
        <input type="tel" placeholder="234 567-89-00" pattern="[0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}" required v-model="number">
      </label>
      <div class="custom-input__error" v-if="errorMessage.key">{{ $t(errorMessage.key) }}</div>
    </div>
  </div>
</template>

<script>
import phone_codes from "./data/phoneCodes.js";
export default {
  name: "PhoneField",
  props: {
    value: {
      country_code: {
        type: String,
        default: ''
      },
      phone: {
        type: String,
        default: null
      }
    },
    errorMessage: {
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      isOpen: false,
      keywords: '',
      originalPhoneCodes: phone_codes,
      selectedValue: {
        "name": "United States",
        "dial_code": "+1",
        "code": "US"
      },
      number: '',
      phoneData: null
    }
  },
  mounted() {
    if (this.value) {
      this.fillValue();
    }
  },
  computed: {
    phoneCodes() {
      if (this.keywords === '') {
        return this.originalPhoneCodes;
      }
      return this.originalPhoneCodes.filter(phoneCode => phoneCode.dial_code.includes(this.keywords) || phoneCode.name.toLowerCase().includes(this.keywords.toLowerCase()))
    }
  },
  watch: {
    number() {
      this.phoneData = {
        country_code: this.selectedValue.dial_code,
        phone: this.number
      }
      this.$emit('input', this.phoneData)
    },
    value: {
      handler(value) {
        if (value) {
          this.fillValue();
        }
      },
      deep: true
    }
  },
  methods: {
    fillValue() {
      const selected = this.originalPhoneCodes.find((phoneCode) => {
        return phoneCode.dial_code === this.value.country_code
      });
      if (selected) {
        this.selectedValue = selected;
        this.number = this.value.phone
      }
    },
    getImageLink(entity) {
      if (entity) {
        return entity.name.replace(/\ /g, '').toLowerCase();
      }
      return '';
    },
    toggleBox() {
      this.isOpen = !this.isOpen
      this.keywords = ''
      if(this.isOpen) this.$nextTick(() => this.$refs.phoneCodeInput.focus())
    },
    closeOptions() {
      this.isOpen = false
      this.keywords = ''
    },
    selectValue(value) {
      this.selectedValue = value
      this.closeOptions()
      this.phoneData = {
        country_code: this.selectedValue.dial_code,
        phone: this.number
      }
      this.$emit('input', this.phoneData)
    }
  }
}
</script>

<style scoped lang="scss">
  .phoneCodeInput {
    padding: 11px;
    border: 1px solid #bdbdbd;
    border-radius: 8px 0 0 8px;
    width: 84px;
    height: 48px;
  }
</style>
