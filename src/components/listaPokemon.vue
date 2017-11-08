<template>
  <div id="buscador">
     <input type="text" v-model="texto" v-on:keyup.enter="searchPokemon">
     <div id="pokemon_lista">
          <div id="pokemon_box" v-for="pokemon in listaPokemon" v-on:click="seleccionarPokemon" v-bind:style='{ backgroundImage: "url(" + imagenesPokemon[0] + ")", }'>{{pokemon}}</div>
     </div>
  </div>
</template>

<script>
export default {
     data () {
          return {
               texto: '',
               dataBase: [],
               listaPokemon: [],
               imagenesPokemon: []
          }
     },
     methods: {
          seleccionarPokemon: function(){
               var pokemon = event.target.innerHTML;
               this.$http.get("https://pokeapi.co/api/v2/pokemon/"+ pokemon).then(function(data){
                    return data.json();
               }).then(function(data){
                    var arregloBase = [];
                    arregloBase.push(data.id);
                    arregloBase.push(data.name);
                    this.dataBase = arregloBase;
               });
          }
     },
     created() {
          this.$http.get("https://pokeapi.co/api/v2/pokemon/?limit=20").then(function(data){
               return data.json();
          }).then(function(data){
               for (let key in data.results){
                    this.listaPokemon.push(data.results[key].name);
               }
          });
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

          input {
               width: 600px;
               display: block;
               margin: 20px auto;
          }
     }

     #pokemon_lista {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-gap: 5px;

          div {
               text-align: center;
          }

          #pokemon_box {
               width: 96px;
               height: 96px;
               align-self: center;
               justify-self: center;
               background-repeat: no-repeat;
               background-position: center center;
          }
     }
</style>
