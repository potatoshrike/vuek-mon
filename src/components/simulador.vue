<template>
     <div id="simulador">
          <div id="ataques_container">
               <div id="playerOne">
                    <div v-bind:id="listadoAtaques[0]" class="ataque" v-on:click="atacar(1, 2)">{{listadoAtaques[0]}}</div>
                    <div v-bind:id="listadoAtaques[44]" class="ataque" v-on:click="atacar(1, 2)">{{listadoAtaques[44]}}</div>
                    <div v-bind:id="listadoAtaques[48]" class="ataque" v-on:click="atacar(1, 2)">{{listadoAtaques[48]}}</div>
                    <div v-bind:id="listadoAtaques[78]" class="ataque" v-on:click="atacar(1, 2)">{{listadoAtaques[78]}}</div>
               </div>
               <div id="playerTwo">
                    <div v-bind:id="listadoAtaques[0]" class="ataque" v-on:click="atacar(2, 1)">{{listadoAtaques[0]}}</div>
                    <div v-bind:id="listadoAtaques[44]" class="ataque" v-on:click="atacar(2, 1)">{{listadoAtaques[44]}}</div>
                    <div v-bind:id="listadoAtaques[48]" class="ataque" v-on:click="atacar(2, 1)">{{listadoAtaques[48]}}</div>
                    <div v-bind:id="listadoAtaques[78]" class="ataque" v-on:click="atacar(2, 1)">{{listadoAtaques[78]}}</div>
               </div>
          </div>
          <div id="controller_container">
               <div id="playerStatus1" class="activo">player one</div>
               <div id="playerStatus2">player two</div>
               <div id="p1b" class="progress_bar"><div class="bar_value" v-bind:style='{ width: p1life + "%"}'>{{p1life}}</div></div>
               <div id="p2b" class="progress_bar"><div class="bar_value" v-bind:style='{ width: p2life + "%"}'>{{p2life}}</div></div>
          </div>
          <div id="acciones">
               <h1>{{accionActual}}</h1>
               <div id="log_acciones"></div>
          </div>
     </div>
</template>

<script>
export default {
     data() {
          return {
               listadoAtaques: [],
               listadoClases: [],
               accionActual: 'Es el turno del jugador 1',
               p1life: 100,
               p2life: 100
          }
     },
     created() {
          this.cargarAtaques();
     },
     methods: {
          cargarAtaques() {
               this.$http.get("https://pokeapi.co/api/v2/move/?limit=717").then(function(data){
                    return data.json();
               }).then(function(data){
                    for (let key in data.results){
                         this.listadoAtaques.push(data.results[key].name);
                    }
               });
          },
          accionTurnoFisico(jugador, poder) {
               var msgBox = document.createElement("p");
               var texto = document.createTextNode("El jugador " + jugador + " causó: " + poder + " de daño.");
               msgBox.appendChild(texto);

               var accionesContenedor = document.getElementById("log_acciones");
               accionesContenedor.appendChild(msgBox);
               return poder;
          },
          accionTurnoEspecial(jugador, poder) {
               var msgBox = document.createElement("p");
               var texto = document.createTextNode("El jugador " + jugador + " causó: " + poder + " de daño.");
               msgBox.appendChild(texto);

               var accionesContenedor = document.getElementById("log_acciones");
               accionesContenedor.appendChild(msgBox);
               return poder;
          },
          playerTurn(poder, clase, jugador, enemigo) {
               var player = '#playerStatus' + jugador;
               var enemy = '#playerStatus' + enemigo;

               if ($(player).hasClass("activo")) {
                    if (clase == 'physical') {
                         var resultado = this.accionTurnoFisico(jugador, poder);
                    } else if (clase == 'special') {
                         var resultado = this.accionTurnoEspecial(jugador, poder);
                    } else if (clase == 'status') {
                         var resultado = this.accionTurnoEstado(jugador, poder);
                    }

                    if(jugador == 1) {
                         this.p2life = this.p2life - resultado;
                    } else {
                         this.p1life = this.p1life - resultado;
                    }

                    $(player).toggleClass("activo", false);
                    $(enemy).toggleClass("activo", true);

                    this.accionActual = 'Es el turno del jugador ' + enemy;
               } else {
                    alert('¡Aún no es tu turno!');
               }
          },
          atacar(jugador, enemigo) {
               var ataque = event.target.innerHTML;
               this.$http.get("https://pokeapi.co/api/v2/move/"+ ataque).then(function(data){
                    return data.json();
                 }).then(function(data){
                    console.log(data.effect_entries[0]);
                    var poder = data.power;
                    var clase = data.damage_class.name;
                    if (data.name == 'sonic-boom') {poder = 20;}
                    this.playerTurn(poder, clase, jugador, enemigo);
               });
          }
     },
     updated() {
          if (this.p1life <= 0 || this.p2life <= 0) {
               alert('¡El combate ha finalizado!');
               this.p1life = 100;
               this.p2life = 100;
               var nodo = document.getElementById("log_acciones");
               while (nodo.firstChild) {nodo.removeChild(nodo.firstChild);}
          }
     }
}
</script>

<style lang="scss">

     $red: #E1332D;
     $orange: #cc8400;

     @mixin buttonHover($params) {
          -webkit-transition: $params;
          -moz-transition: $params;
          -ms-transition: $params;
          transition: $params;
     }

     #simulador {
          width:100%;
          min-width:100vw;
          height:100vh;
          background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(../assets/pikachu_bg.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          overflow-x: hidden;
     }

     #controller_container {
          width: 100%;
          max-width: 60vw;
          margin: 25px auto 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 10px;

          #playerStatus1, #playerStatus2 {
               padding: 20px;
               background: transparent;
               border: 1px solid gray;
               color: gray;
               font-family: 'Roboto Condensed', sans-serif;
               text-transform: uppercase;
          }

          #playerStatus1.activo, #playerStatus2.activo, {
               padding: 20px;
               background: transparent;
               border: 1px solid #fff;
               color: #fff;
               font-family: 'Roboto Condensed', sans-serif;
               text-transform: uppercase;
          }

          .progress_bar {
               border: 1px solid #fff;
               padding: 1px;

               .bar_value {
                    background: $orange;
                    width: 100%;
                    text-align: center;
                    color: #fff;
                    font-family: 'Roboto Condensed', sans-serif;
                    font-weight: 100;
               }
          }
     }

     #acciones {
          width: 100%;
          height: 400px;
          max-width: 60vw;
          margin: 25px auto 0;
          overflow-y: auto;

          h1 {
               color: #fff;
               font-family: 'Roboto Condensed', sans-serif;
               font-size: 1em;
               text-align: center;
               text-transform: uppercase;
               letter-spacing: 2px;
               border-bottom: 2px solid #fff;
               padding-bottom: 5px;
          }

          #log_acciones {
               width: 100%;
               display: grid;
               color: #fff;
               font-family: 'Roboto Condensed', sans-serif;
               text-align: justify;
          }
     }

     #ataques_container {
          width: 100%;
          max-width: 60vw;
          margin: 75px auto 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 10px;

          #playerOne, #playerTwo {
               width: 100%;
               display: grid;
               grid-template-columns: repeat(2, 1fr);
               grid-gap: 5px;

               div {
                    text-align: center;
                    color: #fff;
                    background: rgba(0,0,0,0.5);
                    font-family: 'Roboto Condensed', sans-serif;
                    padding: 10px;
                    cursor: pointer;
                    @include buttonHover(.175s all ease-in-out);

                    &:hover {
                         background: rgba(0,0,0,0.25);
                    }
               }
          }
     }
</style>
