<template>
  <div class="title-wrapper" v-show="ifTitleAndMenuShow">
        <div class="left">
          <span class="icon-back icon" @click="goBack"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="icon-cart icon"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-person icon"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-more icon"></span>
          </div>
        </div>
      </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack () {
      this.$emit('goBack')
    }
  }
}
</script>

<style scoped>
  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    height: 1.333333rem;
    background: white;
    box-shadow: 0 .222222rem .222222rem rgba(0, 0, 0, .15);
  }
  .icon-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-back {
    display: block;
    background: url("../assets/back.png") center no-repeat;
    background-size: 50%;
    width: 1.333333rem;
    height: 1.333333rem;
  }
</style>
