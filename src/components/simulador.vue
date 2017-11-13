<template>
     <div id="simulador">
          <div id="ataques_container">
               <div id="playerOne">
                    <div v-bind:id="listadoAtaques[0]" class="ataque" v-on:click="atacar(1, 2)">{{listadoAtaques[0]}}</div>
                    <div v-bind:id="listadoAtaques[44]" class="ataque" v-on:click="atacar(1, 2)">{{listadoAtaques[44]}}</div>
                    <div v-bind:id="listadoAtaques[48]" class="ataque" v-on:click="atacar(1, 2)">{{listadoAtaques[48]}}</div>
                    <div v-bind:id="listadoAtaques[100]" class="ataque" v-on:click="atacar(1, 2)">{{listadoAtaques[100]}}</div>
               </div>
               <div id="playerTwo">
                    <div v-bind:id="listadoAtaques[0]" class="ataque" v-on:click="atacar(2, 1)">{{listadoAtaques[0]}}</div>
                    <div v-bind:id="listadoAtaques[44]" class="ataque" v-on:click="atacar(2, 1)">{{listadoAtaques[44]}}</div>
                    <div v-bind:id="listadoAtaques[48]" class="ataque" v-on:click="atacar(2, 1)">{{listadoAtaques[48]}}</div>
                    <div v-bind:id="listadoAtaques[78]" class="ataque" v-on:click="atacar(2, 1)">{{listadoAtaques[78]}}</div>
               </div>
          </div>
          <div id="controller_container">
               <div id="playerStatus1" class="activo">player one — lvl <span id="p1Level">{{p1level}}</span></div>
               <div id="playerStatus2">player two — lvl <span id="p2Level">{{p2level}}</span></div>
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
               p2life: 100,
               p1AttackDebuff: 0,
               p2AttackDebuff: 0,
               p1level: 100,
               p2level: 100
          }
     },
     created() {
          this.cargarAtaques();
     },
     methods: {
          determinarPoder(jugador, poder, efectoCorto) {
               if (poder == null) {
                    if (efectoCorto.startsWith("Inflicts")) {
                         if (efectoCorto == "Inflicts damage equal to the user's level.") {
                              var nivelUsuario = document.getElementById('p' + jugador + 'Level').innerHTML;
                              poder = nivelUsuario;
                              return poder;
                         } else {
                              var extraerNumero = /\d+/g;
                              poder = efectoCorto.match(extraerNumero);
                              return poder;
                         }
                    }
               } else {
                    return poder;
               }
          },
          generarDano(jugador, poder, efectoCorto) {
                    if (jugador == 1 ) {
                         if (p1AttackDebuff > 0) {
                              if (p1AttackDebuff == -1) {this.p2life = (this.p2life - poder) * 0.75;}
                         } else {
                              this.p2life = this.p2life - poder;
                         }

                    } else {
                         if (p2AttackDebuff > 0) {
                              if (p2AttackDebuff == -1) {this.p1life = (this.p1life - poder) * 0.75;}
                         } else {
                              this.p1life = this.p1life - poder;
                         }
                    }
          },
          generarMensaje(texto) {
               var msgBox = document.createElement("p");
               msgBox.appendChild(texto);
               var accionesContenedor = document.getElementById("log_acciones");
               accionesContenedor.appendChild(msgBox);
          },
          cargarAtaques() {
               this.$http.get("https://pokeapi.co/api/v2/move/?limit=717").then(function(data){
                    return data.json();
               }).then(function(data){
                    for (let key in data.results){
                         this.listadoAtaques.push(data.results[key].name);
                    }
               });
          },
          accionTurnoFisico(jugador, poder, efectoCorto) {
               poder = this.determinarPoder(jugador, poder, efectoCorto);
               var texto = document.createTextNode("El jugador " + jugador + " causó: " + poder + " de daño físico");
               this.generarMensaje(texto);
               this.generarDano(jugador, poder, efectoCorto);
          },
          accionTurnoEspecial(jugador, poder, efectoCorto) {
               poder = this.determinarPoder(jugador, poder, efectoCorto);
               var texto = document.createTextNode("El jugador " + jugador + " causó: " + poder + " de daño especial");
               this.generarMensaje(texto);
               this.generarDano(jugador, poder, efectoCorto);
          },
          accionTurnoEstado(jugador, enemigo, efectoEstadistica, efectoValor) {
               if (efectoEstadistica == 'attack') {
                    if (jugador == 1) {this.p2AttackDebuff += efectoValor;} else {this.p1AttackDebuff += efectoValor;}
                    var texto = document.createTextNode("El ataque del jugador " + enemigo + " se modificó en: " + efectoValor);
                    this.generarMensaje(texto);
               }
          },
          playerTurno(tipo, efectoEstadistica, efectoValor, poder, clase, jugador, enemigo, efectoCorto) {
               var player = '#playerStatus' + jugador;
               var enemy = '#playerStatus' + enemigo;

               if ($(player).hasClass("activo")) {
                    if (clase == 'physical') {
                         this.accionTurnoFisico(jugador, poder, efectoCorto);
                    } else if (clase == 'special') {
                         this.accionTurnoEspecial(jugador, poder, efectoCorto);
                    } else if (clase == 'status') {
                         this.accionTurnoEstado(jugador, enemigo, efectoEstadistica, efectoValor);
                    }

                    $(player).toggleClass("activo", false);
                    $(enemy).toggleClass("activo", true);

                    this.accionActual = 'Es el turno del jugador ' + enemigo;
               } else {
                    alert('¡Aún no es tu turno!');
               }
          },
          atacar(jugador, enemigo) {
               var ataque = event.target.innerHTML;
               this.$http.get("https://pokeapi.co/api/v2/move/"+ ataque + '/?limit=1').then(function(data){
                    return data.json();
                 }).then(function(data){
                    var tipo = data.type.name;
                    if (data.stat_changes.length > 0) {
                         var efectoEstadistica = data.stat_changes[0].stat.name;
                         var efectoValor = data.stat_changes[0].change;
                    } else {
                         var efectoEstadistica = null;
                         var efectoValor = null;
                    }
                    var poder = data.power;
                    var clase = data.damage_class.name;
                    var efectoCorto = data.effect_entries[0].short_effect;
                    console.log(efectoCorto);
                    this.playerTurno(tipo, efectoEstadistica, efectoValor, poder, clase, jugador, enemigo, efectoCorto);
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
               text-align: center;
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
