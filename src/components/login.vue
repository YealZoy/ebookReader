<template>
  <div class="login">
    <button v-on:click="login">登录</button>
  </div>
</template>

<script>
  export default{
    name:'login',
    methods: {
      login: function(){
        this.$router.push('list');
      }
    }
  }
</script>

<style scoped>

</style>
