<template>
  <div id="buscador">
     <input type="text" v-model="texto" v-on:keyup.enter="searchPokemon">
     <p>name: {{statsRandom[1]}}</p>
     <p>id: {{statsRandom[0]}}</p>
     <p>type: {{statsRandom[2]}}</p>
  </div>
</template>

<script>
export default {
     data () {
          return {
               texto: '',
               statsRandom: []
    }
  },
  methods:{
    searchPokemon: function(){
    this.$http.get("https://pokeapi.co/api/v2/pokemon/"+ this.texto).then(function(data){
           return data.json();
       }).then(function(data){
           var jsonarreglo = [];
               jsonarreglo.push(data.id);
               jsonarreglo.push(data.name);
               jsonarreglo.push(data.types[0].type.name);
               this.statsRandom = jsonarreglo;
             });
             console.log(this.texto);
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
