<template>
  <section class="details__section details__section--skills">
    <h2 class="details__title">Skills</h2>
    <div :class="['matched-list', 'details__field', getClass('language')]">
      <div class="matched-list__header">
        <p class="matched-list__title">Programming language</p>
        <button class="matched-list__state matched-list__state--matched">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-match"></use>
          </svg><span>Matched</span>
        </button>
        <button class="matched-list__state matched-list__state--missing">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-missing"></use>
          </svg><span>Missing</span>
        </button>
        <button class="btn btn--border-none matched-list__view-all" type="button"><span class="btn__text">View all</span>
        </button>
      </div>
      <template v-if="languages.length">
        <ul class="matched-list__list">
          <li v-for="language in languages"
            :class="['matched-list__item', checkIsMatched(language, 'language') ? 'matched-list__item--matched' : '']">
            <p>{{ language.technology_name }}</p><span>&nbsp;{{ getExpLabel(language.experience) }}</span>
          </li>
        </ul>
      </template>
      <template v-else>
        <p class="matched-list__message">Nothing is amiss</p>
      </template>
    </div>
    <div :class="['matched-list', 'details__field', getClass('framework')]">
      <div class="matched-list__header">
        <p class="matched-list__title">Frameworks</p>
        <button class="matched-list__state matched-list__state--matched">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-match"></use>
          </svg><span>Matched</span>
        </button>
        <button class="matched-list__state matched-list__state--missing">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-missing"></use>
          </svg><span>Missing</span>
        </button>
        <button class="btn btn--border-none matched-list__view-all" type="button"><span class="btn__text">View all</span>
        </button>
      </div>
      <template v-if="frameworks.length">
        <ul class="matched-list__list">
          <li v-for="framework in frameworks"
              :class="['matched-list__item', checkIsMatched(framework, 'framework') ? 'matched-list__item--matched' : '']">
            <p>{{ framework.technology_name }}</p><span>&nbsp;{{ getExpLabel(framework.experience) }}</span>
          </li>
        </ul>
      </template>
      <template v-else>
        <p class="matched-list__message">Nothing is amiss</p>
      </template>
    </div>
    <div :class="['matched-list', 'details__field', getClass('library')]">
      <div class="matched-list__header">
        <p class="matched-list__title">Libraries</p>
        <button class="matched-list__state matched-list__state--matched">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-match"></use>
          </svg><span>Matched</span>
        </button>
        <button class="matched-list__state matched-list__state--missing">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-missing"></use>
          </svg><span>Missing</span>
        </button>
        <button class="btn btn--border-none matched-list__view-all" type="button"><span class="btn__text">View all</span>
        </button>
      </div>
      <template v-if="libraries.length">
        <ul class="matched-list__list">
          <li v-for="library in libraries"
              :class="['matched-list__item', checkIsMatched(library, 'library') ? 'matched-list__item--matched' : '']">
            <p>{{ library.technology_name }}</p><span>&nbsp;{{ getExpLabel(library.experience) }}</span>
          </li>
        </ul>
      </template>
      <template v-else>
        <p class="matched-list__message">Nothing is amiss</p>
      </template>
    </div>
    <div :class="['matched-list', 'details__field', getClass('other')]">
      <div class="matched-list__header">
        <p class="matched-list__title">Other</p>
        <button class="matched-list__state matched-list__state--matched">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-match"></use>
          </svg><span>Matched</span>
        </button>
        <button class="matched-list__state matched-list__state--missing">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-missing"></use>
          </svg><span>Missing</span>
        </button>
        <button class="btn btn--border-none matched-list__view-all" type="button"><span class="btn__text">View all</span>
        </button>
      </div>
      <template v-if="others.length">
        <ul class="matched-list__list">
          <li v-for="other in others"
              :class="['matched-list__item', checkIsMatched(other, 'other') ? 'matched-list__item--matched' : '']">
            <p>{{ other.technology_name }}</p><span>&nbsp;{{ getExpLabel(other.experience) }}</span>
          </li>
        </ul>
      </template>
      <template v-else>
        <p class="matched-list__message">Nothing is amiss</p>
      </template>
    </div>
    <div :class="['matched-list', 'details__field', getClass('tools')]">
      <div class="matched-list__header">
        <p class="matched-list__title">Tools</p>
        <button class="matched-list__state matched-list__state--matched">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-match"></use>
          </svg><span>Matched</span>
        </button>
        <button class="matched-list__state matched-list__state--missing">
          <svg width="18" height="18" aria-hidden="true">
            <use xlink:href="#icon-missing"></use>
          </svg><span>Missing</span>
        </button>
        <button class="btn btn--border-none matched-list__view-all" type="button">
          <span class="btn__text">View all</span>
        </button>
      </div>
      <template v-if="tools.length">
        <ul class="matched-list__list">
          <li v-for="tool in tools"
              :class="['matched-list__item', checkIsMatched(tool, 'tools') ? 'matched-list__item--matched' : '']">
            <p>{{ tool.technology_name }}</p><span>&nbsp;{{ getExpLabel(tool.experience) }}</span>
          </li>
        </ul>
      </template>
      <template v-else>
        <p class="matched-list__message">Nothing is amiss</p>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: "SkillsDetailed",
  props: {
    entity: {
      required: true
    },
    compare: {
      required: true
    }
  },
  computed: {
    languages() {
      return this.entity.skills?.language ?? []
    },
    frameworks() {
      return this.entity.skills?.framework ?? []
    },
    libraries() {
      return this.entity.skills?.library ?? []
    },
    others() {
      return this.entity.skills?.other ?? []
    },
    tools() {
      return this.entity.skills?.tools ?? []
    }
  },
  methods: {
    getExpLabel(exp) {
      let obj = this.expValues.find((item) => {
        return item.value == exp;
      })

      if (obj) {
        return obj.label;
      }

      return exp;
    },
    checkIsMatched(tech, type) {
      if (this.compare.skills[type]) {
        let find = this.compare.skills[type].find((item) => {
          return item.technology_id == tech.technology_id;
        })

        if (find) return true;
      }

      return false;
    },
    getClass(type) {
      let flag = true;
      if (this.entity.skills && this.entity.skills[type]) {
        this.entity.skills[type].forEach((item) => {
          let find;
          if (this.compare.skills[type]) {
            find = this.compare.skills[type].find((i) => {
              return item.technology_id == i.technology_id;
            })
          }

          if (!find) {
            flag = false;
          }

        });
      } else {
        return '';
      }

      return flag ? 'matched-list--matched' : 'matched-list--missing';
    }
  }
}
</script>

<style scoped>

</style>
