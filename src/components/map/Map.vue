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
          this.init()
         },
        data:function(){
          return{
            map:{},
            baseLayer:{},
            scale:null,
            minimap:null,
            editableLayers:null,
            drawControl:null,
          }
        },
         methods:{

           init() {
             // 初始化地图信息
             this.map = L.map(this.$el, this.option.option);
             // 添加图层
             this.baseLayer= L.supermap.tiledMapLayer(this.option.url, {noWrap: true}).addTo(this.map);

             this.editableLayers = new L.FeatureGroup();
           },
            initMeasure(){


              this.map.addLayer(this.editableLayers);

              var MyCustomMarker = L.Icon.extend({
                options: {
                  shadowUrl: null,
                  iconAnchor: new L.Point(12, 12),
                  iconSize: new L.Point(24, 24),
                  iconUrl: 'link/to/image.png'
                }
              });

              var options = {
                position: 'topleft',
                draw: {
                  polyline: true,
                  polygon: true,
                  circle: false,
                  marker: false,
                  rectangle:false,
                  circlemarker:false,
                },
                edit: {
                  featureGroup: this.editableLayers,
                  remove: true
                }
              };
              if (this.drawControl){
                this.drawControl=null
              } else{
                this.drawControl = new L.Control.Draw(options);
                this.map.addControl(this.drawControl);
              }


              this.map.on(L.Draw.Event.CREATED, function (e) {
                var type = e.layerType,
                  layer = e.layer;
                if (type === 'marker') {
                    layer.bindPopup('A popup!');
                }

                this.editableLayers.addLayer(layer);
                let p=L.polygon(layer.editing.latlngs[0], {})

                if (this.getDistance(p)){
                  console.log(p)
                }
              }.bind(this));

            },
            addScale(){
              if (!this.scale){
                this.scale=L.control.scale().addTo(this.map);
              }else{
                this.map.removeControl(this.scale)
              }
            },
            addMinimap(){
              if (!this.minimap){
                this.minimap=new L.Control.MiniMap(this.baseLayer, { toggleDisplay: true }).addTo(this.map);
              }else{
                this.minimap=null
              }
            },
            addPan(){
              this.map.removeControl(this.drawControl)
            },
            clear(){
              this.editableLayers.clearLayers();
            },
            //  测距
           getDistance(geometry){
             var measureParam = new SuperMap.MeasureParameters();
             measureParam.geometry= geometry;
             measureParam.unit = SuperMap.Unit.METER;
             var measureService = L.supermap.measureService(this.option.url);
             measureService.measureDistance(measureParam,function (serviceResult){
               var result=serviceResult.result;
               console.log(result)

             });
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
