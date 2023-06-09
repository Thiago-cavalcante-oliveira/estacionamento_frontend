<template>

  <v-card>
    <v-card-title>
      <span class="text-h5">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text class="d-flex justify-center flex-column">

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
          <v-col
            cols="12"
            md="1"
          >
            <v-text-field
              v-if="this.id !== undefined"
              variant="solo-filled"
              v-model="editedItem.id"
              label="ID"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              counter="50"
              hint="Limite de 50 caracteres"
              maxlength="50"
              variant="solo-filled"
              v-model="editedItem.nome"
              label="Nome da Marca"
            ></v-text-field>
          </v-col>
        </v-row>

    </v-card-text>
  </v-card>
  <v-card-actions>
    <v-spacer></v-spacer>
    <router-link to="/marca">
      <v-btn
        min-width="200"
        color="blue-darken-1"
        variant="text"
        @click="close"
      >
        Cancelar
      </v-btn>
    </router-link>
    <v-btn
      color="blue-darken-1"
      variant="text"
      @click="acaoSalvar"
    >
      Salvar
    </v-btn>
  </v-card-actions>
  <v-snackbar
    location="bottom"
    class="d-flex justify-center"
    color="green"
    v-model="snackbar"
    :timeout="2000"
  > {{ text }}
  </v-snackbar>
</template>

<script lang="ts">

import {MarcaClient} from "@/client/MarcaClient";
import {Marca} from "@/models/Marca";

export default {
  name: "MarcaFormulario",

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

    object: Marca,

    editedIndex: -1,

    editedItem: {
      nome: '',
      id: undefined,
    } as Marca,

    defaultItem: {
      nome: '',
      id: undefined,
    },
  }),

  computed: {

    formTitle() {
      return this.editedIndex === -1 ? 'Nova Marca' : 'Editar marca'
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
    console.log(this.id)
  },

  methods: {

    async findById(id: number) {
      const getApi: MarcaClient = new MarcaClient();
      this.editedItem = await getApi.findById(id)
    },

    acaoSalvar() {
      if (this.id === undefined) {
        return this.save()
      }
      return this.atualizar()
    },

    resetForm() {
      this.editedItem.nome = '';
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({nome: ''} as Marca, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      const postApi: MarcaClient = new MarcaClient();
      postApi.cadastrar(this.editedItem).then(() => {
        this.text = 'Cadastrado com Sucesso'
        this.snackbar = true
        this.error = ''
        this.$nextTick(() => {
          this.resetForm()
        })
      }).catch((response) => {
        this.error = response.data
      })
    },

    atualizar() {
      const postApi: MarcaClient = new MarcaClient();
      postApi.atualizar(this.editedItem).then(() => {
        this.text = 'Cadastrado com Sucesso'
        this.snackbar = true
        this.close()
        this.error = ''
        this.$nextTick(() => {
          this.resetForm()
          this.$router.push('/marca')
        })
      }).catch((response) => {
        this.error = response.data
      })
    },
  },
}
</script>

