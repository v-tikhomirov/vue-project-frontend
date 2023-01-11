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
          <h1 class="title title--h2">{{ formData.general.position }}</h1>
        </div>
        <ul class="page-heading__tabs">
          <li class="page-heading__tab" :class="{'active': stepper.general}">
            <button class="page-heading__tab-btn" @click="goTo('general')">Primary</button>
          </li>
          <li class="page-heading__tab" :class="{'active': stepper.skills}">
            <button class="page-heading__tab-btn" @click="goTo('skills')">Skills set</button>
          </li>
          <li class="page-heading__tab" :class="{'active': stepper.about}">
            <button class="page-heading__tab-btn" @click="goTo('about')">Team & projects</button>
          </li>
        </ul>
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
          <button class="btn btn--icon-left form__button"
                  :class="[formData.status !== 'draft' ? 'btn--to-the-left' : '' ]"
                  type="button"
                  @click="$router.push('/vacancies')">
            <span class="btn__text">Cancel</span>
            <span class="btn__icon">
            <svg width="13" height="13" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </span>
          </button>
          <button v-if="formData.status === 'draft'" class="btn btn--to-the-left btn--blue-text details__button" type="button" @click="draftVacancy">
            <span class="btn__text">Save draft</span>
          </button>
          <button class="btn btn--blue form__button" type="button" @click="publishJob">
            <span class="btn__text">Save a Job</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Breadcrumbs from "../../../components/basic/page/Breadcrumbs.vue";
import General from "../../../components/pages/vacancies/edit/General.vue";
import SkillSet from "../../../components/basic/common/SkillSet.vue";
import About from "../../../components/pages/vacancies/edit/About.vue";

export default {
  name: "vacancy_edit",
  components: {
    Breadcrumbs,
    SkillSet,
    General,
    About
  },
  head() {
    return {
      title: "Edit vacancy",
    }
  },
  data: () => ({
    breadcrumbs: [
      {
        text: "Vacancies",
        to: '/vacancies'
      },
      {
        text: "Vacancy",
        disabled: true,
      },
    ],
    stepper: {
      general: true,
      skills: false,
      about: false
    },
    formData: {
      company_id: null,
      status: '',
      general: {
        position: '',
        industry: '',
        office_type: '',
        is_ready_to_relocate: '',
        relocation_benefits: '',
        location: {},
        currency: '',
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
  computed: {
    currentStep() {
      return Object.keys(this.stepper).find(k => this.stepper[k])
    }
  },
  created() {
    if (process.client) {
      console.log(this.$route.params.slug);
      this.$api.vacancy.loadVacancy(this.$route.params.slug).then((res) => {
        if (res.data.success) {
          this.formData = res.data.data;
        }
      })
    }
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
    publishJob() {
      this.formData.status = 'active';
      this.submitVacancy();
    },
    submitVacancy() {
      this.formData.step = this.currentStep;
      this.$api.vacancy.updateVacancy(this.formData).then((res) => {
        if (res.data.success) {
          this.$router.push('/vacancies');
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
