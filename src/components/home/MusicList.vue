<template>
  <div class="musicTop">
    <h2>发现好歌单</h2>
    <div>查看更多</div>
  </div>
  <div class="musicList">
    <van-swipe :loop="false" :width="135" :show-indicators="false">
      <van-swipe-item
        v-for="music in state.musics"
        :key="music.id"
        style="width: 2.5rem;"
      >
      <router-link :to="`/musicdetail?id=${music.id}`">
        <img :src="music.picUrl" />
        <span class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
          </svg>
          {{ music.playCount }}
        </span>
        <span class="name">{{ music.name }}</span>
      </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { requestMusicList } from "@/api/homeRequest";
import { reactive, onMounted } from "vue";
export default {
  name: "MusicList",
  setup() {
    let state = reactive({ musics: [] });
    onMounted(async () => {
      try {
        let result = await requestMusicList();
        state.musics = result.data.result;
        state.musics.forEach((item) => {
          if (item.playCount >= 100000000) {
            item.playCount = (item.playCount / 100000000).toFixed(1) + "亿";
          } else if (item.playCount >= 10000) {
            item.playCount =(item.playCount / 10000).toFixed(1)+ "万";
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    });

    return { state };
  },
};
</script>

<style lang="less" scoped>
.musicTop {
  width: 100%;
  height: 0.6rem;
  padding: 0 0.2rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    height: 0.6rem;
    width: 1.5rem;
    border: 0.02rem solid rgb(153, 145, 145);
    border-radius: 0.3rem;
    line-height: 0.58rem;
    text-align: center;
  }
}
.musicList {
  margin-top: 0.2rem;
  width: 100%;
  // height:3.5rem;
  height: 4.1rem;
  padding: 0.2rem;
  .van-swipe {
    .van-swipe-item {
      display: flex;
      flex-direction: column;
      width: 2.5rem;
      margin-right: 0.2rem;
      position: relative;
      a{
        color: black;
      img {
        width: 2.5rem;
        height: 2.5rem;
        vertical-align: bottom;
        border-radius: 0.3rem;
      }
      .playCount {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        color: white;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      }
    }
  }
}
</style>
