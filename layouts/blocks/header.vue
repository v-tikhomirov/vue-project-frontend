<template>
  <div class="header__wrapper">
    <div class="top-bar header__top-bar">
      <div class="custom-input">
        <label v-if="false">
          <span class="custom-input__icon">
            <svg width="14" height="14" aria-hidden="true">
              <use xlink:href="#icon-search"></use>
            </svg>
          </span>
          <input type="text" id="search" name="search" placeholder="Search">
        </label>
      </div>
      <p v-if="isCompany" class="top-bar__balance">Connections balance: <span class="top-bar__balance-value">{{ $auth.user.companies[0].balance }}</span></p>
      <div class="top-bar__notifications" @click.stop="isNotificationsActive = !isNotificationsActive">
        <button class="btn btn--only-icon" type="button" aria-label="Open notifications">
          <span class="btn__text"></span>
          <span class="btn__icon">
            <svg width="18" height="20" aria-hidden="true">
              <use xlink:href="#notifications"></use>
            </svg>
          </span>
        </button>
        <div class="top-bar__notifications-wrapper" :class="{'is-active': isNotificationsActive}" v-click-outside="closeNotifications">
          <p class="title title--h5">Notifications</p>
          <ul class="top-bar__notifications-list">
            <li class="top-bar__notification">
              <p class="top-bar__notification-text">You have a new match</p>
              <div class="top-bar__notification-bottom"><span class="top-bar__data">13.04.2022</span><a class="link" href="#">View</a></div>
            </li>
            <li class="top-bar__notification">
              <p class="top-bar__notification-text">You have several new matches</p>
              <div class="top-bar__notification-bottom"><span class="top-bar__data">13.04.2022</span><a class="link" href="#">View</a></div>
            </li>
            <li class="top-bar__notification">
              <p class="top-bar__notification-text">You have not shared your social media links. Candidates that share social media links tend to attract better offers from tech companies</p>
              <div class="top-bar__notification-bottom"><span class="top-bar__data">13.04.2022</span><a class="link" href="#">View</a></div>
            </li>
            <li class="top-bar__notification">
              <p class="top-bar__notification-text">Your applicaton has been rejected by the Microsoft</p>
              <div class="top-bar__notification-bottom"><span class="top-bar__data">13.04.2022</span><a class="link" href="#">View</a></div>
            </li>
            <li class="top-bar__notification">
              <p class="top-bar__notification-text">Your applicaton has been accepted by the Apple</p>
              <div class="top-bar__notification-bottom"><span class="top-bar__data">13.04.2022</span><a class="link" href="#">View</a></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="top-bar__profile">
        <p class="top-bar__profile-name">{{ $auth.user.profile.first_name }} {{ $auth.user.profile.last_name }}</p>
        <div class="top-bar__settings" @click.stop="isSettingsActive = !isSettingsActive">
          <div class="top-bar__profile-image">
            <picture v-if="!!$auth.user.profile.profile_picture">
              <source type="image/webp" :srcset="mediaUrl + $auth.user.profile.profile_picture">
              <img :src="mediaUrl + $auth.user.profile.profile_picture" width="32" height="32" :alt="'Photo of ' + $auth.user.profile.first_name + ' ' + $auth.user.profile.last_name">
            </picture>
            <div v-else class="img-upload__preview" style="overflow: initial">
              <svg width="32" height="32" aria-hidden="true">
                <use xlink:href="#preview-avatar"></use>
              </svg>
            </div>
          </div>
          <button class="btn btn--only-icon" type="button" aria-label="Open settings menu">
            <span class="btn__text"></span>
            <span class="btn__icon">
              <svg width="10" height="6" aria-hidden="true">
                <use xlink:href="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <div class="top-bar__settings-wrapper" :class="{ 'is-active' : isSettingsActive }" v-click-outside="closeSettings">
            <ul class="top-bar__settings-links">
              <li class="top-bar__settings-link">
                <nuxt-link class="link" to="/settings">
                  <span class="top-bar__link-icon">
                    <svg width="24" height="24" aria-hidden="true">
                      <use xlink:href="#gear"></use>
                    </svg>
                  </span>
                  <span>Settings</span>
                </nuxt-link>
              </li>
              <li class="top-bar__settings-link">
                <a class="link" @click="logout">
                  <span class="top-bar__link-icon">
                    <svg width="24" height="24" aria-hidden="true">
                      <use xlink:href="#log-out"></use>
                    </svg>
                  </span>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button class="btn btn--only-icon top-bar__menu" type="button" aria-label="Open menu" @click="toggleMenu">
        <span class="btn__text"></span>
        <span class="btn__icon">
          <svg width="24" height="24" aria-hidden="true">
            <use xlink:href="#open-menu"></use>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerWrapper",
  data: () => ({
    isSettingsActive: false,
    isNotificationsActive: false,
    mediaUrl: process.env.MEDIA_BASE_URL
  }),
  methods: {
    toggleMenu() {
      this.$store.dispatch('toggleMenu');
    },
    closeSettings() {
      if (this.isSettingsActive) {
        this.isSettingsActive = false;
      }
    },
    closeNotifications() {
      if (this.isNotificationsActive) {
        this.isNotificationsActive = false;
      }
    }
  }
}
</script>

<style scoped>
  .top-bar__profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }
  .top-bar__profile-image img {
    object-fit: cover;
    height: 100%;
  }
  .top-bar__settings-link a {
    cursor: pointer;
  }
</style>
