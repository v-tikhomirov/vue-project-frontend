<template>
  <div class="custom-input-list is-valid">
    <ul class="custom-input-list__list not-empty sm-only" role="listbox">
      <li class="custom-input-list__item" role="option" v-for="(email, idx) in emails">
        <p>{{ email}}</p>
        <button class="btn btn--only-icon btn--border-none custom-input-list__remove-btn" type="button" aria-label="Delete email" @click="removeEmail(idx)"><span class="btn__text"></span><span class="btn__icon">
                        <svg width="10" height="10" aria-hidden="true">
                          <use xlink:href="#close-menu"></use>
                        </svg></span>
        </button>
      </li>
    </ul>
    <div class="custom-input-list__controls">
      <div class="custom-input-list__inner">
        <ul class="custom-input-list__list not-empty lg-only" role="listbox">
          <li class="custom-input-list__item" role="option" v-for="(email, idx) in emails">
            <p> {{ email}}</p>
            <button class="btn btn--only-icon btn--border-none custom-input-list__remove-btn" type="button" aria-label="Delete email" @click="removeEmail(idx)"><span class="btn__text"></span><span class="btn__icon">
                            <svg width="10" height="10" aria-hidden="true">
                              <use xlink:href="#close-menu"></use>
                            </svg></span>
            </button>
          </li>
        </ul>
        <label>
          <input type="email" placeholder="Enter multiple emails" v-model="value" @keydown.space="addEmail" @keydown.delete="removeEmail">
        </label>
      </div>
      <button class="btn btn--icon-right btn--blue custom-input-list__invite-btn" type="button" @click="invite"><span class="btn__text">Invite</span><span class="btn__icon">
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlink:href="#icon-arrow-right"></use>
                      </svg></span>
      </button>
    </div>
    <div class="custom-input-list__success" v-if="isSent">Invitations were sent</div>
  </div>
</template>
<script>
export default {
  name: "InviteField",

  data() {
    return {
      emails: [],
      value: '',
      isSent: false
    }
  },
  methods: {
    invite() {
      this.addEmail()
      if(this.emails) {
        let data = {
          emails: this.emails,
          company_id: this.$auth.user.companies[0].id
        }
        this.$api.company.invite(data).then((res) => {
          if (res.data.success) {
            this.isSent = true
            this.emails = []
            this.value = ''
          }
          this.$emit("invited")
        })
      }
    },
    addEmail() {
        if (this.value.trim().toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )) {
          this.emails.push(this.value.trim())
          this.value = ""
        }
    },
    removeEmail(idx) {
      if(this.emails.length > 0 && this.value === "") {
        if(!!idx && !idx.keyCode) {
          console.log(123)
          this.emails.splice(idx, 1)
        } else {
          this.emails.pop()
        }
      }
    }
  }
}
</script>
<style>
 .custom-input-list__success {
   opacity: 1;
 }
</style>
