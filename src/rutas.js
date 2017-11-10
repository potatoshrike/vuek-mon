import index from './components/index.vue';
import buscador from './components/buscador.vue';
//import listaPokemon from './components/listaPokemon.vue';
import simulador from './components/simulador.vue'

export default [
  {path: '/', component: index},
  {path: '/buscador', component: buscador},
  //{path: '/listaPokemon', component: listaPokemon}
  {path: '/simulador', component: simulador}
]
