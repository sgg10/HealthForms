import { getUser } from '../../backend/controllers/AuthController'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    SET_USER (state) {
      state.user = getUser() || null
    }
  },
  getters: {
    user: state => state.user
  }
}
