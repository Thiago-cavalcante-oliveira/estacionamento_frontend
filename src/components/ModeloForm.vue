<template>
<v-container>
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
          v-model="editedItem.nome"
          label="Nome do Modelo"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          label="Marca"
          :items="listaMarcas"
          item-title="nome"
          item-value="id"
          v-model="editedItem.marca.id"
        >
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</v-card-text>
<v-card-actions>
  <v-spacer></v-spacer>
  <RouterLink to="modelo">
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
    @click="save"
  >
    Salvar
  </v-btn>
</v-card-actions>
</v-container>
</template>

<script lang="ts">
import {VDataTable} from 'vuetify/labs/VDataTable'
import {Modelo} from "@/models/Modelo";
import {ModeloClient} from "@/client/ModeloClient";
import {Marca} from "@/models/Marca";
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
    listaMarcas: [] as Marca [],

    headers: [
      {title: 'ID', align: 'center', sortable: true, key: 'id'},
      {title: 'Nome', align: 'center', sortable: true, key: 'nome'},
      {title: 'Marca', align: 'center', sortable: true, key: 'marca.nome'},
      {title: 'Ações', key: 'actions', sortable: false}
    ],
    object: [] as Modelo[],
    editedIndex: -1,
    editedItem: {
      id: '',
      nome: '',
      marca: {id: undefined},
    } as Modelo,
    defaultItem: {
      nome: '',
      id: undefined,
      marca: {id: undefined}
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo item' : 'Editar item'
    },
    id(){
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

    this.listarMarcas();
    if (this.id !== undefined){
      this.findById(this.id)
    }
    console.log(this.id)
  },

    methods: {

   async findById(id: number){
     const getApi: ModeloClient = new ModeloClient();
     this.editedItem = await getApi.findById(id)
   },

    resetForm() {
      this.editedItem.nome = '';
      this.editedItem.marca.id = 0,
        this.editedItem.id = 0
    },


    async listarMarcas() {
      const getApiMarca: MarcaClient = new MarcaClient();
      this.listaMarcas = await getApiMarca.findAll()
    },

    editItem(item) {
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },


    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({nome: ''} as Modelo, this.defaultItem)
        this.editedIndex = -1
      })
    },


    save() {
      const postApi: ModeloClient = new ModeloClient();
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
          this.$router.push('/modelo')

        })

      }).catch((response) => {
        this.error = response.data
      })
    },
  },
}
</script>
