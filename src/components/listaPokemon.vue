<template>
  <div id="listaPokemon">
     <div id="pokemon_lista">
          <div id="pokemon_box" v-for="(pokemon,indice) in listaPokemon" v-on:click="seleccionarPokemon" v-bind:style='{ backgroundImage: "url(" + listaImagen[indice] + ")", }'>{{pokemon}}</div>
     </div>
     <div id="pokemon_datos" v-if="mostrarDatos">
          <div id="dato" class="p_id"><span>id:</span> {{dataBase[0]}}</div>
          <div id="dato" class="p_nombre"><span>nombre:</span> {{dataBase[1]}}</div>
          <div id="dato" class="p_experiencia"><span>exp. base:</span> {{dataBase[2]}}</div>
     </div>
  </div>
</template>

<script>
export default {
     data () {
          return {
               dataBase: [],
               listaPokemon: [],
               listaImagen: [],
               mostrarDatos: false
          }
     },
     methods: {
          seleccionarPokemon: function(){
               var pokemon = event.target.innerHTML;
               this.$http.get("https://pokeapi.co/api/v2/pokemon/"+ pokemon).then(function(data){
                    return data.json();
               }).then(function(data){
                    var arregloBase = [];
                    var arregloMovs = [];
                    arregloBase.push(data.id);
                    arregloBase.push(data.name);
                    arregloBase.push(data.base_experience);
                    this.dataBase = arregloBase;
                    this.mostrarDatos = true;
               });
          }
     },
     created() {
          this.$http.get("https://pokeapi.co/api/v2/pokemon/?limit=15").then(function(data){
               return data.json();
          }).then(function(data){
               for (let key in data.results){
                    this.listaPokemon.push(data.results[key].name);
                    this.listaImagen.push('http://www.pkparaiso.com/imagenes/xy/sprites/animados/'+data.results[key].name+'.gif');
               }
          });

     }

}
</script>

<style lang="scss" scoped>

     $redpkm: #C95641;

     #listaPokemon {
          width:100%;
          min-width:100vw;
          height:100vh;
          background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(../assets/pikachu_bg.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          overflow-x: hidden;

          input {
               width: 600px;
               display: block;
               margin: 20px auto;
          }
     }

     #pokemon_lista {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-auto-rows: 140px;
          grid-gap: 5px;

          div {
               text-align: center;
          }

          #pokemon_box {
               height: 140px;
               align-self: center;
               font-family: 'Roboto Condensed', sans-serif;
               color: #fff;
               text-transform: capitalize;
               background-repeat: no-repeat;
               background-position: center center;
          }
     }

     #pokemon_datos {
          width: 100%;
          max-width: 580px;
          margin: 25px auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 10px;

          #dato {
               background: rgba(0,0,0,0.8);
               text-align: center;
               font-family: 'Roboto Condensed', sans-serif;
               font-size: 13px;
               color: #fff;
               line-height: 45px;
          }

          span {
               color: $redpkm;
          }
     }
</style>
