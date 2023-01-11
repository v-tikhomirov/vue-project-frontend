<template>
  <div class="form form--large form--small" data-validate>
    <form method="post" action="#">
      <fieldset class="form__block">
        <div class="form__description">
          <p class="title title--h4">Change email</p>
        </div>
        <div class="form__content">
          <input-field
            v-model="formData.email"
            label="Current email"
            id="id-current-email"
            name="current-email"
            placeholder="Enter email"
          ></input-field>
          <input-field
            v-model="formData.newEmail"
            label="New email"
            id="id-new-email"
            name="new-email"
            placeholder="Enter email"
          ></input-field>
<!--          <div class="custom-input" data-validate-type="email">-->
<!--            <label><span class="custom-input__label">Current email</span>-->
<!--              <input type="email" id="id-current-email" name="current-email" placeholder="Enter email">-->
<!--            </label>-->
<!--            <div class="custom-input__error">Invalid email</div>-->
<!--          </div>-->
<!--          <div class="custom-input" data-validate-type="email">-->
<!--            <label><span class="custom-input__label">New email</span>-->
<!--              <input type="email" id="id-new-email" name="new-email" placeholder="Enter email">-->
<!--            </label>-->
<!--            <div class="custom-input__error">Invalid email</div>-->
<!--          </div>-->
        </div>
      </fieldset>
      <fieldset class="form__block">
        <div class="form__description">
          <p class="title title--h4">Change password</p>
        </div>
        <div class="form__content">
          <password-field
            v-model="formData.currentPassword"
            label="Current password"
            id="id-current-user-password"
            name="current-user-password"
          ></password-field>
          <password-field
            v-model="formData.password"
            label="New password"
            id="id-new-user-password"
            name="new-user-password"
          ></password-field>
          <password-field
            v-model="formData.passwordConfirm"
            label="Confirm password"
            id="id-confirm-user-password"
            name="confirm-user-password"
          ></password-field>
        </div>
      </fieldset>
      <div class="form__buttons buttons-panel">
        <button class="btn btn--icon-left form__button" type="button" @click="$router.push('/')">
          <span class="btn__text">Cancel</span>
          <span class="btn__icon">
            <svg width="14" height="14" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </span>
        </button>
        <button class="btn btn--blue form__button" type="button" @click="submitForm">
          <span class="btn__text">Save changes</span>
        </button>
      </div>
      <messages :value="actionMessage"></messages>
    </form>
  </div>
</template>

<script>
import InputField from "../../basic/form/InputField.vue";
import PasswordField from "../../basic/form/PasswordField.vue";
import Messages from "../../basic/form/Messages.vue";
export default {
  name: "Security",
  components: {
    Messages,
    InputField,
    PasswordField
  },
  data: () => ({
    formData: {
      email: null,
      newEmail: null,
      currentPassword: null,
      password: null,
      passwordConfirm: null
    }
  }),
  methods: {
    submitForm() {
      this.$api.profile.updateSecurity(this.sanitizeForm()).then((res) => {
        if (res.data.success) {
          this.setSuccessMessage();
          this.formData = {
            email: null,
            newEmail: null,
            currentPassword: null,
            password: null,
            passwordConfirm: null
          };
        } else {
          this.setErrorMessage();
        }
      })
    },
    sanitizeForm() {
      const sanitized = {};
      Object.keys(this.formData).forEach((k) => {
        if (this.formData[k]) {
          sanitized[k] = this.formData[k]
        }
      });

      return sanitized;
    }
  }
}
</script>

<style scoped>

</style>
