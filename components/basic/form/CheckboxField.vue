<template>
  <div class="custom-toggle custom-toggle--checkbox">
    <label>
      <input type="checkbox" :value="value" :id="id" :name="name" v-model="proxyChecked">
      <span class="custom-toggle__icon">
        <svg width="22" height="23" aria-hidden="true">
          <use xlink:href="#uncheck-checkbox"></use>
        </svg>
      </span>
      <span class="custom-toggle__icon custom-toggle__icon--checked">
        <svg width="22" height="22" aria-hidden="true">
          <use xlink:href="#checked-checkbox"></use>
        </svg>
      </span>
      <span class="custom-toggle__label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckboxField",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      default: null
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
    checked: {
      type: [Array, Boolean],
      default: false
    },
  },
  computed: {
    proxyChecked: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
}
</script>

<style scoped>

</style>
