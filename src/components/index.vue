<template >
     <div id="index">
          <div id="button_container">
               <button><div class="titulo">player vs player</div><player-icon class="button_icon"/></button>
               <button><div class="titulo">player vs ia</div><bot-icon class="button_icon"/></button>
          </div>
     </div>
</template>

<script>

import PlayerIcon from 'vue-material-design-icons/account.vue'
import BotIcon from 'vue-material-design-icons/console.vue'

export default {
     components: {
          'player-icon': PlayerIcon,
          'bot-icon': BotIcon
     },
     data() {
          return {

          }
     }
}
</script>

<style lang="scss" scoped>

     $red: #E1332D;

     @mixin transY($params) {
          -webkit-transform:translateY($params);
          -moz-transform:translateY($params);
          -ms-transform:translateY($params);
          transform:translateY($params);
     }

     @mixin transXY($param1, $param2) {
          -webkit-transform:translate($param1, $param2);
          -moz-transform:translate($param1, $param2);
          -ms-transform:translate($param1, $param2);
          transform:translate($param1, $param2);
     }

     @mixin buttonHover($params) {
          -webkit-transition: $params;
          -moz-transition: $params;
          -ms-transition: $params;
          transition: $params;
     }

     #index {
          width:100%;
          min-width:100vw;
          height:100vh;
          background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(../assets/pikachu_bg.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
     }

     #button_container {
          width: 100%;
          position: absolute;
          top: 50%;
          @include transY(-50%);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 60px;
          align-items: stretch;
          grid-gap: 10px;

          :nth-child(1), :nth-child(2) {
               grid-column-start: 2;
          }

          :nth-child(2) {
               grid-row-start: 2;
          }

          button {
               background: transparent;
               border: none;
               cursor: pointer;
               @include buttonHover(.275s all ease-in-out);
               border: 1px solid #fff;
               position: relative;
               overflow: hidden;

               .titulo {
                    color: #fff;
                    font-family: 'Roboto Condensed', sans-serif;
                    font-weight: 100;
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    position: absolute;
                    z-index: 3;
                    top: 50%; left: 50%;
                    @include transXY(-50%, -50%);
               }

               .button_icon {
                    display: none;
               }

               @media screen and (min-width:760px) {
                    .titulo {
                         font-size:16px;
                    }

                    .button_icon {
                         display: block;
                         font-size: 25px;
                         fill: #fff;
                         position: absolute;
                         z-index: 3;
                         top: 50%; right: 10px;
                         @include transY(-50%);
                         outline: 1px solid #fff;
                         padding: 5px;
                    }
               }

               &:hover {
                    font-weight: 400;
                    opacity: 0.95;
               }

               &:after {
                    content:'';
                    background: $red;
                    width: 100%;
                    height: 60px;
                    display: block;
                    position: absolute;
                    top: 0; left: -100%;
                    z-index: 2;
                    @include buttonHover(.375s all ease-in-out);
               }

               &:hover::after {
                    left: 0%;
               }

          }
     }

</style>
