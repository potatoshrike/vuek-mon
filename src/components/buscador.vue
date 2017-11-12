<template>
  <div id="buscador">
     <input type="text" v-model="texto" v-on:keyup.enter="searchPokemon">
     <div class="navegador">
         <span v-on:click="restar"><larrow-icon  class="button_icon"/></span>
         <div>{{primerPokemon}} - {{ultimoPokemon}}</div>
         <span v-on:click="sumar"><rarrow-icon  class="button_icon"/></span>
     </div>

     <div class="listaPokemon">
       <div v-if="carga" class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
      </div>
         <div class="pokemonLista" v-on:click="seleccionarPokemon" v-for="pokemon in pokemonMostrados">{{pokemon}}</div>
     </div>
     <div id="pokemon_container" v-if="appStart">
          <div v-on:click="sumar" id="pokemonSprite" v-bind:style='{ backgroundImage: "url(" + dataBase[2] + ")", }'></div>
          <div id="dato" class="titulo">{{dataBase[1]}}</div>
          <div id="dato" class="titulo">{{dataTipos[0]}} <span v-if="typeBool">—</span> {{dataTipos[1]}}</div>
          <div id="dato" class="titulo">{{dataHabilidades[0]}} <span v-if="abilityBool">—</span> {{dataHabilidades[1]}}</div>
     </div>
     <div v-if="carga2" class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
     <div class="movimientosWrapp" v-if="appStart">
          <h2>Movimientos del pokemon</h2>
          <div class="movimientos">
               <p v-on:click="cargarMovimiento" v-for="habilidad in habilidades">{{habilidad}}</p>
          </div>

            <div class="habilidadDescripcion">
              <h3>{{this.habilidadDescripcion.name}} </h3>
              <p>PP: {{this.habilidadDescripcion.pp}}</p>
              <p>Power: {{this.habilidadDescripcion.power}}</p>
              <p>Accuracy: {{this.habilidadDescripcion.accuracy}}</p>
              <p>Effect Chance: {{this.habilidadDescripcion.effect_chance}}</p>
              <p>Damage Class: {{this.habilidadDescripcion.damage_class}}</p>
            </div>
            <div class="PokemonDescripcion">
              <h3>{{this.pokemonDescripcion.name}}</h3>
              <p>Description: {{this.pokemonDescripcion.flavor_text}}</p>
              <p>Generation: {{this.pokemonDescripcion.generation}}</p>
              <p>Type: {{this.pokemonDescripcion.type}}</p>
              <p>Height: {{this.pokemonDescripcion.height}}</p>
              <p>Weight: {{this.pokemonDescripcion.weight}}</p>
            </div>

     </div>
  </div>
</template>

<script>
    import lArrowIcon from 'vue-material-design-icons/arrow-left-drop-circle-outline'
    import rArrowIcon from 'vue-material-design-icons/arrow-right-drop-circle-outline'
export default {
     components: {
          'larrow-icon':lArrowIcon,
          'rarrow-icon': rArrowIcon
     },
     data () {
          return {
               appStart: false,
               texto: '',
               dataBase: [],
               carga: false,
               carga2: false,
               dataTipos: [],
               dataHabilidades: [],
               typeBool: false,
               abilityBool: false,
               listaPokemon :[],
               primerPokemon: 1,
               ultimoPokemon: 51,
               pokemonMostrados: [],
               habilidades: [],
               habilidadDescripcion: {name: "",pp:"", power:"", accuracy:"", effect_chance:"", damage_class:""},
               pokemonDescripcion: {name:"", flavor_text:"", generation:"", type:"", height:"", weight:""}
              }
            },
    methods:{
      restar: function(){
          if(this.primerPokemon == 1){
              return;
          }else{
              this.primerPokemon -= 50;
              this.ultimoPokemon -= 50;
          }
          this.actualizarLista();
      },

      sumar: function(){
          if(this.ultimoPokemon == 801){
              return;
          }else{
              this.primerPokemon += 50;
               this.ultimoPokemon += 50;
          }
          this.actualizarLista();
      },

      searchPokemon: function(){
        this.habilidades = [];
         this.$http.get("https://pokeapi.co/api/v2/pokemon/"+ this.texto).then(function(data){
               return data.json();
          }).then(function(data){
               var arregloBase = [];
                arregloBase.push(data.id);
                arregloBase.push(data.name);
               if (data.id >= 721) {
                    arregloBase.push('http://www.pkparaiso.com/imagenes/sol-luna/sprites/animados/'+data.name+'.gif');
               } else {
                    arregloBase.push('http://www.pkparaiso.com/imagenes/xy/sprites/animados/'+data.name+'.gif');
               }
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
             var tamaño = data.moves.length;
              this.habilidades = [];
               for(var i = 0; i<tamaño; i++){
                   if(data.moves[i].version_group_details[0].version_group.name == "sun-moon"){
                     this.habilidades.push(data.moves[i].move.name);
                   }
               }
               this.appStart = true;
          });
     },

      seleccionarPokemon: function(){
        this.carga2 = true;
        this.habilidades = [];
        var pokemon = event.target.innerHTML;
        this.$http.get("https://pokeapi.co/api/v2/pokemon/"+ pokemon).then(function(data){
               return data.json();
           }).then(function(data){
                    this.pokemonDescripcion.weight = data.weight;
                    this.pokemonDescripcion.height = data.height;
                    var arregloBase = [];
                     arregloBase.push(data.id);
                     arregloBase.push(data.name);
                     if (data.id >= 721) {
                          arregloBase.push('http://www.pkparaiso.com/imagenes/sol-luna/sprites/animados/'+data.name+'.gif');
                     } else {
                          arregloBase.push('http://www.pkparaiso.com/imagenes/xy/sprites/animados/'+data.name+'.gif');
                     }
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

            /*loop para obetener habilidades de pokemon seleccionado*/
            var tamaño = data.moves.length;
            var contador = 0;
            this.habilidades = [];
               for(var i = 0; i<tamaño; i++){
                   if(data.moves[i].version_group_details[0].version_group.name == "sun-moon"){
                     this.habilidades.push(data.moves[i].move.name);
                   }
               }
            /*fin de loop*/
          });
          this.$http.get("https://pokeapi.co/api/v2/pokemon-species/"+ pokemon).then(function(data){
                 return data.json();
             }).then(function(data){
               this.pokemonDescripcion.name = data.name;
               this.pokemonDescripcion.type = data.egg_groups[0].name;
               this.pokemonDescripcion.generation = data.generation.name;
               var tamaño2 = data.flavor_text_entries.length;
               for(var x = 0; x<tamaño2; x++){
                 if(data.flavor_text_entries[x].language.name == "en"){
                 this.pokemonDescripcion.flavor_text = data.flavor_text_entries[x].flavor_text;
                 break;
               }
               }
               this.carga2 = false;
             });
               this.appStart = true;

      },

      cargarPokemon: function(){
        var i = 0;
        this.carga = true;
          this.$http.get("https://pokeapi.co/api/v2/pokemon/?limit=801").then(function(data){
                 return data.json();
             }).then(function(data){
                 for (let key in data.results){
                   this.listaPokemon.push(data.results[key].name);
                  }
                  this.carga = false;
                  this.primerPokemon = 1;
                  this.ultimoPokemon = 51;
                  this.actualizarLista;
               });
      },

      actualizarLista: function(){
        var i = 0;
        var bandera = this.primerPokemon - 1;
        for(bandera ;bandera<this.ultimoPokemon ; bandera++){
          this.pokemonMostrados[i] = this.listaPokemon[bandera];
          i++;
        }
      },
      cargarMovimiento: function(){
        this.carga2 = true;
        var habilidad = event.target.innerHTML;
        this.$http.get("https://pokeapi.co/api/v2/move/" + habilidad).then(function(data){
               return data.json();
           }).then(function(data){
               this.habilidadDescripcion.pp = data.pp;
               this.habilidadDescripcion.name = data.name;
               this.habilidadDescripcion.accuracy = data.accuracy;
               this.habilidadDescripcion.power = data.pp;
               this.habilidadDescripcion.effect_chance = data.effect_chance;
               this.habilidadDescripcion.damage_class = data.damage_class.name;
               this.carga2 = false;
             });
      }

    },

    created() {
          this.cargarPokemon();
     }

}
</script>

<style lang="scss" scoped>
    *{
font-family: 'Roboto Condensed', sans-serif;
}
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
               margin: 80px auto 25px;
          }
     }

     #pokemon_container {
          width: 100%;
          max-width: 60vw;
          margin: 0 auto 30px;
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
               font-size: 13px;
          }

          :nth-child(1) {grid-area: sprite;}
          :nth-child(2) {grid-area: pkmnname;}
          :nth-child(3) {grid-area: types;}
          :nth-child(4) {grid-area: abilities;}

          #pokemonSprite {
               width: 96px;
               height: 96px;
               align-self: center;
               justify-self: center;
               background-repeat: no-repeat;
               background-position: center center;
          }

          div {
               text-align: center;
               padding: 10px;
          }
     }

    .listaPokemon{
        width: 100%;
        max-width: 60vw;
        margin: 0 auto 30px;
        text-align: center;
        font-family: 'Roboto Condensed', sans-serif;
        font-weight:lighter;
        display: grid;
        grid-gap: 5px;
        grid-template-columns: repeat(10, 1fr);
        grid-auto-rows: 40px;
    }

    .button_icon {
        font-size: 24px;
        margin: 0 10px;
    }

    .navegador {
         width: 100%;
         max-width: 300px;
         margin: 0 auto 30px;
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         grid-auto-rows: 30px;
         align-items: center;

         div {
              text-align: center;
              color: #fff;
              height: 30px;
              font-size: 20px;
              font-family: 'Roboto Condensed', sans-serif;
         }

         div, span {
              align-self: center;
              justify-self: center;
         }

         .button_icon {
              fill: #fff;
              font-size: 25px;
              cursor: pointer;
         }
    }

    .pokemonLista {
        background: rgba(0,0,0,0.95);
        color: #fff;
        cursor: pointer;
        line-height: 40px;
        font-size: 13px;
    }

    .spinner {
  width: 40px;
  height: 40px;
  position: absolute;
  margin: 100px auto;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #FFFFFF;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
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
               width: 96px;
               height: 96px;
               align-self: center;
               justify-self: center;
               background-repeat: no-repeat;
               background-position: center center;
          }
          div {
               text-align: center;
               padding: 10px;
          }

     }
    .movimientosWrapp {

         width: 100%;
         max-width: 60vw;
         margin: 25px auto;
         height: 340px;
         background: rgba(0,0,0,0.5);
         display: grid;
         grid-template-columns: repeat(8, 1fr);
         overflow: hidden;

         p {
           color: white;
           padding-left: 25px;
           font-family: 'Roboto Condensed', sans-serif;
           font-weight: 100;
           letter-spacing: 1px;
          }

        h2 {
          width: 100%;
          font-family: 'Montserrat', sans-serif;
          color: #fff;
          text-transform: uppercase;
          background: rgba(0,0,0,0.25);
          margin: 0;
          height: 60px;
          text-align: center;
          line-height: 2.5;
          grid-column-start: 1;
          grid-column-end: 9;
        }

        .movimientos {
          grid-row-start: 2;
          grid-column-start: 1;
          grid-column-end: 3;
          overflow-y: auto;
          position: relative;
          background: black;
          &::-webkit-scrollbar {width:9px!important;}
          &::-webkit-scrollbar-track-piece {
               background-color: #fff;
               border: 4px solid #000;
          }
          &::-webkit-scrollbar-thumb {background-color: #fff;}
        p:hover {
           cursor: pointer;
           color: #000;
           background: #fff;
                }
            }

        }

    .habilidadDescripcion{
      grid-row-start: 2;
      grid-column-start: 3;
      grid-column-end: 5;
    }
    .PokemonDescripcion{
      grid-row-start: 2;
      grid-column-start: 5;
      grid-column-end: 9;
    }
.PokemonDescripcion, .habilidadDescripcion{
  h3{
    text-align: center;
    text-transform: uppercase;
    color: white;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 100;
    letter-spacing: 2px;
  }
}

</style>
