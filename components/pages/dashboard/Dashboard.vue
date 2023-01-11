<template>
  <div class="intro dashboard">
    <div class="dashboard__match">
      <div class="dashboard__head-wrapper">
        <div class="dashboard__title">
          <button class="btn btn--only-icon dashboard__collapse-btn" type="button" aria-label="Collapse section">
            <span class="btn__text"></span>
            <span class="btn__icon">
              <svg width="10" height="6" aria-hidden="true">
                <use xlink:href="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <h2 class="title">Matched</h2><span class="dashboard__counter">{{ matches.match.length }}</span>
        </div>
        <div class="dashboard__filter" :class="{'is-active':filterModal.match}">
          <button class="btn btn--only-icon" type="button" aria-label="Open filters" @click="filterModal.match = !filterModal.match">
            <span class="btn__text"></span>
            <span class="btn__icon">
              <svg width="16" height="18" aria-hidden="true">
                <use xlink:href="#icon-filter"></use>
              </svg>
            </span>
          </button>
          <div class="dashboard__filter-wrapper">
            <p class="title">Sort by:</p>
            <div class="dashboard__toggles">
              <div class="custom-toggle custom-toggle--simple-radio">
                <label>
                  <input type="radio" id="match-most-recent" value="recent" name="match-filter" v-model="filters.match"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Most recent</span>
                </label>
              </div>
              <div class="custom-toggle custom-toggle--simple-radio">
                <label>
                  <input type="radio" id="match-oldest" value="desc" name="match-filter" v-model="filters.match"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Oldest</span>
                </label>
              </div>
              <div class="custom-toggle custom-toggle--simple-radio">
                <label>
                  <input type="radio" id="match-best-matched" value="best" name="match-filter" v-model="filters.match"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Best matched</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard__profiles">
        <card-vacancy
          v-for="match in matches.match"
          :key="match.id"
          :entity="match"
          @updated="loadAll"
        ></card-vacancy>
      </div>
    </div>
    <div class="dashboard__items">
      <div class="dashboard__item">
        <div class="dashboard__head-wrapper">
          <div class="dashboard__title">
            <button class="btn btn--only-icon dashboard__collapse-btn" type="button" aria-label="Collapse section"><span class="btn__text"></span><span class="btn__icon">
                      <svg width="10" height="6" aria-hidden="true">
                        <use xlink:href="#arrow-down"></use>
                      </svg></span>
            </button>
            <h2 class="title">Postponed</h2><span class="dashboard__counter">{{ matches.postponed.length }}</span>
          </div>
          <div class="dashboard__filter" :class="{'is-active':filterModal.postponed}">
            <button class="btn btn--only-icon" type="button" aria-label="Open filters" @click="filterModal.postponed = !filterModal.postponed">
              <span class="btn__text"></span>
              <span class="btn__icon">
                      <svg width="16" height="18" aria-hidden="true">
                        <use xlink:href="#icon-filter"></use>
                      </svg></span>
            </button>
            <div class="dashboard__filter-wrapper">
              <p class="title">Sort by:</p>
              <div class="dashboard__toggles">
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="postponed-most-recent" name="postponed-filter" value="recent" v-model="filters.postponed"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Most recent</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="postponed-oldest" name="postponed-filter" value="desc" v-model="filters.postponed"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Oldest</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="postponed-best-matched" name="postponed-filter" value="best" v-model="filters.postponed"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Best matched</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard__profiles">
          <card-vacancy
            v-for="match in matches.postponed"
            :key="match.id"
            :entity="match"
            @updated="loadAll"
          ></card-vacancy>
        </div>
      </div>
      <div class="dashboard__item">
        <div class="dashboard__head-wrapper">
          <div class="dashboard__title">
            <button class="btn btn--only-icon dashboard__collapse-btn" type="button" aria-label="Collapse section">
              <span class="btn__text"></span>
              <span class="btn__icon">
                <svg width="10" height="6" aria-hidden="true">
                  <use xlink:href="#arrow-down"></use>
                </svg></span>
            </button>
            <h2 class="title">I’m interested</h2><span class="dashboard__counter">{{ matches.review.length }}</span>
          </div>
          <div class="dashboard__filter" :class="{'is-active':filterModal.review}">
            <button class="btn btn--only-icon" type="button" aria-label="Open filters" @click="filterModal.review = !filterModal.review">
              <span class="btn__text"></span>
              <span class="btn__icon">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlink:href="#icon-filter"></use>
                </svg>
              </span>
            </button>
            <div class="dashboard__filter-wrapper">
              <p class="title">Sort by:</p>
              <div class="dashboard__toggles">
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="i’minterested-most-recent" name="i’minterested-filter" value="recent" v-model="filters.review"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Most recent</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="i’minterested-oldest" name="i’minterested-filter" value="desc" v-model="filters.review"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Oldest</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="i’minterested-best-matched" name="i’minterested-filter" value="best" v-model="filters.review"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Best matched</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard__profiles">
          <card-vacancy
            v-for="match in matches.review"
            :key="match.id"
            :entity="match"
            @updated="loadAll"
          ></card-vacancy>
        </div>
      </div>
      <div class="dashboard__item">
        <div class="dashboard__head-wrapper">
          <div class="dashboard__title">
            <button class="btn btn--only-icon dashboard__collapse-btn" type="button" aria-label="Collapse section"><span class="btn__text"></span><span class="btn__icon">
                      <svg width="10" height="6" aria-hidden="true">
                        <use xlink:href="#arrow-down"></use>
                      </svg></span>
            </button>
            <h2 class="title">Mutual interested</h2><span class="dashboard__counter">{{ matches.mutual.length }}</span>
          </div>
          <div class="dashboard__filter" :class="{'is-active':filterModal.mutual}">
            <button class="btn btn--only-icon" type="button" aria-label="Open filters" @click="filterModal.mutual = !filterModal.mutual">
              <span class="btn__text"></span>
              <span class="btn__icon">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlink:href="#icon-filter"></use>
                </svg>
              </span>
            </button>
            <div class="dashboard__filter-wrapper">
              <p class="title">Sort by:</p>
              <div class="dashboard__toggles">
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="mutualinterested-most-recent" name="mutualinterested-filter" value="recent" v-model="filters.mutual"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Most recent</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="mutualinterested-oldest" name="mutualinterested-filter" value="desc" v-model="filters.mutual"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Oldest</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="mutualinterested-best-matched" name="mutualinterested-filter" value="best" v-model="filters.mutual"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Best matched</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard__profiles">
          <card-vacancy
            v-for="match in matches.mutual"
            :key="match.id"
            :entity="match"
            @updated="loadAll"
          ></card-vacancy>
        </div>
      </div>
      <div class="dashboard__item">
        <div class="dashboard__head-wrapper">
          <div class="dashboard__title">
            <button class="btn btn--only-icon dashboard__collapse-btn" type="button" aria-label="Collapse section"><span class="btn__text"></span><span class="btn__icon">
                      <svg width="10" height="6" aria-hidden="true">
                        <use xlink:href="#arrow-down"></use>
                      </svg></span>
            </button>
            <h2 class="title">Interview</h2><span class="dashboard__counter">{{ matches.interview.length }}</span>
          </div>
          <div class="dashboard__filter" :class="{'is-active':filterModal.interview}">
            <button class="btn btn--only-icon" type="button" aria-label="Open filters" @click="filterModal.interview = !filterModal.interview">
              <span class="btn__text"></span>
              <span class="btn__icon">
                      <svg width="16" height="18" aria-hidden="true">
                        <use xlink:href="#icon-filter"></use>
                      </svg>
              </span>
            </button>
            <div class="dashboard__filter-wrapper">
              <p class="title">Sort by:</p>
              <div class="dashboard__toggles">
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="mutualinterested-most-recent" name="mutualinterested-filter" value="recent" v-model="filters.interview"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Most recent</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="mutualinterested-oldest" name="mutualinterested-filter" value="desc" v-model="filters.interview"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Oldest</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="mutualinterested-best-matched" name="mutualinterested-filter" value="best" v-model="filters.interview"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Best matched</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard__profiles">
          <card-vacancy
            v-for="match in matches.interview"
            :key="match.id"
            :entity="match"
            @updated="loadAll"
          ></card-vacancy>
        </div>
      </div>
      <div class="dashboard__item">
        <div class="dashboard__head-wrapper">
          <div class="dashboard__title">
            <button class="btn btn--only-icon dashboard__collapse-btn" type="button" aria-label="Collapse section"><span class="btn__text"></span><span class="btn__icon">
                      <svg width="10" height="6" aria-hidden="true">
                        <use xlink:href="#arrow-down"></use>
                      </svg></span>
            </button>
            <h2 class="title">Offer</h2><span class="dashboard__counter">{{ matches.offer.length }}</span>
          </div>
          <div class="dashboard__filter" :class="{'is-active':filterModal.offer}">
            <button class="btn btn--only-icon" type="button" aria-label="Open filters" @click="filterModal.offer = !filterModal.offer">
              <span class="btn__text"></span>
              <span class="btn__icon">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlink:href="#icon-filter"></use>
                </svg>
              </span>
            </button>
            <div class="dashboard__filter-wrapper">
              <p class="title">Sort by:</p>
              <div class="dashboard__toggles">
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="mutualinterested-most-recent" name="mutualinterested-filter" value="recent" v-model="filters.offer"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Most recent</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="mutualinterested-oldest" name="mutualinterested-filter" value="desc" v-model="filters.offer"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Oldest</span>
                  </label>
                </div>
                <div class="custom-toggle custom-toggle--simple-radio">
                  <label>
                    <input type="radio" id="mutualinterested-best-matched" name="mutualinterested-filter" value="best" v-model="filters.offer"><span class="custom-toggle__icon"></span><span class="custom-toggle__label">Best matched</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard__profiles">
          <card-vacancy
            v-for="match in matches.offer"
            :key="match.id"
            :entity="match"
            @updated="loadAll"
          ></card-vacancy>
        </div>
      </div>
    </div>
    <button class="btn btn--only-icon dashboard__swipe-btn" type="button" aria-label="Swipe right"><span class="btn__text"></span><span class="btn__icon">
              <svg width="42" height="42" aria-hidden="true">
                <use xlink:href="#dashboard-arrow"></use>
              </svg></span>
    </button>
  </div>
</template>

<script>

import dashboard from "../../../mixins/matches/dashboard.js";
import CardVacancy from "./CardVacancy.vue";
export default {
  name: "dashboard",
  components: {
    CardVacancy
  },
  mixins: [dashboard],
  created() {
    if (process.client) {
      this.loadAll();
    }
  }
}
</script>

<style scoped>

</style>
