<template>
  <div class="menu-bar">
      <div class="menu-wrapper" :class="{'hide-box-shadow': ifSettingShow || !ifTitleAndMenuShow}" v-show="ifTitleAndMenuShow">
        <div class="icon-wrapper">
          <span class="icon-menu icon" @click="showSetting(3)"></span>
        </div>
        <!--<div class="icon-wrapper">-->
          <!--<span class="icon-progress icon" @click="showSetting(2)"></span>-->
        <!--</div>-->
        <div class="icon-wrapper">
          <span class="icon-bright icon" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon" @click="showSetting(0)">A</span>
        </div>
      </div>
      <div class="setting-wrapper" v-show="ifSettingShow">
        <div class="setting-font-size" v-if="showTag === 0">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
          <div class="select">
            <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
        </div>
        <div class="setting-theme" v-else-if="showTag === 1">
          <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
            <div class="preview" :style="{background: item.style.body.background}" :class="{'no-border': item.style.body.background !== '#fff'}"></div>
            <div class="text" :class="{'selected': index === defaultTheme}">{{item.name}}</div>
          </div>
        </div>
        <div class="setting-progress" v-else-if="showTag === 2">
          <div class="progress-wrapper">
            <input class="progress" type="range"
                                    max="100"
                                    min="0"
                                    step="1"
                                    @change="onProgressChange($event.target.value)" @input="onProgressInput($event.target.value)"
                                    :value="progress"
                                    :disabled="!bookAvailable"
                                    ref="progress">
          </div>
          <div class="text-wrapper">
            <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
          </div>
        </div>
      </div>
      <content-view :ifShowContent="ifShowContent"
                    v-show="ifShowContent"
                    :navigation="navigation"
                    :bookAvailable="bookAvailable"
                    @jumpTo="jumpTo"></content-view>
      <div class="content-mask"
            v-show="ifShowContent"
            @click="hideContent"></div>
  </div>
</template>

<script>
import ContentView from './Content.vue'
export default {
  components: {
    ContentView
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: {
      type: Boolean,
      default: true
    },
    navigation: Object
  },
  data() {
    return {
      ifSettingShow: false,
      showTag: 0,
      progress: 0,
      ifShowContent: false
    }
  },
  methods: {
    // 隐藏目录
    hideContent() {
      this.ifShowContent = false
    },
    // 跳转方法，调用父组件方法
    jumpTo(target) {
      this.$emit('jumpTo', target)
    },
    // 拖动进度条时触发事件
    onProgressInput(progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    // 进度条松开后触发事件，根据进度条数值跳转到指定位置
    onProgressChange(progress) {
      this.$emit('onProgressChange', progress)
    },
    // 设置主题
    setTheme(index) {
      this.$emit('setTheme', index)
    },
    // 设置字号
    setFontSize(fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    // 显示设置面板
    showSetting(tag) {
      this.showTag = tag
      if (this.showTag === 3) {
        this.ifSettingShow = false
        this.ifShowContent = true
      } else {
        this.ifSettingShow = true
      }
    },
    // 显示设置面板
    hideSetting() {
      this.ifSettingShow = false
    }
  }
}

</script>

<style scoped>
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: 1.333333rem;
    background: white;
    box-shadow: 0 .222222rem .222222rem rgba(0, 0, 0, .15);
  }
  .hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-bright {
    display: block;
    background: url("../assets/bright.png") center no-repeat;
    background-size: 50%;
    width: 1.333333rem;
    height: 1.333333rem;
  }
  .icon-menu {
    display: block;
    background: url("../assets/menu.png") center no-repeat;
    background-size: 50%;
    width: 1.333333rem;
    height: 1.333333rem;
  }
  .icon-progress {
    display: block;
    background: url("../assets/progress.png") center no-repeat;
    background-size: 50%;
    width: 1.333333rem;
    height: 1.333333rem;
  }
  .icon-a {
    font-size: .6rem;
  }
  .setting-wrapper {
    position: absolute;
    bottom: 1.333333rem;
    left: 0;
    z-index: 101;
    width: 100%;
    height: 1.666667rem;
    background: white;
    box-shadow: 0 -.222222rem .222222rem rgba(0, 0, 0, .15);
  }
  .setting-font-size {
    display: flex;
    height: 100%;
  }
  .menu-bar .setting-wrapper .setting-font-size .preview {
    flex: 0 0 1.111111rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
  }
  .select {
    display: flex;
    flex: 1;
  }
  .select-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .line {
    flex: 1;
    height: 0;
    border-top: .02777778rem solid #ccc;
  }
  .point-wrapper {
    position: relative;
    flex: 0 0 0;
    width: 0;
    height: .194444rem;
    border-left: .02777778rem solid #ccc;
  }
  .point {
    position: absolute;
    top: -.222222rem;
    left: -.277778rem;
    width: .555556rem;
    height: .555556rem;
    border-radius: 50%;
    background: white;
    border: .02777778rem solid #ccc;
    box-shadow: 0 .111111rem .111111rem rgba(0, 0, 0, .15);
  @include center;
  }
  .small-point {
    width: .1388889rem;
    height: .1388889rem;
    background: black;
    border-radius: 50%;
  }
  .setting-theme {
    height: 100%;
    display: flex;
  }
  .setting-theme-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: .1388889rem;
    box-sizing: border-box;
  }
  .preview {
    flex: 1;
    border: .0277778rem solid #ccc;
    box-sizing: border-box;
  }
  .preview .no-border {
     border: none;
  }
  .text {
    flex: 0 0 .555556rem;
    font-size: .388889rem;
    color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text .selected {
     color: #333;
  }
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .progress-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 .8333333rem;
    box-sizing: border-box;
  }
  .progress {
    width: 100%;
    -webkit-appearance: none;
    height: .0555556rem;
    background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
    background-size: 0 100%;
  }
  .text-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #333;
    font-size: .333333rem;
    text-align: center;
  }
  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, .8);
  }
</style>
