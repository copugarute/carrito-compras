import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories:[],
    cart:[],
  },
  getters:{
    cartCount(state){
      return state.cart.length
    },
    totalProduct(state){
      return state.cart.map(prod =>{
        let myProd = prod
        myProd.total = prod.count * prod.price
        return myProd
      })
    },
    totalCart(state,getters){
      return getters.totalProduct.reduce((total,prod)=>{
        return total + prod.total
      },0)
    },
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
    },
    ADD_STOCK_PRODUCT(state,idProduct){
      state.cart.forEach((prod)=>{
        if(prod.id == idProduct){
          prod.count+=1
        }
      })
    },
    REMOVE_STOCK_PRODUCT(state, idProduct){
      state.cart.forEach((prod)=>{
        if(prod.id == idProduct && prod.count>1 ){
          prod.count -=1
        }
      })
    },
    REMOVE_PRODUCT_CART(state,idProduct){
      let index = state.cart.findIndex((prod)=> prod.id == idProduct)
      state.cart.splice(index,1)
    },
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
    },
    addStockProduct({commit},idProduct){
      commit('ADD_STOCK_PRODUCT',idProduct)
    },
    removeStockProduct({commit},idProduct){
      commit('REMOVE_STOCK_PRODUCT', idProduct)
    },
    removeProductCart({commit}, idProduct){
      commit('REMOVE_PRODUCT_CART', idProduct)
    },
  },
  modules: {
  }
})
