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
        <v-row>
          <v-col cols="12" sm="" md="1">
            <v-text-field
              v-if="this.id !== undefined"
              variant="solo-filled"
              readonly=""
              v-model="editedItem.id"
              label="ID"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="3"

          >
            <v-text-field
              variant="solo-filled"
              counter="150"
              hint="Límite de 150 caracteres"
              v-model="editedItem.nome"
              label="Nome"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              variant="solo-filled"
              v-model="editedItem.cpf"
              v-mask="'###.###.###-##'"
              label="CPF"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field

              variant="solo-filled"
              hint="Informar o DDD : (XX) XXXXX-XXXX"
              v-model="editedItem.telefone" label="Telefone"
              v-mask="'(##) #####-####'"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
              <v-text-field
                v-if="editedItem.tempoPagoEmHora >0"
                bg-color="red-lighten-3"
                variant="solo-filled"
                readonly
                v-model="editedItem.tempoPagoEmHora" label="Tempo Acumulado"
              ></v-text-field>

          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              v-if="editedItem.tempoDesconto >0"
              bg-color="red-lighten-3"
              suffix="minutos"
              variant="solo-filled"
              readonly
              v-model="editedItem.tempoDesconto" label="Desconto para uso"

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


import {Condutor, CreateCondutorDTO} from "@/models/condutor";
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


    editedIndex: -1,
    editedItem: {
      id: '',
      nome: '',
      cpf: '',
      telefone: '',



    } as CreateCondutorDTO,

    defaultItem: {
      id: undefined,
      nome: '',
      cpf: '',
      telefone: '',

    } as CreateCondutorDTO,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo item' : 'Editar item'
    },
    id() {
      return this.$route.query.id
    }
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







    atualizar() {
      const postApi: CondutorClient = new CondutorClient();
      postApi.atualizar(this.editedItem).then(() => {

        this.text = 'Cadastrado com Sucesso'
        this.snackbar = true

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
  },
}
</script>
