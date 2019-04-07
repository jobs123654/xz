<template>
    <div class="panel panel-default">
        <div class="panel-heading">综合检索</div>
        <div class="panel-body">

        </div>
    </div>
</template>

<script>
    export default {
        name: "Query",
        data(){
            return{
             visible:true
            }
        },
        methods:{
            query(){
                this.close()
            },
            close(){
                this.visible=false
            }
        }
    }
</script>

<style scoped>

</style>
