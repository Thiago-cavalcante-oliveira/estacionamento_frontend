<template>
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
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <RouterLink to="veiculo">
      <v-btn
        color="blue-darken-1"
        variant="text"
        @click="close"
      >
        Cancelar
      </v-btn>
      </RouterLink>
      <v-btn
        color="blue-darken-1"
        variant="text"
        @click="acaoSalvar"
      >
        Salvar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import {VDataTable} from 'vuetify/labs/VDataTable'
import {Modelo} from "@/models/Modelo";
import {ModeloClient} from "@/client/ModeloClient";

import {Veiculo} from "@/models/Veiculo";
import {VeiculoClient} from "@/client/VeiculoClient";
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
    listaModelos: [] as Modelo [],

    headers: [
      {title: 'ID', align: 'center', sortable: true, key: 'id',},
      {title: 'Nome', align: 'center', sortable: true, key: 'placa',},
      {title: 'Marca', align: 'center', sortable: true, key: 'modelo.nome',},
      {title: 'Cor', key: 'Cor.value'},
      {title: 'Tipo do Veículo', key: 'tipo'},
      {title: 'Ano de Fabricação', key: 'ano'},

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
    id() {
      return this.$route.query.id
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },


  created() {

    this.listarModelos();
    if (this.id !== undefined) {
      this.findById(this.id)
    }
    console.log(this.id)


  },

  methods: {
    acaoSalvar() {
      if (this.id === undefined) {
        return this.save()
      }
      return this.atualizar()
    },


    async findById(id: number) {
      const getApi: VeiculoClient = new VeiculoClient();
      this.editedItem = await getApi.findById(id)

    },

    resetForm() {
      this.editedItem.placa = '';
      this.editedItem.modelo.id = 0;
      this.editedItem.cor = '';
      this.editedItem.tipo = '';
      this.editedItem.ano = 0;
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


    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({} as Veiculo, this.defaultItem)
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

        })

      }).catch((response) => {
        this.error = response.data
      })
    },

  atualizar() {
    const postApi: VeiculoClient = new VeiculoClient();
    postApi.atualizar(this.editedItem).then(response => {
      this.text = response.data
      this.close()
      this.error = ''
      this.$nextTick(() => {
        this.snackbar = true
        this.resetForm()
        this.$router.push('/veiculo')
      })

    }).catch((response) => {
      this.error = response.data
    })
  },
},}
</script>

<style scoped>

</style>
