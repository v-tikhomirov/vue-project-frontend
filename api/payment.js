export default axios => ({
  getSession(amount, cv_id) {
    return axios.get('/payment/stripe/createSession/' + amount + '/' + cv_id)
  },
  checkCompanyPayments() {
    return axios.get('/payment/checkCompanyPayments')
  },
  openContact(company_id, match_id) {
    return axios.post('payment/connect/open', { company_id: company_id, match_id: match_id })
  }
})
