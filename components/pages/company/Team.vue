<template>
  <div class="form form--large" data-validate>
    <form method="post" action="#">
      <fieldset class="form__block form__block--team">
        <div class="form__description">
          <p class="title title--h4">Team</p>
        </div>
        <div class="form__content">
          <div class="table">
            <table>
              <tr>
                <th class="sm-only"></th>
                <th>Name</th>
                <th>Email</th>
                <th>Job role</th>
                <th class="lg-only"></th>
              </tr>
              <tr v-for="person in team" :key="person.email">
                <td class="sm-only">
                  <button class="btn btn--only-icon btn--border-none table__btn" type="button" aria-label="Delete employee data" v-if="person.is_invited === 1 && $auth.user.id !== person.id" @click="removeMember(person.id)">
                    <span class="btn__text"></span>
                    <span class="btn__icon">
                      <svg width="10" height="10" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                      </svg>
                    </span>
                  </button>
                </td>
                <td>{{ !!person.profile ? person.profile.first_name : "No" }} {{ !!person.profile ? person.profile.last_name : "name" }}</td>
                <td>{{ person.email }}</td>
                <td style="text-align: center">{{ !!person.profile ? person.profile.job_role : "Not accepted yet" }}</td>
                <td class="lg-only">
                  <button class="btn btn--only-icon btn--border-none table__btn" type="button" aria-label="Delete employee data" v-if="person.is_invited === 1 && $auth.user.id !== person.id"  @click="removeMember(person.id)">
                    <span class="btn__text"></span>
                    <span class="btn__icon">
                      <svg width="10" height="10" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </fieldset>
      <fieldset class="form__block form__block--invite">
        <div class="form__description">
          <p class="title title--h4">Invite more colleagues</p>
          <p class="form__text">Make hiring process easier by&nbsp;inviting your team to&nbsp;Ruta. Your colleages will have full access to&nbsp;the workspace for free.</p>
        </div>
        <div class="form__content">
          <InviteField @invited="getTeam" />
        </div>
      </fieldset>
      <div class="form__buttons buttons-panel">
        <button class="btn btn--icon-left form__button" type="button" @click="$router.push('/')"><span class="btn__text">Cancel</span><span class="btn__icon">
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlink:href="#icon-close"></use>
                    </svg></span>
        </button>
        <button class="btn btn--blue form__button" type="button"><span class="btn__text">Save changes</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InviteField from "@/components/basic/form/InviteField.vue";
export default {
  name: "Team",
  data: () => ({
    team: []
  }),
  components: {
    InviteField
  },
  mounted() {
    this.getTeam()
  },
  methods: {
    getTeam() {
      this.$api.company.getTeam().then((res) => {
        if (res.data.success) {
          this.team = res.data.team
        }
      })
    },
    removeMember(id) {
      this.$api.company.removeMember(id).then(res => {
        if(res.data.success) {
          this.getTeam()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
