// Hitting register endpoint
import Api from '@/services/Api'

export default {
  // create object which calls a register method that hit the register endpoint
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}
