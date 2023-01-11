<template>
  <div>
    <div class="intro__background">
      <picture>
        <source type="image/webp" srcset="/img/content/new-vacancy-bg.webp, /img/content/new-vacancy-bg@2x.webp 2x"><img src="/img/content/new-vacancy-bg.png" srcset="/img/content/new-vacancy-bg@2x.png 2x" width="598" height="628" alt="Decorative image. Two people working">
      </picture>
    </div>
    <form>
      <fieldset class="form__block">
        <div class="form__description">
          <p class="title title--h4">Team and projects</p>
        </div>
        <div class="form__content">
          <textarea-field
            v-model="formData.about"
            label="Description"
            placeholder="Give a quick recap of your projects and team"
            @change="$emit('input', formData.about)"
          ></textarea-field>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import TextareaField from "../../../basic/form/TextareaField.vue";
export default {
  name: "About",
  components: {
    TextareaField
  },
  props: {
    value: {
      required: false
    }
  },
  watch: {
    value(value) {
      if (value) {
        this.formData.about = value
      }
    }
  },
  data: () => ({
    formData: {
      about: ''
    }
  }),
  mounted() {
    if (this.value) {
      this.formData.about = this.value;
    }
  }

}
</script>

<style scoped>

</style>
