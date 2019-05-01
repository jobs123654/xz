<template>
    <div v-show="visible">
      <ul class="list-group">
        <li class="list-group-item" v-for="(item,i) in list" @click="select(item,i)" :class="key==i?'height':'normal'">
          {{item.name}}
        </li>

      </ul>
    </div>
</template>

<script>
    export default {
        name: "SecondMenu",
       props:{
          list:Array,
       },
       data:function(){
          return{
            key:null,
            visible:false,

          }
       },
       methods:{

          select:function (item,i) {

             this.key=i

            bus.$emit(item.event)
          }
       },
      mounted(){
        bus.$on('showTool',e=>{
          this.visible=!this.visible
        })
        bus.$on('closeTool',e=>{
          this.visible=false
        })
      },
      computed:{
        items(){
          return this.$store.state.SecondMenuList
        }
      },
      watch:{
        items(){
          this.list=this.items;
          this.key=null
        }
      }
    }
</script>

<style scoped>
li{
  margin-top: 18%;
  cursor: pointer;
}
  .height{
    background-color: lightskyblue;
    color: white;
  }
  .normal{
    background-color: white;
    color: black;
  }
</style>
