<template>
  <div class="wrapper">
    <main>
      <div class="authorization">
        <div class="authorization__wrapper">
          <div class="authorization-intro authorization__intro">
            <h1 class="visually-hidden">Sign up complete</h1>
            <div class="authorization-intro__logo">
              <svg class="logo logo--white" width="128" height="23" aria-hidden="true">
                <use xlink:href="#logo"></use>
              </svg>
            </div>
            <div class="authorization-form authorization-form--complete">
              <div class="authorization-form__wrapper">
                <div class="authorization-form__heading authorization-form__heading--complete">
                  <a class="btn btn--icon-left btn--border-none" href="log-in.html"><span class="btn__text">Back</span><span class="btn__icon">
                        <svg width="10" height="8" aria-hidden="true">
                          <use xlink:href="#icon-arrow-left"></use>
                        </svg></span>
                  </a>
                  <h2 class="title title--h2">Sign Up</h2>
                </div>
                <div class="authorization-form__success">
                  <div class="authorization-form__success-icon">
                    <svg width="81" height="81" aria-hidden="true">
                      <use xlink:href="#success-icon"></use>
                    </svg>
                  </div>
                  <div class="authorization-form__success-text">
                    <p class="text">
                      Thank you. We've just sent a confirmation to your email.
                      Please, check it to continue
                    </p>
                  </div>
                </div>
              </div>
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
export default {
  name: "Complete",
}
</script>

<style scoped>

</style>
