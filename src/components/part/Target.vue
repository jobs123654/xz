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
            <select name="" class="form-control" v-model="targetItem" @click="selectItem">
              <option v-for="i in target.items" :value="i">{{i.name}}</option>
            </select>
          </div>

          <div class="col-sm-10" v-if="children&&children.length">
            <select name="" class="form-control" v-model="targetItem1">
              <option v-for="i in children" :value="i.name">{{i.name}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label  class="col-sm-2 control-label"><span>{{target.cityTitle}}</span>

          </label>
          <div class="col-sm-10">
            <ul class="list-group">
              <li class="list-group-item" v-for="i in citys" :key="i.id">
                <input type="checkbox" :id="i.id" :value="i" v-model="checklist">
                <label :for="i.id" >{{i.name}}</label>
              </li>
            </ul>
          </div>
          <div class="col-sm-10">
            <div class="checkbox" style="margin-left: 35%">
              <label>
                <input type="checkbox" @click="checkAll=!checkAll" v-model="checkAll"> 全选
              </label>
              <label>
                <input type="checkbox" @click="cancelAll=!cancelAll" v-model="cancelAll"> 反选
              </label>
            </div>
          </div>



        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <label class="col-sm-2 control-label">{{target.selectTime}}</label>
            <div class="input-group">
              <input type="text" class="form-control" v-model="yearResult">
              <div class="input-group-addon glyphicon glyphicon-time btn" @click="selectTime"></div>
            </div>

            <ul style="height: 200px; overflow: auto;position: absolute; width: 50%;left: 100px;z-index: 10;background-color: white" v-show="showYear">
              <li v-for="i in years" style="list-style: none;">
                <input type="checkbox" :id="i.name" :value="i" v-model="yearlist">
                <label :for="i.name">{{i.name}}</label>
              </li>
            </ul>
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
            visible:true,
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
            yearResult:''
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
      },
      mounted(){
          bus.$on('xingtai',this.show)
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
                  a.push(e.name)
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
