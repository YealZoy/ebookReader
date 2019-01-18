<template>
  <transition name="slide-right">
    <div class="content">
      <div class="content-wrapper" v-if="bookAvailable">
        <div class="content-item" v-for="(item, index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
          <span class="text">{{item.label}}</span>
        </div>
      </div>
      <div class="empty" v-else>加载中...</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
export default {
  props: {
    ifShowContent: Boolean,
    navigation: Object,
    bookAvailable: Boolean
  },
  methods: {
    jumpTo(target) {
      this.$emit('jumpTo', target)
    }
  }
}
</script>

<style scoped>
  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 102;
    width: 80%;
    height: 100%;
    background: white;
  }
  .content-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .content-item {
    padding: .555556rem .416667rem;
    border-bottom: .027778rem solid #f4f4f4;
  }
  .text {
    font-size: .388889rem;
    color: #333;
  }
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .444444rem;
    color: #333;
  }
</style>
