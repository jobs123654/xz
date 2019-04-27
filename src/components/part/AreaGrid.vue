<template>
    <div class="panel panel-default col-md-2" v-show="visible" >
        <div class="panel-heading">
            <span>区域网格</span>
            <span @click="visible=false" class="close">&times;</span>
        </div>
        <div class="panel-body col-md-12">

            <div class="form-horizontal ">
                <div class="form-group" @click="selectYear(item)" v-for="(item,i) in grid"  :key="item.year">
                   <!-- <Select v-model="years" style="width:200px">
                        <Option v-for="item in years" :value="item" :key="item">{{ item }}</Option>
                    </Select>-->
                    <lable>{{item.year}}年</lable>

                    <div class="input-group"  >
                        <Checkbox v-for="j in item.type"  @on-change="select(j)" :value="j.name" :key="j.id" >{{j.name}}</Checkbox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AreaGrid",
        props:{
          grid:Array
        },
        mounted(){
            bus.$on('areaGridShow',e=>{
                this.visible=true
            })
            bus.$on('areaGridClose',e=>{
                 this.visible=false
            })
            this.grid.map(e=>{
                e.type.map(i=>{
                    i.id=func.getRanDomID()
                })
            })
            console.log(this.grid)
        },
        data(){
            return{
                src:[],
                visible:false,
                areas:[],
                years:this.grid.filter(e=>e.year),
                item:{},
            }
        },
        methods:{
            selectYear(item){
                this.item=item;
            },
            select(item){
                let ele=this.item.type.filter(e=>e.name===item[0])[0]
                if (!item.checked){
                    bus.$emit('queryBySql',{
                        dataSourceName:config.citysQuery.dataSourceName,
                        dataSetName:'唐山市'+this.item.year,
                        attr:`用地类型 like '%${item.name}%'`,
                        id:item.id,
                        color:this.item.color
                    })
                    item.checked=true
                } else{
                    bus.$emit('removeLayer',item)
                    item.checked=false
                }
            }
        }
    }
</script>

<style scoped>

</style>
