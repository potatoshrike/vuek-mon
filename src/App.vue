<template>
  <div id="app">
     <main-header></main-header>
     <router-view></router-view>
  </div>
</template>

<script>

import mainHeader from './components/header.vue';

export default {
     components: {
          'main-header': mainHeader
     },
     data () {
          return {
    }
  }
}
</script>

<style lang="scss">

// font-family: 'Montserrat', sans-serif;
// font-family: 'Roboto Condensed', sans-serif;

     body {
          margin: 0;
     }
</style>
