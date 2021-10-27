<template>
  <v-container fluid>
       <v-layout column align-center>
         <v-flex >
        <v-btn @click.stop="newFunction" color="info">New Function</v-btn>        
           &nbsp;
        <v-btn @click.stop="refresh" color="info">Refresh</v-btn>
        </v-flex>
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
          :items="functions"
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
                  <td >{{ props.item.name }}</td>
                  <td >{{ props.item.description }}</td>
                  <td >{{ props.item.lang }}</td> 
                  <td >{{ props.item.app }}</td>  
             <!--     <td class="justify-center layout px-0">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(props.item)"
                    >
                      edit
                    </v-icon>
                    <v-icon
                      small
                      @click="deleteItem(props.item)"
                    >
                      delete
                    </v-icon>
                 </td> -->           
             
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="invokeItem(item)"
                >
                  mdi-chevron-double-right
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  delete
                </v-icon>
            </template>   
        </v-data-table>
      </v-layout>
    </v-slide-y-transition>    
    <FunctionDetails :functionDetails="editedItem"  :visible="showFunctionDetails" @save="loadFunctions" @close="showFunctionDetails=false" />          
    <InvokeFunction :functionDetails="editedItem" :visible="showInvokeFunctionDetails" @closeInvoke="showInvokeFunctionDetails=false" />          
  </v-container>
</template>
<script>

import api from "./services/api";
import FunctionDetails from "./FunctionDetails.vue";
import InvokeFunction from "./InvokeFunction.vue";
export default {
  name: "functions",
  data() {
    return {
      showFunctionDetails: false,      
      showInvokeFunctionDetails: false,      
      editedIndex: -1,
      editedItem: null,
      search: "",
      selected: [],
      headers: [
        { text: "Name", value: "func" },
        { text: "Description", value: "description" },       
        { text: "Application", value:"app" },
        { text: "Language", value:"lang" },
        { text: "Actions", value: "action", sortable: false }
      ],     
      functionsMap: {},
      functions:[],
      currentUser: 'noone',// window.theApp.currentUser,

      addFileDialog: false,
      fileReqId: null,
      fileListDialog: false,
      files:null,
      filesMap: {},
      fileName: '' 
    }
  },
  components: {
    FunctionDetails, InvokeFunction
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.functions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.showFunctionDetails = true;
    },
     invokeItem(item) {
       this.editedItem = Object.assign({}, item);
       this.showInvokeFunctionDetails = true;
    },
    newFunction() {
      this.editedIndex = -1;
      this.editedItem = Object.assign(
        {},
        { name: "New Function", lastDate: new Date(), app:"someApp" }
      );
      this.showFunctionDetails = true;
    },
    deleteItem(item) {
      const index = this.functions.indexOf(item);
      // let _self = this;
      if (confirm("Really delete the Function?")) {
        this.functions.splice(index, 1);
        api.delete("funcs/"+item._id,
            {  },
            {
              headers: {
                "Content-Type": "application/json;"
              }
            }
          )
          .then(() => {})
          .catch(function(error) {
              alert("FAILURE!!: " + error.message);
              //_self.loadRequests();
          });
      }
    },
    refresh() {
      this.loadFunctions();
    },
    loadFunctions: function() {
      this.showFunctionDetails = false;      
      api.get("funcs/all", {
         withCredentials: true
        })
        .then(response => {
          this.functions = response.data;                
        })
        .catch(function(error) {
          console.log("FAILURE!!: " + error.message);
        }); 
    } 
  },
  mounted() {
    this.loadFunctions();    
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer{
  cursor: pointer;
}

</style>
