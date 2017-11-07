<template>
  <div id="buscador">
     <input type="text" v-model="texto">
     <p>{{texto}}</p>
  </div>
</template>

<script>
export default {
     data () {
          return {
               texto: 'sustituye puej'
    }
  }
}
</script>

<style lang="scss" scoped>
     #buscador {
          width:100%;
          min-width:100vw;
          height:100vh;
          background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(../assets/pikachu_bg.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;

          p {
               width: 600px;
               margin: 0 auto;
               background: #000;
               text-align: center;
               color: #fff;
          }

          input {
               width:600px;
               display: block;
               margin: 20px auto;
          }
     }
</style>
