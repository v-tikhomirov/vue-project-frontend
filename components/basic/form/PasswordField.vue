<template>
  <div :class="[errorMessage.key ? 'custom-input is-invalid' : 'custom-input']" data-eye-crossed>
    <label><span class="custom-input__label">{{ label }}</span>
      <input
        :type="showPassword ? 'text' : 'password'"
        :id="id"
        :value="value"
        :name="name"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      >
      <svg width="21" height="19" aria-hidden="true" @click.prevent="togglePasswordType">
        <use v-if="showPassword" xlink:href="#eye-opened"></use>
        <use v-else xlink:href="#eye-crossed"></use>
      </svg>
    </label>
    <div class="custom-input__error" v-if="errorMessage.key">{{ $t(errorMessage.key) }}</div>
  </div>
</template>

<script>
export default {
  name: "PasswordField",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    id: {
      type: String,
      required: false,
      default: 'password'
    },
    name: {
      type: String,
      required: false,
      default: 'password'
    },
    placeholder: {
      type: String,
      required: false,
      default: '•••••••••••••••'
    },
    errorMessage: {
      required: false,
      default: () => ({})
    }
  },
  data: () => ({
    showPassword: false,
  }),
  methods: {
    togglePasswordType() {
      this.showPassword = !this.showPassword;
    },
  }
}
</script>

<style scoped>

</style>
