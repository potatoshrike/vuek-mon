<template>
  <div id="buscador">
     <input type="text" v-model="texto" v-on:keyup.enter="searchPokemon">
     <div class="listaPokemon">
         <div class="pokemonLista" v-on:click="seleccionarPokemon" v-for="pokemon in listaPokemon">{{pokemon}}</div>
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
               ultimoPokemon: 51
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
          this.cargarPokemon();
      },
      sumar: function(){
          if(this.ultimoPokemon == 801){
              return;
          }else{
              this.primerPokemon += 50;
               this.ultimoPokemon += 50;
          }
          this.cargarPokemon();
      },
    searchPokemon: function(){
         this.$http.get("https://pokeapi.co/api/v2/pokemon/"+ this.texto).then(function(data){
               return data.json();
          }).then(function(data){
                    var arregloBase = [];
                     arregloBase.push(data.id);
                     arregloBase.push(data.name);
                     arregloBase.push(data.sprites.front_default);
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
     },
      seleccionarPokemon: function(){
        var pokemon = event.target.innerHTML;
        this.$http.get("https://pokeapi.co/api/v2/pokemon/"+ pokemon).then(function(data){
               return data.json();
           }).then(function(data){
                    var arregloBase = [];
                     arregloBase.push(data.id);
                     arregloBase.push(data.name);
                     arregloBase.push(data.sprites.front_default);
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

      },
      cargarPokemon: function(){
          this.$http.get("https://pokeapi.co/api/v2/pokemon/?limit=" + this.ultimoPokemon).then(function(data){
                 return data.json();
             }).then(function(data){
                 for (let key in data.results){
                     if(key >= this.primerPokemon - 1){
                   this.listaPokemon.push(data.results[key].name)
                  /*  this.listaPokemon[key].name = data.results[key].name;
                    this.listaPokemon[key].id = key;*/
                     }
                    }
               });
      }
},
    
created(){
          this.cargarPokemon();
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
               width:600px;
               display: block;
               margin: 20px auto;
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
    .button_icon{
        font-size: 24px;
        margin: 0 10px;
        
    }
    .navegador{
        display: flex;
        justify-content: center ;
        text-align: center;
        align-items: center;
        width: 100%;
    }
    .pokemonLista{
        padding: 5px;
        background: white;
        color: grey;
        margin: 3px;
        border-radius: 3px;
    }
    .pokemonLista:hover{
        cursor: pointer;
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
</style>
