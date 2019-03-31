<template>
  <div :class="$style.root">
     <Head :class="$style.item" :nav="nav"></Head>
     <Map :class="$style.item"></Map>
     <SecondMenu :class="$style.SecondMenu"></SecondMenu>
  </div>
</template>

<script>
   import config from '../config/config'
   import Head from '../part/Head'
   import Map from '../map/Map'
   import SecondMenu from '../part/SecondMenu'
    export default {
        name: "Index",
        components:{
          SecondMenu,
          Head,
          Map,
        },
        data:function () {
         return{
           nav:config.resourceMenu,SecondMenu,
         }
        },
    }
</script>

<style lang="scss" module>
  $height:920px;
 .root{
    width: 100%;
    height: 100%;
    display: flex;
   position: relative;
     flex-direction: column;
   .item:nth-child(2){
     width: 100%;
     height: $height;
   }
   .SecondMenu{
     position: absolute;
     z-index: 9;
     left: 1%;
     top: 13%;
   }
 }
</style>
