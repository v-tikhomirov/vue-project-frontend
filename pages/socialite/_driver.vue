<template>
  <div style="padding: 20px;">Redirecting ...</div>
</template>

<script>
export default {
  name: "socialite",
  layout: 'blank',
  auth: false,
  loading: true,
  data: () => ({
    data: null
  }),
  mounted() {
    if(this.$route.query) {
      let query = this.$route.query
      let params = Object.keys(query).map(function(key) {
        return key + '=' + query[key];
      }).join('&');

      this.$axios.$get(process.env.API_BASE_URL + '/api/auth/socialite/' + this.$route.params.driver + '?' + params).then((res) => {
        if (res.access_token) {
          this.$auth.setUserToken(res.access_token, true).then(() => {
            this.$store.dispatch('initApp');
            this.$router.push({ path: '/'});
          })
        }
      }).catch(() => {
        console.log("unauthorized")
        this.$router.push(this.localeLocation({ name: 'login', params: { error: "You have to sign up first!"}}));
      })
    } else this.$router.push({ path: '/'});
  }
}
</script>

<style scoped>

</style>
