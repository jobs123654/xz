<template>
    <div class="panel panel-default col-md-4" v-show="visible">
        <div class="panel-heading" style="display: flex;">
            <span style="flex: 70%">综合检索</span>

            <span style="cursor: pointer;" @click="close">&times;</span>
        </div>
        <div class="panel-body">
              <div>
                <div class="form-group">
                    <input type="email" class="form-control"  id="exampleInputEmail1" placeholder="请输入区域ID/或名称">
                </div>
                <!--<div class="form-group">-->
                  <!--<select name="" v-model="type" class="form-control" id="">-->
                    <!--<option v-for="item in types" :value="item">{{item.name}}</option>-->
                  <!--</select>-->
                <!--</div>-->
                <!--<div class="form-group">-->
                  <!--<input type="email" class="form-control"  id="exampleInputEmail1" placeholder="请输入区域ID/或名称">-->
                <!--</div>-->
                <hr>
                <div class="form-group" >
                    <a href="#" class="glyphicon glyphicon-map-marker btn" @click="query(0)" title="点选查询"></a>
                    <a href="#" class="glyphicon glyphicon-retweet btn" @click="query(1)" title="拉框查询"></a>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default" @click="ok">确定</button>
                    <a href="#" class="btn btn-default" @click="close">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import EditTool from './EditTool'
    export default {
        name: "Query",

            data(){
                return{
                 visible:false,
                    map:{},
                    more:false,
                     propertyPanel:false,
                     isEdit:false,
                     types:config.edit.areas,
                     type:config.edit.areas[0],
                }
            },
          components:{
            EditTool,
          },watch:{
           isEdit(n,o){
             if (n){
               bus.$emit('showEdit')
             }else{
               bus.$emit('showEditClose')
             }
           }
      },
      mounted(){
           bus.$on('showQuery',e=>{
             this.visible=!this.visible
           })
        },
        methods:{
             ok(){
               bus.$emit('queryBySql',{
                 dataSourceName:config.citysQuery.dataSourceName,
                 dataSetName:config.citysQuery.dataSetName,
                 attr:''
               });

             },
            query(f){
              let event=''
                if (f){
                 event='queryByRect'
                } else{
                  event='queryByPoint'
                }

              bus.$emit(event,{
                dataSourceName:config.citysQuery.dataSourceName,
                dataSetName:config.citysQuery.dataSetName
              })
                this.close()
            },
            showMore(){
              this.more=!this.more
            },
            show(){
                this.visible=true
            },
            close(){
                this.visible=false
                this.more=false
              bus.$emit('showEditClose')
              this.isEdit=false
            }
        }
    }
</script>

<style scoped>

</style>
