<template>
    <div class="app">
       {{msg}}
       <md-button class="button button-assertive button-block">
        just a button
      </md-button>
    </div>
</template>
<script>
export default {
   name: 'App',
   data(){
       return {
           msg: 'zyy, i love you'
       }
   }
}
</script>
<style lang="less" scoped>
   .app{
       color:pink;
       font-size: 20px;
   }
</style>
