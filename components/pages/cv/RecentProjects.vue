<template>
  <form method="post" action="#">
    <p class="title title--h4">Your recent projects</p>
    <fieldset class="form__block" v-for="(project, index) in projects" :key="index">
      <div class="form__description">
        <p class="title title--h4">Project details</p>
        <button v-if="index > 0" class="btn btn--border-none btn--icon-left form__btn-delete-project" type="button" @click="removeProject(index)">
          <span class="btn__text">Delete</span>
          <span class="btn__icon">
              <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="#icon-delete"></use>
              </svg>
          </span>
        </button>
      </div>
      <div class="form__content">
        <input-field
          v-model="project.title"
          label="Title"
          name="title"
          minlength="2"
          placeholder="Title"
          :errorMessage="errorsBag.title"
        ></input-field>
        <date-select-field
          v-model="project.start_date"
          label="Start date"
          :errorMessage="errorsBag.start_date"
        ></date-select-field>
        <checkbox-field
          v-model="project.is_in_progress"
          label="In progress"
        ></checkbox-field>
        <date-select-field
          v-if="!project.is_in_progress"
          v-model="project.end_date"
          label="End date"
        ></date-select-field>
        <multi-select-field
          v-model="project.industry"
          :options="domains"
          :label="$t('industry').toString() + ' (' + $t('optional').toString() +')'"
          :placeholder="$t('industry').toString()"
        ></multi-select-field>
        <multi-select-field
          v-model="project.stack"
          :options="technologies"
          :label="$t('stack').toString()"
          :placeholder="$t('search.technologies').toString()"
          :errorMessage="errorsBag.stack"
        ></multi-select-field>
        <textarea-field
          v-model="project.description"
          label="Description"
          placeholder="Tell us more about your responsibilities on this project"
          :errorMessage="errorsBag.description"
        ></textarea-field>
      </div>
    </fieldset>
    <button class="btn btn--icon-left btn--border-none form__btn-add" type="button" @click="addNewProject">
      <span class="btn__text">Add new project</span>
      <span class="btn__icon">
        <svg width="16" height="16" aria-hidden="true">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </span>
    </button>
  </form>
</template>

<script>
import InputField from "../../basic/form/InputField.vue";
import DateSelectField from "../../basic/form/DateSelectField.vue";
import CheckboxField from "../../basic/form/CheckboxField.vue";
import MultiSelectField from "../../basic/form/MultiSelectField.vue";
import TextareaField from "../../basic/form/TextareaField.vue";
import {mapGetters} from "vuex";
export default {
  name: "RecentProjects",
  components: {
    InputField,
    DateSelectField,
    CheckboxField,
    MultiSelectField,
    TextareaField
  },
  props: {
    value: {
      required: false
    },
    formId: {
      required: true
    }
  },
  watch: {
    projects: {
      handler(newVal) {
        this.$emit('input', newVal);
      },
      deep: true
    },
    value() {
      this.fillProjects()
    }
  },
  computed: {
    ...mapGetters({
      domains: 'getDomains',
      errors: 'errors/getErrorsBag'
    }),
    errorsBag() {
      return this.errors[this.formId];
    }
  },
  data: () => ({
    projects: [
      {
        title: '',
        start_date: null,
        is_in_progress: false,
        end_date: null,
        industry: null,
        stack: null,
        description: ''
      }
    ],
    technologies: []
  }),
  mounted() {
    if (this.domains.length === 0) {
      this.$api.common.getDomains().then((res) => {
        if (res.data.success) {
          this.$store.dispatch('setDomains', res.data.data);
        }
      });
    }
    this.$api.technology.getAllLight().then((res) => {
      if (res.data.success) {
        this.technologies = res.data.data;
        if (this.value) {
          this.fillProjects();
        }
      }
    });
  },
  methods: {
    fillProjects() {
      if (!this._.isEqual(this.value, this.projects)) {
        this.projects = this.value;
      }
    },
    addNewProject() {
      this.projects.push({
        title: '',
        start_date: null,
        is_in_progress: false,
        end_date: null,
        industry: null,
        stack: null,
        description: ''
      });
    },
    removeProject(key) {
      this.projects.splice(key,1);
    }
  }
}
</script>

<style scoped>

</style>
