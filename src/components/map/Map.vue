<template>
  <div :class="$style.root">

  </div>
</template>

<script>

    import db from '../config/db'
    import {mapMutations,mapState} from 'vuex'
    export default {
        name: "Map",
        props:{
          option:Object,
            db:Object,
        },
         mounted:function(){
          this.init()
           bus.$on('clear',this.clear);
           bus.$on('queryBySql',this.queryBySql);
           bus.$on('queryByRect',this.queryByRect);
           bus.$on('queryByPoint',this.queryByPoint);
           bus.$on('clear',this.clear);
           bus.$on('tabMap',this.tabMap);
           bus.$on('addLayer',this.addLayer);
           bus.$on('removeLayer',this.removeLayer);
           bus.$on('initMeasure',this.initMeasure)
           bus.$on('addScale',this.addScale)
           bus.$on('addMinimap',this.addMinimap)

           bus.$on('clear',this.clear)

           bus.$on('drawPolygon',this.drawPolygon);

             this.map.on('draw:created', this.drawFeature);
         },
        data:function(){
          return{
            map:{},
            baseLayer:{},
            scale:null,
            minimap:null,
            editableLayers:null,
            drawControl:null,
              queryControl:null,
              featureGroup:[],
            measureTool:null
          }
        },
        computed:{
            ...mapState(
                  {
                      'result':'features',
                       'queryParam':'queryParam',
                       'currentLayer':'currentLayer'
                  }
                )
        },
        watch:{
          result(){
              // this.clear()
              let that=this
              let resultLayer = L.geoJSON(this.result, {
                  //绑定弹窗
                  onEachFeature: function (feature, layer) {
                      let t=''
                      //quyu
                      if (feature.properties.用地类型){
                          t= that.result.year+ feature.properties.用地类型
                      }
                      if (this.queryParam&&this.queryParam.key.indexOf('新增面')>-1){

                      }
                      layer.bindPopup(t);
                      layer.setStyle({
                        color:that.result.color,
                        fillOpacity:'0.5'
                      })

                  }
              });

              if (this.currentLayer){
                  resultLayer.layerId=this.currentLayer;
                  this.putCurrentLayer(null)
              }

              // resultLayer._leaflet_id=this.currentLayer
              resultLayer.addTo(this.map)

          //    绘制结果
              this.result.features.map(e=>{
                  if(e.properties.MAN_NAME){
                        this.loadMan(e);
                  }

              })
          }
        },
         methods:{
             ...mapMutations(['setFeatures','clearFeatures','setQueryParam',
              'putCurrentLayer','setCurrentPolygon'
             ]),
             //////////////////////////////////////////////////////////
           queryByRect(d){
             this.queryByJH(d,{
               polyline: false,
               polygon: false,
               circle: false,
               marker: false,
               rectangle:true,
               circlemarker:false,
             })
           },
           queryByPoint(d){
             this.queryByJH(d,{
               polyline: false,
               polygon: false,
               circle: false,
               marker: true,
               rectangle:false,
               circlemarker:false,
             })
           },

             query(){
                 this.queryByIds([246, 247])
             },
             loadMan(e){
                 let o=e.geometry.coordinates
                 L.marker([o[1],o[0]],{
                     icon:L.icon({
                         iconUrl: '../../../static/img/man.png',
                         iconSize: [30, 30],
                         iconAnchor: [30, 34],
                     })
                 }).addTo(this.map);
             },
             //参数配置
              drawQuery(option){
               var options = {
                 position: 'topleft',
                 draw: option,
                 edit: {
                   featureGroup: this.editableLayers,
                   remove: true
                 }
               };
               return options
               },
             //执行绘制控件
             queryByJH(item,option){
                     this.queryControl = new L.Control.Draw(this.drawQuery(option));
                     this.map.addControl(this.queryControl);
             //   参数传递
                 this.setQueryParam(item)

             },
             drawPolygon(d){
               this.queryByJH(d,{
                 polyline: false,
                 polygon: true,
                 circle: false,
                 marker: false,
                 rectangle:false,
                 circlemarker:false,
               })
             },

           drawFeature(e){
             var type = e.layerType,
               layer = e.layer,queryParam=this.queryParam;
             this.editableLayers.addLayer(layer);
             let p=null
             switch (queryParam.key) {
               //測量：測距、測面
                 case 'measure':
                   if (type === 'polygon') {
                     p=L.polygon(layer.editing.latlngs[0], {})
                     this.getArea(p)
                   }
                 break;
                 case 'query':
                   if (type === 'polygon') {
                     p=L.polygon(layer.editing.latlngs[0],  {color: queryParam.color}).addTo(this.map)
                     this.setCurrentPolygon(p)
                   }

                 break;


             }

           },


             flyTo(e){
                 let o=e.geometry.coordinates
               this.map.flyTo([o[1],o[0]])
                 setTimeout(e=>{
                     this.map.setZoom(this.option.option.zoom+4)
                 },1200)
             },

             addLayer(item){
                 var vectorLayer = L.supermap.imageMapLayer(item.url, {
                     layersID:item.id,
                     returnAttributes: true,
                 }).addTo(this.map);
             },
             removeLayer(item){

                 this.map.eachLayer(e=>{
                     if (e.layerId===item.id){

                         this.map.removeLayer(e)
                     }
                 })

             },
             querybuffer(item){
                 var options = {
                     position: 'topleft',
                     draw: {
                         polyline: true,
                         polygon: false,
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
                 if (this.queryControl){

                     this.queryControl=null

                 } else{
                     this.queryControl = new L.Control.Draw(options);
                     this.map.addControl(this.queryControl);
                 }
                 this.map.on(L.Draw.Event.CREATED, function (e) {
                     var type = e.layerType,
                         layer = e.layer;
                     if (type === 'polygon') {
                         layer.bindPopup('A popup!');
                     }
                     this.editableLayers.addLayer(layer);
                     let p=L.polygon(layer.editing.latlngs[0], {})
                     item.p=p;
                     this.queryByBuffer(item)
                 }.bind(this));
             },

             ///////////////////////////////////////////////////////////////////////////
           init() {
             // 初始化地图信息
             this.map = L.map(this.$el, this.option.option);
             // 添加图层
             this.baseLayer= L.supermap.tiledMapLayer(this.option.url, {noWrap: true});
             this.baseLayer.addTo(this.map)

             this.editableLayers = new L.FeatureGroup();

           },
           tabMap(item){
             this.baseLayer= L.supermap.tiledMapLayer(item.url, {noWrap: true});
             this.baseLayer.addTo(this.map)
           },
            initMeasure(){

               this.map.addLayer(this.editableLayers);
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
                this.map.removeControl(this.drawControl);
                this.drawControl=null
              } else{
                this.drawControl = new L.Control.Draw(options);
                this.map.addControl(this.drawControl);
              }

              this.setQueryParam({
                key:'measure'
              })

            },
             clear(){
                  this.queryControl&&this.map.removeControl(this.queryControl);
                  this.editableLayers.clearLayers();
                  this.map.eachLayer(function(layer){
                     if(!layer._layerUrl){
                         this.map.removeLayer(layer)
                     }

                 }.bind(this));
                  this.setQueryParam(null)
                  this.setCurrentPolygon(null)
             },
             //.............................
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
            reset(){

              this.map.flyTo(this.option.option.center)
              setTimeout(e=>{
                  this.map.setZoom(this.option.option.zoom)
              },1200)
            },
            //  测距
           getDistance(geometry){

             var measureParam = new SuperMap.MeasureParameters();
             measureParam.geometry= geometry;
             measureParam.unit = SuperMap.Unit.METER;
             var measureService = L.supermap.measureService(this.option.url);
             measureService.measureDistance(measureParam,function (serviceResult){
               var result=serviceResult.result;
               alert(result.distance.toFixed(2)+'米')

             });
           },
             getArea(geometry){

                 var areaMeasureParam = new SuperMap.MeasureParameters(geometry);
                 //提交服务请求，传递服务查询参数，获取返回结果并按照用户需求进行处理
                 L.supermap .measureService(this.option.url) .measureArea(areaMeasureParam, function (serviceResult) {
                     //获取服务器返回的结果
                     var result=serviceResult.result;
                     alert(result.area.toFixed(2)+'平方米')

                 });

             },

         //    通过id检索
             queryByIds(item){

                 // 数据集ID查询服务参数
                 var idsParam = new SuperMap.GetFeaturesByIDsParameters({
                     IDs: [item.id],
                     datasetNames: [`${db.dataSourceName}:${item.ds}`]
                 });
                // 创建指定ID查询实例
                 L.supermap.featureService(this.option.dataUrl).getFeaturesByIDs(idsParam, function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result.features

                      this.setFeatures(featuers);

                 }.bind(this));
             },
         //    sql
             queryBySql(item){
                 this.putCurrentLayer(item.id)
                 var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                     queryParameter: {
                         name: `${db.dataSetName}@${item.dataSourceName}`,
                         attributeFilter: item.attr
                     },
                     datasetNames: [`${item.dataSourceName}:${item.dataSetName}`]
                 });
                      // 创建SQL查询实例
                 L.supermap.featureService(this.option.dataUrl).getFeaturesBySQL(sqlParam,function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result.features
                   featuers.color=item.color
                   featuers.year=item.dataSetName+'年'
                   this.setFeatures(featuers)

                 }.bind(this));
             },
               dotQuery(){

               },
         //    query by geos
             queryBYGeos(item){
// 设置几何查询范围

// 设置任意几何范围查询参数
                 var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
                     queryParameter: {
                         name: `${item.dataSetName}@${item.dataSourceName}`,
                         attributeFilter: item.attr
                     },
                     datasetNames: [`${item.dataSourceName}:${item.dataSetName}`],
                     geometry: item.p,
                     spatialQueryMode: "INTERSECT" // 相交空间查询模式
                 });
// 创建任意几何范围查询实例
                 L.supermap .featureService(this.option.dataUrl) .getFeaturesByGeometry(geometryParam,function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result.features;
                     this.setFeatures(featuers)
                 }.bind(this));
             },
             queryByBuffer(item){
                 let length=prompt('请输入缓冲距离[单位:米]','');
                 if (length===''){
                     return;
                 }
                 var bufferParam = new SuperMap.GetFeaturesByBufferParameters({
                     datasetNames:  [`${db.dataSourceName}:${item.ds}`],
                     bufferDistance: length,
                     geometry: item.p
                 });
                 L.supermap
                     .featureService(this.option.dataUrl)
                     .getFeaturesByBuffer(bufferParam, function (serviceResult) {
                         var featuers =serviceResult.result&& serviceResult.result.features;
                         if (featuers)
                         this.setFeatures(featuers)
                     }.bind(this));
             },


         },
    //    在线编辑
        commit(marker){
          let queryParam=this.queryParam
            marker = marker.toGeoJSON();
            marker.properties = item.properties;
            var addFeatureParams = new SuperMap.EditFeaturesParameters({
                dataSourceName: queryParam.dataSourceName,
                dataSetName: queryParam.dataSetName,
                features: marker,
                editType: "add",
                returnContent: true
            });
            featureService.editFeatures(addFeatureParams, function (serviceResult) {
                if (serviceResult.result.succeed) {
                    featureGroup.clearLayers();
                    marker = null;
                    if (resultLayer) {
                        map.removeLayer(resultLayer);
                        resultLayer = null;
                    }
                    initFeature();
                    widgets.alert.showAlert(resources.msg_submitSuccess, true);
                }
            });
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
