<template>
    <v-table
    fixed-header
    height="800px"
    >
      <thead>
        <tr>
            <th
            v-for="h in headers"
            :key="h['value']"
            class="text-left">
            {{h['text']}}
            </th>
            <th class="text-left">
                Actions
            </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in packages"
          :key="item['id']"
        >
          <td>{{ item['id'] }}</td>
          <td>{{ item['name'] }}</td>
          <td>{{ item['description'] }}</td>
          <td>{{ item['updatedDate'] }}</td>
          <td>{{ item['createdDate'] }}</td>
          <td>
            <v-btn
            class="ma-2"
            icon="mdi-pencil"
            @click="editPackage(item['id'])"
            ></v-btn>
            <v-btn
            class="ma-2"
            icon="mdi-delete"
            @click="deletePackage(item['id'])"
            ></v-btn>
        </td>
        </tr>
      </tbody>
    </v-table>
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
        name: 'PackageViewTable',
        emits: ["edit-package", "delete-package"],
        props:{
            packages:{
                required : true
            }
        },
    
        data () {
            return {
                headers: [
                    {
                        text: 'Id',
                        align: 'start',
                        sortable: false,
                        value: 'id',
                    },
                    { text: 'Package Name', value: 'name' },
                    { text: 'Package Description', value: 'description'},
                    { text: 'Updated', value: 'updatedDate' },
                    { text: 'Created', value: 'createdDate' },
                    ],
            }
        },
        computed: {},
           
        methods:{
            editPackage (id: number) {
                this.$emit("edit-package", id);
            },
            deletePackage (id: number) {
                this.$emit("delete-package", id);
            },
        },
        
    })
    </script>