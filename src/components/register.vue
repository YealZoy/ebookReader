<template>
  <div class="register">
    <div class="top-content">
      <div class="inner-bg">
        <div class="container">

          <div class="row">
            <div class="col-sm-6 col-sm-offset-3 form-box">
              <div class="form-top">
                <div class="form-top-left">
                  <h3>register to our site</h3>
                </div>
                <div class="form-top-right">
                  <i class="fa fa-key"></i>
                </div>
              </div>
              <div class="form-bottom">
                <div class="form-group">
                  <label class="sr-only" >Username</label>
                  <input type="text" name="form-username" placeholder="Username..." class="form-username form-control" v-model="uname">
                </div>
                <div class="form-group">
                  <label class="sr-only" >Password</label>
                  <input type="password" name="form-password" placeholder="Password..." class="form-password form-control" v-model="password">
                </div>

                <div class="form-group">
                  <label class="sr-only" >headimgurl</label>
                  <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
                </div>
                <button class="btn" v-on:click="registe">Sign up!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="btn bottom" v-on:click="login">login</button>
  </div>
</template>

<script>
  export default{
    name: 'register',
    data: function(){
      return {
        uname: '',
        password: '',
        headimgurl: '',
        file:''
      }
    },
    methods: {
      update(e){
        let _this = this;
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; //添加请求头
        this.$axios.post('http://ebookreader.zhengyuyan.com/headimg',param,config)
          .then(response=>{
            console.log(response.data.data);
            _this.headimgurl = response.data.data;
          })
      },
      registe: function(){
        console.log(this);
        var _this = this;
        this.$axios.post('http://ebookreader.zhengyuyan.com/register', {
          uname: _this.uname,
          password: _this.password,
          headimgurl: _this.headimgurl
        })
          .then(function (response) {

            console.log(response.data.code);
            if(response.data && response.data.code && response.data.code == '1'){
              _this.$router.push('/');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      login: function(){
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  .bottom{
    position: fixed;
    right: 30px;
    bottom: 30px;
  }
</style>
