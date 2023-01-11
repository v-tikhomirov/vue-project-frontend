export const state = () => ({
  skills: []
});

export const mutations = {
  SET_SKILLS(state, payload) {
    state.skills = payload;
  },
};

export const actions = {
  setSkills({ commit }, payload){
    commit('SET_SKILLS', payload);
  }
};

export const getters = {
  getSkills(state) {
    return state.skills
  }
};
