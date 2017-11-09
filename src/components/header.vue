<template>
     <div id="header">
          <ul>
               <li><router-link to="/" id="indice" class="url">indice</router-link></li>
               <li><router-link to="/" id="pvp" class="url">pvp</router-link></li>
               <li><router-link to="/" id="pve" class="url">pve</router-link></li>
               <li><router-link to="/buscador" id="pokedex" class="url">pokedex</router-link></li>
               <li><router-link to="/listaPokemon" id="teampickear" class="url">picker</router-link></li>
          </ul>
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
     #header {
          width: 100%;
          position: fixed;
          margin: 0;
          padding: 5px 0;
          top: 0;
          z-index: 5;
          background: #000;

          ul {
               list-style-type: none;
	          float: right;
	          margin-right: 50px;

               li {
                    display: inline-block;
               }
          }

          .url {
               color: #fff;
               font-size: 14px;
               font-family: 'Roboto Condensed', sans-serif;
               text-transform: uppercase;
               text-decoration: none;
               letter-spacing: 1px;
               margin-right: 15px;
          }
     }
</style>
