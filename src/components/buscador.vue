<template>
  <div id="buscador">
     <input type="text" v-model="texto" v-on:keyup.enter="searchPokemon">
     <div id="pokemon_container">
          <div id="pokemonSprite" v-bind:style='{ backgroundImage: "url(" + dataBase[2] + ")", }'></div>
          <div id="dato" class="titulo">{{dataBase[1]}}</div>
          <div id="dato" class="titulo">{{dataTipos[0]}} <span v-if="typeBool">—</span> {{dataTipos[1]}}</div>
          <div id="dato" class="titulo">{{dataHabilidades[0]}} <span v-if="abilityBool">—</span> {{dataHabilidades[1]}}</div>
     </div>
  </div>
</template>

<script>
export default {
     data () {
          return {
               texto: '',
               dataBase: [],
               dataTipos: [],
               dataHabilidades: [],
               typeBool: false,
               abilityBool: false
    }
  },
  methods:{
    searchPokemon: function(){
         this.$http.get("https://pokeapi.co/api/v2/pokemon/"+ this.texto).then(function(data){
               return data.json();
          }).then(function(data){
                    var arregloBase = [];
                     arregloBase.push(data.id);
                     arregloBase.push(data.name);
                     arregloBase.push('http://www.pkparaiso.com/imagenes/xy/sprites/animados/'+data.name+'.gif');
                     this.dataBase = arregloBase;

                    var arregloTipos = [];
                    if (data.types.length == 2) {
                         this.typeBool = true;
                         arregloTipos.push(data.types[0].type.name);
                         arregloTipos.push(data.types[1].type.name);
                    } else {
                         this.typeBool = false;
                         arregloTipos.push(data.types[0].type.name);
                    }
                    this.dataTipos = arregloTipos;

                    var arregloHabilidades = [];
                    if (data.types.length == 2) {
                         this.abilityBool = true;
                         arregloHabilidades.push(data.abilities[0].ability.name);
                         arregloHabilidades.push(data.abilities[1].ability.name);
                    } else {
                         this.abilityBool = false;
                         arregloHabilidades.push(data.abilities[0].ability.name);
                    }
                    this.dataHabilidades = arregloHabilidades;
          });
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
          overflow-x: hidden;

          input {
               width: 600px;
               display: block;
               margin: 20px auto;
          }
     }

     #pokemon_container {

          width: 100%;
          max-width: 60vw;
          margin: 0 auto;
          background: rgba(0,0,0,0.25);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          grid-gap: 10px;
          grid-template-areas:
          ". sprite ."
          "pkmnname types abilities";

          #dato {
               font-family: 'Roboto Condensed', sans-serif;
               color: #fff;
          }

          .titulo {
               text-transform: uppercase;
               letter-spacing: 2px;
               background: rgba(0,0,0,0.45);
          }

          :nth-child(1) {grid-area: sprite;}
          :nth-child(2) {grid-area: pkmnname;}
          :nth-child(3) {grid-area: types;}
          :nth-child(4) {grid-area: abilities;}

          #pokemonSprite {
               align-self: center;
               height: 140px;
               background-repeat: no-repeat;
               background-position: center center;
          }

          div {
               text-align: center;
               padding: 10px;
          }
     }
</style>
