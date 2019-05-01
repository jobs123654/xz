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
            <select name="" class="form-control" v-model="zhibiao" @click="selectItem">
              <option v-for="i in target.items" :value="i">{{i.name}}</option>
            </select>
          </div>

          <div class="col-sm-10" v-if="children&&children.length">
            <select name="" class="form-control" v-model="zhibiao1">
              <option v-for="i in children" :value="i.name">{{i.name}}</option>
            </select>
          </div>

        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">选择年份</label>
          <div class="col-sm-10" >

            <select name="" class="form-control" v-model="year">
              <option v-for="i in years" :value="i">{{i}}年</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label  class="col-sm-2 control-label"><span>{{target.cityTitle}}</span>

          </label>
          <div class="col-sm-10">
            <CheckboxGroup v-model="checklist">

              <Checkbox  v-for="(i,id) in citys" :key="id" :label="i.name"></Checkbox>
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
            years:func.getYears(),
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
      },
      methods:{
        selectItem(){

          this.children=this.targetItem.children?this.targetItem.children:[]
        },
         close(){
            this.visible=false
          },
         ok(){
            console.log(this.checklist)
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
