export default axios => ({
  getAll(companyId = null) {
    if (companyId) {
      return axios.get('/matches/list?company_id='+ companyId)
    }
    return axios.get('/matches/list')
  },
  details(id) {
    return axios.get('/matches/show/'+id);
  },
  updateStatus(data) {
    return axios.post('matches/change/status', data);
  }
})
