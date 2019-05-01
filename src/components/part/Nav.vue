<template>
  <ul class="nav  nav-pills root" >
    <li v-for="(item) in list"  role="presentation" @click="select(item)">
      <a href="#">{{item.name}}</a>
    </li>
    <li style="margin-left: 10%">
      <QueryToolBar></QueryToolBar>
    </li>
  </ul>
</template>

<script>
   import QueryToolBar from './QueryToolBar'
    export default {
        name: "Nav",
         props:{
          list:Array
         },
       components:{
          QueryToolBar,
       },
        methods:{

          select:function (i) {
            this.$store.commit('setSecondMenuList',i.children)
            if (i.name.indexOf('个人')>-1){
              this.$store.commit('setShowCenter',true)
            }
            bus.$emit(i.event)
          }
        },

    }
</script>

<style scoped>
  .root{

  }
</style>
