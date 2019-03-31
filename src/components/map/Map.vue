<template>
  <div :class="$style.root">

  </div>
</template>

<script>
    export default {
        name: "Map",
        props:{
          option:Object,
        },
         mounted:function(){

         },
         methods:{
           init:function () {
             var url ="http://support.supermap.com.cn:8090/iserver/services/map-world/rest/maps/World";
             // 初始化地图信息
             var map = L.map('map', );
             // 添加图层
             L.supermap.tiledMapLayer(url, {noWrap: true}).addTo(map);
           }
         }
    }
</script>

<style lang="scss" module>
   .root{
     width: 100%;
     height: 100%;
     border: 1px solid #dddddd;
   }
</style>
