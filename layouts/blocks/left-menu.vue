<template>
  <nav class="menu" :class="!isMenuCollapsed ? 'is_open' : ''">
    <div class="menu__wrapper">
      <div class="menu__top-wrapper">
        <NuxtLink class="menu__logo" to="/" aria-label="Move to main page" >
          <svg class="menu__logo-full logo logo--white" width="128" height="23" aria-hidden="true" @click="toggleMenu">
            <use xlink:href="#logo"></use>
          </svg>
          <svg class="menu__logo-collapsed logo logo--white" width="36" height="27" aria-hidden="true" @click="toggleMenu">
            <use xlink:href="#logo2"></use>
          </svg>
        </NuxtLink>
        <div class="menu__notifications">
          <button class="btn btn--only-icon" type="button" aria-label="Open notifications">
            <span class="btn__text"></span>
            <span class="btn__icon">
              <svg width="18" height="20" aria-hidden="true">
                <use xlink:href="#notifications"></use>
              </svg>
            </span>
          </button>
        </div>
        <button class="btn btn--only-icon menu__mobile-close" type="button" aria-label="Close menu" @click="toggleMenu">
          <span class="btn__text"></span>
          <span class="btn__icon">
            <svg width="12" height="12" aria-hidden="true">
              <use xlink:href="#close-menu"></use>
            </svg>
          </span>
        </button>
      </div>
      <div class="menu__user">
        <div class="menu__user-pic">
          <picture v-if="!!$auth.user.profile.profile_picture">
            <source type="image/webp" :srcset="mediaUrl + $auth.user.profile.profile_picture">
            <img :src="mediaUrl + $auth.user.profile.profile_picture" width="48" height="48" :alt="'Photo of ' + $auth.user.profile.first_name + ' ' + $auth.user.profile.last_name">
          </picture>
          <div v-else class="img-upload__preview-mobile" style="overflow: initial">
            <svg width="32" height="32" aria-hidden="true">
              <use xlink:href="#preview-avatar"></use>
            </svg>
          </div>
        </div>
        <div class="menu__user-data">
          <p class="menu__user-name">{{ $auth.user.profile.first_name }} {{ $auth.user.profile.last_name }}</p>
          <p class="menu__user-balance" v-if="isCompany">Connections balance: <span class="menu__balance">{{ $auth.user.companies[0].balance }}</span></p>
        </div>
      </div>
      <ul class="menu__links nav-list">
        <li class="nav-list__item" :class="{'is-active': checkIsActive('index')}" @click="toggleMenu">
          <router-link to="/" class="link nav-list__link">
            <span class="nav-list__icon nav-list__icon--dashboard">
              <svg width="20" height="16" aria-hidden="true">
                <use xlink:href="#dashboard"></use>
              </svg>
            </span>
            <span class="nav-list__text">Dashboard</span>
          </router-link>
        </li>
        <li v-if="isCustomer" class="nav-list__item" :class="{'is-active': checkIsActive('cv')}" @click="toggleMenu">
          <router-link to="/cv" class="link nav-list__link">
            <span class="nav-list__icon nav-list__icon--page">
              <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="#page"></use>
              </svg>
            </span>
            <span class="nav-list__text">My CV</span>
          </router-link>
        </li>
        <li v-if="isCompany" class="nav-list__item" :class="{'is-active': checkIsActive('vacancies')}" @click="toggleMenu">
          <router-link to="/vacancies" class="link nav-list__link">
            <span class="nav-list__icon nav-list__icon--page">
                    <svg width="24" height="24" aria-hidden="true">
                      <use xlink:href="#page"></use>
                    </svg>
            </span>
            <span class="nav-list__text">Vacancies</span>
          </router-link>
        </li>
        <li v-if="isCompany" class="nav-list__item" :class="{'is-active': checkIsActive('company')}"  @click="toggleMenu">
          <router-link class="link nav-list__link" to="/company">
            <span class="nav-list__icon nav-list__icon--globe">
              <svg width="20" height="20" aria-hidden="true">
                <use xlink:href="#globe"></use>
              </svg>
            </span>
            <span class="nav-list__text">Company</span>
          </router-link>
        </li>
      </ul>
      <div class="menu__settings-wrapper">
        <ul class="menu__settings-links">
          <li class="menu__settings-link" @click="toggleMenu">
            <NuxtLink class="link" to="/settings">
              <span class="menu__link-icon">
                      <svg width="24" height="24" aria-hidden="true">
                        <use xlink:href="#gear"></use>
                      </svg>
              </span>
              <span>Settings</span>
            </NuxtLink>
          </li>
          <li class="menu__settings-link">
            <a class="link" @click="logout">
              <span class="menu__link-icon">
                <svg width="24" height="24" aria-hidden="true">
                  <use xlink:href="#log-out"></use>
                </svg>
              </span>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <ul class="agreements-list">
        <li class="agreements-list__item"><a class="link" href="#">Privacy policy</a></li>
        <li class="agreements-list__item"><a class="link" href="#">Terms of&nbsp;use</a></li>
      </ul>
      <button class="menu__toggle-btn" aria-label="Collapse menu" @click="toggleMenu">
        <span class="menu__toggle-icon">
          <svg width="4" height="7" aria-hidden="true">
            <use xlink:href="#arrow"></use>
          </svg>
        </span>
      </button>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "left-menu",
  data: () => ({
    mediaUrl: process.env.MEDIA_BASE_URL
  }),
  methods: {
    toggleMenu() {
      this.$store.dispatch('toggleMenu');
    },
    checkIsActive(route) {
      return this.$route.name.includes(route);
    }
  },
  computed: {
    ...mapGetters([
      'isMenuCollapsed'
    ]),
  }
}
</script>

<style scoped>
 .is_open {
   display: block;
   z-index: 10000;
 }
 .img-upload__preview-mobile {
   fill: #e7e7fd;
 }
</style>
