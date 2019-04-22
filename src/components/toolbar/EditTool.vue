<template>
 <div class="root">
     <div class="con">
         <span v-for="i in editlist" @click="select(i.name)" :class="i._class" :title="i.title"></span>
     </div>
     <div class="pro panel panel-default" v-show="showPro">
         <div class="panel-body">
             <div class="form-group">

                 <input type="email" class="form-control" id="exampleInputEmail1" placeholder="名称">
             </div>
             <div class="form-group">

                 <input type="password" class="form-control" id="exampleInputPassword1" placeholder="其他">
             </div>
         </div>

     </div>
 </div>
</template>

<script>
    import Bus from '../common/Bus'
    export default {
        name: "TabBoundary",
        props:{
            editlist:Array
        },
        data:function(){
            return {
                active:null,
                showPro:false
            }
        },
        methods:{
           select:function (i) {
               if (i.indexOf('pro')>-1){
                   this.showPro=!this.showPro
               }
               if (i.indexOf('ok')>-1){
                   //完成编辑
                   this.showPro=false
               }
               Bus.$emit('control',i)
               this.active=i;
           }

        }
    }
</script>

<style lang="scss" module>
  .root{


      height: 34px;
      z-index: 99;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .con{
          span{
              width: 30%;
              line-height: inherit;

              cursor: pointer;
              text-align: center;

              padding: 0 0.01rem;

          }

      }
     .pro{

     }

      .height{
          background-color: #337ab7;
        color: whitesmoke;
      }
      .normal{
          background-color: whitesmoke;
        color: black;
      }
  }
</style>
