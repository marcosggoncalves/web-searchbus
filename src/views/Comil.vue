<template>
    <div>
        <center v-if="lancamentos.length <= 0">
          <ProgressSpinner  style="width:50px;height:50px" animationDuration=".5s"/>
        </center>
        <section class="container" v-else>
            <div class="titulo-noticia">
                <h1>últimos lançamentos Comil </h1>
            </div>
            <div class="p-grid nested-grid">
                <div class="p-grid">
                    <div class="p-col" v-for="(noticia,index) in lancamentos" :key="index" >
                        <Card v-if="!noticia.atualizado" class="tamanho">
                            <template slot="header">
                                <img alt="user header" :src="noticia.imagem">
                            </template>
                            <template slot="content">
                                {{noticia.titulo}}
                            </template>
                            <template slot="footer">
                                <Button @click="acessar(noticia.link)" icon="pi pi-angle-double-right" label="Saiba Mais" />
                            </template>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"comil",
    data(){
        return{
            lancamentos:[]
        }
    },
    methods:{
        getLancamentos(){
            axios.get("https://raspagem-web.herokuapp.com/comil").then(result=>{
                this.lancamentos = result.data.noticias;
            }).catch(error=>{
                this.$toast.add(
                    {severity:'error', summary: "Ocoreu um erro ao tentar conectar no servidor!", detail: error, life: 3000}
                );
            });
        },

        acessar(link){
            return window.location.href = link;
        }
    },
    mounted(){
        this.getLancamentos();
    }
}
</script>

<style  scoped>
    .tamanho{
        width:100%;
    }

    .titulo-noticia{
        text-align: center;
        margin-bottom: 25px;
    }

    .titulo-noticia h1{
        font-size: 1.4rem;
    }

    @media screen and (min-width: 640px) {
        .tamanho{
            width:300px;
        }
    }
</style>