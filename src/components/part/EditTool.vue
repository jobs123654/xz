<template>
 <div class="root" v-show="visible">
     <div class="con">
         <span v-for="i in edit.tools" @click="select(i)" :class="i._class" :title="i.title"></span>
     </div>
     <div class="pro panel panel-default" v-show="showPro">
         <div class="panel-body">
             <div class="form-group">
               <select  class="form-control" v-model="year" @change="selectYear">
                 <option v-for="item in years" :value="item" :key="item">{{item}}年</option>
               </select>
             </div>
             <div class="form-group">
               <select  class="form-control" v-model="type" >
                 <option v-for="item in edit.areas" :value="item" :key="item.name">{{item.name}}</option>
               </select>
             </div>
           <div class="form-group">
             <input type="email" class="form-control" placeholder="备注"  v-model="other">
           </div>

           <div class="form-group" v-if="props.length" v-for="item in props" :key="item.name">
             <input type="text" class="form-control" :placeholder="item.name"  v-model="item.value">
           </div>

           <div class="form-group">
             <span class="btn glyphicon glyphicon-ok" @click="ok" title="完成"></span>&nbsp;&nbsp;<span class="glyphicon glyphicon-plus btn " @click="addPro" title="添加属性"></span>
             &nbsp;&nbsp;<span class="btn glyphicon glyphicon-trash " @click="delPro" title="删除属性"></span>
           </div>
         </div>

     </div>
 </div>
</template>

<script>
    export default {
        name: "TabBoundary",
        props:{
            edit:Object,

        },
        data:function(){
            return {
                active:null,
                showPro:false,
                visible:false,
                years:func.getYears().concat(['新增']),
                year:new Date().getFullYear(),
                type:this.edit.areas[0],
                props:[],
                other:''
            }
        },
           mounted(){
              bus.$on('showEdit',e=>{
                this.visible=!this.visible
              })
             bus.$on('showEditClose',e=>{
               this.visible=false
             })

           },
        methods:{
          selectYear(){
            if (this.year.indexOf('新增')>-1){
              let key=prompt('请输入年份','')
              if (key!=='')
              {
                this.years.push(key)
                this.years.splice(this.years.findIndex(e=>e.indexOf(`新增`)>-1),1);
                this.years.sort((a,b)=>b-a)
                this.years.push('新增')
                this.year=this.years[0]
              }
            }
          },
           select:function (i) {

               if (i.name.indexOf('pro')>-1){
                   this.showPro=!this.showPro
               }
              else if (i.name.indexOf('ok')>-1){
                   //完成编辑
                   this.showPro=false
               }else{
                 bus.$emit(i.event,{
                   dataSourceName:config.citysQuery.dataSourceName,
                   dataSetName:'唐山市'+this.year,
                   key:'query',
                   color:'blue'
                 })
               }

               // bus.$emit('control',i)
               // this.active=i;

           },
            addPro(){
             let key=prompt('请输入属性名称','')
              if (key!==''){
                this.props.push({
                  name:key,
                  value:''
                });
              }

            },
          delPro(){
            let key=prompt('请输入属性名称','')
            if (key!==''){
              let index=this.props.findIndex(e=>e.name.indexOf(key)>-1)
              if (index<0){
                alert('属性名称无效!');
                return
              }

              this.props.splice(index,1)
            }

          },
          ok(){
             let obj={}
             this.props.map(e=>{
               obj[e.name]=e.value
             });
             obj['year']=this.year
             obj['type']=this.type
             obj['other']=this.other
            this.$Message.info("添加成功！");

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
