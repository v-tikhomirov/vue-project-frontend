<template>
  <main>
    <div class="page-heading">
      <ul class="breadcrumbs page-heading__breadcrumbs">
        <li class="breadcrumbs__item"><a class="link breadcrumbs__link" href="#" tabIndex="0">Dashboard</a><span class="breadcrumbs__slash">/</span>
        </li>
        <li class="breadcrumbs__item"><a class="link breadcrumbs__link" href="#" tabIndex="-1">{{ company.name }}</a><span class="breadcrumbs__slash">/</span>
        </li>
      </ul>
      <div class="page-heading__wrapper">
        <div class="page-heading__title-wrapper">
          <nuxt-link class="btn btn--icon-left btn--border-none page-heading__back-btn" to="/">
            <span class="btn__text">Back</span>
            <span class="btn__icon">
              <svg width="10" height="8" aria-hidden="true">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </span>
          </nuxt-link>
          <h1 class="title title--h2">Vacancy Details</h1>
        </div>
        <ul class="page-heading__tabs page-heading__tabs--mobile">
          <li class="page-heading__tab active">
            <button class="page-heading__tab-btn">Vacancy</button>
          </li>
          <li class="page-heading__tab">
            <button class="page-heading__tab-btn">About</button>
          </li>
        </ul>
        <div class="stage-history page-heading__history">
          <p class="stage-history__first-item">
            <span class="stage-history__text">{{ $t('history.label.' + parseAction(currentStatus.action)) }}</span>
            <span class="stage-history__date">{{ currentStatus.date }}</span>
          </p>
          <ul class="stage-history__list">
            <li class="stage-history__item" v-for="hItem in history">
              <span class="stage-history__text">{{ $t('history.label.' + parseAction(hItem.action)) }}</span>
              <span class="stage-history__date">{{ hItem.date }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="intro details details--vacancy">
      <div class="details__main">
        <section class="details__section details__section--card">
          <article class="cv-card">
            <div class="cv-card__userpic">
              <svg width="107" height="107" aria-hidden="true">
                <use xlink:href="#logo-vacancy"></use>
              </svg>
            </div>
            <div class="cv-card__body">
              <h3 class="cv-card__user-name">{{ company.name }}</h3>
              <div class="cv-card__match-results">
                <time class="cv-card__time-found" datetime="2022-06-18">Matched yesterday</time>
                <p class="cv-card__match" :class="colorClass">{{ formData.percent }}% match</p>
              </div>
              <p class="cv-card__occupation">{{ vacancy.position }}</p>
              <p class="cv-card__relocation">Relocation: {{ vacancy.is_ready_to_relocate }}</p>
              <p class="cv-card__location">
                <svg width="9" height="11" aria-hidden="true">
                  <use xlink:href="#map-marker"></use>
                </svg><span>Riga, Latvia</span>
              </p>
              <p class="cv-card__label cv-card__label--experience"></p>
              <p class="cv-card__experience"></p>
              <p class="cv-card__workplace"><span class="cv-card__label">Employment type: </span> {{ vacancy.office_type }}</p>
              <p class="cv-card__label cv-card__label--salary">Salary</p>
              <p class="cv-card__salary">$ {{ vacancy.desired_salary }}</p>
            </div>
          </article>
          <article class="cv-card">
            <div class="cv-card__userpic">
              <svg width="107" height="107" aria-hidden="true">
                <use xlink:href="#logo-vacancy"></use>
              </svg>
            </div>
            <div class="cv-card__body">
              <h3 class="cv-card__user-name">RutaJob1</h3>
              <div class="cv-card__match-results">
                <time class="cv-card__time-found" datetime="2022-06-18">Matched yesterday</time>
                <p class="cv-card__match cv-card__match--green">95% match</p>
              </div>
              <p class="cv-card__occupation">Senior full-stack (C#, Kotlin, Golang, JS) developer</p>
              <p class="cv-card__relocation">Relocation: yes</p>
              <p class="cv-card__location">
                <svg width="9" height="11" aria-hidden="true">
                  <use xlink:href="#map-marker"></use>
                </svg><span>Riga, Latvia</span>
              </p>
              <p class="cv-card__label cv-card__label--experience">Experience</p>
              <p class="cv-card__experience">4 years</p>
              <p class="cv-card__workplace"><span class="cv-card__label">Employment type: </span> Hybrid</p>
              <p class="cv-card__label cv-card__label--salary">Salary</p>
              <p class="cv-card__salary">$3500</p>
            </div>
          </article>
        </section>
        <section class="details__section details__section--about">
          <h2 class="details__title">About</h2>
          <div class="details__category">
            <h3 class="details__subtitle">Industry</h3>
            <p class="details__plain-text">{{ vacancy.industry }}</p>
          </div>
          <div class="details__category">
            <h3 class="details__subtitle">Company type</h3>
            <p class="details__plain-text">{{ getTypeString(company.type) }}</p>
          </div>
          <div class="details__category">
            <h3 class="details__subtitle">Description</h3>
            <p class="details__plain-text" v-html="vacancy.description"></p>
          </div>
          <div class="details__category" v-if="vacancy.benefits">
            <h3 class="details__subtitle">Benefits</h3>
            <p class="details__plain-text">{{ vacancy.benefits }}</p>
          </div>
          <div class="details__category" v-if="vacancy.relocation_benefits">
            <h3 class="details__subtitle">Relocation benefits</h3>
            <p class="details__plain-text">{{ vacancy.relocation_benefits }}</p>
          </div>
          <div class="details__category">
            <h3 class="details__subtitle">Language</h3>
            <p class="details__plain-text" v-for="lang in vacancy.languages">{{ lang.name }} — {{ $t('lang.level.' + lang.level) }}</p>
          </div>
        </section>
        <section class="details__section details__section--team">
          <h2 class="details__title">Team and projects</h2>
          <p class="details__plain-text" v-html="vacancy.about"></p>
        </section>
        <skills-detailed
          :entity="vacancy"
          :compare="cv"
        ></skills-detailed>
      </div>
      <div class="details__side-bar">
        <section class="details__section details__section--about-company">
          <h2 class="details__title">About company</h2>
          <p class="details__plain-text" v-html="company.about"></p>
        </section>
      </div>
      <div class="details__buttons buttons-panel">
        <button v-if="showNextPrev" class="btn btn--icon-left details__button" type="button" @click="openPrev">
          <span class="btn__text">Prev</span>
          <span class="btn__icon">
            <svg width="16" height="14" aria-hidden="true">
              <use xlink:href="#icon-arrow-left"></use>
            </svg>
          </span>
        </button>
        <button  v-if="showNextPrev" class="btn btn--to-the-left btn--icon-right btn--blue-text details__button details__button--with-margin" type="button" @click="openNext">
          <span class="btn__text">Next vacancy</span>
          <span class="btn__icon">
            <svg width="16" height="14" aria-hidden="true">
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </span>
        </button>
        <button class="btn details__button details__button--with-margin" type="button" disabled @click="changeStatus(0)">
          <span class="btn__text">Decline</span>
        </button>
        <button class="btn btn--blue-text details__button details__button--with-margin" type="button" @click="changeStatus(4)">
          <span class="btn__text">Postpone</span>
        </button>
        <button class="btn btn--blue details__button details__button--with-margin" type="button" @click="changeStatus(2)">
          <span class="btn__text">I am interested</span>
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import SkillsDetailed from "../../../components/basic/common/detailed/SkillsDetailed.vue";
import detailed from "/mixins/matches/detailed.js";
export default {
  name: "DetailedVacancy",
  components: {
    SkillsDetailed
  },
  data: () => ({
    type: 'vacancy'
  }),
  mixins: [detailed],
  mounted() {
    this.$api.match.details(this.$route.params.id).then((res) => {
      if (res.data.success) {
        this.formData = res.data.data;
      }
    })
  }
}
</script>

<style scoped>

</style>
