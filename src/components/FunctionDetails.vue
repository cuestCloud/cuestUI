<template>
  <v-dialog v-model="show" max-width="500px">
      <v-card>
          <v-layout column align-center>
         <v-text-field label="Name" v-model="runnable.func"></v-text-field>
         <v-text-field label="Description" v-model="runnable.description"></v-text-field>      
         <v-text-field label="Application" v-model="runnable.app" ></v-text-field>
          <v-text-field label="mainClass" v-model="runnable.mainClass" ></v-text-field>
          <v-select label="Language" :items="langs" v-model="runnable.lang"></v-select>
         <Upload class="upload" ref="theUploader" />
        </v-layout>
        <v-card-actions>         
          <v-btn color="primary" text @click.stop="save()">Upload</v-btn>
           <v-btn color="primary" text @click.stop="show=false">Close</v-btn>
        </v-card-actions>
      </v-card>     
  </v-dialog>
</template>
<script>
import Upload from './Upload.vue';
import api from "./services/api";
export default {
  props: ["visible","functionDetails"],
  name: "runnable-details",
  components: {
    Upload
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
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
      langs: ['Java','JavaScript'],
      runnable: {
        func: "newFunction",
        description:"",
        lang: "Java",
        app: "someApp",
        mainClass: "com.naga.wrapper.Main"      
      }
    };
  },
  methods: {
    save: function() { 
      let data = this.runnable;
      let formData = new FormData();
      formData.append('file', this.$refs.theUploader.getFile());
      formData.append("deployStr", JSON.stringify(data));
      if (data._id) {
        formData.append("id", data._id);
      }
      api.post("deploy/addFunc", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(() => {     
            alert('Function added successfully!')     
            this.$emit("save");
          })
          .catch(function(error) {
            alert("FAILURE!!: " + error.message);
          });
      }
  }
};
</script>

<style scoped>
.upload{
  padding-right: 80px;
  padding-bottom: 0px;
}
</style>
