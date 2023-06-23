// Composables
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',

        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },


      {
        path: 'marca',
        name: 'marca',
        component: () => import(/* webpackChunkName: "marca" */ '@/views/MarcaView'),
      },
      {
        path: 'marcaformulario',
        name: 'marca-formulario-edit',
        component: ()=> import(/* webpackChunkName: "marca-formulario-edit" */ '@/views/MarcaFormView.vue')
      },




      {
        path: 'modelo',
        name: 'modelo',

        component: () => import(/* webpackChunkName: "modelo" */ '@/views/ModeloView'),
      },
      {
        path: 'modeloformulario',
        name: 'modeloformulario',

        component: () => import(/* webpackChunkName: "modeloformulario" */ '@/views/ModeloFormView'),
      },
      {
        path: 'veiculo',
        name: 'veiculo',

        component: () => import(/* webpackChunkName: "veiculo" */ '@/views/VeiculoView'),
      },
      {
        path: 'veiculoformulario',
        name: 'veiculoformulario',

        component: () => import(/* webpackChunkName: "veiculoformulario" */ '@/views/VeiculoFormularioView'),
      },
      {
        path: 'condutor',
        name: 'condutor',

        component: () => import(/* webpackChunkName: "condutor" */ '@/views/CondutorView'),
      },
      {
        path: 'condutorformulario',
        name: 'condutorformulario',

        component: () => import(/* webpackChunkName: "condutorformulario" */ '@/views/CondutorFormularioView'),
      },


      {
        path: 'configuracoes',
        name: 'configuracoes',

        component: () => import(/* webpackChunkName: "configuracoes" */ '@/views/ConfiguracoesView'),
      },
      {
        path: 'configuracoesformulario',
        name: 'configuracoesformulario',

        component: () => import(/* webpackChunkName: "configuracoesformulario" */ '@/views/ConfiguracoesFormView'),
      },


    ],


  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
