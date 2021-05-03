import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  indexCity:'城市'
  },
  mutations: {
	  changeIndexCity(state,payload){
		  state.indexCity = payload
	  }
  },
  actions: {
	  
  },
  modules: {
  }
})
