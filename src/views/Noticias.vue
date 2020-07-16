<template>
    <div>
        <center v-if="lancamentos.length <= 0">
          <ProgressSpinner  style="width:50px;height:50px" animationDuration=".5s"/>
        </center>
        <section class="container" v-else>
            <div class="titulo-noticia">
                <h1>Noticias - {{atualizado}}</h1>
            </div>
            <div>
                <div class="p-grid">
                    <div class="p-col-12 p-md-6 p-lg-3" v-for="(noticia,index) in lancamentos" :key="index" >
                        <Card class="tamanho">
                            <template slot="header">
                                <img alt="user header" :src="noticia.imagem">
                            </template>
                            <template slot="title" v-if="noticia && noticia.data">
                                <span>{{noticia.data}}</span>
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
    name:"noticias",
    data(){
        return{
            lancamentos:[],
            atualizado: null
        }
    },
    methods:{
        getNoticias(){
            axios.all([
                axios.get("https://raspagem-web.herokuapp.com/revista"),
                axios.get("https://raspagem-web.herokuapp.com/antt")
            ]).then((...results)=>{
                this.lancamentos = results[0][0].data.data.noticias;
                this.atualizado = results[0][0].data.atualizado;
                this.lancamentos = this.lancamentos.concat(results[0][1].data.data.noticias);
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
        this.getNoticias();
    }
}
</script>

<style  scoped>
    .tamanho{
        width:100%;
        height: 100%;
    }

    .titulo-noticia{
        text-align: center;
        margin-bottom: 20px;
    }

    .titulo-noticia h1{
        font-size: 1.4rem;
    }

    span{
        font-size: 1rem;
    }

</style>