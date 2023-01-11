<template>
  <main>
    <div class="page-heading">
      <breadcrumbs
        :items="breadcrumbs"
      ></breadcrumbs>
      <div class="page-heading__wrapper">
        <div class="page-heading__title-wrapper">
          <NuxtLink class="btn btn--icon-left btn--border-none page-heading__back-mobile" to="/"><span class="btn__text"></span><span class="btn__icon">
                  <svg width="10" height="8" aria-hidden="true">
                    <use xlink:href="#icon-arrow-left"></use>
                  </svg></span>
          </NuxtLink>
          <h1 class="title title--h2">Company</h1>
        </div>
        <ul class="page-heading__tabs">
          <li class="page-heading__tab" :class="{'active': tabs.about}">
            <button class="page-heading__tab-btn" @click="switchTo('about')">About</button>
          </li>
          <li class="page-heading__tab" :class="{'active': tabs.team}">
            <button class="page-heading__tab-btn" @click="switchTo('team')">Team</button>
          </li>
          <li class="page-heading__tab" :class="{'active': tabs.links}">
            <button class="page-heading__tab-btn" @click="switchTo('links')">Additional links</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="intro">
      <about v-if="tabs.about"></about>
      <team v-if="tabs.team"></team>
      <links v-if="tabs.links"></links>
    </div>
  </main>
</template>

<script>
import Breadcrumbs from "../components/basic/page/Breadcrumbs.vue";
import About from "../components/pages/company/About.vue";
import Team from "../components/pages/company/Team.vue";
import Links from "../components/pages/company/Links.vue";
export default {
  name: "company",
  head() {
    return {
      title: "Company",
    }
  },
  components: {
    Breadcrumbs,
    About,
    Team,
    Links
  },
  data: () => ({
    page: {
      title: "Company",
    },
    breadcrumbs: [
      {
        text: "Company",
        disabled: true,
      },
    ],
    tabs: {
      about: true,
      team: false,
      links: false,
    }
  }),
  methods: {
    switchTo(tab) {
      Object.keys(this.tabs).forEach(key => {
        this.tabs[key] = false;
      });
      this.tabs[tab] = true;
    }
  }
}
</script>

<style scoped>

</style>
