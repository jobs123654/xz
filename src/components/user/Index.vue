<template>
  <div :class="$style.root">
     <Head :class="$style.item" :nav="nav" ></Head>
      <Map :class="[$style.item]" :option="map" ref="map" :db="dbConfig"></Map>
      <SecondMenu :class="$style.SecondMenu"></SecondMenu>
      <Center :class="$style.center" :user="user"></Center>
      <Query :class="$style.query" ref="query"></Query>
      <EditTool :class="$style.EditTool" :edit="editlist" v-show="showEdit" ref="edit"></EditTool>
      <Target :class="$style.Target" :target="target"></Target>
      <Theme :class="$style.Theme"  :theme="theme"></Theme>
      <Style :class="$style.Style" ></Style>
      <AreaGrid :class="$style.grid"  :grid="grid"></AreaGrid>
      <Clear  :class="$style.Clear" ></Clear>
      <TabMap :class="$style.TabMap" :maps="maps" ></TabMap>
    <Time :class="$style.Time" :option="timeline"></Time>
  </div>
</template>

<script>
   import config from '../../config/config'
   import Head from '../part/Head'
   import Query from '../part/Query'
   import Map from '../map/Map'
   import SecondMenu from '../part/SecondMenu'
   import Target from '../part/Target'
   import AreaGrid from '../part/AreaGrid'
   import Theme from '../part/Theme'
   import TabMap from '../part/TabMap'
   import Clear from '../part/Clear'

   import EditTool from '../part/EditTool'
   import Style from '../part/Style'
   import Time from '../part/Time'
   import Center from '../user/Center'
   import db from '../config/db'
    export default {
        name: "Index",
        components:{
            AreaGrid,
          SecondMenu,
          Head,
          Map,
        Center,Query,EditTool,Target,Theme,Clear,AreaGrid,TabMap,Style,Time
        },
        data:function () {
         return{
           nav:config.resourceMenu,SecondMenu,
              map:config.map,
             dbConfig:db,
             showEdit:false,
             editlist:config.edit,
             target:config.target,
             theme:config.theme,
             grid:config.areaGrid,
             maps:config.maps,
             height:document.documentElement.clientHeight,
             timeline:config.timeLine
         }
        },
        computed:{
          user(){
            return this.$store.state.user
          },
            getMap(){
              return this.$refs.map.map
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
  $height:720px;
 .root{
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
     flex-direction: column;
     .item:nth-child(1){

     }
     .item:nth-child(2){
     width: 100%;
     height: $height;
     z-index: 0;

     /*pointer-events: none;*/
   }
     .SecondMenu,.maptool,.center,.query,.EditTool,.Target,.Theme,.Clear,.grid,.TabMap,.Style,.Time{
         position: absolute;
         z-index: 999;
     }
   .SecondMenu{

     right: 0.6%;
     top: 18%;
   }
   .maptool{

     right: 0.6%;
     top: 13%;
   }
   .center{
     width: 30%;
     height: 40%;

     left: 39%;
     top: 33%;
   }
     .query{
         width: 20%;
         left:39%;
         top:20%
     }
     .EditTool{
         right:0.2%;
         top:9%
     }
   .Target{
     left:30%;
     top:20%
    }
   .Theme{

     right:0.2%;
     top:20%
   }
   .Clear{

     right:2%;
     top:80%
   }
     .grid{
         left:4%;
         top:10%
     }
     .TabMap,.Style,.Time{
         right:0.2%;
         top:9%
     }
 }
</style>
