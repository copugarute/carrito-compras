<template>
  <div>
   <h1 class="text-center mt-3 pink--text">Categoria {{id}}</h1> 
    <v-container>
        <v-row justify="center">
            <v-col
                v-for="product in products"
                :key="product.id"
            >
                <card-product :product="product"/>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
import CardProduct from '../components/CardProduct.vue'
export default {
  components: { CardProduct },
  data(){
    return{
        products:[]
    }
  },
props: {
    id:{
        type: String
    }
},
methods:{
    async fetchProducts(){
        try{
            let response = await fetch(`https://fakestoreapi.com/products/category/${this.id}`)
            if(!response.ok) throw("Error en la Api")

            let json = await response.json()
            console.log(json)
            this.products = json

        }
        catch(error){
            console.log(error)
        }
    },
    
},
created(){
    this.fetchProducts()
}
}
</script>

<style>

</style>