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
            <option v-for="i in props" :value="i.name">{{i.name}}</option>
          </select>

        </div>

        <div class="form-group">
          <Row>
            <Col span="12">面图层填充颜色<ColorPicker v-model="fillColor" /></Col>
          </Row>
        </div>
         <div class="form-group">
          <Row>
            <Col span="12">面图层线条颜色<ColorPicker v-model="strokeColor" /></Col>
          </Row>
        </div>
        <div class="form-group">

            <div class="input-group">
              <div class="input-group-addon"> 线宽</div>
              <input type="number" class="form-control" v-model="lineWidth">
          </div>
        </div>
        <div class="form-group">

          <div class="input-group">
            <div class="input-group-addon"> 透明度</div>
            <input type="number" class="form-control" v-model="opacity">
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">确定</button>
        </div>
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
          opacity:0
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
