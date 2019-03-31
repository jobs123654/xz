<template>
  <div class="panel panel-default col-md-3">
    <div class="panel-heading">
      <h3>{{title}}</h3>
    </div>
    <div class="panel-body">
      <div class="form-horizontal">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">账号</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-1 col-sm-10">
            <div class="checkbox">
              <label>
                <input type="checkbox">记住我
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-1 col-md-10">
            <button type="button" class="btn btn-default" @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-footer">2019.6</div>
  </div>
</template>
<script>
  import config from '../config/config'
    export default {
        name: "Login",
       data:function(){
         return{
           title:config.title
         }
       },
        methods:{
          login:function () {
            this.$router.push('/index');
          }
        }
    }
</script>

<style scoped>
   .panel{
     position: absolute;
     left: 37%;
     top: 20%;
   }
</style>
