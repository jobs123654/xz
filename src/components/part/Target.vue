<template>
  <div class="panel panel-default col-md-4" v-show="visible">
    <div class="panel-heading">
      <span>{{target.title}}</span>
      <span @click="close" class="close">&times;</span>
    </div>
    <div class="panel-body col-md-10">
      <div class="form-horizontal">

        <div class="form-group">
          <label class="col-sm-2 control-label">{{target.selectTitle}}</label>
          <div class="col-sm-10">
            <select name="" class="form-control" v-model="zhibiao" @change="selectItem">
              <option v-for="i in target.items" :value="i">{{i.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group" v-show="boths.length">
          <label class="col-sm-2 control-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <div class="col-sm-10" >
           <!--人口重心和经济重心-->
            <select name="" class="form-control" v-model="both">
              <option v-for="i in boths" :value="i">{{i.name}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label  class="col-sm-2 control-label"><span>{{target.cityTitle}}</span>

          </label>
          <div class="col-sm-10">
            <CheckboxGroup v-model="checklist">

              <Checkbox  v-for="(i,id) in citys" :key="id" :label="i.isChecked">{{i.name}}</Checkbox>
            </CheckboxGroup>

          </div>

          <div class="col-sm-10">
            <div class="checkbox" style="margin-left: 35%">

               <!--<label>-->

                <!--<input type="checkbox" @click="checkAll=!checkAll" v-model="checkAll"> 全选-->
              <!--</label>-->
              <!--<label>-->
                <!--<input type="checkbox" @click="cancelAll=!cancelAll" v-model="cancelAll"> 反选-->
              <!--</label>-->
              <label>
                <input type="checkbox"  v-model="showStyle"> 显示样式管理器
              </label>
            </div>
          </div>



        </div>


        <div class="form-group" style="z-index: 9">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default" @click="ok">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

    export default {
        name: "Target",
        props:{
          target:Object
        },
        data(){
          return{
            visible:false,
            targetItem:{},
            checklist:[],
             checkAll:false,
            cancelAll:false,
            citys:this.target.citys,
            children:[],
            targetItem1:{},
            both:{},
            boths:[],
            yearlist:[],
            showYear:false,
            yearResult:'',
            zhibiao:{},
            year:'2019',
            zhibiao1:{},
            showStyle:false
          }
        },
      watch:{
        checkAll(){
          if (this.checkAll){
            this.citys.map(e=>{
              this.checklist.push(e)
            })
          }else{
            this.checklist=[]
          }
          this.cancelAll=false
        },
        cancelAll(){
          if (this.cancelAll){
            if (!this.checklist.length)return
           this.citys.map((e,i)=>{
              if (this.checklist.indexOf(e)>-1){
                let index=this.checklist.indexOf(e)
                this.checklist.splice(index,1)
              }else{
                this.checklist.push(e)
              }
           })
          }
          this.checkAll=false
        },
        showStyle(){
          if (this.showStyle){
            bus.$emit('styleShow')
          } else{
            bus.$emit('styleClose')
          }
        }
      },
      mounted(){
          bus.$on('xingtai',e=>{
            this.visible=!this.visible
          })

           bus.$on('showImportant',e=>{
           bus.$emit('showImportantByMap',this.getImportantRK(e))
          })

      },
      methods:{
        selectItem(){

          this.boths=this.zhibiao.children?this.zhibiao.children:[]
        },
         close(){
            this.visible=false
          },
         ok(){
           let r=this.checklist.map(e=>e.id)
           if (this.both.name.indexOf('人口')>-1||this.both.name.indexOf('经济')>-1){
               let param=[]
             bus.$emit('showTime')
           }

         },

         getImportantJJ(){
           let param=[]
           this.target.citys.forEach(e=>{
             param.push({
               coor:e.p,
               num:this.target.man
             });
           });
           return func.getimportant(param,i)
         },
          getImportantRK(i){
           let param=[]
            this.target.citys.forEach(e=>{
              param.push({
                coor:e.p,
                num:e.man
              });
            });
           let result=func.getimportant(param,i)
           bus.$emit('receptImportant',result)
            return result
          },

         show(){
          this.visible=true
         },
        selectTime(){

          this.showYear=!this.showYear
          if (!this.showYear){
               let a=[]
               this.yearlist.map(e=>{
                  a.push(e)
               })
            this.yearResult=a.join(',')
          }
        }

      }
    }
</script>

<style lang="scss" scoped>
.panel{

}

</style>
