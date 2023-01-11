<template>
  <div class="custom-date" :class="{'is-invalid': errorMessage.key}" data-date data-validate-type="date" data-name="user-birthday" data-id="id-user-birthday">
    <span class="custom-date__label">{{ label }} <span v-if="required" class="color-red">*</span></span>
    <div class="custom-date__container">
      <div class="custom-input">
        <label>
          <input type="text" minlength="1" maxlength="2" placeholder="Day" pattern="[0-9]{1,2}" @change="change" v-model="day">
        </label>
      </div>
      <div class="custom-select" :class="{'is-open': isOpen, 'not-empty': month}"
           data-select
           data-validate-type="select">
        <button class="custom-select__button" type="button" aria-label="Choose an option" @click.stop="toggleBox">
          <span class="custom-select__text" v-if="!!month">{{ month }}</span>
          <span class="custom-select__icon"></span>
          <span class="custom-select__placeholder" v-if="!month">{{ defaultLabel }}</span>
        </button>
        <ul class="custom-select__list" role="listbox" v-click-outside="closeOptions">
          <li class="custom-select__item"
              tabindex="0"
              :data-select-value="'id-' + index"
              aria-selected="false"
              role="option"
              @click="selectOption(item, index)"
              v-for="(item, index) in months">
            {{ item}}
          </li>
        </ul>
      </div>
      <div class="custom-input">
        <label>
          <input type="text" minlength="4" maxlength="4" placeholder="Year" pattern="[0-9]{4}" @change="change" v-model="year">
        </label>
      </div>
    </div>
    <span v-if="errorMessage.key" class="custom-date__error">{{ $t(errorMessage.key) }}</span>
  </div>
</template>

<script>
export default {
  name: "DateSelectField",
  props: {
    label: {
      default: ''
    },
    required: {
      type: Boolean,
      default: false,
      required: false
    },
    defaultDate: {
      type: String,
      default: null
    },
    value: {
      default: null
    },
    errorMessage: {
      required: false,
      default: () => ({})
    }
  },
  watch: {
    defaultDate() {
      if(this.defaultDate) {
        const dateArray = this.defaultDate.split('-')
        console.log(dateArray)
        if(!!dateArray) {
          this.year = dateArray[0]
          this.day = dateArray[2]
          this.month = this.months[parseInt(dateArray[1])]
        }
      }
    },
    value(value) {
      if (value) {
        this.parseValue(value);
      }
    }
  },
  mounted() {
    if (this.value) {
      this.parseValue(this.value);
    }
  },
  data: () => ({
    isOpen: false,
    month: null,
    monthNumber: null,
    day: null,
    year: null,

    defaultLabel: "Month",
    months: {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    }
  }),
  computed: {
    date() {
      if(parseInt(this.monthNumber ) < 10) this.monthNumber = '0' + parseInt(this.monthNumber)
      return this.year + '-' + this.monthNumber + '-' + this.day
    }
  },
  methods: {
    parseValue(value) {
      if (typeof value === 'string') {
        const date = value.split('-');
        this.year = date[0];
        this.monthNumber = parseInt(date[1]);
        this.month = this.months[this.monthNumber];
        this.day = date[2];
      }
    },
    toggleBox() {
      this.isOpen = !this.isOpen
    },
    closeOptions() {
      this.isOpen = false;
    },
    selectOption(item, index) {
      this.month = item;
      this.monthNumber = index
      this.isOpen = false;
      this.tryToEmit();
    },
    change() {
      this.tryToEmit();
    },
    tryToEmit() {
      if (
        this.year &&
        this.month &&
        this.day
      ) {
        this.$emit('input', this.date)
      }
    }
  }
}
</script>

<style scoped>

</style>
