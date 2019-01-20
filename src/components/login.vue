<template>
  <div class="login">
    <div class="top-content">
      <div class="inner-bg">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-sm-offset-3 form-box">
              <div class="form-top">
                <div class="form-top-left">
                  <h3>Login to our site</h3>
                </div>
                <div class="form-top-right">
                  <i class="fa fa-key"></i>
                </div>
              </div>

              <div class="form-bottom">
                <div class="form-group">
                  <label class="sr-only">Username</label>
                  <input type="text" name="form-username" placeholder="Username..." class="form-username form-control" v-model="uname">
                </div>
                <div class="form-group">
                  <label class="sr-only">Password</label>
                  <input type="password" name="form-password" placeholder="Password..." class="form-password form-control" v-model="password">
                </div>
                <button class="btn" v-on:click="login">Sign in!</button>
                <button class="btn" v-on:click="register">Sign up!</button>
                <a target="_self" href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx578d3b84be4aa096&redirect_uri=http%3A%2F%2Febookreader.zhengyuyan.com%2FcallBack&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect">weixin</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  export default{
    name:'login',
    data: function(){
      return {
        uname: '',
        password: ''
      }
    },
    methods: {
      login: function(){
        var _this = this;
        this.$axios.post('http://ebookreader.zhengyuyan.com/login', {
          uname: this.uname,
          password: this.password
        })
          .then(function (response) {
            if(response.data && response.data.code && response.data.code == 1){

              localStorage.uid = response.data.data.user.uid;
              localStorage.headimgurl=response.data.data.user.headimgurl;
              localStorage.token=response.data.data.token;
              _this.$axios.defaults.headers.common['token'] = response.data.data.token
              _this.$router.push({
                name: 'list',
                params:{
                  uid: response.data.data.user.uid,
                  headimgurl: response.data.data.user.headimgurl,
                  token:response.data.data.token
                }
              });
            }

          })
          .catch(function (error) {
            alert(error);
            console.log(error);
          });
      },
      register: function(){
        this.$router.push('register');
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
.form-bottom{
  margin-top: 50px;
}
.c-tab-nav {
  padding-right: 25;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0;
}
.c-tab-nav-item-qr {
  position: relative;
  z-index: 1;
}
.c-tab-nav-item {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  width: 50%;
  vertical-align: top;
  text-align: center;
  color: #666;
  font-size: 18px;
  font-weight: 700;
  line-height: 50px;
  cursor: pointer;
  overflow: hidden;
}
.c-tab-nav-item-qr:after {
  position: absolute;
  top: 15px;
  right: 0;
  z-index: 1;
  width: 1px;
  height: 20px;
  background-color: #ccc;
  content: '';
  font-size: 0;
  line-height: 0;
}
.is-tab-nav-item-active {
  color: #f10180;
  cursor: default;
}
.c-login-third-special {
  position: relative;
  z-index: 1;
  margin-bottom: 12px;
  margin-top: 30px;
  height: 40px;
}
.c-login-third-special:before {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -30px;
  z-index: 2;
  width: 60px;
  height: 40px;
  content: '';
  background-color: #fff;
}
.c-login-third-special:after {
  position: absolute;
  z-index: 1;
  content: '';
  top: 20px;
  left: 0;
  width: 100%;
  border-top: 1px solid #e0e0e0;
}
.c-login-third-wechat-wrapper {
  position: relative;
  z-index: 2;
  margin-right: auto;
  margin-left: auto;
  width: 40px;
  height: 40px;
}
.c-login-third-wechat {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.c-login-third-wechat-icon {
  background-image: url(//member-ssl.vipstatic.com/img/passport/sprites-hash-21600f5c.png?131e7010);
  background-position: -308px -161px;
  width: 40px;
  height: 40px;
  display: inline-block;
  position: relative;
  z-index: 3;
}
.c-login-third-wechat-text {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
</style>
