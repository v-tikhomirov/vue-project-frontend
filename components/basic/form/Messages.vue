<template>
  <div v-if="message" class="messages-block" :class="[ type === 'error' ? 'is-error' : 'is-success']">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "Messages",
  props: {
    value: {
      required: true
    }
  },
  data: () => ({
    type: '',
    message: ''
  }),
  watch: {
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
      this.type = this.value.type;
      this.message = this.value.message;
    }
  }
}
</script>

<style scoped>

</style>
