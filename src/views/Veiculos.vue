<template>
    <div>
      <center v-if="veiculos.length <= 0">
        <ProgressSpinner  style="width:50px;height:50px" animationDuration=".5s"/>
      </center>
      <section class="container" v-else>
        <div>
          <h2>Veiculos Catálogados</h2>
        </div>
         <Toolbar class="p-mb-4">
            <template slot="left">
                <Button @click="editModal(veiculo())" label="Novo Veiculo" icon="pi pi-plus" class="p-button p-mr-2" />
            </template>
        </Toolbar>
        <DataTable :value="veiculos"  :paginator="true" :rows="15" >
            <Column field="nome_comercial" header="Nome Comercial" >
                <template #body="slotProps">
                    {{slotProps.data.nome_comercial}}
                </template>
            </Column>
            <Column header="Imagem" >
                <template #body="slotProps">
                    <img :src="slotProps.data.imagem" :alt="slotProps.data.image" class="imagem-gallery" />
                </template>
            </Column>
            <Column header="Postagem" >
                <template #body="slotProps">  
                  <Button @click="acessar(slotProps.data.id)" label="Acessar" icon="pi pi-angle-up" iconPos="left" />
                </template>
            </Column>
            <Column field="categoria" header="Categoria" ></Column>
            <Column field="visualizar" header="Visualizações" >
                <template #body="slotProps">  
                    <span class="p-badge p-column-title">{{slotProps.data.visualizar}}</span>
                </template>
            </Column>
            <Column>
                <template #body="slotProps">
                  <Button label="Alterar" icon="pi pi-pencil" class="p-button-text p-button-success"  @click="editModal(slotProps.data)" />
                </template>
            </Column>
            <template #paginatorLeft>
              <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="getVeiculos()" />
            </template>
        </DataTable>

        <Dialog :visible.sync="openModalDelete"  header="Excluir veiculo no catálogo"  :style="{width: '50vw'}">
          <p class="p-m-0">Deseja excluir esse veiculo?</p>
          <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text p-button" @click="deleteModal(null)"/>
            <Button label="Confirmar" icon="pi pi-check" class="p-button-text p-button-success" @click="deletarVeiculo()" />
          </template>
        </Dialog>

        <Dialog :header="veiculoEdit && !veiculoEdit.id ? `Novo Veiculo` :`Editar veiculo - ${veiculoEdit.nome_comercial}`" :visible.sync="openModalEdit" :style="{width: '80vw'}">
            <div class="p-fluid p-grid margin">
                <div class="p-field p-col-12 p-md-2" v-if="veiculoEdit && veiculoEdit.id">
                    <span class="p-float-label">
                        <InputText id="id" :disabled="true" type="text" v-model="veiculoEdit.id" />
                        <label for="id">ID: </label>
                    </span>
                </div>
                <div :class="veiculoEdit && veiculoEdit.id ? 'p-field p-col-12 p-md-3' : 'p-field p-col-12 p-md-4'">
                    <span class="p-float-label">
                        <InputText id="nome_comercial" type="text" v-model="veiculoEdit.nome_comercial" />
                        <label for="nome_comercial">Nome Comercial: </label>
                    </span>
                </div>
                <div :class="veiculoEdit && veiculoEdit.id ? 'p-field p-col-12 p-md-3' : 'p-field p-col-12 p-md-4'">
                    <span class="p-float-label">
                        <InputText id="nome" type="text" v-model="veiculoEdit.nome" />
                        <label for="nome">Nome: </label>
                    </span>
                </div>
                <div class="p-field p-col-12 p-md-4">
                    <span class="p-float-label">
                        <InputText id="marca" type="text" v-model="veiculoEdit.marca" />
                        <label for="marca">Marca: </label>
                    </span>
                </div>
                <div class="p-field p-col-12 p-md-4">
                  <span class="p-float-label">
                      <InputText id="categoria" type="text" v-model="veiculoEdit.categoria" />
                      <label for="categoria">Categoria: </label>
                  </span>
                </div>
                <div class="p-field p-col-12 p-md-4">
                  <span class="p-float-label">
                      <InputText id="ano" type="text" v-model="veiculoEdit.ano" />
                      <label for="ano">Ano: </label>
                  </span>
                </div>
                <div class="p-field p-col-12 p-md-4">
                  <span class="p-float-label">
                      <InputText id="geracao" type="text" v-model="veiculoEdit.geracao" />
                      <label for="geracao">Geração: </label>
                  </span>
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <span class="p-float-label">
                      <InputText id="eixo" type="text" v-model="veiculoEdit.eixo" />
                      <label for="eixo">Eixo: </label>
                  </span>
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <span class="p-float-label">
                      <InputText id="imagem" type="text" v-model="veiculoEdit.imagem" />
                      <label for="imagem">Imagem: </label>
                  </span>
                </div>
                <div class="p-field p-col-12 p-md-12">
                  <span class="p-float-label">
                      <Textarea v-model="veiculoEdit.descricao" rows="5" cols="30" maxlength="200" />
                      <label for="descricao" >Descrição: </label>
                  </span>
                </div>
            </div>
            <template #footer>
                <div v-if="veiculoEdit && veiculoEdit.id">
                  <Button label="Cancelar"  icon="pi pi-times" class="p-button-text p-button" @click="editModal(veiculo())"/>
                  <Button label="Excluir"   icon="pi pi-trash" class="p-button-text p-button-danger"  @click="deleteModal(veiculoEdit.id)" />
                  <Button label="Salvar"  @click="editarVeiculo()" icon="pi pi-check" class="p-button-text p-button-success" />
                </div>
                <div v-else>
                  <Button label="Salvar"  @click="saveVeiculo()" icon="pi pi-check" class="p-button-text p-button-success" />
                </div>
            </template>
        </Dialog>
      </section>
    </div>
</template>

<script>
import axios from '@/axios.js';

export default {
  name:"veiculos",
  data(){
    return{
      veiculos:[],
      openModalDelete: false,
      openModalEdit: false,
      veiculoID: null,
      veiculoEdit: this.veiculo()
    }
  },
  methods:{
    veiculo(){
      return{
        nome: null,
        categoria: null,
        marca: null,
        ano: null,
        imagem:null ,
        nome_comercial:null,
        eixo: null,
        geracao:null,
        descricao:null,
        visualizar: 0
      }
    },

    acessar(id){
      this.$router.push(`/veiculo/${id}`);
    },

    deleteModal(id){
      this.veiculoID = id;
      this.openModalDelete = !this.openModalDelete;
    },

    editModal(data){
      this.veiculoEdit = data;
      this.openModalEdit = !this.openModalEdit;
    },

    editarVeiculo(){
      this.openModalEdit = false;
      
      axios.put(`/vehicles/${this.veiculoEdit.id}`, this.veiculoEdit).then(result=>{
        this.$toast.add(
          {severity:'success', summary: 'Comando executado.', detail:'Veiculo foi alterado com sucesso!', life: 3000}
        );
        this.getVeiculos();
      }).catch(error=>{
        this.$toast.add(
          {severity:'error', summary: "Não foi possivel alterar veiculo, ocorreu um erro externo!", detail: error, life: 3000}
        );
      });
    },

    saveVeiculo(){
      this.openModalEdit = false;
      
      axios.post(`/vehicles`, this.veiculoEdit).then(result=>{
        this.$toast.add(
          {severity:'success', summary: 'Comando executado.', detail:'Veiculo foi cadastrado com sucesso!', life: 3000}
        );
        this.getVeiculos();
      }).catch(error=>{
        this.$toast.add(
          {severity:'error', summary: "Não foi possivel salvar veiculo, ocorreu um erro externo!", detail: error, life: 3000}
        );
      });
    },

    deletarVeiculo(){
      this.openModalDelete = false;
      
      axios.delete(`/vehicles/${this.veiculoID}`).then(result=>{
        this.$toast.add(
          {severity:'success', summary: 'Comando executado.', detail:'Veiculo foi deletado com sucesso!', life: 3000}
        );
        this.getVeiculos();
      }).catch(error=>{
        this.$toast.add(
          {severity:'error', summary: "Não foi possivel deletar veiculo, ocorreu um erro externo!", detail: error, life: 3000}
        );
      });
    },

    clear(){
      this.openModalDelete = false;
      this.openModalEdit = false;
      this.veiculoEdit = this.veiculo();
      this.veiculoID = null;
      this.veiculos = [];
    },

    getVeiculos(){
      this.clear();

      axios.get(`/vehicles/all`).then(result=>{
        this.veiculos = result.data;
      }).catch(error=>{
        this.$toast.add(
          {severity:'error', summary: "Ocoreu um erro ao tentar conectar no servidor!", detail: error, life: 3000}
        );
      });
    }
  },
  mounted(){
    this.getVeiculos();
  }
}
</script>

<style  scoped>  
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

  .margin{
    margin-top: 1rem;
  }

  .p-datatable{
    overflow-x: auto;
  }
</style>