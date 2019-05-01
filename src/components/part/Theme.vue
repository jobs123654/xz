<template>
  <div class="panel panel-default col-md-2" v-show="visible" >
    <div class="panel-heading">
      <span>在线专题</span>
      <span @click="visible=false" class="close">&times;</span>
    </div>
    <div class="panel-body col-md-12">

      <div class="form-horizontal ">
        <div class="form-group">
          <select v-model="value" @change="change" class="form-control">
            <option v-for="i in props" :value="i">{{i.name}}</option>
          </select>

        </div>

        <div class="form-group">
          <Row>
            <Col span="12">面图层填充颜色<ColorPicker v-model="fillColor" /></Col>
          </Row>
        </div>
         <!--<div class="form-group">-->
          <!--<Row>-->
            <!--<Col span="12">面图层线条颜色<ColorPicker v-model="strokeColor" /></Col>-->
          <!--</Row>-->
        <!--</div>-->
        <!--<div class="form-group">-->

            <!--<div class="input-group">-->
              <!--<div class="input-group-addon"> 线宽</div>-->
              <!--<input type="number" class="form-control" v-model="lineWidth">-->
          <!--</div>-->
        <!--</div>-->
        <div class="form-group">

          <div class="input-group">
            <div class="input-group-addon"> 普通透明度</div>
            <input type="text" class="form-control" v-model="opacity">
          </div>
        </div>
        <div class="form-group">

          <div class="input-group">
            <div class="input-group-addon"> 激活透明度</div>
            <input type="text" class="form-control" v-model="opacity1">
          </div>
        </div>
        <!--<div class="form-group">-->
          <!--<button type="submit" class="btn btn-primary">确定</button>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "Theme",
      props:{
        theme:Object
      },
      data(){
        return{
          visible:false,
          value:{},
          props:this.theme.props,
          fillColor:this.theme.fillColor,
          strokeColor:this.theme.strokeColor,
          lineWidth:1,
          opacity:0.5,
          opacity1:1,
        }
      },
      watch:{
        fillColor(){
          this.change()

        },

        opacity(){
          this.change()
        },
        opacity1(){
          this.change()
        }

      },
      mounted(){

         bus.$on('themeClose',e=>{
           this.visible=false
         })
         bus.$on('themeShow',e=>{
          this.visible=true
         })
      },
      methods:{
        change(){
          let item=this.value

          bus.$emit('addTheme',{
            dataSourceName:config.citysQuery.dataSourceName,
            dataSetName:this.theme.dataSetName,
            quyu:this.theme.field,
            key:this.theme.key,
            strokeColor:this.strokeColor,
            fillColor:this.fillColor,
            field:item.name,
            attr:item.attr,
            opacity:this.opacity,
            opacity1:this.opacity1,
          })
        },
        ok(){
          this.visible=false
        }

      }
    }
</script>

<style lang="scss" scoped>
.panel{

}
</style>
