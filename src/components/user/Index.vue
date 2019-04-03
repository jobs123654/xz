<template>
  <div :class="$style.root">
     <Head :class="$style.item" :nav="nav" ></Head>
     <Map :class="$style.item" :option="map" ref="map"></Map>
     <SecondMenu :class="$style.SecondMenu"></SecondMenu>

    <Center :class="$style.center" :user="user"></Center>
  </div>
</template>

<script>
   import config from '../config/config'
   import Head from '../part/Head'
   import Map from '../map/Map'
   import SecondMenu from '../part/SecondMenu'
   import MapTool from '../toolbar/MapTool'
   import Center from '../user/Center'
    export default {
        name: "Index",
        components:{
          SecondMenu,
          Head,
          Map,
          MapTool,Center,
        },
        data:function () {
         return{
           nav:config.resourceMenu,SecondMenu,
           map:config.map
         }
        },
        computed:{
          user(){
            return this.$store.state.user
          }
        },
        mounted() {

        },
      methods:{
          control(i){
            switch (Number.parseInt(i)) {
              case 0:
                this.$refs.map.addScale()
                break;
              case 1:
                this.$refs.map.addMinimap();
                break;
              case 2:
                this.$refs.map.addPan();
                break;
            }
          }
      }
    }
</script>

<style lang="scss" module>
  $height:800px;
 .root{
    width: 100%;
    height: 100%;
    display: flex;
   position: relative;
     flex-direction: column;
   .item:nth-child(2){
     width: 100%;
     height: $height;
     z-index: 0;
     /*pointer-events: none;*/
   }
   .SecondMenu{
     position: absolute;
     z-index: 999;
     right: 0.6%;
     top: 18%;
   }
   .maptool{
     position: absolute;
     z-index: 999;
     right: 0.6%;
     top: 13%;
   }
   .center{
     width: 30%;
     height: 40%;
     position: absolute;
     z-index: 999;
     left: 39%;
     top: 33%;
   }
 }
</style>
