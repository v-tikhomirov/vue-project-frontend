<template>
  <div>Redirecting...</div>
</template>

<script>
export default {
  name: "verify",
  layout: 'blank',
  loading: true,
  data: () => ({
    data: null
  }),
  mounted() {
    this.$api.payment.checkCompanyPayments().then((res) => {
      this.$auth.fetchUser()
      if(res.data.cv_id)  {
        this.$router.push({ path: '/detailed/cv/' + res.data.cv_id, query: { successfullPayment: "1" } });
      } else {
        this.$router.push({ path: '/' });
      }
    })
  }
}
</script>

<style scoped>

</style>
