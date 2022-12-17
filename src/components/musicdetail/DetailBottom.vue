<template>
  <div class="detailBottom" v-if="songsList.length > 0">
    <div class="bottomTop">
      <div class="bottomTop-left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>
          播放全部
          <span class="small">(共{{ songsList.length }}首)</span>
        </span>
      </div>
      <div class="bottomTop-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao1"></use>
        </svg>
        <span> 收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <ul class="bottomBottom">
      <li class="song" v-for="(song, index) in songsList" :key="song.id">
        <div class="bottomBottom-left">
          <span class="index">{{ index + 1 }}</span>
        <div class="songDetail" @click="updateSongsListIndex(index)">
          <p class="songName">{{ song.name }}</p>
          <span class="authorName" v-for="author in song.ar" :key="author.id">{{
            author.name
          }}</span>
        </div>
        </div>
        <div class="bottomBottom-right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao2"></use>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            v-if="!song.mv == 0"
            style="margin-right: 20px"
          >
            <use xlink:href="#icon-shipinbofangliang"></use>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "DetailBottom",
  props: ["songsList", "subscribedCount"],
  setup() {
    const store = useStore();

    function updateSongsListIndex(index) {
      // const isPlay = store.state.isPlay;
      const songsListIndex = store.state.songsListIndex;
      if (index == songsListIndex) {
          store.commit("UPDATEISPLAY", true);
      }
      store.commit("UPDATESONGSLISTINDEX", index);
    }

    return {
      updateSongsListIndex,
    };
  },
};
</script>

<style lang="less" scoped>
.detailBottom {
  margin-top: 0.5rem;
  background-color: white;
  width: 100%;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  padding: 0.2rem;
  .bottomTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bottomTop-left {
      width: 3.5rem;
      display: flex;
      align-items: center;
      color: black;
      font-size: 0.32rem;
      font-weight: 900;
      .icon {
        margin-right: 0.4rem;
      }
      .small {
        font-size: 0.24rem;
        color: grey;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      }
    }
    .bottomTop-right {
      background-color: red;
      border-radius: 0.4rem;
      height: 0.8rem;
      min-width: 2.6rem;
      padding: 0 0.1rem;
      font-size: 16px;
      color: white;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon {
        margin-right: 0.1rem;
      }
    }
  }
  .bottomBottom {
    padding-bottom: 1.4rem;
    .song {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0;
      height: 1rem;
      overflow: hidden;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      .bottomBottom-left{
         display: flex;
         justify-content: flex-start;
          align-items: center;
        .index {
        margin-right: 0.2rem;
        width: 0.4rem;
      }
      .songDetail {
        width: 5rem;
        height: 100%;
        overflow: hidden;
        .songName {
          height: 0.5rem;
          line-height: 0.5rem;
          overflow: hidden;
          font-size: .36rem;
          font-weight: 900;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .authorName {
          height: 0.5rem;
          font-size: 0.32rem;
          color: rgb(170, 162, 162);
          margin-right: 0.2rem;
        }
      }
      }
      
      .bottomBottom-right {
        width: 1.5rem;
        height: 0.5rem;
        svg {
          float: right;
        }
      }
    }
  }
}
</style>
