<template >
    <PackageDialog @reload-packages="fetchGetPackages" :package="selectedPackage"/>
    <v-divider inset></v-divider>
    <PackageViewTable  :packages="packages" @edit-package="editPackages" @delete-package="deletePackages"/>
  </template>

<script lang='ts'>
    import { defineComponent } from 'vue'
    import type { AxiosInstance } from 'axios'
    import PackageViewTable from '../components/PackageViewTable.vue'
    import PackageDialog from '../components/PackageDialog.vue'

    declare module '@vue/runtime-core' {
        interface ComponentCustomProperties {
            $axios: AxiosInstance
        }
    }

    export default defineComponent({
        name: 'PackageView',

        components: {
            PackageViewTable,
            PackageDialog
        },
        data () {
            return {
                selectedPackage:"",
                packages:[],
            }
        },
        computed: {},
        async mounted () {
            await this.fetchGetPackages()
        },
        methods:{
            async fetchGetPackages(){
                await this.$axios.post('api/Package/GetAllPackages').then((response)=>{
                    this.packages = response.data;
                }).catch(function(error){
                    console.log(error)
                });
            },
            async deletePackages(id: number){
                await this.$axios.post('api/Package/DeletePackage', {Id: id}).then((response)=>{
                  if(response.data > 0){
                    this.fetchGetPackages()
                  }
              }).catch(function(error){
                  console.log(error)
              });
            },
            async editPackages(id: number){
                await this.$axios.get(`api/Package/GetPackage/${id}`, ).then((response)=>{
                  this.selectedPackage = response.data;
                  console.log(this.selectedPackage)
              }).catch(function(error){
                  console.log(error)
              });
            },
        },
    })
    </script>