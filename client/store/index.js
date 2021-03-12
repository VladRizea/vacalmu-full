export const state = () => ({
    loggedIn: false,
    user:[],
  })
  
  export const mutations = {
    set(state, n) {
          state.loggedIn = n;
      },
    setUser(state, n) {
    state.user = n;
    }
  }