<template>
  <v-app>
    <nav-bar/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import {mapActions} from 'vuex'
export default {
  components: { NavBar },
  name: 'App',

  data(){
    return{

    }
  },
  methods:{
    ...mapActions(['fetchCategories'])
  },
  created(){
    this.fetchCategories()
  }
  
};
</script>
