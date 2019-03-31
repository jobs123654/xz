<template>
    <div>
      <ul class="list-group">
        <li class="list-group-item" v-for="(item,i) in list" @click="select(i)" :class="key==i?'height':'normal'">
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
          }
       },
       methods:{
          select:function (item) {
             this.key=item
          }
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
  margin-top: 20%;
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
