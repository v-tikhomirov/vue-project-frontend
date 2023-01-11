<template>
  <div>
    <template v-if="!isComplete">
      <div class="wrapper">
        <main>
          <div class="authorization">
            <div class="authorization__wrapper">
              <div class="authorization-intro authorization__intro">
                <h1 class="visually-hidden">Sign up</h1>
                <div class="authorization-intro__logo">
                  <svg class="logo logo--white" width="128" height="23" aria-hidden="true">
                    <use xlink:href="#logo"></use>
                  </svg>
                </div>
                <div class="authorization-form">
                  <div class="authorization-form__wrapper">
                    <div class="authorization-form__form">
                      <h2 class="title title--h2">Sign Up</h2>
                      <div class="authorization-form__welcome-wrapper">
                        <p class="authorization-form__subtitle">Are you looking for:</p>
                        <div class="authorization-form__flex-wrapper">
                          <a class="btn" :data-pressed="type === 'offers'" @click="type = 'offers'"><span class="btn__text">Job offers</span>
                          </a>
                          <a class="btn" :data-pressed="type === 'candidates'" @click="type = 'candidates'"><span class="btn__text">Candidates</span>
                          </a>
                        </div>
                      </div>
                      <div class="form">
                        <form method="post">
                          <input-field
                            v-model="formData.email"
                            :label="$t('email').toString()"
                            id="log-in-email"
                            name="log-in-email"
                            placeholder="Enter your email"
                            :errorMessage="errorsBag.email"
                          ></input-field>
                          <password-field
                            class="custom-input--last"
                            v-model="formData.password"
                            :label="$t('password').toString()"
                            id="log-in-password"
                            name="log-in-password"
                            :errorMessage="errorsBag.password"
                          ></password-field>
                          <div class="custom-toggle custom-toggle--checkbox authorization-form__checkbox">
                            <label>
                              <input type="checkbox" id="terms-agree" name="terms-agree" checked="" v-model="formData.checkbox"><span class="custom-toggle__icon">
                              <svg width="22" height="23" aria-hidden="true">
                                <use xlink:href="#uncheck-checkbox"></use>
                              </svg></span><span class="custom-toggle__icon custom-toggle__icon--checked">
                              <svg width="22" height="22" aria-hidden="true">
                                <use xlink:href="#checked-checkbox"></use>
                              </svg></span><span class="custom-toggle__label">I agree to the Terms of service and Privacy policy</span>
                            </label>
                          </div>
                          <button class="btn btn--long btn--blue" type="button" @click="submit"><span class="btn__text">Sign up</span>
                          </button>
                          <p class="authorization-form__error-message" v-if="actionMessage.page === 'signup'">{{ actionMessage.message }}</p>
                          <SocialiteButtons :is-company-sign-up="isCompanySignUp" :is-agreement-accepted="formData.checkbox" />
                          <div class="authorization-form__sign-up"><span class="text">Already have an account?</span><NuxtLink class="link" to="/">Log in</NuxtLink></div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <ul class="agreements-list agreements-list--sign-up">
                    <li class="agreements-list__item"><a class="link" href="#">Privacy policy</a></li>
                    <li class="agreements-list__item"><a class="link" href="#">Terms of service</a></li>
                  </ul>
                </div>
                <div class="authorization-intro__background">
                  <svg width="1083" height="587" aria-hidden="true">
                    <use xlink:href="#auth-bg"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </template>
    <template v-else>
      <Complete></Complete>
    </template>
  </div>

</template>

<script>
import SocialiteButtons from "@/components/basic/utilities/SocialiteButtons.vue"
import PasswordField from "../components/basic/form/PasswordField.vue"
import Complete from "@/components/pages/Complete.vue";
import InputField from "~/components/basic/form/InputField.vue";
import {mapGetters} from 'vuex';
export default {
  name: "signup",
  layout: 'blank',
  auth: false,
  components: {
    SocialiteButtons,
    PasswordField,
    Complete,
    InputField
  },
  computed: {
    ...mapGetters({
      errors: 'errors/getErrorsBag'
    }),
    errorsBag() {
      return this.errors[this.formId];
    }
  },
  data: () => ({
    valid: true,
    formId: "signup",
    formData: {
      email: "",
      password: "",
      checkbox: true,
    },
    type: "offers",
    isComplete: false,
    alertShow: false,
    alertMessage: null,
    alertType: null,
    isCompanySignUp: null,
    validationRules: {
      email: "required",
      password: "required"
    }
  }),
  watch: {
    type() {
      this.isCompanySignUp = this.type !== 'offers';
    }
  },
  methods: {
    showAgreementError() {
      this.setErrorMessage("You must accept the agreement to continue!", "signup")
    },
    submit() {
      this.resetMessage()
      if(this.validate("signup")) {
        if(!this.formData.checkbox) {
          this.showAgreementError()
          return false
        }
        let data = {
          email: this.formData.email,
          password: this.formData.password,
          type: this.isCompanySignUp ? 1 : 0
        }
        this.$axios.$post(process.env.API_BASE_URL + '/api/auth/registration', data).then((res) => {
          if(res.success) {
            this.isComplete = true
          }
          if(res.message) {
            console.log(res.errors.email)
            if(res.errors && res.errors.email[0] === "validation.unique") {
              this.setErrorMessage("Your email is already registered in the system", "signup")
            }
            if(res.message) {
              this.setErrorMessage(res.message, "signup")
            }
          }
        })
      }
    }
  }
};
</script>

<style scoped>
  .authorization-form__error-message {
    display: block;
  }
  .custom-input, .custom-textarea {
    position: relative;
    display: flex;
    padding: 0 0 20px !important;
    margin-bottom: 3px !important;
  }
</style>
