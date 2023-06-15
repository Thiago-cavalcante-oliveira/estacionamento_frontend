<template>
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
          max-width="500px"
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
                  v-if="error.length>0"

                  density="compact"
                  type="warning"
                  title="Alert title"
                  :text="error"
                ></v-alert>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.nome"
                      label="Nome da Marca"
                    ></v-text-field>
                  </v-col>
                  <!--                  <v-col-->
                  <!--                    cols="12"-->
                  <!--                    sm="6"-->
                  <!--                    md="4"-->
                  <!--                  >-->
                  <!--                    <v-text-field-->
                  <!--                      v-model="editedItem.calories"-->
                  <!--                      label="Calories"-->
                  <!--                    ></v-text-field>-->
                  <!--                  </v-col>-->
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
        size="small"
        class="me-2"
        @click="editItem(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
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
</template>
<script lang="ts">
import {VDataTable} from 'vuetify/labs/VDataTable'
import {MarcaClient} from "@/client/MarcaClient";
import {Marca} from "@/models/Marca";

export default {
  components: {
    VDataTable
  },
  data: () => ({
    error: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'Marca',
        align: 'start',
        sortable: false,
        key: 'nome',
      },
      // { title: 'Calories', key: 'calories' },
      // { title: 'Fat (g)', key: 'fat' },
      // { title: 'Carbs (g)', key: 'carbs' },
      // { title: 'Protein (g)', key: 'protein' },
      {title: 'Ações', key: 'actions', sortable: false},
    ],
    object: [] as Marca[],
    editedIndex: -1,
    editedItem: {
      nome: '',


    } as Marca,
    defaultItem: {
      nome: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
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
  },

  methods: {

    resetForm(){
      this.editedItem.nome = '';
    },
    async initialize() {
      const getApi: MarcaClient = new MarcaClient();
      this.object = await getApi.findAll()


    },

    editItem(item) {
      this.editedIndex = this.object.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.dialogDelete = true
      const deleteApi: MarcaClient = new MarcaClient();

      deleteApi.delete(this.editedItem.id).then(() => {

        this.editedIndex = this.object.indexOf(item)
        this.editedItem = Object.assign({}, item)

      }).catch((response) => this.error = response.data)


    },

    deleteItemConfirm() {
      this.object.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({nome:''} as Marca, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({nome:''}as Marca, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      const postApi: MarcaClient = new MarcaClient();

      postApi.cadastrar(this.editedItem).then(() => {

        if (this.editedIndex > -1) {

          Object.assign(this.object[this.editedIndex], this.editedItem)
        } else {

          this.object.push(this.editedItem)
        }
        this.close()
        this.error = ''

        this.$nextTick(() => {
          this.resetForm()
        })

      }).catch((response) => {this.error = response.data} )

    },
  },
}
</script>
