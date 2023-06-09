<template>
  <div class="about">
    <h1>{{teste}} </h1>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import HelloWorld from "@/components/HelloWorld";
import axios from "axios";
export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld
  },

  data (){
    return {
      teste: null
    }
    },
        mounted () {
      axios.get( 'viacep.com.br/ws/01001000/json/').then(response =>this.teste=response)

    }



});
</script>
