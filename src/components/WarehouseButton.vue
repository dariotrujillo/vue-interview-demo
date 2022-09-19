<template>
    <v-list>
        <v-list-item 
            prepend-icon="mdi-warehouse"
            v-bind:title="selected['name']"
            >
            <!-- <template v-slot:append>
                <v-menu
                transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                    <v-btn
                    size="small"
                    variant="text"
                    icon="mdi-menu-down"
                    v-bind="props"
                    >
                    </v-btn>
                </template>
                    <v-list>
                        <v-list-item
                        v-for="(item) in selectItems"
                        :key="item['id']"
                        active-class="purple--text"
                        
                        >
                        <v-list-item-title>
                            {{ item['name'] }}
                        </v-list-item-title>
                        </v-list-item>
                    </v-list>
            </v-menu>
            </template> -->
        </v-list-item>
    </v-list>
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
        name: 'WarehouseButton',
    
        data () {
            return {
                selectItems: [],
                selected:''
            }
        },
        methods:{
            async fetchGetWarehouses(){
                await this.$axios.post('api/Warehouse/GetAllWarehouses').then((response)=>{
                    this.selectItems = response.data;
                    this.selected = response.data[0] || "";
                }).catch(function(error){
                    console.log(error)
                });
            },
        },
        async mounted(){
            await this.fetchGetWarehouses()
        }
    })
    </script>