<template>
  <div>
    <sprite/>
    <template v-if="profile.is_journey_finished === 1">
      <div class="wrapper wrapper--menu" :class="[isMenuCollapsed ? 'menu-collapsed' : '' ]">
        <header class="header">
          <left-menu></left-menu>
          <header-wrapper></header-wrapper>
        </header>
        <Nuxt />
      </div>
    </template>
    <template v-else-if="$auth.user.type === 'user'">
      <userJourney></userJourney>
    </template>
    <template v-else-if="$auth.user.type === 'company'">
      <companyJourney v-if="$auth.user.is_invited !== 1"></companyJourney>
      <invitedUser v-else></invitedUser>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import sprite from "./blocks/sprite.vue";
import leftMenu from "./blocks/left-menu.vue";
import headerWrapper from "./blocks/header.vue";
import userJourney from "~/components/pages/journey/User.vue"
import companyJourney from "~/components/pages/journey/Company.vue";
import invitedUser from "@/components/pages/journey/InvitedUser.vue";
export default {
  name: 'DefaultLayout',
  components: {
    sprite,
    leftMenu,
    headerWrapper,
    userJourney,
    companyJourney,
    invitedUser
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    ...mapGetters([
      'isMenuCollapsed'
    ]),
    profile() {
      return this.$auth.user?.profile ?? {}
    }
  }
}
</script>
