const getDecodedToken = () => {
  if (process.client) {
    try {
      let token = localStorage.getItem('token')
      return JSON.parse(atob(token.split('.')[1]))
    } catch {
    }
  }
  return null
}
export const state = () => ({
  user: null
})
export const mutations = {
  setUserInfo(state, user) {
    state.user = user
  },
}
export const actions = {
  setAuthHeader(context) {
    this._vm.$axios.defaults.headers.common['auth'] = getters.getCheckedToken();
  },
  updateToken(context) {
    this._vm.$axios.post('account/new-token')
      .then(response => {
        context.dispatch('setToken', response.data.token)
        context.dispatch("setLogoutTimer")
        context.dispatch("setUserInfo")
      })
      .catch(error => {
      });
  },
  initialize(context) {
    let decodedToken = getDecodedToken()
    if (decodedToken) {
      let timeRemainingInSeconds = getters.getTimeRemaining();
      let timeRemainingInDays = timeRemainingInSeconds / 86400
      if (timeRemainingInDays > 5) {
        context.dispatch("setLogoutTimer")
      } else if (timeRemainingInDays > 0) {
        context.dispatch('updateToken')
      } else {
        context.dispatch("logout")
      }
    }
  },
  setUserInfo(context) {
    let id = getters.getUserId()
    if (id) {
      this._vm.$axios.post('account/new-token', { id })
        .then(response => {
          context.commit("setUserInfo", response.data);
        }).catch(error => {
        })
    }
  },
  setToken(context, token) {
    localStorage.setItem("token", token)
    context.dispatch("initialize")
  },
  logout(context) {
    localStorage.removeItem('token')
    context.commit("setUserInfo", null)
  },
  setLogoutTimer(context) {
    let timeRemainingInSeconds = getters.getTimeRemaining();
    setTimeout(() => {
      context.dispatch("logout")
    }, Math.min(2147483647, timeRemainingInSeconds * 1000))
  },
}
export const getters = {
  getTimeRemaining() {
    try {
      let expirationInSeconds = getDecodedToken().exp
      let nowInMilliSeconds = new Date().getTime()
      let nowInSeconds = nowInMilliSeconds / 1000
      let timeRemainingInSeconds = expirationInSeconds - nowInSeconds
      return timeRemainingInSeconds
    } catch { return null }
  },
  getToken(state) {
    return (process.client) ? localStorage.getItem('token') : null
  },
  getCheckedToken(state) {
    if (getters.getTimeRemaining() > 0) {
      return getters.getToken()
    } else {
      return null
    }
  },
  getUserId(state) {
    let token = getters.getCheckedToken()
    return token ? (getDecodedToken() ? getDecodedToken().userId : null) : null
  },
  getUser(state) {
    return state.user
  }
}