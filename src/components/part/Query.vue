<template>
    <div class="panel panel-default col-md-4" v-show="visible">
        <div class="panel-heading" style="display: flex;">
            <span style="flex: 70%">综合检索</span>
            <span style="cursor: pointer;" @click="close">&times;</span>
        </div>
        <div class="panel-body">
            <div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>

                <div class="form-group">
                    <label>
                        <button type="submit" class="btn btn-default" @click="query">查询</button>
                        <a href="#" class="btn btn-default">更多</a>
                    </label>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Bus from '../common/Bus'
    export default {
        name: "Query",

            data(){
                return{
                 visible:true,
                    map:{}
                }
            },
        methods:{
            query(){
                Bus.$emit('query')
                this.close()
            },
            show(){
                this.visible=true
            },
            close(){
                this.visible=false
            }
        }
    }
</script>

<style scoped>

</style>
