<template>
     <div id="simulador">
          <div id="controller_container">
               <button v-on:click="playerOne" v-bind:class="{activo: p1bool}">player one</button>
               <button v-on:click="playerTwo" v-bind:class="{activo: p2bool}">player two</button>
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
               accionActual: 'Es el turno del jugador 1',
               p1bool: true,
               p2bool: false,
               p1life: 100,
               p2life: 100
          }
     },
     methods: {
          accionTurno(jugador) {
               var rndNum = Math.floor(Math.random() * 10) + 1;
               var msgBox = document.createElement("p");
               var texto = document.createTextNode("El jugador " + jugador + " obtuvo un: " + rndNum);
               msgBox.appendChild(texto);

               var accionesContenedor = document.getElementById("log_acciones");
               accionesContenedor.appendChild(msgBox);
               return (rndNum * 2);
          },
          playerOne() {
               if (this.p1bool == true) {
                    var resultado = this.accionTurno('1');
                    this.p2life = this.p2life - resultado;
                    this.p2bool = true;
                    this.p1bool = false;
                    this.accionActual = 'Es el turno del jugador 2';
               } else {
                    alert('¡Aún no es tu turno!');
               }
          },
          playerTwo() {
               if (this.p2bool == true) {
                    var resultado = this.accionTurno('2');
                    this.p1life = this.p1life - resultado;
                    this.p1bool = true;
                    this.p2bool = false;
                    this.accionActual = 'Es el turno del jugador 1';
               } else {
                    alert('¡Aún no es tu turno!');
               }
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
          max-width: 40vw;
          margin: 75px auto 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 10px;

          button {
               padding: 20px;
               background: transparent;
               border: 1px solid gray;
               color: gray;
               font-family: 'Roboto Condensed', sans-serif;
               text-transform: uppercase;
          }

          button.activo {
               padding: 20px;
               background: transparent;
               border: 1px solid #fff;
               color: #fff;
               font-family: 'Roboto Condensed', sans-serif;
               text-transform: uppercase;
               cursor: pointer;
               @include buttonHover(.175s all ease-in-out);

               &:hover { background: $red; }
               &:active { background: transparent; }
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
          max-width: 40vw;
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
</style>
