<template>
  <v-container fluid>
    <div>
      <label>
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label> <br/>
      <span style="color:red">{{msg}}</span> 
    </div>
  </v-container>
</template> 

<script>
//import api from "./services/api";
export default {   
    data(){
        return{
            file:'',
            msg:''
        }
    },
    methods:{
      handleFileUpload(){
        this.file = this.$refs.file.files[0];            
      },
      getFile() {
        return this.file;
      }
      /*,
    submitFile: function(){
      let formData = new FormData();
      formData.append('file', this.file);
      this.addFormFields(formData);
      let _self = this;
      api.post("docs/upload", formData ,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {       
          _self.msg = '';
          _self.file = null;
           this.$emit("submited");
        })
        .catch(function(error) {
          _self.msg = "בעיה בהעלאת הקובץ";
          _self.file = null;          
        });
    },
    addFormFields(formData) {
        formData.append("name", this.name);
        formData.append("objectId", this.objId);
        formData.append("origFileName", this.file.name);
        formData.append("objectType", this.objType);
    }*/
  }  
} 
</script>

<style scoped>
</style>