<template>
  <v-container>
    <v-app-bar flat>
      <v-responsive>
        <v-text-field
        label="teste"
        >

        </v-text-field>
        </v-responsive>

    </v-app-bar>

  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {types} from "sass";
import String = types.String;

export default defineComponent({
  name: 'HelloWorld',
  props: {

  },



});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
