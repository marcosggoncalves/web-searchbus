<template>
    <div>
      <center v-if="veiculos.length <= 0">
        <ProgressSpinner  style="width:50px;height:50px" animationDuration=".5s"/>
      </center>
      <section class="container" v-else>
        <Carousel :value="veiculos" :numVisible="4" :numScroll="3" :responsiveOptions="responsiveOptions" :circular="true" :autoplayInterval="2000">
          <template #header>
            <h2>Veiculos</h2>
          </template>
          <template #item="slotProps">
            <div>
              <div class="veiculo-item-content">
                  <div>
                     <a :href="`/veiculo/${slotProps.data.id}`"> 
                      <img :src="slotProps.data.imagem"  class="veiculo-image"/>
                     </a>
                  </div>
                  <div>
                      <div class="car-title">{{slotProps.data.nome}}</div>
                      <div class="car-subtitle">{{slotProps.data.ano}} | {{slotProps.data.marca}}</div>
                  </div>
                </div>
              </div>
          </template>
        </Carousel>

        <Panel header="Visualizações">
          <section class="row">
            <div>
              <BarChartASC v-tooltip='"4 veiculos mais visualizados no portal searchbus!"' />
            </div>
            <div>
              <BarChartDESC v-tooltip='"4 veiculos com poucas visualizações no portal searchbus!"' />
            </div>
          </section>
        </Panel>
      </section>
    </div>
</template>

<script>

import axios from '@/axios.js';
import BarChartASC from "../components/BarChartViewsASC.vue";
import BarChartDESC from "../components/BarChartViewsDESC.vue";

export default {
  name: 'Home',
  components:{
    BarChartASC,
    BarChartDESC
  },
  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
        },
        {
          breakpoint: '600px',
          numVisible: 2,
          numScroll: 2
        },
        {
          breakpoint: '480px',
          numVisible: 1,
          numScroll: 1
        }
      ],
      menu:[
        {label:"Veiculos", icon: 'pi pi-fw pi-home', to: '/tabmenu' }
      ],
      veiculos: []
    }
  },
  methods:{
    getVeiculos(){
      axios.get("/vehicles/all/12").then(result=>{
        this.veiculos = result.data;
      });
    }
  },

  mounted(){
    this.getVeiculos();
  }
}
</script>


<style>
  center{
    padding:20px 20px;
  }

  .veiculo-item-content {
      border: 1px solid var(--surface-d);
      border-radius: 3px;
      margin: .3rem;
      text-align: center;
      padding: 2rem 0;
  }

  .veiculo-image {
      width: 80%;
  }
  
</style>