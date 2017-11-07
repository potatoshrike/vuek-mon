<template >
     <div id="index">
          <div id="button_container">
               <button><div class="titulo">player vs player</div></button>
               <button><div class="titulo">player vs ia</div></button>
          </div>
     </div>
</template>

<script>
export default {
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
               color: #fff;
               font-family: 'Roboto Condensed', sans-serif;
               font-weight: 100;
               font-size: 16px;
               text-transform: uppercase;
               letter-spacing: 2px;
               cursor: pointer;
               @include buttonHover(.175s all ease-out);
               border: 1px solid #fff;
               position: relative;
               overflow: hidden;

               .titulo {
                    position: absolute;
                    z-index: 3;
                    top: 50%; left: 50%;
                    @include transY(-50%);
                    @include transXY(-50%, -50%);
               }

               &:hover {
                    font-weight: 900;
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
