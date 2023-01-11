<template>
  <article @click="openDetailed" class="card card--vacancy card--hidden dashboard__profile">
    <div class="card__header">
      <div class="card__header-text">
        <h3 class="card__title">{{ card.position }}</h3>
        <time class="card__time-found" datetime="2022-06-18">Matched {{ $dateFns.formatDistance(new Date(entity.created_at), new Date(), { addSuffix: true }) }}</time>
      </div>
      <div class="card__userpic">
        <img v-if="entity.company.logo" :src="mediaUrl + entity.company.logo">
        <svg v-else width="34" height="34" aria-hidden="true">
          <use xlink:href="#logo-vacancy"></use>
        </svg>
      </div>
    </div>
    <div class="card__user-info">
      <p class="card__company-name">{{ entity.company.name }}</p>
      <p class="card__match" :class="colorClass">{{ entity.percent }}% match</p>
    </div>
    <div class="card__job-conditions">
      <p class="card__label"></p>
      <p class="card__experience"></p>
      <p class="card__location">
        <svg width="9" height="11" aria-hidden="true">
          <use xlink:href="#map-marker"></use>
        </svg><span>{{ card.city }}, {{ card.country }}</span>
      </p>
      <p class="card__label">Salary</p>
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
      <button class="btn btn--card-no-border btn--card-accented" type="button" @click.stop="changeStatus(2)">
        <span class="btn__text">I am interested</span>
      </button>
      <button class="btn btn--card-no-border btn--card-dark" type="button" @click.stop="changeStatus(101)">
        <span class="btn__text">Decline</span>
      </button>
    </div>
  </article>
</template>

<script>
import card from "/mixins/matches/card.js";
export default {
  name: "CardVacancy",
  mixins: [card],
}
</script>

<style scoped>

</style>
