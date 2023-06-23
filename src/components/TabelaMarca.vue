<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="object"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Lista de Marcas</v-toolbar-title>
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
            <template v-slot:activator="{ props }"
                      class="px-10"
            >
              <router-link to="marcaformulario">
                <v-btn
                  elevation="4"
                  color="green"
                  class="mb-2"
                  v-bind="props"
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
      <template v-slot:item.actions="{ item }">
        <router-link :to="{name:'marca-formulario-edit', query: {id: item.raw.id}}">
          <v-icon
            color="blue"
            size="small"
            class="me-5"

          >
            mdi-pencil
          </v-icon>
        </router-link>
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

  </v-container>
</template>

<script lang="ts">
import {VDataTable} from 'vuetify/labs/VDataTable'
import {MarcaClient} from "@/client/MarcaClient";
import {Marca} from "@/models/Marca";

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
      {title: 'Marca', align: 'start', sortable: true, key: 'nome'},
      {title: 'Ações', key: 'actions', sortable: false},
    ],
    object: [] as Marca[],
    editedIndex: -1,
    editedItem: {
      nome: '',
      id: -1,
    } as Marca,
    defaultItem: {
      nome: '',
      id: undefined,
    },
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
    acaoSalvar() {
      if (this.editedIndex === -1) {
        return this.save()
      }
      return this.atualizar()

    },

    resetForm() {
      this.editedItem.nome = '';
    },
    async initialize() {
      const getApi: MarcaClient = new MarcaClient();
      this.object = await getApi.findAll()
    },

    editItem(item) {
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.text = ""
    },

    deleteItem(item) {
      this.dialogDelete = true
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    deleteItemConfirm() {
      const deleteApi: MarcaClient = new MarcaClient();
      deleteApi.delete(this.editedItem.id).then(response => {
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
        this.editedItem = Object.assign({nome: ''} as Marca, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({nome: ''} as Marca, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      const postApi: MarcaClient = new MarcaClient();
      postApi.cadastrar(this.editedItem).then(() => {
        if (this.editedIndex > -1) {
          Object.assign(this.object[this.editedIndex], this.editedItem)
        } else {
          this.object.push(this.editedItem)
        }
        this.text = 'Cadastrado com Sucesso'
        this.snackbar = true
        this.close()
        this.error = ''
        this.$nextTick(() => {
          this.resetForm()
          this.initialize()
        })
      }).catch((response) => {
        this.error = response.data
      })
    },

    atualizar() {
      const postApi: MarcaClient = new MarcaClient();
      postApi.atualizar(this.editedItem).then(() => {
        if (this.editedIndex > -1) {
          Object.assign(this.object[this.editedIndex], this.editedItem)
        } else {
          this.object.push(this.editedItem)
        }
        this.text = 'Cadastrado com Sucesso'
        this.snackbar = true
        this.close()
        this.error = ''
        this.$nextTick(() => {
          this.resetForm()
          this.initialize()
        })
      }).catch((response) => {
        this.error = response.data
      })
    },

  },
}
</script>
