export default {
  data: () => ({
    expValues: [
      {
        label: '0-1 year',
        value: '12',
      },
      {
        label: '1-2 years',
        value: '24',
      },
      {
        label: '2-3 years',
        value: '36',
      },
      {
        label: '3-4 years',
        value: '58',
      },
      {
        label: '5-6 years',
        value: '72',
      },
      {
        label: '7+ years',
        value: '100',
      }
    ],
    actionMessage: {
      type: '',
      message: ''
    },
    mediaUrl: process.env.MEDIA_BASE_URL
  }),
  computed: {
    isCompany() {
      return this.$auth.user.type === 'company'
    },
    isCustomer() {
      return this.$auth.user.type === 'user'
    },
    companyId() {
      if (this.isCustomer) {
        return null;
      }
      return this.$auth.user.companies[0].id;
    },
    profile() {
      return this.$auth.user.profile ?? {}
    }
  },
  methods:{
    validate(formId, element = null) {
      // REST errors
      this.$store.commit('errors/RESET_ERRORS',formId)

      // prepare variables
      let validated = true;
      let rules = this.validationRules;
      let mod = null;
      // detect which rules should be applied
      if (element !== null) {
        if (element.includes(':')){
          let tmp = element.split(':');
          mod = tmp[1];
          element = tmp[0];
        }

        rules = this.validationRules[element];
      }

      // working with each rule
      for (const [key, value] of Object.entries(rules)) {
        if (mod === null) {
          // preparing fields to check
          let fieldValue;
          if (element !== null) {
            fieldValue = this.formData[element][key];
          } else {
            fieldValue = this.formData[key];
          }
          // check if value fits rule
          switch (value) {
            case 'required':
              if (!fieldValue || (typeof fieldValue === 'object' && fieldValue.length === 0)) {
                this.$store.commit('errors/SET_ERROR', {
                  formId,
                  field: key,
                  error: {
                    key: 'error.validation.required',
                    message: this.$t('error.validation.required').toString()
                  }
                });
                validated = false;
              }
              break;
            case 'location':
              if (!fieldValue.country || !fieldValue.city || (typeof fieldValue.country === 'object' && fieldValue.country.length === 0 ) || (typeof fieldValue.city === 'object' && fieldValue.city.length === 0 )) {
                this.$store.commit('errors/SET_ERROR', {
                  formId,
                  field: key,
                  error: {
                    key: 'error.validation.required',
                    message: this.$t('error.validation.required').toString()
                  }
                });
                validated = false;
              }
              break
            case 'phone':
              if (!fieldValue.phone || (typeof fieldValue.phone === 'object' && fieldValue.phone.length < 9 )) {
                this.$store.commit('errors/SET_ERROR', {
                  formId,
                  field: key,
                  error: {
                    key: 'error.validation.phone',
                    message: this.$t('error.validation.phone').toString()
                  }
                });
                validated = false;
              }
              break;
          }
        }
        if (mod === 'each') {
          this.formData[element].forEach((each) => {
            let fieldValue = each[key];
            // check if value fits rule
            switch (value) {
              case 'required':
                if (!fieldValue || (typeof fieldValue === 'object' && fieldValue.length === 0)) {
                  this.$store.commit('errors/SET_ERROR', {
                    formId,
                    field: key,
                    error: {
                      key: 'error.validation.required',
                      message: this.$t('error.validation.required').toString()
                    }
                  });
                  validated = false;
                }
                break;
            }
          });
        }
      }

      return validated;
    },
    setSuccessMessage(message = null) {
      if (message === null) {
        message = this.$t('changes.saved.success').toString();
      }
      this.actionMessage = {
        type: 'success',
        message: message
      }
    },
    setErrorMessage(message = null, page = null) {
      if (message === null) {
        message = this.$t('changes.saved.error').toString();
      }
      this.actionMessage = {
        type: 'error',
        message: message,
        page: ''
      }
      if(page) {
        this.actionMessage.page = page
      }
    },
    resetMessage() {
      this.actionMessage = {
        type: '',
        message: '',
        page: ''
      }
    },
    isNumeric(str) {
      if (typeof str === 'number') return true
      if (typeof str != "string") return false // we only process strings!
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    },
    logout() {
      this.$auth.logout();
    }
  }
}
