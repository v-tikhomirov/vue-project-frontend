<template>
  <main>
    <div class="page-heading">
      <ul class="breadcrumbs page-heading__breadcrumbs">
        <li class="breadcrumbs__item"><a class="link breadcrumbs__link" href="#" tabIndex="0">Dashboard</a><span class="breadcrumbs__slash">/</span>
        </li>
        <li class="breadcrumbs__item"><a class="link breadcrumbs__link" href="#" tabIndex="-1">{{ candidate.first_name + ' ' + candidate.last_name }}</a><span class="breadcrumbs__slash">/</span>
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
          <h1 class="title title--h2">CV Details</h1>
        </div>
        <ul class="page-heading__tabs page-heading__tabs--mobile">
          <li class="page-heading__tab active">
            <button class="page-heading__tab-btn">CV</button>
          </li>
          <li class="page-heading__tab">
            <button class="page-heading__tab-btn">Contacts</button>
          </li>
          <li class="page-heading__tab">
            <button class="page-heading__tab-btn">Links</button>
          </li>
          <li class="page-heading__tab">
            <button class="page-heading__tab-btn">Notes</button>
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
    <div class="intro details">
      <div class="details__main">
        <section class="details__section details__section--card">
          <article class="cv-card">
            <div class="cv-card__userpic" v-if="candidate.profile_picture">
              <picture>
                <source type="image/webp" :srcset="mediaUrl + candidate.profile_picture"><img :src="mediaUrl + candidate.profile_picture" width="107" height="107" :alt="candidate.first_name + candidate.last_name">
              </picture>
            </div>
            <div class="cv-card__body">
              <h3 class="cv-card__user-name">{{ candidate.first_name }} {{ candidate.last_name }}</h3>
              <div class="cv-card__match-results">
                <time class="cv-card__time-found" datetime="2022-06-18">Matched today</time>
                <p class="cv-card__match" :class="colorClass">{{formData.percent}}% match</p>
              </div>
              <p class="cv-card__occupation">{{ cv.position }}</p>
              <p class="cv-card__relocation">Open to relocation</p>
              <p class="cv-card__location">
                <svg width="9" height="11" aria-hidden="true">
                  <use xlink:href="#map-marker"></use>
                </svg><span>{{ candidate.city }}, {{ candidate.country }}</span>
              </p>
              <p class="cv-card__label cv-card__label--experience">Total experience</p>
              <p class="cv-card__experience">{{ expYears }} {{ pluralYer }}</p>
              <p class="cv-card__workplace"><span class="cv-card__label">Employment type: </span> {{ cv.office_type }}</p>
              <p class="cv-card__label cv-card__label--salary">Expected salary</p>
              <p class="cv-card__salary">${{ cv.desired_salary }}</p>
            </div>
          </article>
          <article class="cv-card">
            <div class="cv-card__userpic" v-if="candidate.profile_picture">
              <picture>
                <source type="image/webp" :srcset="mediaUrl + candidate.profile_picture"><img :src="mediaUrl + candidate.profile_picture" width="107" height="107" :alt="candidate.first_name + candidate.last_name">
              </picture>
            </div>
            <div class="cv-card__body">
              <h3 class="cv-card__user-name">John D.</h3>
              <div class="cv-card__match-results">
                <time class="cv-card__time-found" datetime="2022-06-18">Matched today</time>
                <p class="cv-card__match cv-card__match--green">95% match</p>
              </div>
              <p class="cv-card__occupation">Senior full-stack (C#, Kotlin, Golang, JS) developer</p>
              <p class="cv-card__relocation">Open to relocation</p>
              <p class="cv-card__location">
                <svg width="9" height="11" aria-hidden="true">
                  <use xlink:href="#map-marker"></use>
                </svg><span>Riga, Latvia</span>
              </p>
              <p class="cv-card__label cv-card__label--experience">Total experience</p>
              <p class="cv-card__experience">4 years</p>
              <p class="cv-card__workplace"><span class="cv-card__label">Employment type: </span> Hybrid</p>
              <p class="cv-card__label cv-card__label--salary">Expected salary</p>
              <p class="cv-card__salary">$3500</p>
            </div>
          </article>
        </section>
        <section class="details__section details__section--about">
          <h2 class="details__title">About</h2>
          <div class="details__category">
            <h3 class="details__subtitle">Languages</h3>
            <p class="details__plain-text" v-for="lang in cv.languages">{{ lang.name }} — {{ $t('lang.level.' + lang.level) }}</p>
          </div>
          <div class="details__category">
            <h3 class="details__subtitle">Industry</h3>
            <p class="details__plain-text">{{ cv.industry }}</p>
          </div>
          <div class="details__category">
            <h3 class="details__subtitle">Description</h3>
            <p class="details__plain-text" v-html="cv.about"></p>
          </div>
        </section>
        <skills-detailed
          :entity="cv"
          :compare="vacancy"
        ></skills-detailed>
        <section class="details__section details__section--recent-projects">
          <h2 class="details__title">Recent Projects</h2>
          <div class="details__projects">
            <div class="details__project" v-for="project in cv.recent_projects">
              <div class="details__top-wrapper">
                <h3 class="title">{{ project.title }}</h3>
                <span class="details__experience">{{ getProjectDuration(project) }}</span>
              </div>
              <div class="details__project-description">
                <div class="details__description-group">
                  <h4 class="title details__description-title">Technologies</h4>
                  <p class="details__description-text">{{ project.stack }}</p>
                </div>
<!--                <div class="details__description-group">-->
<!--                  <h4 class="title details__description-title">Team size</h4>-->
<!--                  <p class="details__description-text">2 developer, 0 QA and 1 Project Manager</p>-->
<!--                </div>-->
                <div class="details__description-group">
                  <h4 class="title details__description-title">Description</h4>
                  <p class="details__description-text" v-html="project.description"></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="details__side-bar">
        <section class="details__section details__section--contacts">
          <button class="details__contacts-btn is-active">Contacts</button>
          <button class="details__contacts-btn">Links</button>
          <ul class="details__contacts-list">
            <li class="details__contacts-item" v-if="candidate.phone">
              <span class="details__contacts-text">Phone</span>
              <span class="details__value" v-if="this.formData.status < 3">******************</span>
              <a href="" v-else class="link details__contacts-link">{{ candidate.phone }}</a>
            </li>
            <li class="details__contacts-item" v-if="candidate.whatsapp">
              <span class="details__contacts-text">WhatsApp</span>
              <span class="details__value" v-if="this.formData.status < 3">******************</span>
              <span class="details__value" v-else>{{ candidate.whatsapp }}</span>
            </li>
            <li class="details__contacts-item" v-if="candidate.telegram">
              <span class="details__contacts-text">Telegram</span>
              <span class="details__value" v-if="this.formData.status < 3">******************</span>
              <span class="details__value" v-else>{{ candidate.telegram }}</span>
            </li>
            <li class="details__contacts-item" v-if="candidate.email">
              <span class="details__contacts-text">Email</span>
              <span class="details__value" v-if="this.formData.status < 3">******************</span>
              <a :href="'mailto: ' + candidate.email" class="link details__contacts-link" v-else>{{ candidate.email }}</a>
            </li>
          </ul>
          <p class="details__subscribe" v-if="this.formData.status < 3">Subscribe to unlock applicant’s contacts</p>
        </section>
        <Notes :api="$api.note" :match_id="parseInt(this.$route.params.id)" :notes="formData.notes" @notes-updated="notesUpdated"></Notes>
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
        <button v-if="showNextPrev" class="btn btn--to-the-left btn--icon-right btn--blue-text details__button details__button--with-margin" type="button" @click="openNext">
          <span class="btn__text">Next CV</span>
          <span class="btn__icon">
          <svg width="16" height="14" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </span>
        </button>
        <button class="btn details__button details__button--with-margin" type="button" @click="changeStatus(100)">
          <span class="btn__text">Decline</span>
        </button>
        <button class="btn btn--blue-text details__button details__button--with-margin" type="button" @click="changeStatus(5)">
          <span class="btn__text">Postpone</span>
        </button>
        <button class="btn btn--blue details__button details__button--with-margin" type="button" @click="openContacts()" v-if="this.formData.status < 3">
          <span class="btn__text">Open contacts</span>
        </button>
        <button class="btn btn--blue details__button details__button--with-margin" type="button" @click="changeStatus(6)" v-else-if="this.formData.status == 3">
          <span class="btn__text">Interview</span>
        </button>
        <button class="btn btn--blue details__button details__button--with-margin" type="button" @click="changeStatus(999)" v-else-if="this.formData.status == 6">
          <span class="btn__text">Move to archive</span>
        </button>
      </div>
    </div>
    <Payment :is-open="isOpenContactsModal" @closed="isOpenContactsModal = false" :api="$api.payment" :cv-id="$route.params.id"></Payment>
    <SuccessPayment :is-open="isOpenSuccessfulPaymentModal" @closed="isOpenSuccessfulPaymentModal = false"></SuccessPayment>
  </main>
</template>

<script>
import SkillsDetailed from "../../../components/basic/common/detailed/SkillsDetailed.vue";
import detailed from "/mixins/matches/detailed.js";
import Payment from "@/components/basic/common/modals/Payment.vue";
import SuccessPayment from "@/components/basic/common/modals/SuccessPayment.vue";
import Notes from "@/components/pages/match/Notes.vue";
export default {
  name: "CvDetailed",
  components: {
    SkillsDetailed,
    Payment,
    SuccessPayment,
    Notes
  },
  data() {
    return {
      isOpenSuccessfulPaymentModal: false,
      isOpenContactsModal: false,
      type: 'cv'
    }
  },
  mixins: [detailed],
  computed: {
    expYears() {
      return Math.round(this.cv.experience * 0.0833886986);
    },
    pluralYer() {
      if (this.expYears > 1) {
        return this.$t('years').toString();
      }
      return this.$t('year').toString();
    }
  },
  mounted() {
    if(this.$route.query.successfullPayment) {
      this.isOpenSuccessfulPaymentModal = true
    }
    this.getMatchData()
  },
  methods: {
    getProjectDuration(project) {
      let string = this.$dateFns.format(new Date(project.start_date), 'LLLL yyyy') + ' - ';
      const endDate = project.end_date ? new Date(project.end_date) : new Date();
      const difference = this.$dateFns.differenceInMonths(endDate, new Date(project.start_date));
      let prefix = '';
      if (difference === 1) {
        prefix = 'Month';
      } else {
        prefix = 'Months';
      }
      if (project.end_date) {
        return string + this.$dateFns.format(new Date(project.end_date), 'LLLL yyyy') + '(' + difference + ' ' + prefix + ')';
      } else {
        return string + 'Now ' + '(' + difference + ' ' + prefix + ')';
      }
    },
    notesUpdated() {
      this.getMatchData()
    },
    getMatchData() {
      this.$api.match.details(this.$route.params.id).then((res) => {
        if (res.data.success) {
          this.formData = res.data.data;
        } else {
          this.$router.push('/');
        }
      }).catch(() => {
        this.$router.push('/');
      })
    },
    openContacts() {
      if(this.$auth.user.companies[0].balance < 1)
      {
        this.isOpenContactsModal = true
      } else {
       this.$api.payment.openContact(this.$auth.user.companies[0].id, this.$route.params.id)
          .then((res) => {
            this.$auth.fetchUser()
            this.getMatchData()
          })
      }
    },
  }
}
</script>

<style scoped>
  .details__value {
    white-space: nowrap;
  }
  .details__contacts-list {
    padding: 0 7px 0 7px
  }
  .details__contacts-link {
    text-align: right;
  }
</style>
