export default {
  props: {
    entity: {
      required: true
    }
  },
  computed: {
    card() {
      return this.entity[this.type]
    },
    type() {
      if (this.isCustomer) {
        return 'vacancy';
      }
      return 'cv';
    },
    candidate() {
      return this.entity.candidate ?? {}
    },
    isOpened() {
      return this.entity.status > 2 && ![4, 5].includes(this.entity.status);
    },
    colorClass() {
      if (this.entity.percent > 85) {
        return 'card__match--green';
      }
      if (this.entity.percent > 70 && this.entity.percent <= 85){
        return 'card__match--yellow';
      }
      if (this.entity.percent <= 70){
        return 'card__match--red';
      }
    }
  },
  methods: {
    openDetailed() {
      this.$router.push('/detailed/'+this.type+'/'+this.entity.id);
    },
    changeStatus(status) {
      this.$api.match.updateStatus({id: this.entity.id, status}).then((res) => {
        if (res.data.success) {
          this.$emit('updated');
        }
      })
    },
  }
}
