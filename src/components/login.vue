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
                    <label class="sr-only" for="uname">Username</label>
                    <input type="text" name="form-username" placeholder="Username..." class="form-username form-control" id="uname">
                  </div>
                  <div class="form-group">
                    <label class="sr-only" for="password">Password</label>
                    <input type="password" name="form-password" placeholder="Password..." class="form-password form-control" id="password">
                  </div>
                  <button class="btn" v-on:click="login">Sign in!</button>

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
        console.log(this);
        this.$axios.post('/api/login', {
          uname: this.uname,
          password: this.password
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        this.$router.push('list');
      }
    }
  }
</script>

<style scoped>

</style>
