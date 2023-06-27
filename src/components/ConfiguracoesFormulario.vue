<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-alert
            max-width="400"
            closable
            class="my-6"
            v-if="error.length>0"
            density="compact"
            type="error"
            title="Erro: "
            :text="error"
          ></v-alert>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="" md="1">
            <v-text-field
              v-if="this.id !== undefined"
              variant="solo-filled"
              readonly
              v-model="editedItem.id"
              label="ID"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              variant="solo-filled"
              hint="Formato 00:00"
              v-mask="'##:##'"
              v-model="editedItem.inicioExpediente"
              label="Hora abertura"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              align="center"
              variant="solo-filled"
              hint="Formato 00:00"
              v-mask="'##:##'"
              v-model="editedItem.fimExpediente"
              label="Hora encerramento"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="3">
            <v-text-field
              variant="solo-filled"
              prefix="R$ "
              v-model="editedItem.valorHora"
              label="Valor da hora"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              prefix="R$ "
              variant="solo-filled"
              v-model="editedItem.valorMinutoMulta"
              label="Valor do minuto de multa"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="2">
            <v-text-field
              hint="informar total de horas"
              variant="solo-filled"
              v-model="editedItem.tempoParaGerarDesconto"
              label="Tempo para desconto"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              variant="solo-filled"
              v-model="editedItem.tempoDeCreditoDesconto"
              suffix=" horas"
              label="Crédito a ser usado"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-select
              label="Gerar desconto?"
              :items="[{title:'SIM', value: true},{title: 'NÃO', value: false } ]"
              v-model="editedItem.gerarDesconto"
              variant="solo"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="2">
            <v-text-field
              variant="solo-filled"
              v-model="editedItem.vagasCarro" label="Vagas para Carro"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field variant="solo-filled" v-model="editedItem.vagasMoto" label="Vagas para Moto"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field variant="solo-filled" v-model="editedItem.vagasVan" label="Vagas para Van"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <router-link to="configuracoes">
        <v-btn color="blue-darken-1" variant="text" @click="close">
          Cancelar
        </v-btn>
      </router-link>
      <v-btn color="blue-darken-1" variant="text" @click="acaoSalvar">
        Salvar
      </v-btn>
    </v-card-actions>
  </v-card>
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

    editedIndex: undefined,

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
      id: undefined,
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
    if (this.id !== undefined) {
      this.findById(this.id)
    }
  },

  methods: {


    async findById(id: number) {
      const getApi: ConfiguracaoClient = new ConfiguracaoClient();
      this.editedItem = await getApi.findById(id)
    },
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
      const getApi: ConfiguracaoClient = new ConfiguracaoClient();
      this.object = await getApi.findAll()
    },

    editItem(item: any) {
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.text = ""
    },


    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({} as CreateConfiguracaoDTO, this.defaultItem)
        this.editedIndex = undefined
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
          this.$router.push('/configuracoes')

        })

      }).catch((response) => {
        this.error = response.data
      })
    },

    save() {
      const postApi: ConfiguracaoClient = new ConfiguracaoClient();
      postApi.cadastrar(this.editedItem).then(() => {

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

<style scoped>

</style>
