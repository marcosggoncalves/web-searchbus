<template>
  <div>
    <center v-if="commits.length <= 0">
      <ProgressSpinner  style="width:50px;height:50px" animationDuration=".5s"/>
    </center>
    <section class="container" v-else>
      <Card>
        <template slot="title">
            Atualizações SearchBus
        </template>
        <template slot="content" >
          
          <Fieldset class="margin" v-for="commit in commits" :key="commit.id" :legend="`Atualizado por ${commit.author} (${commit.date})`">
            <p class="padding">{{commit.atualizacao}}</p>
          </Fieldset>
            
        </template>
      </Card>
    </section>
  </div>
</template>

<script>

import axios from 'axios';

const moment = require('moment');

moment.locale('pt-BR');

export default {
  name: 'Atualicacoes',
  data(){
    return{
        commits:[]
    }
  },
  methods:{
    getCommits(){
      axios.get("https://api.github.com/repos/MLopesG/serachbus-vue/commits").then(result=>{

        result.data.forEach((element,index) => {

            this.commits.push(
                {
                    id: element.sha,
                    author: element.commit.author.email,
                    date: moment(element.commit.author.date).format('LLLL'),
                    atualizacao: element.commit.message
                }
            ); 
        });  

      }).catch(error=>{
        this.$toast.add(
          {severity:'error', summary: "Ocoreu um erro ao tentar conectar no servidor!", detail: error, life: 3000}
        );
      });
    }
  },
  mounted(){
    this.getCommits();
  }
}         
</script>

<style scoped>
  .padding{
    padding:20px 20px;
  }

  .margin{
    margin-top: 10px;;
  }

  .padding a{
    text-decoration: blue;
    color: blue;
  }

  center{
    padding:20px 20px;
  }
</style>