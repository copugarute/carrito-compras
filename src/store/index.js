import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories:[],
    cart:[],
  },
  getters:{
    cartLength(state){
      return state.cart.length
    }
  },
  mutations: {
    SET_CATEGORIES(state,categories){
      state.categories = categories
    },
    ADD_PROD_TO_CART(state,product){
      let exist = state.cart.some((p)=>p.id == product.id)
      if(!exist){
        state.cart.push(product)
      }
      else{
        state.cart.forEach((p)=>{
          if(p.id == product.id){
            p.count +=1
          }
        })
      }
    }
  },
  actions: {
    async fetchCategories({commit}){
      try{
        let response = await fetch('/categories.json')
        if(!response.ok) throw('Error en Api')

        let categories = await response.json()
        console.log(categories)
        commit('SET_CATEGORIES', categories)
      }
      catch(error){
        console.log(error)
      }
      
    },
    addProdToCart({commit},product){
      commit('ADD_PROD_TO_CART', product)
    }
  },
  modules: {
  }
})
