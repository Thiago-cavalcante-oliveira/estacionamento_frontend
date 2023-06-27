<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="object"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          height="100"
        >
          <v-toolbar-title
          >Lista de Modelos</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="800px"
          >
            <template v-slot:activator="{ props }">
              <router-link to="modeloformulario">
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
        <router-link :to="{name:'modeloformulario', query: {id: item.raw.id}}">
        <v-icon
          color="blue"
          size="small"
          class="me-5"
          @click="editItem(item.raw)"
        >
          mdi-pencil
        </v-icon>
        </router-Link>
        <v-icon
          color="red"
          size="small"
          @click="deleteItem(item.raw)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-snackbar
      location="bottom"
      class="align-content-center"
      color="green"
      v-model="snackbar"
      :timeout="2000"
    >
      {{ text }}
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import {VDataTable} from 'vuetify/labs/VDataTable'
import {Modelo} from "@/models/Modelo";
import {ModeloClient} from "@/client/ModeloClient";
import {Marca} from "@/models/Marca";
import {MarcaClient} from "@/client/MarcaClient";

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
    listaMarcas: [] as Marca [],

    headers: [
      {title: 'ID', align: 'center', sortable: true, key: 'id'},
      {title: 'Ativo', align: 'center', key:'ativo', sortable: true},
      {title: 'Nome', align: 'center', sortable: true, key: 'nome'},
      {title: 'Marca', align: 'center', sortable: true, key: 'marca.nome'},
      {title: 'Ações', key: 'actions', sortable: false}
    ],
    object: [] as Modelo[],
    editedIndex: -1,
    editedItem: {
      id: '',
      ativo:'',
      nome: '',
      marca: {id: undefined},
    } as Modelo,
    defaultItem: {
      nome: '',
      id: 0,
      marca: {id: undefined}
    },
  }),

  computed: {

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
    this.listarMarcas();
  },

  methods: {

    resetForm() {
      this.editedItem.nome = '';
      this.editedItem.marca.id = 0,
        this.editedItem.id = 0
    },

    async initialize() {
      const getApi: ModeloClient = new ModeloClient();
      this.object = await getApi.findAll()
    },

    async listarMarcas() {
      const getApiMarca: MarcaClient = new MarcaClient();
      this.listaMarcas = await getApiMarca.findAll()
    },

    editItem(item) {
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.dialogDelete = true
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    deleteItemConfirm() {
      const deleteApi: ModeloClient = new ModeloClient();
      deleteApi.delete(this.editedItem).then(response => {
          this.initialize()
          this.text = response
          this.snackbar = true
        this.initialize()
        }
      ).catch((response) => this.error = response.data)
      this.closeDelete()
      this.initialize()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({nome: ''} as Modelo, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({nome: ''} as Modelo, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>

