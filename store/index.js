export const state = () => ({
  initialized: false,
  modals: {
    balance: false
  },
  notifications: [],
  menu_collapsed: true,
  countries: [],
  cities: [],
  languages: [],
  domains: [],
  benefits: [],
  technologies: {
    loadedGroups: [],
    language: [],
    tools: [],
    framework: [],
    other: [],
    library: [],
  }
});

export const mutations = {
  SET_INITIALIZED(state, payload) {
    state.initialized = payload;
  },
  SET_MODAL_STATE(state, payload) {
    state.modals[payload.name] = payload.value;
  },
  SET_NOTIFICATIONS(state, payload) {
    state.notifications = payload;
  },
  SET_MENU_COLLAPSED(state, payload) {
    state.menu_collapsed = payload;
  },
  SET_COUNTRIES(state, payload) {
    state.countries = payload;
  },
  SET_CITIES(state, payload) {
    state.cities = payload;
  },
  SET_LANGUAGES(state, payload) {
    state.languages = payload;
  },
  SET_DOMAINS(state, payload) {
    state.domains = payload;
  },
  SET_BENEFITS(state, payload) {
    state.benefits = payload;
  },
  SET_TECHNOLOGY(state, payload) {
    const keys = Object.keys(payload);
    keys.forEach((key) => {
      if (state.technologies.hasOwnProperty(key)) {
        state.technologies[key] = state.technologies[key].concat(payload[key]);
      }
    });
  },
  SET_GROUP_LOADED(state, payload) {
    state.technologies.loadedGroups.push(payload);
  }
};

export const actions = {
  initApp({ commit, rootState }) {
    this.$axios.$get('user/notifications').then((res) => {
      commit('SET_NOTIFICATIONS', res.notifications);
    });
    if (rootState.auth.user.type === 'company' && rootState.auth.user.company) {
      this.$axios.$get('/company/init').then((res) => {
        commit('company/SET_BALANCE', res.data.data.balance, {root: true})
      })
    } else {
      this.$axios.$get('skills/all').then((res) => {
        if (res.success) {
          commit('profile/SET_SKILLS',res.skills, {root: true});
        }
      });
    }
  },
  toggleMenu({commit, state}) {
    commit('SET_MENU_COLLAPSED', !state.menu_collapsed);
  },
  setCountries({commit}, payload) {
    commit('SET_COUNTRIES', payload);
  },
  setCities({commit}, payload) {
    commit('SET_CITIES', payload);
  },
  setDomains({commit}, payload) {
    commit('SET_DOMAINS', payload);
  },
  setBenefits({commit}, payload) {
    commit('SET_BENEFITS', payload);
  },
  setLanguages({commit}, payload) {
    commit('SET_LANGUAGES', payload);
  },
  setTechnology({commit}, payload) {
    commit('SET_TECHNOLOGY', payload);
  },
  setGroupLoaded({commit}, payload) {
    commit('SET_GROUP_LOADED', payload);
  }
};

export const getters = {
  getBalanceModalState(state) {
    return state.modals.balance;
  },
  getNotifications(state) {
    return state.notifications;
  },
  isMenuCollapsed(state) {
    return state.menu_collapsed;
  },
  getCountries(state) {
    return state.countries;
  },
  getCities(state) {
    return state.cities;
  },
  getLanguages(state) {
    return state.languages;
  },
  getDomains(state) {
    return state.domains;
  },
  getBenefits(state) {
    return state.benefits;
  },
  getTechnologies(state) {
    return state.technologies;
  }
};
