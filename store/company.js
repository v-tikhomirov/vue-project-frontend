export const state = () => ({
  balance: {
    amount: 0,
    currency: 'USD'
  }
});

export const mutations = {
  SET_BALANCE(state, payload) {
    state.balance = payload;
  },
};

export const actions = {
  setBalance({ commit }, payload){
    commit('SET_BALANCE', payload);
  }
};

export const getters = {
  getBalance(state) {
    return state.balance
  }
};
