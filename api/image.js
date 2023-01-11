export default axios => ({
  upload(data, headers) {
    return axios.post('/image/upload', data, { headers })
  }
})
