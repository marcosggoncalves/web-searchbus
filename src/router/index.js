import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Veiculo from '../views/Veiculo.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/veiculo/:id',
        name: 'Veiculo',
        component: Veiculo
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router