import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Veiculo from '../views/Veiculo.vue'
import Veiculos from '../views/Veiculos.vue'
import Atualicacoes from '../views/Atualicacoes.vue'
import Comil from '../views/Comil.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/comil',
        name: 'Comil',
        component: Comil
    },
    {
        path: '/veiculo/:id',
        name: 'Veiculo',
        component: Veiculo
    },
    {
        path: '*',
        name: 'found',
        component: Home
    },
    {
        path: '/atualicacoes',
        name: 'Atualizações',
        component: Atualicacoes
    },
    {
        path: '/veiculos',
        name: 'Veiculos',
        component: Veiculos
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router