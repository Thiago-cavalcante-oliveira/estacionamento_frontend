<template>
  <v-container>
    <h2
      class="d-flex flex-dire mb-12"
    > Identificação do Condutor
    </h2>
    <v-row
      class="d-flex justify-space-between"
    >
      <v-text-field
        class="mx-10"
        label="Nome do Condutor"
        v-model="condutor.nome"
      ></v-text-field>
      <v-text-field
        class="mx-10"
        label="CPF do Condutor"
        v-model="condutor.cpf"
      ></v-text-field>
      <v-text-field
        class="mx-10"
        label="Modelo do veículo"
        v-model="veiculo.modelo.nome"
      ></v-text-field>
      <v-text-field
        class="mx-10"
        label="Placa do veículo"
        v-model="veiculo.placa"
      ></v-text-field>
      <v-text-field
        class="mx-10"
        label="Cor do veículo"
        v-model="veiculo.cor"
      ></v-text-field>
    </v-row>

    <h2
      class="d-flex flex-dire mb-12"
    > Valores a cobrar
    </h2>
    <v-row
      class="d-flex justify-space-between"
    >
      <v-text-field
        class="mx-10"
        label="Data de entrada"
        v-model="movimentacao.entrada"
      ></v-text-field>
      <v-text-field
        class="mx-10"
        label="Data de Saída"
        v-model="movimentacao.saida"
      ></v-text-field>
      <v-text-field
        class="mx-10"
        label="Modelo do veículo"
        v-model="veiculo.modelo.nome"
      ></v-text-field>
      <v-text-field
        class="mx-10"
        label="Placa do veículo"
        v-model="veiculo.placa"
      ></v-text-field>
      <v-text-field
        class="mx-10"
        label="Cor do veículo"
        v-model="veiculo.cor"
      ></v-text-field>
    </v-row>


  </v-container>

</template>

<script lang="ts">
import {Movimentacao} from "@/models/Movimentacao";
import {Condutor} from "@/models/condutor";
import {VeiculoClient} from "@/client/VeiculoClient";
import {Veiculo} from "@/models/Veiculo";
import {MovimentacaoClient} from "@/client/MovimentacaoClient";

export default {
  name: "ReciboMovimentacao",

  data: () => ({
    movimentacao: new Movimentacao,
    condutor: new Condutor,
    veiculo: new Veiculo,
    dataentrada: undefined,
    horaentrada: undefined,
    datasaida: undefined,
    horasaida:undefined


  }),

  computed: {

    id() {
      return this.$route.query.id
    }

  },

  created() {
    if (this.id !== undefined) {
      this.preencheRecibo(this.id)
    }

  },

  methods: {

    async preencheRecibo(id: number) {
      const getAPi: MovimentacaoClient = new MovimentacaoClient();
      this.movimentacao = await getAPi.findById(id)
      this.condutor = this.movimentacao.condutor
      this.veiculo = this.movimentacao.veiculo
this.calculahora(this.movimentacao)
      console.log(this.movimentacao.condutor.nome)

    },

    calculahora(movimentacao: Movimentacao){
      const data = new Date()

      this.dataentrada = movimentacao.entrada.getDate()

    }



  }


}
</script>

<style scoped>

</style>
