<template>
  <v-dialog v-model="show" max-width="500px">
      <v-card>
          <v-layout column align-center>
         <v-text-field label="Payload" v-model="payload"></v-text-field>
        </v-layout>
         <v-layout column align-center>
         <span id="result"></span>
        </v-layout>
        <v-card-actions>         
          <v-btn color="primary" text @click.stop="invoke()">Invoke</v-btn>
           <v-btn color="primary" text @click.stop="close()">Close</v-btn>
        </v-card-actions>
      </v-card>     
  </v-dialog>
</template>
<script>
import api from "./services/api";
export default {
  props: ["visible","functionDetails"],
  name: "invoke",
  components: {
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("closeInvoke");
        }
      }
    }
  },
  watch: {
    runnableDetails:function(newVal) {
       if (this.visible && newVal) {
          this.runnable = newVal;
        }
    }
  },
  data() {
    return {
      payload:""
    };
  },
  methods: {
    close() {
       document.getElementById('result').innerText = "";
       this.show = false;
    },
    invoke: function() { 
    
    // let formData = new FormData();
     //formData.append('payload', this.payload);
    
     api.post("invoke/"+this.functionDetails.app+"/"+this.functionDetails.func, this.payload, {
          headers: {
            "Content-Type": "apllication/text"
          }
        })
        .then(response => {   
          document.getElementById('result').innerText = response.data;       
          //this.$emit("save");
        })
        .catch(function(error) {
          alert("FAILURE!!: " + error.message);
        });
    }
  }
};
</script>

<style scoped>
</style>
