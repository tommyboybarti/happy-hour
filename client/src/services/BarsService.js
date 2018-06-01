import Api from '@/services/Api'

export default {
  // create object which calls a index method that hit the bars endpoint with the infos
  // index comes from ruby probably. could be named anything
  index () {
    return Api().post('bars')
  }
}
