<template>
  <div class="custom-select custom-select-up" :class="{'not-empty': notEmpty, 'is-open': isOpen}" data-select data-validate-type="select" data-name="select-languages" data-id="id-languages" data-multiple="true" data-editable="true">
    <span class="custom-select__label">{{ label }}</span>
    <span class="custom-select__error">Select languages</span>
    <div class="custom-select__selected-list-container" :class="{'not-empty': notEmpty}">
      <ul class="custom-select__selected-list" role="listbox">
        <li class="custom-select__selected-list-item is-editable"
            v-for="item in selected_items"
            data-select-value="id-1"
            aria-selected="true"
            role="option">
          <div class="not-empty custom-select custom-select-edit" :class="[item.value === openExp ? 'is-open': '', item.experience ? 'has-value' : '']"  data-select>
            <span class="custom-select__label">Experience</span>
            <button class="custom-select__button" type="button" aria-label="Choose an option" @click.stop="openExpSelect(item)">
              <span v-if="item.experience" class="custom-select__text">{{ getExpLabel(item) }}</span>
              <span class="custom-select__icon"></span>
              <span class="custom-select__placeholder">Your Experience</span>
            </button>
            <ul class="custom-select__list" role="listbox" v-click-outside="closeExp">
              <li class="custom-select__selected-text-item">
                <p class="custom-select__selected-text">{{ getExpLabel(item) }}</p>
                <button class="btn btn--only-icon btn--border-none custom-select__list-close" type="button" aria-label="Close list" @click="closeSelect(item)">
                  <span class="btn__text"></span>
                </button>
              </li>
              <li v-for="expItem in expValues"
                  class="custom-select__item"
                  tabindex="0"
                  :data-select-value="expItem.value"
                  aria-selected="false"
                  role="option"
                  @click="setExperience(item, expItem.value)"
              >{{ expItem.label }}
              </li>
<!--              <li class="custom-select__item custom-select__item&#45;&#45;edit" data-select-value="id-new" aria-selected="false" role="option">-->
<!--                <div class="custom-input custom-select__selected-list-edit">-->
<!--                  <label><span class="custom-input__label">Exact exp.</span>-->
<!--                    <input-->
<!--                      @click.stop-->
<!--                      @input="handleCustomExp($event, item)"-->
<!--                      @keyup.enter="closeExp"-->
<!--                      type="text"-->
<!--                      v-mask="'##/##'"-->
<!--                      placeholder="year / month">-->
<!--                  </label>-->
<!--                </div>-->
<!--              </li>-->
            </ul>
          </div>
          <div class="custom-select__popup">
            <p>You can fill out your skillset, and specify the experience you have with that particular technology from the dropdown menu.</p>
            <p>This data will help us match you&nbsp;with the best possible job opportunity.</p><img src="/img/svg/popup-fragment.svg" srcset="/img/svg/popup-fragment@2x.svg 2x" width="8" height="8" alt="Decorative image">
          </div>
          <p class="custom-select__item-text">{{ item.label }}</p>
          <button class="btn btn--only-icon btn--border-none custom-select__item-close" type="button" aria-label="Close list" @click="removeOption(item)">
            <span class="btn__text"></span>
            <span class="btn__icon">
              <svg width="15" height="15" aria-hidden="true">
                <use xlink:href="#icon-close2"></use>
              </svg>
            </span>
          </button>
        </li>
      </ul>
    </div>
    <button class="custom-select__button" type="button" aria-label="Choose an option" @click.stop="toggleOpen">
      <input type="text" class="custom-select__text" v-model="query">
      <span class="custom-select__icon"></span>
      <span v-if="!query" class="custom-select__placeholder">Stack</span>
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
  name: "SkillField",
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
    }
  },
  data: () => ({
    query: null,
    isOpen: false,
    openExp: null,
    selected_items: [],
    expValues: [
      {
        label: '0-1 year',
        value: '12',
      },
      {
        label: '1-2 years',
        value: '24',
      },
      {
        label: '2-3 years',
        value: '36',
      },
      {
        label: '3-4 years',
        value: '58',
      },
      {
        label: '5-6 years',
        value: '72',
      },
      {
        label: '7+ years',
        value: '100',
      }
    ]
  }),
  watch: {
    options() {
      if (this.value) {
        this.fillSelected(this.value)
      }
    },
    value(value) {
      this.fillSelected(value)
    }
  },
  computed: {
    loadedGroups() {
      return this.$store.state.technologies.loadedGroups;
    },
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
      if (this.notEmpty) {
        return this.options.filter((element) => {
          return this.selected_items.findIndex((item) => {
            if (element.label === item.label && item.value === element.value) {
              return true;
            }
          }) === -1
        })
      }
      return this.options;
    },
  },
  mounted() {
    if (this.value) {
      this.fillSelected(this.value)
    }
  },
  methods: {
    fillSelected(value) {
      const ids = value.map((item) => {
        return item.technology_id
      });
      const filtered = this.options.filter((item) => {
        return ids.includes(item.value);
      });
      this.selected_items = filtered.map((item) => {
        const valueItem = this.value.find((x) => {
          return item.value === x.technology_id;
        })
        item.experience = valueItem.experience;
        return item;
      })
    },
    toggleOpen() {
      this.isOpen = true
    },
    closeOptions() {
      this.isOpen = false
    },
    getFormData() {
      return this.selected_items.map((item) => {
        return {
          technology_id: item.value,
          experience: item.experience
        }
      });
    },
    selectOption(item) {
      const index = this.selected_items.findIndex((element) => {
        if (element.label === item.label && item.value === element.value) {
          return true;
        }
      });
      if (index === -1) {
        this.selected_items.push(Object.assign({},item));
        if (item.is_root && !this.isGroupLoaded(item.group)) {
          this.$api.technology.getTechnologiesByGroup(item.group).then((res) => {
            if (res.data.success) {
              this.$store.dispatch('setTechnology', res.data.data);
              this.$store.dispatch('setGroupLoaded', item.group);
            }
          });
        }
      }
      this.query = null;
      this.$emit('input', this.getFormData())
      this.$emit('change', this.getFormData())
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
      this.$emit('input', this.getFormData())
      this.$emit('change', this.getFormData())
    },
    closeSelect(item) {
      delete item.isOpen;
    },
    openExpSelect(item) {
      this.openExp = item.value;
      const index = this.findSelectedItemIndex(item)
      if (index !== -1) {
        this.selected_items[index].isOpen = true;
      }
    },
    closeExp() {
      this.openExp = null;
    },
    setExperience(item, value) {
      const index = this.findSelectedItemIndex(item)
      if (index !== -1) {
        this.selected_items[index].experience = value;
        this.$emit('input', this.getFormData())
        this.$emit('change', this.getFormData())
      }
      this.closeExp();
    },
    getExpLabel(item) {
      if (item.experience) {
        const tmp = this.expValues.find((x) => {
          return parseInt(x.value) === parseInt(item.experience);
        })

        return tmp ? tmp.label : item.experience;
      }
      return '';
    },
    handleCustomExp(event, item) {
      const value = event.target.value;
      const index = this.findSelectedItemIndex(item)
      if (index !== -1) {
        this.selected_items[index].experience = value;
        this.$emit('input', this.getFormData())
        this.$emit('change', this.getFormData())
      }
    },
    findSelectedItemIndex(item) {
      return this.selected_items.findIndex(x => x.value === item.value);
    },
    isGroupLoaded(group) {
      return this.loadedGroups.includes(group);
    }
  }
}
</script>

<style scoped>

</style>
