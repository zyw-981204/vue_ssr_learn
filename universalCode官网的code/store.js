import Vuex from 'vuex'
import Vue from 'vue'
function fetchItem(id) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({ id: "zywww", item: "zyw" })
    }, 1000);
  })
}
Vue.use(Vuex)
export function createStore(params) {
  return new Vuex.Store({
    state: {
      items: {}
    },
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    },
    actions: {
      fetchItem({ commit }, id) {
        return fetchItem(id).then(item => {
          commit("setItem", item)
        })
      }
    }
  })
}