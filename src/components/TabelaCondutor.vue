<template>
  <v-container fluid>
    <v-data-table :headers="headers"
                  :items="object"
                  :sort-by="[{ key: 'id', order: 'asc' }]"
                  class="elevation-2 ">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Marca</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ props }">
              <v-btn elevation="4" color="primary" dark class="mb-2" v-bind="props">
                Cadastrar
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-alert class="my-6" v-if="error.length > 0" density="compact" type="error"
                           title="Erro: " :text="error"></v-alert>
                  <v-row>
                    <v-col cols="12" sm="" md="3">
                      <v-text-field disabled v-model="editedItem.id" label="ID"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field v-model="editedItem.nome"
                                    label="Nome"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field v-model="editedItem.cpf"
                                    v-mask="'###.###.###-##'"
                                    label="CPF"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field v-model="editedItem.telefone" label="Telefone"
                                    v-mask="'(##) #####-####'"
                      ></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="acaoSalvar">
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
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
        <v-icon color="blue" size="small" class="me-5" @click="editItem(item.raw)">
          mdi-pencil
        </v-icon>
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
      {title: 'Nome do Consutor', key: 'nome', align: 'center', sortable: true},
      {title: 'CPF', key: 'cpf', align: 'center', sortable: true},
      {title: 'Telefone', key: 'telefone', align: 'center', sortable: true},
      {title: 'Ações', key: 'actions', sortable: false},
    ],
    object: [] as Condutor[],
    editedIndex: -1,
    editedItem: {
      id: '',
      nome: '',
      cpf: '',
      telefone: ''

    } as Condutor,

    defaultItem: {
      id: undefined,
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
    acaoSalvar() {
      if (this.editedIndex === -1) {
        return this.save()
      }
      return this.atualizar()

    },

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

    atualizar() {
      const postApi: CondutorClient = new CondutorClient();

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

    save() {
      const postApi: CondutorClient = new CondutorClient();

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
  },
}
</script>
