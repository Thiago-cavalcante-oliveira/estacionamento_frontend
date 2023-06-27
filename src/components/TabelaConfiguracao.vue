<template>
  <v-container fluid>
    <v-data-table :headers="headers"
                  :items="object"
                  class="elevation-2 ">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Configurações</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ props }">
              <router-link to="configuracoesformulario">
                <v-btn elevation="4" color="primary" dark class="mb-2" v-bind="props">
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
      <template v-slot:item.valorHora="{ item }">
        {{formatarValor(item.columns.valorHora)}}
      </template>
      <template v-slot:item.valorMinutoMulta="{ item }">
        {{formatarValor(item.columns.valorMinutoMulta)}}
      </template>
      <template v-slot:item.tempoParaGerarDesconto="{ item }">
        {{formatarHora(item.columns.tempoParaGerarDesconto)}}
      </template>
      <template v-slot:item.tempoDeCreditoDesconto="{ item }">
        {{formatarHora(item.columns.tempoDeCreditoDesconto)}}
      </template>
      <template v-slot:item.actions="{ item }">

        <router-link :to="{name:'configuracoesformulario', query: {id: item.raw.id}}">
          <v-icon color="blue" size="small" class="me-5" @click="editItem(item.raw)">
            mdi-pencil
          </v-icon>
          <v-icon color="red" size="small" @click="deleteItem(item.raw)">
            mdi-delete
          </v-icon>
        </router-link>
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
import {CreateConfiguracaoDTO} from '@/models/Configuracao';
import {Configuracao} from '@/models/Configuracao';
import {ConfiguracaoClient} from '@/client/ConfiguracaoClient';

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
      {title: 'Hora de Abertura', key: 'inicioExpediente', align: 'center', sortable: true},
      {title: 'Hora fechamento', key: 'fimExpediente', align: 'center', sortable: true},
      {title: 'Valor da Hora', key: 'valorHora', align: 'center', sortable: true},
      {title: 'Valor do Minuto da Multa', key: 'valorMinutoMulta', align: 'center', sortable: true},
      {title: 'Tempo para obter crédito', key: 'tempoParaGerarDesconto', align: 'center', sortable: true},
      {title: 'Tempo para crédito', key: 'tempoDeCreditoDesconto', align: 'center', sortable: true},
      //{title: 'Gerar desconto', key: 'gerarDesconto', align: 'center', sortable: true},
      {title: 'Vagas para moto', key: 'vagasMoto', align: 'center', sortable: true},
      {title: 'Vagas para carro', key: 'vagasVan', align: 'center', sortable: true},
      {title: 'Vagas para Van', key: 'vagasCarro', align: 'center', sortable: true},
      {title: 'Ações', key: 'actions', sortable: false},
    ],
    object: [] as Configuracao[],

    editedIndex: -1,

    editedItem: {
      id: '',
      inicioExpediente: '',
      valorHora: '',
      valorMinutoMulta: '',
      fimExpediente: '',
      tempoParaGerarDesconto: '',
      tempoDeCreditoDesconto: '',
      gerarDesconto: '',
      vagasMoto: '',
      vagasVan: '',
      vagasCarro: '',
      versao: '',
    } as CreateConfiguracaoDTO,

    defaultItem: {
      id: -1,
      inicioExpediente: '',
      valorHora: 0,
      valorMinutoMulta: 0,
      fimExpedientero: '',
      tempoParaGerarDesconto: 0,
      tempoDeCreditoDesconto: 0,
      gerarDesconto: true,
      vagasMoto: 0,
      vagasVan: 0,
      versao: 0
    } as CreateConfiguracaoDTO,
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

    formatarValor(valor){
      return `R$ ${valor},00`

    },
formatarHora(valor){
      return `${valor} hora(s)`
},

    resetForm() {
      this.editedItem = this.defaultItem;
    },

    async initialize() {
      const getApi: ConfiguracaoClient = new ConfiguracaoClient();
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
      const deleteApi: ConfiguracaoClient = new ConfiguracaoClient();
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
        this.editedItem = Object.assign({} as CreateConfiguracaoDTO, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({} as CreateConfiguracaoDTO, this.defaultItem)
        this.editedIndex = -1
      })
    },

    atualizar() {
      const postApi: ConfiguracaoClient = new ConfiguracaoClient();
      postApi.atualizar(this.editedItem).then(() => {
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
      const postApi: ConfiguracaoClient = new ConfiguracaoClient();
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
