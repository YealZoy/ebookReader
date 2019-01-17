<template>
  <div class="container">
    <div class="row-fluid">
      <div class="span12">
        <input class="input-medium search-query" type="text" /> <button type="submit" class="btn">查找</button>
      </div>
    </div>
    <ul class="thumbnails">
      <li class="span4">
        <div class="thumbnail">
          <img alt="300x200" src="/static/book1.jpg" />
        </div>
      </li>
      <li v-for="item in list" class="span4">
        <div class="thumbnail">
          <img alt="300x200" :src="item" />
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
        list: [
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
          '/static/book1.jpg',
        ]
      }
    },
    created(){

      console.log(this);
      var _this = this;
      window.onscroll = function(){

        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollTop+windowHeight==scrollHeight){
          //写后台加载数据的函数
          for(var i = 0; i < 4; i++){
            _this.list.push('/static/book1.jpg');
          }

        }
      }
    }
  }
</script>

<style scoped>
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
    width: 80%;
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
