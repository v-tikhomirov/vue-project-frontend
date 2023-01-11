<template>
  <div class="wrapper">
    <main>
      <div class="authorization">
        <div class="authorization__wrapper">
          <div class="authorization-intro authorization__intro">
            <h1 class="visually-hidden">Log in</h1>
            <div class="authorization-intro__logo">
              <svg class="logo logo--white" width="128" height="23" aria-hidden="true">
                <use xlink:href="#logo"></use>
              </svg>
            </div>
            <div class="authorization-form">
              <div class="authorization-form__wrapper">
                <div class="authorization-form__form">
                  <h2 class="title title--h2">Log in</h2>
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
                      <div class="authorization-form__flex-wrapper authorization-form__flex-wrapper--form">
                        <checkbox-field
                          v-model="formData.rememberMe"
                          :label="$t('login.remember.me').toString()"
                          id="remember"
                          name="remember"
                        ></checkbox-field>
                        <a class="authorization-form__reset-password" href="#">Forgot password</a>
                      </div>
                      <button class="btn btn--long btn--blue" type="button" @click="submit"><span class="btn__text" >Log in</span>
                      </button>
                      <p class="authorization-form__error-message" v-if="actionMessage.page === 'login'">{{ actionMessage.message }}</p>
                      <SocialiteButtons is-login-page="true" />
                      <div class="authorization-form__log-in">
                        <p class="text">Don't have an account?</p><NuxtLink class="btn btn--long" :to="localeLocation({ name: 'signup'})">Sign up</NuxtLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <ul class="agreements-list">
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

<script>
import InputField from "../components/basic/form/InputField.vue";
import PasswordField from "../components/basic/form/PasswordField.vue";
import CheckboxField from "../components/basic/form/CheckboxField.vue";
import SocialiteButtons from "../components/basic/utilities/SocialiteButtons.vue"
import {mapGetters} from 'vuex';

export default {
  name: "login",
  layout: 'blank',
  components: {
    InputField,
    PasswordField,
    CheckboxField,
    SocialiteButtons
  },
  data: () => ({
    valid: true,
    alertMessage: {
      key: "",

    },
    alertShow: false,
    formId: "login",
    formData: {
      password: "",
      email: "",
    },
    showPassword: false,
    rememberMe: false,
    validationRules: {
      email: "required",
      password: "required"
    }
  }),
  computed: {
    ...mapGetters({
      errors: 'errors/getErrorsBag'
    }),
    errorsBag() {
      return this.errors[this.formId];
    }
  },
  methods: {
    togglePasswordType() {
      this.showPassword = !this.showPassword;
    },
    submit() {
      this.resetMessage();
      if(this.validate("login")) {
        this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.formData.email,
            password: this.formData.password
          }
        }).then((resp) => {
          this.$store.dispatch('initApp');
          this.$router.push({ path: "/" })
        }).catch(() => {
          this.setErrorMessage("Incorrect username or password", "login")
        })
      }
    }
  }
}
</script>

<style scoped>
  .custom-input, .custom-textarea {
    position: relative;
    display: flex;
    padding: 0 0 20px !important;
    margin-bottom: 3px !important;
  }
  .authorization-form__error-message {
    display: block;
  }
</style>
