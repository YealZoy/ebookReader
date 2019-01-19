<template>
    <div class="ebook">
        <title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow" @goBack="postBook"></title-bar>
        <div class="read-wrapper">
            <div id="read"></div>
            <div class="mask">
                <div class="left" @click="prevPage"></div>
                <div class="center" @click="toggleTitleAndMenu"></div>
                <div class="right" @click="nextPage"></div>
            </div>
        </div>
        <menu-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"
                  :fontSizeList="fontSizeList"
                  :defaultFontSize="defaultFontSize"
                  @setFontSize="setFontSize"
                  :themeList="themeList"
                  :defaultTheme="defaultTheme"
                  @setTheme="setTheme"
                  :bookAvailable="bookAvailable"
                  @onProgressChange="onProgressChange"
                  :navigation="navigation"
                  @jumpTo="jumpTo"
                  ref="menuBar"></menu-bar>
    </div>
</template>

<script>
import TitleBar from './TitleBar.vue'
import MenuBar from './MenuBar.vue'
import Epub from 'epubjs'
global.ePub = Epub
/* eslint-disable */
export default {
    components: {
        TitleBar,
        MenuBar
    },
    data() {
        return {
          ifTitleAndMenuShow: false,
          fontSizeList: [
              { fontSize: 12 },
              { fontSize: 14 },
              { fontSize: 16 },
              { fontSize: 18 },
              { fontSize: 20 },
              { fontSize: 22 },
              { fontSize: 24 }
          ],
          defaultFontSize: 16,
          themeList: [
              {
                  name: 'default',
                  style: {
                      body: {
                          'color': '#000', 'background': '#fff'
                      }
                  }
              },
              {
                  name: 'eye',
                  style: {
                      body: {
                          'color': '#000', 'background': '#ceeaba'
                      }
                  }
              },
              {
                  name: 'night',
                  style: {
                      body: {
                          'color': '#fff', 'background': '#000'
                      }
                  }
              },
              {
                  name: 'gold',
                  style: {
                      body: {
                          'color': '#000', 'background': 'rgb(241, 236, 226)'
                      }
                  }
              }
          ],
          defaultTheme: 0,
          // 图书是否处于可用状态
          bookAvailable: true,
          navigation: {},
          bid: this.$route.params.bid,
          uid: this.$route.params.uid,
          chapter: this.$route.params.chapter,
          page: this.$route.params.page,
          bookurl: this.$route.params.bookurl,
          headimgurl: this.$route.params.headimgurl,
          token: this.$route.params.token
        }
    },
    methods: {
        // 根据链接跳转到指定位置
        jumpTo(href) {
            this.rendition.display(href)
            this.hideTitleAndMenu()
        },
        hideTitleAndMenu() {
            // 隐藏标题栏和菜单栏
            this.ifTitleAndMenuShow = false
            // 隐藏菜单栏弹出的设置栏
            this.$refs.menuBar.hideSetting()
            // 隐藏目录
            this.$refs.menuBar.hideContent()
        },
        // progress 进度条的数值（0-100）
        onProgressChange(progress) {
            const percentage = progress / 100
            const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
            this.rendition.display(location)
        },
        // 设置主题
        setTheme(index) {
            this.themes.select(this.themeList[index].name)
            this.defaultTheme = index
        },
        // 注册主题
        registerTheme() {
            this.themeList.forEach(theme => {
                this.themes.register(theme.name, theme.style)
            })
        },
        // 设置字号大小
        setFontSize(fontSize) {
            this.defaultFontSize = fontSize
            if (this.themes) {
                this.themes.fontSize(fontSize + 'px')
            }
        },
        // 切换标题和菜单的显示状态
        toggleTitleAndMenu() {
            this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
            if (!this.ifTitleAndMenuShow) {
                this.$refs.menuBar.hideSetting()
            }
        },
        // 上一页
        prevPage() {
          if(this,rendition.location.start != undefined){
            this.rendition.prev()
          }
        },
        // 下一页
        nextPage() {
            if (this.rendition) {
              this.rendition.next()
            }
        },
        // 电子书的解析和渲染
        showEpub() {
            // 生成Book对象
            this.book = new Epub('http://ebookreader.zhengyuyan.com' + this.bookurl)
          console.log(this.bookurl)
            // 通过Book.renderTo生成Rendition对象
            this.rendition = this.book.renderTo('read', {
                width: window.innerWidth,
                height: window.innerHeight,
                restore: true,
                // 兼容iOS
                method: 'default'
            })
            // 通过Rendtion.display渲染电子书

            // 获取Theme对象
            this.themes = this.rendition.themes
            // 设置默认字体
            this.setFontSize(this.defaultFontSize)
            // 注册主题
            this.registerTheme()
            // 设置默认主题
            this.setTheme(this.defaultTheme)
            // Book对象的钩子函数ready
            this.book.ready.then(() => {
                this.navigation = this.book.navigation
                this.startChapter = this.navigation.toc[0].href;
                this.endChapter = this.navigation.toc[this.navigation.toc.length-1].href;
                if(!this.chapter){
                  this.chapter = this.startChapter
                }
                this.rendition.display(this.chapter)
                // 生成Locations对象
                this.book.locations.generate()
            }).then(result => {
                // 保存locations对象
                this.locations = this.book.locations
                // 标记电子书为解析完毕状态
                this.bookAvailable = true
            })
        },
      postBook(){
        var _this = this;
        if(this.rendition.location){
          _this.href = this.rendition.location.start.href
          _this.currentPage = this.rendition.location.start.displayed.page
        }else{
          _this.href = this.chapter
          _this.currentPage = this.page
        }

        _this.$axios.defaults.headers.common['token'] = _this.token
        this.$axios.post('http://ebookreader.zhengyuyan.com/addrecord', {
          bid: _this.bid,
          uid: _this.uid,
          chapter: _this.href,
          page: _this.currentPage,
          bookurl: _this.bookurl
        })
          .then(function (response) {
            _this.$router.push({
              name:'list',
              params:{
                uid: _this.uid,
                headimgurl: _this.headimgurl,
                token: _this.token
              }
            });
          })
          .catch(function (error) {
          });
      }
    },
    mounted() {
      this.showEpub()
    }
}
</script>

<style scoped>
    .ebook {
        position: relative;
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        width: 100%;
        height: 100%;
    }
    .mask .left {
        flex: 0 0 2.7777778rem;
    }
    .mask .center {
        flex: 1;
    }
    .mask .right {
        flex: 0 0 2.7777778rem;
    }
</style>
