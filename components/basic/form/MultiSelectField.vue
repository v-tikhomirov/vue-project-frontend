<template>
  <div class="custom-select custom-select-up" :class="{'is-open': isOpen, 'not-empty': notEmpty, 'is-invalid': errorMessage.key}"
       data-select
       data-validate-type="select"
       :data-name="name"
       :data-id="id"
       data-multiple="true">
    <span class="custom-select__label">{{ label }} <span v-if="required" class="color-red">*</span></span>
    <span v-if="errorMessage.key" class="custom-select__error">{{ $t(errorMessage.key) }}</span>
    <div class="custom-select__selected-list-container" :class="{'not-empty': notEmpty}">
      <ul class="custom-select__selected-list" role="listbox">
        <li
          v-for="element in selected_items"
          class="custom-select__selected-list-item"
          tabindex="0"
          :data-select-value="element.value"
          aria-selected="true"
          role="option"
          @click="removeOption(element)"
        >{{ element.label }}</li>
      </ul>
    </div>
    <button class="custom-select__button" type="button" aria-label="Choose an option" @click.stop="toggleOpen">
      <input type="text" class="custom-select__text" v-model="query">
      <span class="custom-select__icon"></span>
      <span v-if="!query" class="custom-select__placeholder">{{ placeholder }}</span>
    </button>
    <ul class="custom-select__list" role="listbox" v-click-outside="closeOptions">
      <li
        v-for="item in filteredOptions"
        @click="selectOption(item)"
        class="custom-select__item"
        tabindex="0"
        :data-select-value="item.value"
        aria-selected="false"
        role="option">{{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MultiSelectField",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      required: true,
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
    query: null,
    selected_items: [],
  }),
  watch: {
    options() {
      if (this.value) {
        this.fillSelected();
      }
    },
    value(val) {
      if (val) {
        this.fillSelected();
      }
    }
  },
  computed: {
    notEmpty() {
      return this.selected_items.length > 0;
    },
    filteredOptions() {
      if (this.query === null) {
        return this.optionsWithoutSelected;
      }
      return this.optionsWithoutSelected.filter((element) => {
        return element.label.toLowerCase().includes(this.query.toLowerCase());
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
    },
    optionsWithoutSelected() {
      return this.options.filter((element) => {
        return this.selected_items.findIndex((item) => {
          if (element.label === item.label && item.value === element.value) {
            return true;
          }
        }) === -1
      })
    },
    formData() {
      return this.selected_items.map((item) => {
        return item.value;
      })
    }
  },
  mounted() {
    if (this.value) {
      this.fillSelected()
    }
  },
  methods: {
    fillSelected() {
      this.selected_items = this.options.filter((item) => {
        return this.value.includes(item.value);
      })
    },
    toggleOpen() {
      this.isOpen = true
    },
    closeOptions() {
      this.isOpen = false
      this.query = null;
    },
    selectOption(item) {
      const index = this.selected_items.findIndex((element) => {
        if (element.label === item.label && item.value === element.value) {
          return true;
        }
      });
      if (index === -1) {
        this.selected_items.push(item);
      }
      this.query = null;
      this.$emit('input', this.formData)
    },
    removeOption(item) {
      const index = this.selected_items.findIndex((element) => {
        if (element.label === item.label && item.value === element.value) {
          return true;
        }
      });

      if (index !== -1) {
        this.selected_items.splice(index, 1);
      }
      this.$emit('input', this.formData)
    }
  }
}
</script>

<style scoped>

</style>
