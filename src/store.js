import Vue from 'vue'
import Vuex from 'vuex'
//import db from '@/fb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket : null
    
  },
  mutations: {
    setSocket(state, payload){
      state.socket = payload
    }
  },
  actions: {
   
  }
})
