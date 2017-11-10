<template>
  <div id="buscador">
     <input type="text" v-model="texto" v-on:keyup.enter="searchPokemon">
     <div class="listaPokemon">
         <div class="pokemonLista" v-on:click="seleccionarPokemon" v-for="pokemon in pokemonMostrados">{{pokemon}}</div>
         <div class="navegador">
             <span v-on:click="restar"><larrow-icon  class="button_icon"/></span>
             <p>{{primerPokemon}} - {{ultimoPokemon}}</p>
             <span v-on:click="sumar"><rarrow-icon  class="button_icon"/></span>
         </div>
     </div>
     <div id="pokemon_container">
          <div v-on:click="sumar" id="pokemonSprite" v-bind:style='{ backgroundImage: "url(" + dataBase[2] + ")", }'></div>
          <div id="dato" class="titulo">{{dataBase[1]}}</div>
          <div id="dato" class="titulo">{{dataTipos[0]}} <span v-if="typeBool">—</span> {{dataTipos[1]}}</div>
          <div id="dato" class="titulo">{{dataHabilidades[0]}} <span v-if="abilityBool">—</span> {{dataHabilidades[1]}}</div>
     </div>
     <div class="movimientosWrapp"><h2>Movimientos del pokemon</h2><div class="movimientos"><p v-for="habilidad in habilidades">{{habilidad}}</p></div> </div>
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
               texto: '',
               dataBase: [],
               dataTipos: [],
               dataHabilidades: [],
               typeBool: false,
               abilityBool: false,
               listaPokemon :[],
               primerPokemon: 1,
               ultimoPokemon: 51,
               pokemonMostrados: [],
               habilidades: []
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
          });
     },

      seleccionarPokemon: function(){
        var pokemon = event.target.innerHTML;
        this.$http.get("https://pokeapi.co/api/v2/pokemon/"+ pokemon).then(function(data){
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

      },

      cargarPokemon: function(){
        var i = 0;
          this.$http.get("https://pokeapi.co/api/v2/pokemon/?limit=801").then(function(data){
                 return data.json();
             }).then(function(data){
                 for (let key in data.results){
                   this.listaPokemon.push(data.results[key].name);
                  }
               });
      },

      actualizarLista: function(){
        var i = 0;
        var bandera = this.primerPokemon - 1;
        for(bandera ;bandera<this.ultimoPokemon ; bandera++){
          this.pokemonMostrados[i] = this.listaPokemon[bandera];
          i++;
        }
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

    .listaPokemon{
        width: 100%;
        max-width: 60vw;
        margin: 0 auto;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        margin-bottom: 30px;
    }

    .button_icon {
        font-size: 24px;
        margin: 0 10px;
    }
    .navegador {
        display: flex;
        justify-content: center ;
        text-align: center;
        align-items: center;
        width: 100%;
    }

    .pokemonLista {
        padding: 5px;
        background: white;
        color: grey;
        margin: 3px;
        border-radius: 3px;

          &:hover {
               cursor: pointer;
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
    .movimientosWrapp{
       
        width: 100%;
        height: 300px;
        max-width: 60%;
        margin: 20px auto;
        display: flex;
        flex-wrap: wrap;
        background: silver;
        overflow: hidden;
         border-radius: 5px;
        /*bordes redonditos are life*/
        h2{
            width: 100%;
            background: #FFF;
            margin: 0;
            height: 20%;
            text-align: center;
            line-height: 2.5;
        }
        p{
            color: white;
            display: block;
            margin: 2px 4px;
            &:hover{
                cursor:pointer;
                color: black;
                background: white;
            }
        }
        .movimientos{
            margin: 0;
            overflow-y: scroll;
            position: relative;
            height: 80%;
            width: 30%;
            background: black;
            
        }
        .movimientos::-webkit-scrollbar-thumb
            {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                background-color: #555;
            }
    }
</style>
