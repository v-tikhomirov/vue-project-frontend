<template>
  <li class="vacancies__item" @click="editVacancy">
    <article class="card card--total">
      <div class="card__header">
        <h3 class="card__title">{{ vacancy.position }}</h3>
        <p class="card__total-found" v-if="vacancy.matches_count">{{ vacancy.matches_count }}</p>
      </div>
      <div class="card__job-conditions">
        <p class="card__label"></p>
        <p class="card__experience"></p>
        <p class="card__location">
          <svg width="9" height="11" aria-hidden="true">
            <use xlink:href="#map-marker"></use>
          </svg><span>{{ vacancy.city }}, {{ vacancy.country }}</span>
        </p>
        <p class="card__label">Salary</p>
        <p class="card__salary">{{ vacancy.desired_salary | currency(vacancy.currency) }}</p>
        <p class="card__workplace">{{ officeType }}</p>
      </div>
      <div class="card__user-skills">
        <template v-for="(value, key) in vacancy.skills">
          <p class="card__label">{{ $t('vacancy.card.skill.label.' + key) }}</p>
          <p class="card__languages">{{ value.label }}<span v-if="value.count">&nbsp;{{ value.count }}+</span>
          </p>
        </template>
      </div>
      <div class="card__buttons">
        <button class="btn btn--icon-left btn--card-no-border" type="button" @click.stop="editVacancy">
          <span class="btn__text">Edit</span>
          <span class="btn__icon">
            <svg width="14" height="14" aria-hidden="true">
              <use xlink:href="#pencil"></use>
            </svg>
          </span>
        </button>
        <button v-if="vacancy.status === 'active'" class="btn btn--icon-left btn--card-no-border" type="button" @click.stop="archiveVacancy">
          <span class="btn__text">Archive</span>
          <span class="btn__icon">
            <svg width="14" height="14" aria-hidden="true">
              <use xlink:href="#box"></use>
            </svg>
          </span>
        </button>
        <button v-if="vacancy.status === 'active'" class="btn btn--card-no-border" type="button">
          <span class="btn__text">Share</span>
        </button>
      </div>
    </article>
  </li>
</template>

<script>
export default {
  name: "VacancyCard",
  props: {
    vacancy : {
      required: true
    }
  },
  filters: {
    currency: function (value, currency) {
      if (!value) return ''
      switch (currency) {
        case 'USD' :
          return '$'+value;
        case 'EUR':
          return '€'+value;
      }

      return value;
    }
  },
  computed: {
    officeType() {
      return this.$t('office.type.'+this.vacancy.office_type);
    }
  },
  methods: {
    editVacancy() {
      this.$router.push('/vacancies/edit/'+this.vacancy.slug);
    },
    archiveVacancy() {
      this.$api.vacancy.archive(this.vacancy.id).then((res) => {
        if (res.data.success) {
          this.$emit('reload');
        }
      });
    },
    // getLabel(array) {
    //   const string
    // },
    // getCount(array) {
    //
    // }
  }
}
</script>

<style scoped>

</style>
