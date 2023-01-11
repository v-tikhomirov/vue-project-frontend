<template>
  <main>
    <div class="page-heading">
      <ul class="breadcrumbs page-heading__breadcrumbs">
        <li class="breadcrumbs__item"><a class="link breadcrumbs__link" href="#" tabIndex="0">Vacancies</a><span class="breadcrumbs__slash">/</span>
        </li>
        <li class="breadcrumbs__item"><a class="link breadcrumbs__link" href="#" tabIndex="-1">New vacancy</a><span class="breadcrumbs__slash">/</span>
        </li>
      </ul>
      <div class="page-heading__wrapper">
        <div class="page-heading__title-wrapper">
          <NuxtLink class="btn btn--icon-left btn--border-none page-heading__back-mobile" to="/"><span class="btn__text"></span><span class="btn__icon">
                  <svg width="10" height="8" aria-hidden="true">
                    <use xlink:href="#icon-arrow-left"></use>
                  </svg></span>
          </NuxtLink>
          <h1 class="title title--h2">New vacancy</h1>
        </div>
      </div>
    </div>
    <div class="intro" :class="{'intro--description': stepper.about}">
      <div class="form" data-validate>
        <general
          v-if="stepper.general"
          v-model="formData.general"
          @submit="handleSubmit"
        ></general>
        <skill-set
          v-if="stepper.skills"
          v-model="formData.skills"
        ></skill-set>
        <about
          v-if="stepper.about"
          v-model="formData.about"
        ></about>
        <div class="form__buttons buttons-panel">
          <button class="btn btn--to-the-left form__button" type="button" @click="draftVacancy">
            <span class="btn__text">Save to draft</span>
          </button>
          <button v-if="stepper.general" class="btn btn--icon-left form__button" type="button" @click="$router.push(back)">
            <span class="btn__text">Cancel</span>
            <span class="btn__icon">
            <svg width="13" height="13" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </span>
          </button>
          <button v-if="!stepper.general" class="btn btn--icon-left form__button" type="button" @click="prevStep">
            <span class="btn__text">Back</span>
            <span class="btn__icon">
              <svg width="14" height="13" aria-hidden="true">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </span>
          </button>
          <button v-if="!stepper.about" class="btn btn--blue btn--icon-right form__button" type="button" @click="nextStep">
            <span class="btn__text">Next</span>
            <span class="btn__icon">
                <svg width="14" height="13" aria-hidden="true">
                  <use xlink:href="#icon-arrow-right"></use>
                </svg>
          </span>
          </button>
          <button v-if="stepper.about" class="btn btn--blue form__button" type="button" @click="postJob">
            <span class="btn__text">Post a job</span>
          </button>
        </div>
      </div>
    </div>
    <DoneVacancy :vacancy-id="vacancyId" :is-open="isDone"></DoneVacancy>
  </main>
</template>

<script>
import General from "../../components/pages/vacancies/edit/General.vue";
import SkillSet from "../../components/basic/common/SkillSet.vue";
import About from "../../components/pages/vacancies/edit/About.vue";
import DoneVacancy from "@/components/basic/common/modals/DoneVacancy.vue";
export default {
  name: "new",
  components: {
    SkillSet,
    General,
    About,
    DoneVacancy
  },
  head() {
    return {
      title: "New vacancy",
    }
  },
  data: () => ({
    isDone: true,
    vacancyId: null,
    stepper: {
      general: true,
      skills: false,
      about: false
    },
    formData: {
      company_id: null,
      status: 'draft',
      general: {
        position: '',
        industry: '',
        office_type: '',
        is_ready_to_relocate: '',
        relocation_benefits: '',
        location: {},
        currency: 'USD',
        desired_salary: '',
        max_salary: '',
        description: '',
        benefits: '',
        languages: []
      },
      skills: [],
      about: ''
    }
  }),
  mounted() {
    this.formData.company_id = this.companyId;
  },
  methods: {
    handleSubmit(id) {
      this.goTo('skills');
      this.vacancy_id = id;
    },
    nextStep() {
      if (this.stepper.general) {
        this.goTo('skills');
        return;
      }
      if (this.stepper.skills) {
        this.goTo('about');
      }
    },
    prevStep() {
      if (this.stepper.about){
        this.goTo('skills');
        return;
      }
      if (this.stepper.skills) {
        this.goTo('general');
      }
    },
    goTo(step) {
      Object.keys(this.stepper).forEach(key => {
        this.stepper[key] = false;
      });
      this.stepper[step] = true;
    },
    draftVacancy() {
      this.formData.status = 'draft';
      this.submitVacancy();
    },
    postJob() {
      this.formData.status = 'active';
      this.submitVacancy();
    },
    submitVacancy() {
      this.$api.vacancy.createVacancy(this.formData).then((res) => {
        if (res.data.success) {
          this.vacancyId = res.data.data.id
          this.isDone = true
          //this.$router.push('/vacancies');
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
