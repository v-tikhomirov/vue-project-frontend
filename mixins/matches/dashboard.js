import {mapGetters} from "vuex";
export default {
  data: () => ({
    filters: {
      match: 'recent',
      interview: 'recent',
      mutual: 'recent',
      offer: 'recent',
      postponed: 'recent',
      review: 'recent'
    },
    filterModal: {
      match: false,
      interview: false,
      mutual: false,
      offer: false,
      postponed: false,
      review: false
    }
  }),
  watch: {
    'filters.match'(value) {
      this.$store.commit('matches/SORT_MATCHES', {type: 'match', sort: value});
      this.filterModal.match = false;
    },
    'filters.interview'(value) {
      this.$store.commit('matches/SORT_MATCHES', {type: 'interview', sort: value});
      this.filterModal.interview = false;
    },
    'filters.mutual'(value) {
      this.$store.commit('matches/SORT_MATCHES', {type: 'mutual', sort: value});
      this.filterModal.mutual = false;
    },
    'filters.offer'(value) {
      this.$store.commit('matches/SORT_MATCHES', {type: 'offer', sort: value});
      this.filterModal.offer = false;
    },
    'filters.postponed'(value) {
      this.$store.commit('matches/SORT_MATCHES', {type: 'postponed', sort: value});
      this.filterModal.postponed = false;
    },
    'filters.review'(value) {
      this.$store.commit('matches/SORT_MATCHES', {type: 'review', sort: value});
      this.filterModal.review = false;
    },
  },
  computed: {
    ...mapGetters({
      matches: 'matches/getMatches',
    })
  },
  methods: {
    loadAll() {
      this.$api.match.getAll(this.companyId).then((res) => {
        if (res.data.success) {
          this.$store.dispatch('matches/setMatches', res.data.data);
        }
      })
    }
  }
}
