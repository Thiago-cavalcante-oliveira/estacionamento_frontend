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
                      <v-text-field
                        v-model="editedItem.placa"
                        label="Placa do Veículo"
                        v-mask="'AAA-#A##'"

                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-select
                        label="Modelo"
                        :items="listaModelos"
                        item-title="nome"
                        item-value="id"
                        v-model="editedItem.modelo.id"
                      >

                      </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-select
                        label="Cor"
                        :items="['BRANCO', 'AZUL', 'PRETO', 'CINZA', 'ROXO', 'LARANJA']"
                        item-value="item"
                        v-model="editedItem.cor"
                      >

                      </v-select>
                    </v-col>
                    <v-col

                      cols="12"
                      sm="6"
                      md="6">
                      <v-select

                        label="Tipo"
                        :items="['MOTO', 'CARRO', 'VAN']"
                        item-value="item"
                        v-model="editedItem.tipo"
                      >

                      </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.ano"
                        label="Ano de fabricação"
                      ></v-text-field>
                    </v-col>


                    <!--                  <v-col-->
                    <!--                    cols="12"-->
                    <!--                    sm="6"-->
                    <!--                    md="4"-->
                    <!--                  >-->
                    <!--                    <v-text-field-->
                    <!--                      v-model="editedItem.fat"-->
                    <!--                      label="Fat (g)"-->
                    <!--                    ></v-text-field>-->
                    <!--                  </v-col>-->
                    <!--                  <v-col-->
                    <!--                    cols="12"-->
                    <!--                    sm="6"-->
                    <!--                    md="4"-->
                    <!--                  >-->
                    <!--                    <v-text-field-->
                    <!--                      v-model="editedItem.carbs"-->
                    <!--                      label="Carbs (g)"-->
                    <!--                    ></v-text-field>-->
                    <!--                  </v-col>-->
                    <!--                  <v-col-->
                    <!--                    cols="12"-->
                    <!--                    sm="6"-->
                    <!--                    md="4"-->
                    <!--                  >-->
                    <!--                    <v-text-field-->
                    <!--                      v-model="editedItem.protein"-->
                    <!--                      label="Protein (g)"-->
                    <!--                    ></v-text-field>-->
                    <!--                  </v-col>-->
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
                  @click="save"
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
      <template v-slot:item.actions="{ item }">
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

import {Veiculo} from "@/models/Veiculo";
import {VeiculoClient} from "@/client/VeiculoClient";

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
    listaModelos: [] as Modelo [],

    headers: [
      {title: 'ID', align: 'center', sortable: true, key: 'id',},
      {title: 'Nome', align: 'center', sortable: true, key: 'placa',},
      {title: 'Marca', align: 'center', sortable: true, key: 'modelo.nome',},
      {title: 'Cor', key: 'Cor.value'},
      {title: 'Tipo do Veículo', key: 'tipo'},
      {title: 'Ano de Fabricação', key: 'ano'},
      // { title: 'Protein (g)', key: 'protein' },
      {title: 'Ações', key: 'actions', sortable: false},
    ],
    object: [] as Veiculo[],
    editedIndex: -1,
    editedItem: {
      id: '',
      placa: '',
      modelo: {id: undefined},
      cor: '',
      tipo: '',
      ano: ''

    } as Veiculo,
    defaultItem: {
      nome: '',
      id: undefined,
      modelo: {id: undefined},
      cor: '',
      tipo: '',
      ano: ''
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
    this.listarModelos();
  },

  methods: {

    resetForm() {
      this.editedItem.placa = '';
      this.editedItem.modelo.id = 0;
      this.editedItem.cor = '';
      this.editedItem.tipo = '';
      this.editedItem.ano = 0;
    },
    async initialize() {
      const getApi: VeiculoClient = new VeiculoClient();
      this.object = await getApi.findAll()
    },

    async listarModelos() {
      const getApiModelo: ModeloClient = new ModeloClient();
      this.listaModelos = await getApiModelo.findAll()
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
      const deleteApi: VeiculoClient = new VeiculoClient();
      deleteApi.delete(this.editedItem).then(response => {
          this.initialize()
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
        this.editedItem = Object.assign({placa: ''} as Veiculo, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({placa: ''} as Veiculo, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      const postApi: VeiculoClient = new VeiculoClient();
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

