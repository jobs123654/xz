<template>
  <div class="panel panel-default" v-show="visible">
    <div class="panel-body">
      <Timeline pending style="margin-left: 18%">
        <Timeline-item v-for="(item,id) in list" :key="id"  :color="item.isCheck?height:normal">
           <span class="year" @click="check(id)">{{item.name}}</span>
        </Timeline-item>
      </Timeline>
       <span v-show="J&&W">[{{J}},{{W}}]</span>
      <hr>
      <span class="btn glyphicon glyphicon-play-circle" title="播放" @click="start"></span>&nbsp;

      <span class="btn  glyphicon glyphicon-stop" title="停止" @click="stop"></span>
      <span class="btn glyphicon glyphicon-remove" title="退出" @click="close"></span>

    </div>
  </div>
</template>

<script>
    export default {
        name: "Time",
        props:{
          option:Array,
        },
        data(){
          return{
            list:this.option,
            visible:true,
            height:'red',
            normal:'blue',
            control:{},
            i:0,
            J:null,
            W:null
          }
        },
       mounted(){
         bus.$on('showTime',e=>{
           this.visible=true
         })
       },
        methods:{
           init(){

           },
           check(item){

             this.list.forEach((e,i)=>{
               if (i===item){
                 e.isCheck=true
               } else {
                 e.isCheck=false
               }
             })
             bus.$emit('showImportant',item)
             bus.$on('receptImportant',e=>{
               this.J=e[0].toFixed(2)
               this.W=e[1].toFixed(2)
             })
           },
          start(){
            this.control=setInterval(this.loadTime,1500)
          },
          stop(){
             if (this.control){
               clearInterval(this.control)
               this.control=null
             }
           },
          close(){
            this.visible=false
            this.stop()
          },
          loadTime(){
            if (this.i>this.list.length){this.i=0;}
            this.check(this.i++)
          }
        }
    }
</script>

<style scoped>
.year{
  cursor: pointer;
}
</style>
