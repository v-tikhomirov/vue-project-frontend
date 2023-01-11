export const state = () => ({
  new: {
    draft: null,
    skills: null
  }
});

export const mutations = {
  SET_DRAFT(state, payload) {
    state.new.draft = payload;
  },
};

export const actions = {
  setDraft({ commit }, payload){
    commit('SET_DRAFT', payload);
  }
};

export const getters = {
  getDraft(state) {
    return state.new.draft;
  }
};
