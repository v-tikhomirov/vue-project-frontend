<template>
  <div style="padding: 20px;">Redirecting...</div>
</template>

<script>
export default {
  name: "verify",
  layout: 'blank',
  auth: false,
  loading: true,
  data: () => ({
    data: null
  }),
  mounted() {
    if(this.$route.query.hash) {
      let data = {
        'hash': this.$route.query.hash
      }
      this.$auth.onError((error, name, endpoint) => {
        console.error(name, error)
      })
      this.$axios.$post(process.env.API_BASE_URL + '/api/auth/verifyEmail', data).then((res) => {
        if (res.access_token) {
          this.$auth.setUserToken(res.access_token, true).then(() => {
            this.$store.dispatch('initApp');
            if (this.$auth.user.type === 'user') {
              this.$router.push({ path: '/'});
            } else {
              this.$router.push({ path: '/'});
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
