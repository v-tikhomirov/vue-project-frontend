export default axios => ({
  addNote(data) {
    return axios.post('/matches/addNote', data)
  },
  editNote(id, type) {
    return axios.get('/matches/editNote/' + id + '/' + type)
  },
})
