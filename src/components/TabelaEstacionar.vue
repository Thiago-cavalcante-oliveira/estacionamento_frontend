<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="object"
      :sort-by="[{ key: 'calories', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Marca</v-toolbar-title>
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
              <v-btn
                elevation="4"
                color="primary"
                dark
                class="mb-2"
                v-bind="props"
              >
                Cadastrar
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-alert
                    class="my-6"
                    v-if="error.length>0"
                    density="compact"
                    type="error"
                    title="Erro: "
                    :text="error"
                  ></v-alert>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-text-field
                        disabled
                        v-model="editedItem.id"
                        label="ID"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-select
                        v-model="editedItem.condutor.id"
                        label="Condutor"
                        :items="listaCondutores"
                        item-title="nome"
                        item-value="id"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        label="Veiculos"
                        :items="listaVeiculos"
                        item-title="placa"
                        item-value="id"
                        v-model="editedItem.veiculo.id"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="acaoSalvar"
                >
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
      <template v-slot:item.actions="{ item }"
                class
      >
        <v-icon
          color="blue"
          size="small"
          class="me-5"
          @click="editItem(item.raw)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="red"
          size="small"
          @click="deleteItem(item.raw)"
        >
          mdi-delete
        </v-icon>
        <v-btn
          @click="finalizarItem(item.raw)"
        >Finalizar
        </v-btn>
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
    <v-dialog
      v-model="modalRecibo"
      transition="dialog-bottom-transition"
      width="500"
    >

      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar
            color="primary"
            title="Opening from the bottom"
          ></v-toolbar>
          <v-card-text>
            <div class=" pa-12">{{ recibo }}</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              variant="text"
              @click="isActive.value = false"
            >Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>
<script lang="ts">
import {VDataTable} from 'vuetify/labs/VDataTable'
import {Modelo} from "@/models/Modelo";
import {ModeloClient} from "@/client/ModeloClient";
import {Marca} from "@/models/Marca";
import {MarcaClient} from "@/client/MarcaClient";
import {Veiculo} from "@/models/Veiculo";
import {Condutor} from "@/models/condutor";
import {Movimentacao} from "@/models/Movimentacao";
import {CondutorClient} from "@/client/CondutorClient";
import {VeiculoClient} from "@/client/VeiculoClient";
import {MovimentacaoClient} from "@/client/MovimentacaoClient";

export default {
  components: {
    VDataTable
  },
  data: () => ({

    modalRecibo: false,
    text: '',
    snackbar: false,
    error: '',
    dialog: false,
    dialogDelete: false,
    listaVeiculos: [] as Veiculo [],
    listaCondutores: [] as Condutor [],
    recibo: '',

    headers: [
      {title: 'ID', align: 'center', sortable: true, key: 'id'},
      {title: 'Condutor', align: 'center', sortable: true, key: 'condutor.nome'},
      {title: 'Veículo', align: 'center', sortable: true, key: 'veiculo.placa'},
      {title: "Data Entrada", align: 'center', key: 'entrada'},
      {title: "Data saída", align: 'center', key: 'saida'},
      {title: 'Ações', key: 'actions', sortable: false}

    ],
    object: [] as Movimentacao[],
    editedIndex: -1,
    editedItem: {
      id: undefined,
      condutor: {id: undefined},
      veiculo: {id: undefined},
      entrada: '',
      saida: ''


    } as Movimentacao,
    defaultItem: {
      id: '',
      condutor: {id: undefined},
      veiculo: {id: undefined},
      entrada: '',
      saida: ''

    } as Movimentacao,
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
    this.initialize();
    this.listarCondutores();
    this.listarVeiculos();
  },

  methods: {

    acaoSalvar() {
      if (this.editedIndex === -1) {
        return this.save()
      }
      return this.atualizar()

    },

    resetForm() {
      this.editedItem.condutor = '';
      this.editedItem.veiculo = '',
        this.editedItem.id = 0
    },
    async initialize() {
      const getApi: MovimentacaoClient = new MovimentacaoClient();
      this.object = await getApi.findAll()
    },

    async listarCondutores() {
      const getApiCondutores: CondutorClient = new CondutorClient();
      this.listaCondutores = await getApiCondutores.findAll()
    },
    async listarVeiculos() {
      const getApiVeiculos: VeiculoClient = new VeiculoClient();
      this.listaVeiculos = await getApiVeiculos.findAll()
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

    finalizarItem(item) {
      this.finalizar();
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    deleteItemConfirm() {
      const deleteApi: MovimentacaoClient = new MovimentacaoClient();
      deleteApi.delete(this.editedItem).then(response => {
          this.initialize()
          this.text = response
          this.snackbar = true
        }
      ).catch((response) => this.error = response.data)
      this.closeDelete()

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

    atualizar() {

      const postApi: MovimentacaoClient = new MovimentacaoClient();
      postApi.atualizar(this.editedItem).then(response => {
        if (this.editedIndex > -1) {
          Object.assign(this.object[this.editedIndex], this.editedItem)
        } else {
          this.object.push(this.editedItem)
        }
        this.text = response.data
        this.close()
        this.error = ''
        this.$nextTick(() => {
          this.snackbar = true
          this.resetForm()
          this.initialize()
        })

      }).catch((response) => {
        this.error = response.data
      })
    },

    finalizar() {
      this.editedItem.saida = new Date();

      const patchApi: MovimentacaoClient = new MovimentacaoClient();
      patchApi.finalizar(this.editedItem).then(response => {
          this.initialize()
          this.recibo = response
          this.text = "Finalizado"
          this.modalRecibo = true
          this.snackbar = true
        }
      ).catch((response) => this.error = response.data)


    },


    save() {
      this.editedItem.entrada = new Date();
      const postApi: MovimentacaoClient = new MovimentacaoClient();
      postApi.cadastrar(this.editedItem).then(response => {
        if (this.editedIndex > -1) {
          Object.assign(this.object[this.editedIndex], this.editedItem)
        } else {
          this.object.push(this.editedItem)
        }
        this.text = response.data
        this.close()
        this.error = ''
        this.$nextTick(() => {
          this.snackbar = true
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


