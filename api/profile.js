export default axios => ({
  updateProfile(data, headers = null) {
    if(headers) return axios.post('/user/profile', data, { headers })
    return axios.post('/user/profile', data)
  },
  removeProfilePicture() {
    return axios.post('/user/remove-profile-picture')
  },
  updateSecurity(data) {
    return axios.post('/user/update-security', data)
  }
})
