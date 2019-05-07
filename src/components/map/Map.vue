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
           bus.$on('commit',this.commit)
           bus.$on('addTheme',this.queryDataForTheme)
           bus.$on('showImportantByMap',this.showImportantByMap)

           this.map.on('draw:created', this.drawFeature);
            this.map.on("mousemove",(e)=> {
            this. infowinPosition = e.layerPoint;
           });
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
             measureTool:null,
             infowin:null,
             infowinPosition:null,
          }
        },
        computed:{
            ...mapState(
                  {
                       'result':'features',
                       'queryParam':'queryParam',
                       'currentLayer':'currentLayer',
                       'currentResult':'currentResult'
                  }
                )
        },
        watch:{
          result(){
              // this.clear()

              let that=this
              this.setCurrentResult(this.result)
              let resultLayer = L.geoJSON(this.result, {
                  //绑定弹窗
                  onEachFeature: function (feature, layer) {
                      let t=''
                      //quyu
                      if (feature.properties.用地类型!==''){
                          t= that.result.year+ feature.properties.用地类型
                         }else{
                        t= that.result.year
                         }
                     /* if (that.queryParam&&that.queryParam.key.indexOf('新增面')>-1){

                      }
*/
                      layer.bindPopup(t);
                    layer.setStyle&&layer.setStyle({
                        color:that.result.color,
                        fillOpacity:'0.4'
                      })

                  }
              });
            if(that.queryParam&&that.queryParam.key&&that.queryParam.key.indexOf('专题')>-1){
              that.initCircleThemeLayer(that.queryParam)
            }

              if (this.currentLayer){
                  resultLayer.layerId=this.currentLayer;
                  this.putCurrentLayer(null)
              }

              // resultLayer._leaflet_id=this.currentLayer
              resultLayer.addTo(this.map)

          //    绘制结果

          }
        },
         methods:{
             ...mapMutations(['setFeatures','clearFeatures','setQueryParam',
              'putCurrentLayer','setCurrentPolygon','setCurrentResult'
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
               this.queryControl&&this.map.removeControl(this.queryControl);
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
                   if (type === 'marker') {
                     p=L.marker(layer._latlng,  {color: queryParam.color}).addTo(this.map)
                     // this.setCurrentPolygon(p)
                     this.queryParam.obj=p;
                     this.setQueryParam(this.queryParam)
                     this.queryBYGeos(this.queryParam)

                   }
                 break;
                case 'edit':
                 if (type === 'polygon') {
                   p=L.polygon(layer.editing.latlngs[0],  {color: queryParam.color}).addTo(this.map)
                   this.queryParam.obj=p;
                   this.setQueryParam(this.queryParam)
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
                  this.setCurrentResult(null)
                  bus.$emit('areaGridClose')
                  this.setFeatures(null)
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
                         name: `${item.dataSetName}@${item.dataSourceName}`,
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
             queryDataForTheme(item){
               this.setQueryParam(item)
               this.queryBySql(item)
             },
         //    query by geos
             queryBYGeos(){
// 设置几何查询范围
                   let item=this.queryParam
// 设置任意几何范围查询参数

                 var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
                     queryParameter: {
                         name: `${item.dataSetName}@${item.dataSourceName}`,
                         attributeFilter: item.attr
                     },
                     datasetNames: [`${item.dataSourceName}:${item.dataSetName}`],
                     geometry: item.obj,
                     spatialQueryMode: "INTERSECT" // 相交空间查询模式
                 });
// 创建任意几何范围查询实例
                 L.supermap .featureService(this.option.dataUrl) .getFeaturesByGeometry(geometryParam,serviceResult=> {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result&&serviceResult.result.features;
                     if (featuers.features.length<1) {
                       this.$Message.info(`暂无数据`);
                       return
                     }
                     featuers.color=item.color
                     this.setFeatures(featuers)
                 });

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
           //    在线编辑提交
           commit(queryParam){

             let marker=this.queryParam.obj;
             let ids=[],markers=[]


             if (this.currentResult&&this.currentResult.features&&this.currentResult.features.length>0){
               this.currentResult.features.map(e=>{
                 markers.push(L.polygon(e.geometry.coordinates, {}))
                 ids.push(e.id)
               })
               markers.map(e=>{
                 e=e.toGeoJSON();
                 e.properties = queryParam.properties;
               })

             }else{
                 marker = marker&& marker.toGeoJSON();
                 marker.properties = queryParam.properties;
             }

             let EditFeaturesParameters={
               dataSourceName: queryParam.dataSourceName,
               dataSetName: queryParam.dataSetName,
               editType: queryParam.action.title,
               returnContent: true,

             }


             if (queryParam.action.title==='add') {
               EditFeaturesParameters.features= marker
             }
             if (queryParam.action.title==='update'){
               EditFeaturesParameters.IDs=ids
               EditFeaturesParameters.features= markers
             }
             if(queryParam.action.title==='delete'){
               EditFeaturesParameters.IDs=ids
             }
             var addFeatureParams = new SuperMap.EditFeaturesParameters(EditFeaturesParameters);

             L.supermap.featureService(this.option.dataUrl).editFeatures(addFeatureParams, serviceResult=> {
               if (serviceResult.result&&serviceResult.result.succeed) {
                 this.$Message.info(`${queryParam.action.name}成功！`);

               }else{
                 this.$Message.info(`${queryParam.action.name}失败！`);
                     console.log(serviceResult)
               }
             });

             ids=[]
             markers=[]
             this.clear()

           },
         //  专题图
           initCircleThemeLayer(item) {
             if (!document.createElement('canvas').getContext) {
                alert('error！');
                return;
             }


             this.themeLayer&&this.map.removeLayer(this.themeLayer);
             // 创建一个圆形符号专题图层
             this.themeLayer = L.supermap.rankSymbolThemeLayer("themeLayer", SuperMap.ChartType.CIRCLE);
             this.themeLayer.addTo(this.map);


             // 指定用于专题图制作的属性字段  详看下面 addThemeLayer（）中的feature.attrs.CON2009
             this.themeLayer.themeField =item.field;


             let con=this.result.features.map(e=>parseFloat(e.properties[item.field]))

             let max=con.reduce((a,b)=>{
               return b>a? b: a;
             })

             // 配置图表参数
             this.themeLayer.symbolSetting = {
               //允许图形展示的值域范围，此范围外的数据将不制作图图形,必设参数
               codomain: [0, max],
               //圆最大半径 默认100
               maxR: 100,
               //圆最小半径 默认0
               minR: 0,
               // 圆形样式
               circleStyle: {fillOpacity: item.opacity},
               // 符号专题图填充颜色
               fillColor: item.fillColor,
               strokeColor:item.strokeColor,
               // 专题图hover 样式
               circleHoverStyle: {fillOpacity: item.opacity1}
             };

             // 注册专题图 mousemove, mouseout事件(注意：专题图图层对象自带 on 函数，没有 events 对象)
             this.themeLayer.on("mousemove", this.showInfoWin);
             this.themeLayer.on("mouseout", this.closeInfoWin);
            let features=[],f=item.name;
             var chinaConsumptionLevel=this.result.features;
             for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
               // 省居民消费水平（单位：元）信息
               var provinceInfo = chinaConsumptionLevel[i];
               var geo = L.point(provinceInfo.geometry.coordinates);

               var attrs = {};
               attrs[item.quyu]= provinceInfo.properties[item.quyu]
               attrs[item.field]=parseFloat((provinceInfo.properties[item.field]))

               var feature = L.supermap.themeFeature(geo, attrs);
               features.push(feature);
             }
             this.themeLayer.addFeatures(features);


           },

           showInfoWin(e) {
      // e.target 是图形对象，即数据的可视化对象。
      // 图形对象的 refDataID 属性是数据（feature）的 id 属性，它指明图形对象是由那个数据制作而来;
      // 图形对象的 dataInfo 属性是图形对象表示的具体数据，他有两个属性，field、R 和 value;
          if (e.target && e.target.refDataID && e.target.dataInfo) {
            this.closeInfoWin();
            // 获取图形对应的数据 (feature)
            var fea = this.themeLayer.getFeatureById(e.target.refDataID);
            if (!fea) {
              return;
            }

            // 弹窗内容
            var contentHTML = "<div style='color: #000; background-color: #fff'>";


            for(let i in fea.attributes){
              contentHTML +=i +":"+fea.attributes[i]+ "<br><strong>"
            }

            contentHTML += "</div>";


            var latLng = this.map.layerPointToLatLng(this.infowinPosition);
            if (!this.infowin) {
              this.infowin = L.popup();
            }
            this.infowin.setLatLng(latLng);
            this. infowin.setContent(contentHTML);
            this.infowin.openOn(this.map);
          }
    },


    // 移除和销毁地图弹窗
    closeInfoWin() {
      if (this.infowin) {
        try {
          this.infowin.remove();
        } catch (e) {

        }
      }
    },

         //  显示人口、经济重心
           showImportantByMap(o){
               this.clear()
               if (o){
                 L.marker([o[1],o[0]],{
                   icon:L.icon({
                     iconUrl: '../../../static/img/icon.png',
                     iconSize: [30, 30],
                     iconAnchor: [30, 34],
                   })
                 }).addTo(this.map);
               }
           }

         },

    }
</script>

<style lang="scss" module>
   .root{
     width: 100%;
     height: 100%;
     border: 1px solid #dddddd;
   }
</style>
