<template>
  <div class="home-top-container">
    <div class="left-list">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="middle">
      <span @click="toUserInfo">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="right" @click="toSearch">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router"
export default {
  name: "TopNav",
  setup(){
    const router=useRouter()
    function toSearch(){
      router.push({
        path:'/search'
      })
    }
    function toUserInfo(){
       router.push({
        path:'/userinfo'
      })
    }

    return {
      toSearch,
      toUserInfo
    }
  }
};
</script>

<style lang="less" scoped>
    .home-top-container{
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;   
        align-items: center;

        .middle{
            width: 65%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: .36rem;

            .active{
                font-weight: 900;
            }

        }
    }
</style>