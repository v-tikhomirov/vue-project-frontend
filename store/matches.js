import Vue from 'vue';
export const state = () => ({
  matches: {
    match: [],
    review: [],
    mutual: [],
    postponed: [],
    interview: [],
    offer: []
  }
});

export const mutations = {
  SET_MATCHES(state, payload) {
    state.matches = payload;
  },
  SORT_MATCHES(state, payload) {
    const array = state.matches[payload.type];
    switch (payload.sort) {
      case 'recent':
        array.sort((a,b) => {
          return b.id - a.id;
        });
        break;
      case 'desc':
        array.sort((a,b) => {
          return a.id - b.id;
        })
        break;
      case 'best':
        array.sort((a,b) => {
          return b.percent - a.percent;
        })
        break;
    }
    Vue.set(state.matches, payload.type, array);
  }
};

export const actions = {
  setMatches({ commit }, payload){
    commit('SET_MATCHES', payload);
    Object.keys(payload).forEach((type) => {
      commit('SORT_MATCHES', {sort: 'recent', type:type})
    });
  },
};

export const getters = {
  getMatches(state) {
    return state.matches
  },
  getReview(state) {
    return state.matches.review
  }
};
