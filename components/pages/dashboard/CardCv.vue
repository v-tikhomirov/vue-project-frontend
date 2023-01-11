<template>
  <article @click="openDetailed" class="card card--personal card--interested dashboard__profile" :class="isOpened ? 'card--opened' : ''">
    <div class="card__header">
      <div class="card__header-text">
        <h3 class="card__title">{{ card.position }}</h3>
        <time class="card__time-found" datetime="2022-06-18">Matched {{ $dateFns.formatDistance(new Date(entity.created_at), new Date(), { addSuffix: true }) }}</time>
      </div>
      <div class="card__userpic" v-if="candidate.profile_picture">
        <picture>
          <img :src="mediaUrl + candidate.profile_picture" width="34" height="34" :alt="candidate.first_name + ' ' + candidate.last_name">
        </picture>
      </div>
    </div>
    <div class="card__user-info">
      <p class="card__user-name">{{ candidate.first_name }} {{ candidate.last_name }}</p>
      <p class="card__match" :class="colorClass">{{ entity.percent }}% match</p>
    </div>
    <div class="card__job-conditions">
      <p class="card__label">Total experience</p>
      <p class="card__experience">{{ expYears }} {{ pluralYer }}</p>
      <p class="card__location">
        <svg width="9" height="11" aria-hidden="true">
          <use xlink:href="#map-marker"></use>
        </svg><span>{{ candidate.city }}, {{ candidate.country }}</span>
      </p>
      <p class="card__label">Expected salary</p>
      <p class="card__salary">${{ card.desired_salary }}</p>
      <p class="card__workplace">{{ $t('office.type.'+card.office_type) }}</p>
    </div>
    <div class="card__user-skills">
      <template v-for="(value, key) in card.skills">
        <p class="card__label">{{ $t('vacancy.card.skill.label.' + key) }}</p>
        <p class="card__languages">{{ value.label }}<span v-if="value.count">&nbsp;{{ value.count }}+</span>
        </p>
      </template>
    </div>
    <div class="card__buttons">
      <button v-if="!isOpened" class="btn btn--card-no-border btn--card-accented" type="button" @click.stop="changeStatus(3)">
        <span class="btn__text">Interested</span>
      </button>
      <button v-else class="btn btn--card-no-border btn--card-light" type="button" disabled>
        <span class="btn__text">Contacts opened</span>
      </button>
      <button class="btn btn--card-no-border btn--card-dark" type="button" @click.stop="changeStatus(100)">
        <span class="btn__text">Decline</span>
      </button>
    </div>
  </article>
</template>

<script>
import card from '/mixins/matches/card.js';
export default {
  name: "CardCv",
  mixins: [card],
  computed: {
    expYears() {
      return Math.round(this.card.experience * 0.0833886986);
    },
    pluralYer() {
      if (this.expYears > 1) {
        return this.$t('years').toString();
      }
      return this.$t('year').toString();
    }
  }
}
</script>

<style scoped>

</style>
