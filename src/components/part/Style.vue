<template>
  <div class="panel panel-default col-md-2" v-show="visible" >
    <div class="panel-heading">
      <span>样式管理器</span>

    </div>
    <div class="panel-body col-md-12">

      <div class="form-horizontal ">

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
        theme:Object,

      },
      data(){
        return{
          visible:false,


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

         bus.$on('styleClose',e=>{
           this.visible=false
         })
         bus.$on('styleShow',e=>{
          this.visible=true
         })
      },
      methods:{
        change(){
          let item=this.value

          bus.$emit('addTheme',{
            // dataSourceName:config.citysQuery.dataSourceName,
            // dataSetName:this.theme.dataSetName,
            // quyu:this.theme.field,
            // key:this.theme.key,
            // strokeColor:this.strokeColor,
            // fillColor:this.fillColor,
            // field:item.name,
            // attr:item.attr,
            // opacity:this.opacity,
            // opacity1:this.opacity1,
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
