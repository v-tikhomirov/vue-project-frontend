<template>
  <div class="custom-toggle custom-toggle--radio">
    <label>
      <input type="radio" :id="id" :name="name" :value="radioValue" :checked="checked" @change="selected"><span class="custom-toggle__label">{{ label }}</span>
    </label>
    <div v-if="tooltip" class="custom-toggle__message">
      <p class="custom-toggle__message-text">Hybrid stands for part time office and part time remote employment</p>
    </div>
  </div>
</template>

<script>
import fieldMixin from '~/mixins/basic/form/field.js'
export default {
  name: "RadioButtonField",
  mixins: [fieldMixin],
  props: {
    radioValue: {
      type: String,
      required: true,
    },
    tooltip: {
      type: [String, Boolean],
      required: false,
      default: false
    }
  },
  computed: {
    checked() {
      return this.value === this.radioValue;
    }
  },
  methods: {
    selected() {
      this.$emit('input', this.radioValue);
    }
  }
}
</script>

<style scoped>

</style>
