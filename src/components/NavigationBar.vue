
<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <WarehouseButton />

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-package-variant-closed" title="Packages" value="Packages" @click="menuActionClick('Packages')"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 900px">
        <div v-if="route === 'Packages'">
          <PackageView  />
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>



<script lang='ts'>
import { defineComponent } from 'vue'
import WarehouseButton from '../components/WarehouseButton.vue'
import PackageView from '../components/PackageView.vue'

export default defineComponent({ 
    name: 'NavigationBar',

    components: {
        WarehouseButton,
        PackageView
    },

    data () {
        return {
            drawer: true,
            route:''
        }
    },
    methods:{
      menuActionClick(route: string){
        this.route = route;
      }
    }
})
</script>