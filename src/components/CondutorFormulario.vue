<template>
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
      <router-link to="condutor">
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


import {Condutor} from "@/models/condutor";
import {CondutorClient} from "@/client/CondutorClient";
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

    acaoSalvar() {
      if (this.id === undefined) {
        return this.save()
      }
      return this.atualizar()
    },

    async findById(id: number) {
      const getApi: CondutorClient = new CondutorClient();
      this.editedItem = await getApi.findById(id)

    },

    resetForm() {
      this.editedItem = this.defaultItem;
    },

    editItem(item) {
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.text = ""
    },


    close() {
      this.dialog = false
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
          this.$router.push('/condutor')

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
