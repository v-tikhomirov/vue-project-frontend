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
          <h1 class="title title--h2">Vacancies</h1>
        </div>
        <ul class="page-heading__tabs">
          <li class="page-heading__tab" :class="{ 'active' : activeTab === 'active'}">
            <button class="page-heading__tab-btn" @click="activeTab = 'active'">Active</button>
          </li>
          <li class="page-heading__tab" :class="{ 'active' : activeTab === 'draft'}">
            <button class="page-heading__tab-btn" @click="activeTab = 'draft'">Drafts</button>
          </li>
          <li class="page-heading__tab" :class="{ 'active' : activeTab === 'archive'}">
            <button class="page-heading__tab-btn" @click="activeTab = 'archive'">Archive</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="vacancies">
      <ul class="vacancies__list">
        <vacancy-card
          v-for="vacancy in tabVacancies"
          :key="vacancy.id"
          :vacancy="vacancy"
          @reload="init"
        ></vacancy-card>
        <li class="vacancies__item">
          <article class="card card--empty">
            <h3 class="visually-hidden">New search</h3>
            <button class="btn btn--icon-top" type="button" @click="createNew">
              <span class="btn__text">Create new</span>
              <span class="btn__icon">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlink:href="#plus"></use>
                </svg>
              </span>
            </button>
          </article>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import Breadcrumbs from "~/components/basic/page/Breadcrumbs.vue";
import VacancyCard from "~/components/pages/vacancies/VacancyCard.vue";
export default {
  name: "vacancies",
  components: {
    Breadcrumbs,
    VacancyCard
  },
  head() {
    return {
      title: "Vacancies",
    }
  },
  data: () => ({
    breadcrumbs: [
      {
        text: "Vacancies",
        disabled: true,
      },
    ],
    vacancies: {
      active: [],
      draft: [],
      archive: []
    },
    activeTab: 'active'
  }),
  computed: {
    tabVacancies() {
      return this.vacancies[this.activeTab];
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$api.vacancy.getAll().then((res) => {
        if (res.data.success) {
          this.vacancies = Object.assign({
            active: [],
            draft: [],
            archive: []
          }, res.data.data)
        }
      })
    },
    createNew() {
      this.$router.push('/vacancies/new');
    },
  }
}
</script>

<style scoped>

</style>
