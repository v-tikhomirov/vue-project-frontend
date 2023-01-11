export default axios => ({
  getAll() {
    return axios.get('/vacancy/list')
  },
  archive(id) {
    return axios.post('/vacancy/archive', { id })
  },
  createVacancy(data) {
    return axios.post('/vacancy/create', data)
  },
  createSkills(data) {
    return axios.post('/vacancy/create/skills', data)
  },
  loadVacancy(data) {
    return axios.get('/vacancy/load/' + data)
  },
  updateVacancy(data) {
    return axios.post('/vacancy/update', data)
  }
})
