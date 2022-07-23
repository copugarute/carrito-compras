<template>
  <v-container>
    <h1 class="text-center mb-2 pink--text">Categorías</h1>
    <v-divider></v-divider>
    <v-row class="mt-5">
      <v-col 
        cols="12" 
        sm="6" 
        md="3"
        v-for="category in categories"
        :key="category"
      >
        <v-card class="pa-2">
          <h2 class="text-center">{{category}}</h2>
          <a @click="redirectTo(category)">
          <div class="d-flex justify-center pa-5">
            <v-icon size="150" >{{
              categoryIcon(category)
              }}</v-icon>
          </div>
          </a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'Categories',
  computed:{
    ...mapState(['categories'])
  },
  methods:{
    categoryIcon(category){
      let icon = ""
      switch(category){
        case "electronics":
          icon = "mdi-laptop"
          break
        case "jewelery":
          icon = "mdi-diamond-stone"
          break
        case "men's clothing":
          icon = "mdi-face-man"
          break
        case "women's clothing":
          icon = "mdi-face-woman"
          break 
      }
      return icon
    },
    redirectTo(category){
      this.$router.push(`/category/${category}`)
    }
  }

}
</script>

<style>

</style>