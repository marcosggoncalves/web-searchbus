<template>
    <div>
      <center v-if="!veiculo">
        <ProgressSpinner  style="width:50px;height:50px" animationDuration=".5s"/>
      </center>
      <section class="container lados " v-else>
        <section class="palavras">
            
            <div>
              <h1>Lançamentos <span class="p-tag">Novos!</span></h1>
            </div>

            <div id="listas">
                <ul :class="lancamento.id === veiculo.id ? 'mostrar active' : 'mostrar'" v-for="lancamento in lancamentos" :key="lancamento.id">
                  <li>
                      <a :href="`/veiculo/${lancamento.id}`">{{lancamento.nome}} </a>
                  </li>
                </ul>
            </div>
            
            <div>
              <h1>Informações</h1>
            </div>

            <div>
              <ul>
                  <li class="painel-info">Visualizações: <span class="p-badge">{{veiculo.visualizar}}</span></li>
              </ul>
            </div>

            <div>
              <h1>Compartilhar</h1>
            </div>

            <div>
              <ul>
                  <li>
                    <ShareNetwork
                      network="facebook"
                      url="https://news.vuejs.org/issues/180"
                      :title="`Searchbus - ${veiculo.nome_comercial}`"
                      :description="veiculo.descricao"
                      :quote="`Searchbus - ${veiculo.descricao}`"
                      hashtags="SearchBus"
                    >
                        Facebook
                    </ShareNetwork>
                  </li>

                  <li>
                    <ShareNetwork
                      network="whatsApp"
                      url="https://news.vuejs.org/issues/180"
                      :title="`Searchbus - ${veiculo.nome_comercial}`"
                      :description="veiculo.descricao"
                    >
                        WhatsApp
                    </ShareNetwork>
                  </li>

                  <li>
                    <ShareNetwork
                      network="email"
                      url="https://news.vuejs.org/issues/180"
                      :title="`Searchbus - ${veiculo.nome_comercial}`"
                      :description="veiculo.descricao"
                    >
                        Email
                    </ShareNetwork>
                  </li>
              </ul>
            </div>

            <div class="btn-voltar">
              <span class="p-buttonset">
                <Button @click="voltar()" label="Voltar" icon="pi pi-arrow-left" iconPos="left" />
              </span>
            </div>
        </section>   
         <section class="informaçõesveiculos">
              <div class="title">
                <h1>{{veiculo.nome_comercial}}</h1>
              </div>
              <div class="imagem-gallery-principal">
                  <Galleria :value="galleria()" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" :autoPlay="true">
                      <template #item="slotProps">
                          <img :src="slotProps.item.imagem" :alt="slotProps.item.nime" style="width: 100%; display: block;" />
                      </template>
                      <template #thumbnail="slotProps">
                          <img :src="slotProps.item.imagem" :alt="slotProps.item.nome" class="imagem-gallery" />
                      </template>
                  </Galleria>
              </div>
              <div class="info-line">
                  <p>Veiculo: {{veiculo.nome}}</p>
              </div>
              <div class="info-line">
                  <p>Categoria: {{veiculo.categoria}}</p>
              </div>
              
              <div class="info-line">
                  <p>Marca: {{veiculo.marca}}</p>
              </div>
              
              <div class="info-line">
                  <p>Ano: {{veiculo.ano}}</p>
              </div>
              
              <div class="info-line">
                  <p>Eixo: {{veiculo.eixo}}</p>
              </div>
              
              <div class="info-line">
                  <p>Geração: {{veiculo.geracao}}</p>
              </div>

              <div class="info-line">
                  <p>Descrição: {{veiculo.descricao}}</p>
              </div>
          </section>
      </section>
    </div>
</template>

<script>

import axios from '@/axios.js';

export default {
  name: 'Veiculo',
  data() {
    return {
      veiculo: null,
      lancamentos:[],
      responsiveOptions: [
				{
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
			]
    }
  },
  methods:{
    url(id){
      return window.location.origin + '/veiculos/' + id;
    },

    voltar(){
      this.$router.push('/');
    },

    getVeiculo(){

      let id = this.$route.params.id;

      axios.get(`/vehicles/${id}`).then(result=>{
        this.veiculo = result.data;
      });

      this.getUltimos();
    },

    getUltimos(){
      axios.get(`/vehicles/all/4`).then(result=>{
        this.lancamentos = result.data;
      });
    },
  
    galleria(){
      if(this.veiculo && !this.veiculo.imagem) return false;
      let fotos = [this.veiculo];
      return fotos;
    }
  },

  mounted(){
    this.getVeiculo();
  }
}
</script>


<style>
  center{
    padding:20px 20px;
  }

  .imagem-gallery{
    display: block;
    max-width: 5rem;
  }

  .imagem-gallery-principal{
      width: 100%;
  }
</style>