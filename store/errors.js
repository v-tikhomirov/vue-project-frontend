export const state = () => ({
  errors: {
    cv_primary: {
      position: {},
      industry: {},
      type: {},
      office_type: {},
      status: {},
      is_ready_to_relocate: {},
      languages: {},
      desired_salary: {},
      minimal_salary: {},
      currency: {},
      about: {}
    },
    cv_skills: {
      languages: {},
      frameworks: {},
      libraries: {},
      other: {},
      tools: {}
    },
    cv_recent_projects: {
      title: {},
      start_date: {},
      stack: {},
      description: {}
    },
    login: {
      email: {},
      password: {}
    },
    step1: {
      firstName: {},
      lastName: {},
      jobRole: {},
      phoneData: {},
      password: {},
      confirmPassword: {},
    },
    applicantStep2: {
      phoneData: {},
      locationData: {}
    },
    account: {
      first_name: '',
      last_name: '',
      birthdate: '',
      phoneData: '',
      job_role: '',
    },
    about: {
      phoneData: {},
      locationData: {}
    },
    companyStep2: {
      name: {},
      numberOfEmployees: {},
      website: {},
      about: {},
      locationData: {}
    },
    signup: {
      email: {},
      password: {}
    },
    cv_projects: {
    }

  }
});

export const mutations = {
  SET_ERROR(state, payload) {
    const formId = payload.formId;
    const field = payload.field;
    state.errors[formId][field] = Object.assign({}, payload.error);
  },
  RESET_ERRORS(state, formId) {
    for (const field in state.errors[formId]) {
      state.errors[formId][field] = {};
    }
  }
};

export const actions = {

};

export const getters = {
  getErrorsBag(state) {
    return state.errors;
  }
};
