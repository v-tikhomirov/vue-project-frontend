<template>
  <main>
    <div class="page-heading">
      <ul class="breadcrumbs breadcrumbs--one-item page-heading__breadcrumbs">
        <li class="breadcrumbs__item"><a class="link breadcrumbs__link" href="#" tabIndex="-1">Settings</a><span class="breadcrumbs__slash">/</span>
        </li>
      </ul>
      <div class="page-heading__wrapper">
        <div class="page-heading__title-wrapper">
          <NuxtLink class="btn btn--icon-left btn--border-none page-heading__back-mobile" to="/"><span class="btn__text"></span><span class="btn__icon">
                  <svg width="10" height="8" aria-hidden="true">
                    <use xlink:href="#icon-arrow-left"></use>
                  </svg></span>
          </NuxtLink>
          <h1 class="title title--h2">Settings</h1>
        </div>
        <ul class="page-heading__tabs">
          <li class="page-heading__tab" :class="{ 'active' : activeTab === 'account'}">
            <button class="page-heading__tab-btn" @click="activeTab = 'account'">My account</button>
          </li>
          <li v-if="isCustomer" class="page-heading__tab" :class="{ 'active' : activeTab === 'about'}">
            <button class="page-heading__tab-btn" @click="activeTab = 'about'">About</button>
          </li>
          <li v-if="isCustomer" class="page-heading__tab" :class="{ 'active' : activeTab === 'links'}">
            <button class="page-heading__tab-btn" @click="activeTab = 'links'">Additional links</button>
          </li>
          <li class="page-heading__tab" :class="{ 'active' : activeTab === 'security'}">
            <button class="page-heading__tab-btn" @click="activeTab = 'security'">Email & Password</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="intro">
      <account v-if="activeTab === 'account'"></account>
      <about v-if="activeTab === 'about'"></about>
      <links v-if="activeTab === 'links'"></links>
      <security v-if="activeTab === 'security'"></security>
    </div>
  </main>
</template>

<script>
import Account from "../components/pages/settings/Account.vue";
import About from "../components/pages/settings/About.vue";
import Security from "../components/pages/settings/Security.vue";
import Links from "../components/pages/settings/Links.vue";
export default {
  head() {
    return {
      title: "Settings",
    }
  },
  name: "settings",
  components: {
    Links,
    Account,
    About,
    Security
  },
  data: () => ({
    activeTab: 'account'
  })
}
</script>

<style scoped>

</style>
