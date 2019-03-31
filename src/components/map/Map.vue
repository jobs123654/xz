<template>
  <div :class="$style.root">

  </div>
</template>

<script>
    export default {
        name: "Map",
        props:{
          option:Object,
          map:Object,
        },
         mounted:function(){
          this.init()
         },
         methods:{
           init:function () {
             // 初始化地图信息
             var map = L.map(this.$el, this.map.option);
             // 添加图层
             map.removeControl(L.control.zoom());
             L.supermap.tiledMapLayer(this.map.url, {noWrap: true}).addTo(map);

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
