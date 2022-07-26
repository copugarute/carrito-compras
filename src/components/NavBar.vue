<template>

    <div>
      <v-app-bar color="pink" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Shopping</v-toolbar-title>
        
        <v-spacer></v-spacer>

        <v-badge
          color="pink lighten-3"
          :content="cartCount"
          class="me-5 mt-2"
          :value="cartCount"
        >
          <v-icon
            @click="redirectTo('CartView')"
          >mdi-cart</v-icon>
        </v-badge>
        
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary color="pink lighten-4">
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item
                v-for="route in routes"
                :key="route.name"
                @click="redirectTo(route.name)"
                :disabled="currentRoute ==route.name"
            >
              <v-list-item-icon>
                <v-icon>{{route.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{route.title}}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>

</template>
  

<script>
import {mapGetters} from 'vuex'
export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      group: null,
      routes:[
        {icon:'mdi-home', title:'Home',name:'Home'},
        {icon:'mdi-account', title:'Acerca',name:'About'},
        {icon:'mdi-format-list-bulleted', title:'Categorias',name:'Categories'},
        
      ]
    };
  },
  computed:{
    currentRoute(){
        return this.$route.name
    },
    ...mapGetters(['cartCount'])
  },
  methods:{
        redirectTo(nameRoute){
            this.$router.push({name:nameRoute})
        }
    }
};
</script>

<style>
</style>