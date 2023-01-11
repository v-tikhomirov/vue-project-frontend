export default {
  data: () => ({
    formData: {
      company: {
        type: []
      },
      history: []
    },
  }),
  computed: {
    company() {
      return this.formData.company ?? {}
    },
    candidate() {
      return this.formData.candidate ?? {}
    },
    vacancy() {
      return this.formData.vacancy ?? {}
    },
    cv() {
      return this.formData.cv ?? {}
    },
    currentStatus() {
      if (this.formData.history && this.formData.history.length > 0) {
        return this.formData.history[this.formData.history.length - 1];
      }
      return {};
    },
    history() {
      if (this.formData.history) {
        const temp = this.formData.history.filter((item) => ['status'].includes(item.type));
        temp.reverse();
        temp.shift();
        return temp;
      }
      return [];
    },
    colorClass() {
      if (this.formData.percent > 85) {
        return 'cv-card__match--green';
      }
      if (this.formData.percent > 70 && this.formData.percent <= 85){
        return 'cv-card__match--yellow';
      }
      if (this.formData.percent <= 70){
        return 'cv-card__match--red';
      }
    },
    showNextPrev() {
      switch (this.type) {
        case 'vacancy':
          return this.formData.status === 1 && this.$store.getters['matches/getMatches'].match.length > 1;
        case 'cv':
          return this.formData.status === 2 && this.$store.getters['matches/getMatches'].match.length > 1;
      }
    }
  },
  methods: {
    getTypeString(types) {
      let out = [];
      types.forEach((item) => {
        out.push(this.$t(item).toString());
      });
      return out.join(', ');
    },
    changeStatus(status) {
      this.$api.match.updateStatus({id: this.formData.id, status}).then((res) => {
        if (res.data.success) {
          this.$emit('updated');
        }
      })
    },
    openNext() {
      const matches = this.$store.getters['matches/getMatches'];
      const index = matches.match.findIndex((item) => item.id === parseInt(this.$route.params.id));
      let nextId;
      if (index === matches.match.length - 1) {
        nextId = matches.match[0].id;
      } else {
        nextId = matches.match[index+1].id;
      }
      this.$router.push('/detailed/'+this.type+'/'+ nextId);
    },
    openPrev() {
      const matches = this.$store.getters['matches/getMatches'];
      const index = matches.match.findIndex((item) => item.id === parseInt(this.$route.params.id));
      let nextId;
      if (index === 0) {
        nextId = matches.match[matches.match.length - 1].id;
      } else {
        nextId = matches.match[index - 1].id;
      }
      this.$router.push('/detailed/'+this.type+'/'+ nextId);
    },
    parseAction(action) {
      if (!action) {
        return '';
      }
      if (action.includes(':')) {
        let tmp = action.split(':');
        switch (tmp[1]) {
          case '2':
            return tmp[0] + '.candidate.interested';
          case '3':
            return tmp[0] + '.company.interested';
          case '4':
          case '5':
            return tmp[0] + '.postponed';
          case '6':
            return tmp[0] + '.interview';
          case '7':
            return tmp[0] + '.offer';
          case '99':
            return tmp[0] + '.complete';
        }
      }

      return action;
    },
  }
}
