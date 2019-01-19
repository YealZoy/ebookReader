<template>
  <div class="upload">
    <div class="top-content">
      <div class="inner-bg">
        <div class="container">

          <div class="row">
            <div class="col-sm-6 col-sm-offset-3 form-box">
              <div class="form-top">
                <div class="form-top-left">
                  <h3>upload your book</h3>
                </div>
                <div class="form-top-right">
                  <i class="fa fa-key"></i>
                </div>
              </div>
              <div class="form-bottom">
                <div class="form-group">
                  <label class="sr-only" >书名</label>
                  <input type="text" name="form-username" placeholder="Username..." class="form-username form-control" v-model="bname">
                </div>
                <div class="form-group">
                  <label class="sr-only" >作者</label>
                  <input type="text" name="form-password" placeholder="Password..." class="form-password form-control" v-model="author">
                </div>
                <div class="form-group">
                  <label class="sr-only" >出版日期</label>
                  <input type="date" name="form-password" placeholder="Password..." class="form-password form-control" v-model="publishdate">
                </div>

                <div class="form-group">
                  <label class="sr-only" >封面</label>
                  <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="updatecover"/>
                </div>
                <div class="form-group">
                  <label class="sr-only" >书</label>
                  <input class="file" name="file" type="file" @change="updatebook"/>
                </div>
                <button class="btn" v-on:click="upload">upload!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  export default{
    name:'upload',
    data: function(){
      return {
        bname: '',
        author: '',
        publishdate:'',
        coverimg:'',
        bookurl:''
      }
    },
    methods: {
      updatecover(e){
        let _this = this;
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; //添加请求头
        this.$axios.post('http://ebookreader.zhengyuyan.com/coverimg',param,config)
          .then(response=>{
            console.log(response.data.data);
            _this.coverimg = response.data.data;
          })
      },
      updatebook(e){
        let _this = this;
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; //添加请求头
        this.$axios.post('http://ebookreader.zhengyuyan.com/bookfile',param,config)
          .then(response=>{
            console.log(response.data.data);
            _this.bookurl = response.data.data;
          })
          .catch(function (error) {
            alert(error);
            console.log(error);
          });
      },
      upload: function(){
        var _this = this;
        this.$axios.post('/api/addbook', {
          bname: this.bname,
          author: this.author,
          publishdate:this.publishdate,
          coverimg:this.coverimg,
          bookurl:this.bookurl
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            alert(error);
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>
  .sr-only {
     position: relative;
     width: auto;
     height: auto;

  }
</style>
