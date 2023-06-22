<template>
  <v-app>

    <v-app-bar height="150" >
      <v-row class="d-flex justify-space-between px-16  "
      extension
      >
        <router-link to="/">
          <v-btn
            variant="tonal"
            color="indigo"
            size="large"
            width="250"
            elevation="2"
          >
            <v-icon>mdi-home-circle</v-icon>
            Página Inicial
          </v-btn>
        </router-link>
        <router-link to="/marca">
          <v-btn
            variant="tonal"
            color="indigo"
            size="large"
            width="250"
            elevation="2"
          > Marca
          </v-btn>
        </router-link>
        <router-link to="/modelo">
          <v-btn
            variant="tonal"
            color="indigo"
            size="large"
            width="250"
            elevation="2"
          > Modelo
          </v-btn>
        </router-link>
        <router-link to="/veiculo">
        <v-btn
          variant="tonal"
          color="indigo"
          size="large"
          width="250"
          elevation="2"
        > Veículo
        </v-btn>
        </router-link>
        <router-link to="/condutor">
        <v-btn
          variant="tonal"
          color="indigo"
          size="large"
          width="250"
          elevation="2"
        > Condutor
        </v-btn>
        </router-link>
        <router-link to="/configuracoes">
        <v-btn
          variant="tonal"
          color="indigo"
          size="large"
          width="250"
          elevation="2"
        > Configurações
        </v-btn>
        </router-link>
      </v-row>
    </v-app-bar>
    <default-view/>
  </v-app>
</template>

<script lang="ts" setup>

import DefaultView from './View.vue'
</script>
