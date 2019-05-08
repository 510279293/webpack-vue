<template>
    <div class="app">
       {{msg}}
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
   }
</style>
