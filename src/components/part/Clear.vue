<template>
    <div>
      <button class="btn"><span class="glyphicon glyphicon-erase white" @click="clear"></span></button>
    </div>
</template>

<script>
    export default {
        name: "Clear",
        methods:{
          clear(){
            bus.$emit('clear')
          }
        }
    }
</script>

<style scoped>
  button{
    border: 1px solid #6cc0ed;
  }
.glyphicon{
  color:#6cc0ed;
}
</style>
