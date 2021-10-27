<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
    
    <v-navigation-drawer nav
      app class="light blue"
    >
      <v-list
        nav
        dense
      >
        <v-list-item link @click="nav('Home')">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="nav('Functions')">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Functions</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="nav('Servers')">
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Servers</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-flex>
      <component id="theComp" ref="theComp" v-bind:is="curComp" />
    </v-flex>
   </v-container>
<!--
   <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
  -->
  </v-app>
 </div>
</template>
<script>
import Home from './components/Home.vue'
import Functions from './components/Functions.vue'
import Servers from './components/Servers.vue'

export default {
  name: 'App',
  data() {
   return {  
     curComp:"home"  
   }
  },
  methods:{
    nav(newComp) {
      console.log('Navigating to ',newComp)
      this.curComp = newComp;
    }
  },
  components: {
    Home, Functions, Servers
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
