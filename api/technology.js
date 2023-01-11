export default axios => ({
  getAllLight() {
    return axios.get('/technologies/all/light')
  },
  getRootTechnologies() {
    return axios.get('/technologies/root')
  },
  getLanguages() {
    return axios.get('/technologies/languages')
  },
  getTechnologiesByGroup(group) {
    return axios.get('/technologies/group/'+group)
  }
})
