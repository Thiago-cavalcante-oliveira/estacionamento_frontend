<template>
  <v-container class=" d-flex justify-center" >
    <v-col cols="12" sm="5" >
      <v-row>
        <h4
          class="d-flex flex-dire mb-12"
        > Identificação do Condutor
        </h4>
      </v-row>
    <v-row
      class="d-flex justify-space-between"
    >
      <v-text-field
        bg-color="teal-lighten-5"
        color="black"
        variant="outlined"
        class="mx-10"
        label="Nome do Condutor"
        v-model="condutor.nome"
      ></v-text-field>
      <v-text-field
        bg-color="teal-lighten-5"
        color="black"
        variant="outlined"
        class="mx-10"
        label="CPF do Condutor"
        v-model="condutor.cpf"
      ></v-text-field>
        </v-row>
      <v-row>
      <v-text-field
        bg-color="teal-lighten-5"
        color="black"
        variant="outlined"
        class="mx-10"
        label="Modelo do veículo"
        v-model="modelo"
      ></v-text-field>

      <v-text-field
        bg-color="teal-lighten-5"
        color="black"
        variant="outlined"
        class="mx-10"
        label="Cor do veículo"
        v-model="veiculo.cor"
      ></v-text-field>
      <v-text-field
        bg-color="teal-lighten-5"
        color="black"
        variant="outlined"
        class="mx-10"
        label="Placa do veículo"
        v-model="veiculo.placa"
      ></v-text-field>
        </v-row>
<v-row>
    <h4
      class="d-flex flex-dire mb-12"
    > Dados da Movimentação
    </h4>
</v-row>
    <v-row
      class="d-flex justify-space-between"
    >
      <v-text-field
        bg-color="light-green-lighten-4"
        color="black"
        variant="outlined"
        class="mx-10"
        label="Data de entrada"
        v-model="dataentrada"
      ></v-text-field>
      <v-text-field
        bg-color="light-green-lighten-4"
        color="black"
        variant="outlined"
        class="mx-10"
        label="Hora de entrada"
        v-model="horaentrada"
      ></v-text-field>
    </v-row>
      <v-row>
      <v-text-field
        bg-color="orange-lighten-4"
        color="black"
        variant="outlined"
        class="mx-10"
        label="Data de Saída"
        v-model="datasaida"
      ></v-text-field>
      <v-text-field
        bg-color="orange-lighten-4"
        color="black"
        variant="outlined"
        class="mx-10"
        label="Hora da Saída"
        v-model="horasaida"
      ></v-text-field>
      </v-row>
        <v-row>
      <v-text-field
        variant="outlined"
        suffix=" minutos"
        class="mx-10"
        label="Tempo Estacionado"
        v-model="movimentacao.tempo"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        suffix=" minutos"
        class="mx-10"
        label="Multa gerada"
        v-model="movimentacao.tempoMulta"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        suffix=" minutos"
        class="mx-10"
        label="Desconto"
        v-model="movimentacao.tempoDesconto"
      ></v-text-field>

    </v-row>
    <h4
      class="d-flex flex-dire mb-12"
    > Valores a Pagar
    </h4>
    <v-row
      class="d-flex justify-space-between"
    >
      <v-text-field
variant="outlined"
        class="mx-10"
        label="Valor do tempo estacionado"
        v-model="valorHora"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        class="ml-14"
        label="Valor da multa"
        v-model="valorMulta"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        class="mx-10"
        label="Valor do desconto"
        v-model="valorDesconto"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        class="mx-10"
        label="Total a pagar"
        v-model="valorTotal"
      ></v-text-field>

    </v-row>

    </v-col>
  </v-container>

</template>

<script lang="ts">
import {Movimentacao} from "@/models/Movimentacao";
import {Condutor} from "@/models/condutor";
import {VeiculoClient} from "@/client/VeiculoClient";
import {Veiculo} from "@/models/Veiculo";
import {MovimentacaoClient} from "@/client/MovimentacaoClient";
import {da} from "vuetify/locale";

export default {
  name: "ReciboMovimentacao",

  data: () => ({
    movimentacao: new Movimentacao,
    condutor: new Condutor,
    veiculo: new Veiculo,
    modelo:'',
    dataentrada: '',
    horaentrada: '',
    datasaida: '',
    horasaida: '',
    valorDesconto: '',
    valorHora: '',
    valorMulta: '',
    valorTotal: '',
    valorHoraMulta: ''

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
      this.modelo = this.movimentacao.veiculo.modelo.nome
      this.formataHora(this.movimentacao)
      this.formataValor(this.movimentacao)
      console.log(this.movimentacao.condutor.nome)

    },

    formataHora(movimentacao: Movimentacao) {
      const entradaData = new Date(movimentacao.entrada).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      const entradaHora = new Date(movimentacao.entrada).toLocaleTimeString('pt-BR', {hour12: false})
      const saidaData = new Date(movimentacao.saida).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      const saidaHora = new Date(movimentacao.saida).toLocaleTimeString('pt-BR', {hour12: false})
      this.dataentrada = entradaData
      this.horaentrada = entradaHora
      this.datasaida = saidaData
      this.horasaida = saidaHora
    },

    formataValor(movimentacao: Movimentacao) {
      const a = this.movimentacao.valorMulta
      this.valorMulta = a.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      this.valorHora = movimentacao.valorHora.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      this.valorDesconto = movimentacao.valorDesconto.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      this.valorTotal = movimentacao.valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    }


  },


}
</script>

<style scoped>

</style>
