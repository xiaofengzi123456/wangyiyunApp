<template>
   <router-view></router-view>
   <DetailFooter/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
 *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 }
 .icon {
       width: .5rem;
       height: .5rem;
    }
</style>
