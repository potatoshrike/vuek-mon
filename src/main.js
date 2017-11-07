import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Rutas from './rutas'
import 'vue-material-design-icons/styles.css'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Rutas,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
});
