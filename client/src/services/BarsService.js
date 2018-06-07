import Api from '@/services/Api'

export default {
  // create object which calls a index method that hit the bars endpoint with the infos
  // index comes from ruby probably. could be named anything
  index (search) {
    return Api().get('bars', {
      // setting up the search query stirng
      params: {
        search: search
      }
    })
  },
  show (barId) {
    return Api().get(`bars/${barId}`)
  },
  // pass the bars data created by the user to the db
  post (bar) {
    return Api().post('bars', bar)
  }
  // ,
  // put (bar) {
  //   return Api().put(`bars/${bar.id}`, bar)
  // }
}
