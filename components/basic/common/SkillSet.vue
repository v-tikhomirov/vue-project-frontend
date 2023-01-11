<template>
    <form>
      <fieldset class="form__block form__block--skill-set">
        <div class="form__description">
          <p class="title title--h4">Skill set</p>
        </div>
        <div class="form__content">
          <skill-field
            :options="languages"
            label="Programming languages"
            v-model="skills.language"
            @change="prepareFormData"
          ></skill-field>
          <skill-field
            :options="frameworks"
            label="Frameworks"
            v-model="skills.framework"
            @change="prepareFormData"
          ></skill-field>
          <skill-field
            :options="libraries"
            label="Libraries"
            v-model="skills.library"
            @change="prepareFormData"
          ></skill-field>
          <skill-field
            :options="other"
            label="Other"
            v-model="skills.other"
            @change="prepareFormData"
          ></skill-field>
          <skill-field
            :options="tools"
            label="Tools"
            v-model="skills.tools"
            @change="prepareFormData"
          ></skill-field>
        </div>
      </fieldset>
    </form>
</template>

<script>
import SkillField from "../form/SkillField.vue";
import {mapGetters} from "vuex";

export default {
  name: "SkillSet",
  components: {
    SkillField
  },
  props: {
    value: {
      required: false
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        this.$emit('input', newVal);
      },
      deep: true
    },
    value(value) {
      this.fillSkills(value);
    }
  },
  computed: {
    ...mapGetters({
      technologies: 'getTechnologies'
    }),
    selectedLanguages() {
      const ids = this.skills.language.map((item) => {
        return item.technology_id
      })
      return this.technologies.language.filter((item) => {
        return ids.includes(item.value);
      }).map((item) => {
          return item.group;
      })
    },
    languages() {
      return this.technologies.language
    },
    tools() {
      return this.technologies.tools
    },
    other() {
      return this.technologies.other
    },
    frameworks() {
      if (this.selectedLanguages) {
        return this.technologies.framework.filter((item) => {
          return this.selectedLanguages.includes(item.group);
        })
      }
      return [];
    },
    libraries() {
      if (this.selectedLanguages) {
        return this.technologies.library.filter((item) => {
          return this.selectedLanguages.includes(item.group);
        })
      }
      return [];
    }
  },
  data: () => ({
    formData: [],
    skills: {
      language: [],
      framework: [],
      library: [],
      other: [],
      tools: [],
    }
  }),
  mounted() {
    if (this.languages.length === 0) {
      this.$api.technology.getRootTechnologies().then((res) => {
        if (res.data.success) {
          this.$store.dispatch('setTechnology', res.data.data);
          if (this.value) {
            this.loadGroups();
            this.fillSkills(this.value);
          }
        }
      })
    } else {
      if (this.value) {
        this.loadGroups();
        this.fillSkills(this.value);
      }
    }
  },
  methods: {
    fillSkills(value) {
      const ids = value.map((item) => {
        return item.technology_id;
      })
      this.skills.language = this.prepareSkills(ids, this.languages);
      this.skills.framework = this.prepareSkills(ids, this.frameworks);
      this.skills.library = this.prepareSkills(ids, this.libraries);
      this.skills.other = this.prepareSkills(ids, this.other);
      this.skills.tools = this.prepareSkills(ids, this.tools);
    },
    prepareSkills(ids, array){
      if (array) {
        const skillsIds = array.filter((item) => {
          return ids.includes(item.value);
        }).map((item) => {
          return item.value;
        });
        return this.value.filter((index) => {
          return skillsIds.includes(index.technology_id);
        });
      }
      return [];
    },
    loadGroups() {
      const ids = this.value.map((item) => {
        return item.technology_id;
      })
      const groupsToLoad = this.languages.filter((item) => {
        return ids.includes(item.value);
      }).map((item) => {
        return item.group;
      }).filter((item) => {
        return !this.$store.state.technologies.loadedGroups.includes(item);
      });
      if (groupsToLoad.length > 0) {
        this.$api.technology.getTechnologiesByGroup(groupsToLoad.join(',')).then((res) => {
          if (res.data.success) {
            this.$store.dispatch('setTechnology', res.data.data);
            groupsToLoad.forEach((item) => {
              this.$store.dispatch('setGroupLoaded', item);
            });
          }
        });
      }
    },
    prepareFormData() {
      this.formData = [];
      Object.keys(this.skills).forEach((key) => {
        this.formData = this.formData.concat(this.skills[key]);
      });
    },
    // submitData() {
    //   console.log('here');
    //   this.prepareFormData();
    //   if (this.entity === 'vacancy') {
    //     this.formData.id = this.entityId;
    //     this.$api.vacancy.createSkills(this.formData).then((res) => {
    //       if (res.data.success) {
    //         this.$router.push(this.back);
    //       }
    //     })
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
