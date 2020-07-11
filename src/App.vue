<template>
  <div id="app">
    <header>
      <div class="logo">
        <img alt="SearchBus" src="./assets/logo.png">
      </div>
      <div class="titulo">
          <h1>SearchBus</h1>
      </div>
        <nav  class="search">
            <div>
              <AutoComplete v-model="filter" :suggestions="veiculos"  placeholder="Digite sua pesquisa..." @complete="search($event)" field="nome">
                	<template #item="slotProps">
                    <div>
                      <a  :href="`/veiculo/${slotProps.item.id}`">{{slotProps.item.nome_comercial}}</a>
                    </div>
                  </template>
              </AutoComplete>
            </div>
        </nav>
    </header>  
    <router-view/>
  </div>
</template>

<script>
import axios from './axios.js';

export default {
  data(){
    return{
      veiculos:[],
      filter: null
    }
  },
  watch:{
    filter: function(veiculo){
      if(veiculo && veiculo.id){
         return this.$router.push(`/veiculo/${veiculo.id}`);
      }
    }
  },
  methods:{
    search(event){
      if(event.query.length <= 0 ) return false;

      axios.get("/vehicles",{
        params:{
          "search": event.query
        }
      }).then(result=>{
        this.veiculos = result.data;
      });
    }
  }
}
</script>

<style>
  a{
    text-decoration: none;
    color: #000;
    padding: 20px 20px;
  }

  .padding{
    padding: 20px 20px;;
  }
</style>