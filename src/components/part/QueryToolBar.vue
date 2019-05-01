<template>
    <span class="btn glyphicon glyphicon-search" @click="showQuery" title="查詢"></span>
</template>

<script>
    export default {
        name: "QueryToolBar",
        methods:{
          showQuery(){
             bus.$emit('showQuery')
          },

        }
    }
</script>

<style scoped>

</style>
