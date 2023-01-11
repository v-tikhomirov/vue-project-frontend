export default axios => ({
  getCountries() {
    return axios.get('/countries')
  },
  getCitiesByCountry(id) {
    return axios.get('/country/'+id+'/cities')
  },
  getLanguages() {
    return axios.get('/languages')
  },
  getDomains() {
    return axios.get('/domains')
  },
  getBenefits() {
    return axios.get('/benefits')
  }
})
