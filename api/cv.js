export default axios => ({
  getCv() {
    return axios.get('/cv/get')
  },
  createCv(data) {
    return axios.post('/cv/create', data)
  },
  saveDraft(data) {
    return axios.post('/cv/draft', Object.assign({ type: 'draft'}, data))
  },
  update(data) {
    return axios.post('/cv/update', data)
  }
})
