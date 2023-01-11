<template>
  <div :class="[errorMessage.key ? 'custom-input is-invalid' : 'custom-input']">
    <label><span class="custom-input__label">{{ label }} <span v-if="required" class="color-red">*</span><span v-if="optional" class="color-silver">(optional)</span></span>
      <input
        :type="type"
        :value="value"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :minlength="minlength"
        :required="required"
        @input="$emit('input', $event.target.value)"
      >
    </label>
    <div class="custom-input__error" v-if="errorMessage.key">{{ $t(errorMessage.key) }}</div>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      required: true,
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
    minlength: {
      type: [Number, String, Boolean],
      required: false,
      default: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    optional: {
      type: Boolean,
      required: false,
      default: false
    },
    errorMessage: {
      required: false,
      default: () => ({})
    }
  },
}
</script>

<style scoped>

</style>
