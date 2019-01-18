<template>
  <div class="container">
    <div class="row-fluid">
      <div class="span12">
        <div class="head" v-on:click="goback"><img :src="headimgurl" /></div>
        <input class="input-medium search-query" type="text" v-model="bname" />
        <button class="btn" v-on:click="search">查找</button>
      </div>
    </div>
    <ul class="thumbnails">
      <li v-for="item in list" class="span4">
        <div class="thumbnail" v-on:click="read(item)">
          <img alt="300x200" :src="item.coverimg" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name:'list',
    data: function(){
      return {
        uid: this.$route.params.uid,
        bname:'',
        headimgurl: this.$route.params.headimgurl !== null ? 'http://ebookreader.zhengyuyan.com/' + this.$route.params.headimgurl : 'static/book1.jpg',
        list: []
      }
    },
    mounted: function() {
      console.log(this.$route.params.headimgurl == null);
      var _this = this;
      console.log(this.$route.params.uid);
      this.$axios.get('http://ebookreader.zhengyuyan.com/listbook?uid=' + _this.uid)
        .then(function (response) {
          console.log(response.data.data);
          var data = response.data.data;
          if(data){
            for(var i = 0;i < data.length; i++){
              if(data[i].coverimg == null || data[i].coverimg == ''){
                data[i].coverimg = 'static/book1.jpg';

              }else{
                data[i].coverimg = 'http://ebookreader.zhengyuyan.com' + data[i].coverimg;
              }
              _this.list.push(data[i]);
            }
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {

      search: function(){
        var _this = this;
        console.log(this.bname);
        this.$axios.get('http://ebookreader.zhengyuyan.com/listbook', {
          uid: this.uid,
          bname: this.bname
        })
          .then(function (response) {
            console.log(response.data.data);
            var data = response.data.data;
            if(data){
              _this.list = [];
              for(var i = 0;i < data.length; i++){
                if(data[i].coverimg == null || data[i].coverimg == ''){
                  data[i].coverimg = 'static/book1.jpg';
                  _this.list.push(data[i]);
                }
              }
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      read: function(item){
        var _this = this;
        console.log({
          bid: item.bid,
          uid: _this.uid,
          chapter: item.chapter,
          page: item.page
        });
        this.$router.push({
          name: 'read',
          params: {
            bid: item.bid,
            uid: _this.uid,
            chapter: item.chapter,
            page: item.page,
            bookurl: item.bookurl,
            headimgurl: _this.$route.params.headimgurl
          }
        })
      },
      goback: function(){
        this.$router.push('/');
      }
    },
    created(){

//      console.log(this);
//      var _this = this;
//      window.onscroll = function(){
//
//        //变量scrollTop是滚动条滚动时，距离顶部的距离
//        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
//        //变量windowHeight是可视区的高度
//        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
//        //变量scrollHeight是滚动条的总高度
//        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
//        //滚动条到底部的条件
//        if(scrollTop+windowHeight==scrollHeight){
//          //写后台加载数据的函数
//          for(var i = 0; i < 4; i++){
//            _this.list.push('/static/book1.jpg');
//          }
//
//        }
      //}
    }
  }
</script>

<style scoped>
  .head{
    width: 33px;
    height: 33px;
    display: inline-block;
    overflow: hidden;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 11px;
  }
  .head img{
    width: 100%;
    height: 100px;
  }
  .container {
     padding-right: 0;
     padding-left: 0;
     margin-right: auto;
      margin-left: auto;
  }
  .row-fluid{
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #2c3e50;
  }
  .search-query{
    width: 67%;
  }
  .thumbnails {
    list-style: none;
    *zoom: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 30px;
  }
  .thumbnails:before, .thumbnails:after {
    display: table;
    content: "";
    line-height: 0;
  }

  .thumbnails:after {
    clear: both;
  }
  .thumbnails:before, .thumbnails:after {
    display: table;
    content: "";
    line-height: 0;
  }
.span4{
  width: 31%;
  display: block;
  min-height: 30px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
  margin-left: 2%;
  *margin-left: 2%;
}
.thumbnail {
  display: block;
  padding: 4px;
  line-height: 20px;
  border: 1px solid #ddd;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.thumbnail>img {
  display: block;
  width: 112px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
}
</style>
