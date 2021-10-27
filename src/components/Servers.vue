<template>
  <v-container fluid>
       <v-layout column align-center>
        <v-btn @click.stop="refresh" color="info">Refresh</v-btn>
       </v-layout>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details></v-text-field>
       </v-card-title>
        <v-data-table
          :headers="headers"
          :items="servers"
          :search="search"
          v-model="selected"
          show-select
          item-key="name"          
          class="elevation-1">
             <template slot="items" slot-scope="props">
               
                  <td>
                    <v-checkbox v-model="props.selected" primary hide-details>
                    </v-checkbox>
                  </td>
                  <td >{{ props.item.hostURL }}</td>
                  <td >{{ props.item.lastStatTime }}</td>
                   <td >{{ (props.item.lastInvokeTime )}}</td>
            </template>   
        </v-data-table>
      </v-layout>
    </v-slide-y-transition>    
            
  </v-container>
</template>
<script>

import api from "./services/api";

export default {
  name: "servers",
  data() {
    return {
      search: "",
      selected: [],
      headers: [
        { text: "URL", value: "hostURL" },
        { text: "Last Update", value: "lastStatTime" },
        { text: "Last Called", value: "lastInvokeTime" }
      ],     
      servers:[]
    }
  },
  components: {
  },
  methods: {
    loadServers: function() {     
      api.get("stat/all", {
         withCredentials: true
        })
        .then(response => {
          this.servers = response.data;  
          this.servers.forEach(e => {
            e.lastStatTime = new Date(e.lastStatTime).toLocaleString();
            e.lastInvokeTime = e.lastInvokeTime < 0 ? "Never" : new Date(e.lastInvokeTime).toLocaleString();
          })
        })
        .catch(function(error) {
          console.log("FAILURE!!: " + error.message);
        }); 
    },
    refresh() {
      this.loadServers();
    }

  },
  mounted() {
    this.loadServers();    
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer{
  cursor: pointer;
}

</style>
