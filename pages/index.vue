<template>
  <main>
    <div class="page-heading page-heading--notification page-heading--dashboard">
      <breadcrumbs
        :items="breadcrumbs"
      ></breadcrumbs>
      <div class="page-heading__wrapper">
        <div class="page-heading__title-wrapper">
          <h1 class="title title--h2">Dashboard</h1><span v-if="matchesCount" class="page-heading__notification-points">{{ matchesCount }}</span>
        </div>
      </div>
    </div>
    <dashboard v-if="isCustomer"></dashboard>
    <dashboard-company v-else></dashboard-company>
  </main>
</template>

<script>
import Breadcrumbs from "../components/basic/page/Breadcrumbs.vue";
import Dashboard from "../components/pages/dashboard/Dashboard.vue";
import DashboardCompany from "../components/pages/dashboard/DashboardCompany.vue";
import {mapGetters} from "vuex";
export default {
  name: "index",
  components: {
    Breadcrumbs,
    Dashboard,
    DashboardCompany
  },
  data: () => ({
    page: {
      title: "Dashboard",
    },
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: true,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      matches: 'matches/getMatches'
    }),
    matchesCount() {
      let count = 0;
      Object.keys(this.matches).forEach((key) => {
        count += this.matches[key].length;
      })
      return count;
    }
  }
}
</script>

<style scoped>

</style>
