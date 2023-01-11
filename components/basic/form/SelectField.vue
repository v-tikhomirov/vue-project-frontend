<template>
  <div class="custom-select" :class="{'is-open': isOpen, 'not-empty': notEmpty, 'is-invalid': errorMessage.key}"
       data-select
       data-validate-type="select"
       :data-name="name"
       :data-id="id">
    <span class="custom-select__label">{{ label }}</span>
    <span v-if="errorMessage.key" class="custom-select__error">{{ $t(errorMessage.key) }}</span>
    <button class="custom-select__button" type="button" aria-label="Choose an option" @click.stop="toggleOpen">
      <input type="text" class="custom-select__text" v-model="query">
      <span class="custom-select__icon"></span>
      <span class="custom-select__placeholder">{{ placeholder }}</span>
    </button>
    <ul class="custom-select__list" role="listbox" v-click-outside="closeOptions">
      <li v-for="item in filteredOptions"
          @click="selectOption(item)"
          class="custom-select__item"
          tabindex="0"
          :data-select-value="item.value"
          :aria-selected="item.label === selected_text ? 'true' : 'false'"
          role="option">{{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SelectField",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      required: false,
    },
    options: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    id: {
      type: String,
      required: false,
      default: 'input'
    },
    name: {
      type: String,
      required: false,
      default: 'input'
    },
    placeholder: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    errorMessage: {
      required: false,
      default: () => ({})
    }
  },
  data: () => ({
    isOpen: false,
    query: '',
    selected_text: null,
  }),
  watch: {
    query() {
      if (this.selected_text !== this.query) {
        this.selected_text = null;
        this.$emit('input', '')
      }
    },
    value() {
      this.setValue()
    },
    options() {
      this.setValue();
    }
  },
  computed: {
    notEmpty() {
      return (this.selected_text || this.query);
    },
    filteredOptions() {
      if (this.selected_text === this.query || this.query === '') {
        return this.options;
      }

      return  this.options.filter((item) => {
        return item.label.toLowerCase().includes(this.query.toLowerCase());
      }).sort((a,b) => {
        const sub = a.label.toLowerCase().replace(this.query, '');
        const sub2 = b.label.toLowerCase().replace(this.query, '');
        if (sub.length > sub2.length) {
          return 1
        } else if (sub.length < sub2.length) {
          return -1
        } else {
          return 0;
        }
      })
    }
  },
  mounted() {
    if (this.value) {
      this.setValue();
    }
  },
  methods: {
    setValue() {
      if (this.value) {
        const option = this.options.find((item) => {
          if (this.isNumeric(this.value)) {
            return parseInt(item.value) === parseInt(this.value);
          } else {
            return item.value === this.value;
          }
        });
        if (option) {
          this.selected_text = option.label;
          this.query = option.label;
        }
      } else {
        this.query = '';
        this.selected_text = null;
      }
    },
    toggleOpen() {
      this.isOpen = true
    },
    closeOptions() {
      this.isOpen = false
      this.query = this.selected_text;
    },
    selectOption(item) {
      this.selected_text = item.label;
      this.query = item.label;
      this.isOpen = false;
      this.$emit('input', item.value)
      this.$emit('change', item);
    }
  }
}
</script>

<style scoped>

</style>
