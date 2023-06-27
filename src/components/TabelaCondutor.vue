<template>
  <v-container fluid>
    <v-data-table :headers="headers"
                  :items="object"
                  class="elevation-2 ">
      <template v-slot:top>
        <v-toolbar height="100" flat>
          <v-toolbar-title>Lista de Condutores</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ props }">
              <router-link to="condutorformulario">
                <v-btn
                  variant="elevated"
                  size="x-large"
                  elevation="4"
                  color="green"
                  class="mb-2 mr-10"
                >
                  Cadastrar
                </v-btn>
              </router-link>
            </template>


          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Deseja realmente deletar este item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.ativo="{ item }">

        <v-chip v-if="item.columns.ativo === true" color="green">Ativo</v-chip>
        <v-chip v-else-if="item.columns.ativo === false" color="red">Inativado</v-chip>

      </template>
      <template v-slot:item.actions="{ item }">
        <router-link :to="{name:'condutorformulario', query: {id: item.raw.id}}">
        <v-icon color="blue" size="small" class="me-5" @click="editItem(item.raw)">
          mdi-pencil
        </v-icon>
        </router-link>
        <v-icon color="red" size="small" @click="deleteItem(item.raw)">
          mdi-delete
        </v-icon>

      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-snackbar location="bottom" class="align-content-center" color="green" v-model="snackbar" :timeout="2000">
      {{ text }}
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import {VDataTable} from 'vuetify/labs/VDataTable'


import {Condutor} from "@/models/condutor";
import {CondutorClient} from "@/client/CondutorClient";

export default {
  components: {
    VDataTable
  },
  data: () => ({
    text: '',
    snackbar: false,
    error: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {title: 'ID', align: 'center', sortable: true, key: 'id'},
      {title: 'Ativo', align:  'center', sortable: true, key:'ativo'},
      {title: 'Nome do Consutor', key: 'nome', align: 'center', sortable: true},
      {title: 'CPF', key: 'cpf', align: 'center', sortable: true},
      {title: 'Telefone', key: 'telefone', align: 'center', sortable: true},
      {title: 'Ações', key: 'actions', sortable: false},
    ],
    object: [] as Condutor[],
    editedIndex: -1,
    editedItem: {
      id: '',
      ativo: undefined,
      nome: '',
      cpf: '',
      telefone: ''

    } as Condutor,

    defaultItem: {
      id: undefined,
      ativo: undefined,
      nome: '',
      cpf: '',
      telefone: '',

    } as Condutor,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo item' : 'Editar item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()

    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {


    resetForm() {
      this.editedItem = this.defaultItem;
    },

    async initialize() {
      const getApi: CondutorClient = new CondutorClient();
      this.object = await getApi.findAll()
    },

    editItem(item: any) {
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.text = ""
    },

    deleteItem(item: any) {
      this.dialogDelete = true
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    deleteItemConfirm() {
      const deleteApi: CondutorClient = new CondutorClient();
      deleteApi.delete(this.editedItem).then(response => {
          this.object.splice(this.editedIndex, 1)
          this.text = response
          this.snackbar = true
        }
      ).catch((response) => this.error = response.data)
      this.closeDelete()
      this.initialize()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({} as Condutor, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({} as Condutor, this.defaultItem)
        this.editedIndex = -1
      })
    },


},}
</script>
