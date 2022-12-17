<template>
  <div id="topSwipe">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {requestBanner} from "@/api/homeRequest"
import {reactive,onMounted} from "vue"
export default {
  name: "TopSwipe",
  setup() {
    const state= reactive({images:[
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]})
    onMounted(async ()=>{
        try {
            let result = await requestBanner()
            state.images=result.data.banners
        } catch (error) {
            console.log(error.message);
        }
    })
   
    return { state };
  },
  
};
</script>

<style lang="less">
#topSwipe {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe__track {
      .van-swipe-item {
        padding: 0 0.2rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 139, 130);
    }
  }
}
</style>
