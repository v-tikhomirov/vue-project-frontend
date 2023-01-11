<template>
  <main>
    <div class="page-heading">
      <breadcrumbs
        :items="breadcrumbs"
      />
      <div class="page-heading__wrapper">
        <div class="page-heading__title-wrapper">
          <NuxtLink class="btn btn--icon-left btn--border-none page-heading__back-mobile" to="/">
            <span class="btn__text"></span>
            <span class="btn__icon">
              <svg width="10" height="8" aria-hidden="true">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </span>
          </NuxtLink>
          <h1 class="title title--h2">My CV</h1>
        </div>
        <ul class="page-heading__tabs">
          <li class="page-heading__tab" :class="{'active': tabs.primary}">
            <button class="page-heading__tab-btn" @click="switchTo('primary')">Primary</button>
          </li>
          <li class="page-heading__tab" :class="{'active': tabs.skills}">
            <button class="page-heading__tab-btn" @click="switchTo('skills')">Skills set</button>
          </li>
          <li class="page-heading__tab" :class="{'active': tabs.recent_projects}">
            <button class="page-heading__tab-btn" @click="switchTo('recent_projects')">Recent projects</button>
          </li>
        </ul>
        <a class="link page-heading__share" href="#">
          <span class="page-heading__share-icon">
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="#share"></use>
            </svg>
          </span>
          <span>Share my CV</span>
        </a>
      </div>
    </div>
    <div class="intro">
      <div class="form" data-validate>
        <primary
          v-if="tabs.primary"
          v-model="formData.primary"
          formId="cv_primary"
        ></primary>
        <skill-set
          v-if="tabs.skills"
          v-model="formData.skills"
        ></skill-set>
        <recent-projects
          v-if="tabs.recent_projects"
          v-model="formData.recent_projects"
          formId="cv_recent_projects"
        ></recent-projects>
        <div class="form__buttons buttons-panel">
          <button v-if="isDraft" class="btn btn--to-the-left form__button" type="button" @click="saveDraft()">
            <span class="btn__text">Save to draft</span>
          </button>
          <button v-if="!isDraft" class="btn btn--icon-left form__button" type="button" @click="$router.push('/')">
            <span class="btn__text">Cancel</span>
            <span class="btn__icon">
              <svg width="14" height="13" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
              </svg>
            </span>
          </button>
          <button v-if="isDraft && (tabs.skills || tabs.recent_projects)" class="btn btn--icon-left form__button" type="button" @click="goBack">
            <span class="btn__text">Back</span>
            <span class="btn__icon">
              <svg width="14" height="13" aria-hidden="true">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </span>
          </button>
          <button v-if="isDraft" class="btn btn--blue btn--icon-right form__button" type="button" @click="goNext">
            <span class="btn__text">{{ nextLabel }}</span>
            <span class="btn__icon" v-if="!this.tabs.recent_projects">
              <svg width="14" height="13" aria-hidden="true">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </span>
          </button>
          <button v-if="!isDraft" class="btn btn--blue form__button" type="button" @click="submitCv">
            <span class="btn__text">Save</span>
          </button>
        </div>
        <messages :value="actionMessage"></messages>
      </div>
    </div>
  </main>
</template>

<script>
import pageMixin from "../mixins/basic/page.js";
import Breadcrumbs from "../components/basic/page/Breadcrumbs.vue";
import Primary from "../components/pages/cv/Primary.vue";
import SkillSet from "../components/basic/common/SkillSet.vue"
import RecentProjects from "../components/pages/cv/RecentProjects.vue";
import Messages from "../components/basic/form/Messages.vue";
export default {
  name: "cv",
  components: {
    Messages,
    Breadcrumbs,
    Primary,
    SkillSet,
    RecentProjects
  },
  head() {
    return {
      title: "My CV",
    }
  },
  mixins: [pageMixin],
  data: () => ({
    page: {
      title: "My CV",
    },
    breadcrumbs: [
      {
        text: "My CV",
        disabled: true,
      },
    ],
    tabs: {
      primary: true,
      skills: false,
      recent_projects: false,
    },
    formData: {
      is_draft: true,
      primary: {
        position: '',
        industry: '',
        type: [],
        office_type: '',
        status: '',
        is_ready_to_relocate: '',
        languages: [],
        currency: 'USD',
        desired_salary: '',
        minimal_salary: '',
        about: ''
      },
      skills: [],
      recent_projects: [
        {
          title: '',
          start_date: null,
          is_in_progress: false,
          end_date: null,
          industry: null,
          stack: null,
          description: ''
        }
      ]
    },
    validationRules: {
      primary: {
        position: 'required',
        industry: 'required',
        type: 'required',
        office_type: 'required',
        status: 'required',
        languages: 'required',
        currency: 'required',
        desired_salary: 'required',
        minimal_salary: 'required',
        about: 'required'
      },
      skills: {
        languages: 'required_any',
        frameworks: 'required_any',
        libraries: 'required_any',
        other: 'required_any',
        tools: 'required_any'
      },
      recent_projects: {
        title: 'required',
        start_date: 'required',
        stack: 'required',
        description: 'required'
      }
    },
    isNew: false,
  }),
  computed: {
    isDraft() {
      if (this.formData.id && !this.formData.is_draft) {
        return false;
      }

      return true;
    },
    nextLabel() {
      if (this.tabs.recent_projects) {
        return this.$t('publish').toString()
      }

      return this.$t('next').toString();
    }
  },
  created() {
    if (process.client) {
      this.$api.cv.getCv().then((res) => {
        if (res.data.success) {
          if (res.data.data === null) {
            this.isNew = true;
          } else {
            this.formData = res.data.data;
          }
        }
      })
    }
  },
  methods: {
    submitCv() {
      Object.keys(this.tabs).forEach((item) => {
        if (this.tabs[item]) {
          this.formData.step = item;
        }
      })
      this.$api.cv.update(this.formData).then((res) => {
        if (res.data.success) {
          this.formData = res.data.data;
        }
      })
    },
    goNext() {
      if (this.tabs.recent_projects) {
        if (this.validate('cv_recent_projects', 'recent_projects:each')) {
          this.$api.cv.createCv(this.formData).then((res) => {
            if (res.data.success) {
              this.$router.push('/');
            }
          })
        }
      }

      if (this.tabs.primary) {
        if (this.validate('cv_primary', 'primary')) {
          this.tabs.primary = false;
          this.tabs.skills = true;
        }
        return;
      }

      if (this.tabs.skills) {
        this.resetMessage();
        if (this.formData.skills.length > 0) {
          this.tabs.skills = false;
          this.tabs.recent_projects = true;
        } else {
          this.setErrorMessage('At least one skill is required')
        }
        return;
      }
    },
    goBack() {
      if (this.tabs.skills) {
        this.tabs.skills = false;
        this.tabs.primary = true;
        return;
      }
      if (this.tabs.recent_projects) {
        this.tabs.recent_projects = false;
        this.tabs.skills = true;
        return;
      }
    },
    saveDraft() {
      this.$api.cv.saveDraft(this.formData).then((res) => {
        if (res.data.success) {
          this.$router.push('/');
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
