export default axios => ({
  getDetails() {
    return axios.get('/company')
  },
  getTeam() {
    return axios.get('/company/team')
  },
  removeMember(id) {
    return axios.get('/company/removeMember/' + id)
  },
  getLinks() {
    return axios.get('/company/links')
  },
  updateCompany(data) {
    return axios.post('/company/update', data)
  },
  invite(data) {
    return axios.post('/company/invite', data)
  }
})
