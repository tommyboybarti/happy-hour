// setting up a connector in the backend
import axios from 'axios'
import store from '@/store/store'

export default () => {
  // creatin axios object that point to backend URL
  return axios.create({
    baseURL: `http://localhost:8081/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
