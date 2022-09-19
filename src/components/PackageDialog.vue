<template>
  <div class="d-flex justify-center align-baseline pt-8 pb-2">
    <v-btn
      color="blue-lighten-1"
      prepend-icon="mdi-plus"
      @click="showFormDialog"
    >
      Add Package
    </v-btn>
  </div>
  
  <div v-if="showForm" class="pt-4 pb-5">
    <v-card
    class="mx-auto"
    max-width="600"
    variant="outlined"
  >
  <v-card-item>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
      <v-text-field
        v-model="model['name']"
        :counter="25"
        label="Package Name"
        required
        outlined
      ></v-text-field>

      <v-text-field
        v-model="model['description']"
        label="Package Description"
        required
        outlined
      ></v-text-field>
    </v-form>
    </v-card-item>
    <v-card-actions>
      <v-btn
        color="success"
        class="mr-4"
        @click="save"
      >
        Save
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="cancel"
      >
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import type { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
        interface ComponentCustomProperties {
            $axios: AxiosInstance
        }
    }

export default defineComponent({
    name: 'PackageDialog',
    emits: ["reload-packages"],
    props: {
      package:{},
    },
    watch: { 
      	package: function(newVal, oldVal) {
            this.model = newVal
            this.showFormDialog()
        }
    },
    data () {
        return {
          valid: true,
          showForm: false,
          model: [],
        }
    },
    methods:{
      showFormDialog(){
        this.showForm = true
      },
      getParsedData(proxy: any){
        return JSON.parse(
          JSON.stringify(proxy)
      );
      },
      async save () {
        let model = this.getParsedData(this.model);
        if(parseInt(model['id']) > 0){
          await this.updatePackage(model);
        }else {
          await this.addPackage(this.model);
        }
      },
      async addPackage(model: any){
        await this.$axios.post('api/Package/AddPackage', {Name: model['name'], Description: model['description'], WarehouseId: 1}).then((response)=>{
                  if(response.data > 0){
                    this.$emit('reload-packages')
                    this.cancel()
                  }
              }).catch(function(error){
                  console.log(error)
              });
      },
      async updatePackage(model: any){
        await this.$axios.post('api/Package/UpdatePackage', {Id: model['id'], Name: model['name'], Description: model['description'], WarehouseId: 1}).then((response)=>{
                  if(response.data > 0){
                    this.$emit('reload-packages')
                    this.cancel()
                  }
              }).catch(function(error){
                  console.log(error)
              });
      },
      cancel () {
        this.model = [];
        this.showForm = false;
      },
    },
    setup(){

    }
})
</script>