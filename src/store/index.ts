import { createStore } from 'vuex';
import Respose from '@/models/interface/Response'

export default createStore({
  state: {
    currentData: [] as Respose[]
  },
  mutations: {
    removeItem(state, id: number) {
      const index = state.currentData.findIndex(car => car.id == id)
      state.currentData.splice(index, 1)
    },
    saveItem(state, item: Respose) {
      state.currentData.push(item)
    },
    setCurrentData(state, payload: Respose[]) {
      state.currentData = payload
    }
  },
  actions: {
    fetchCurrentData({ commit }) {
      fetch('https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff07610\n' +
          '40ed1d95c59f14eaf26/frontend_test_table.json')
          .then(async (data: any)=>{
            data = await data.json()
            data = data.map((item:Respose) => {
              return item
            })
            commit('setCurrentData', data)
          })
    },
  },
  strict: true
})