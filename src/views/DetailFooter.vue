<template>
  <div class="footer" v-show="route.meta.isFooter">
    <div class="footer-left" @click="updateIsDrawerLayer">
      <img :src="songsList[songsListIndex].al.picUrl" />
      <div>
        <p>{{ songsList[songsListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footer-right">
      <svg
        class="icon"
        aria-hidden="true"
        v-show="!isPlay"
        @click="updateIsPlay"
      >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        v-show="isPlay"
        @click="updateIsPlay"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" style="margin-left: 0.4rem">
        <use xlink:href="#icon-24gf-playlistMusic"></use>
      </svg>
    </div>
   
    <audio 
      @ended="updateSongsListIndex"
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${songsList[songsListIndex].id}.mp3`"
    ></audio>

    <van-popup
      v-model:show="isDrawerLayer"
      position="right"
      style="height: 100%; width: 100%"
    >
      <SongArticle :song="songsList[songsListIndex]" :authorName="authorName" />
    </van-popup>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {useRoute} from "vue-router"
import { computed, ref, watch, provide, onMounted } from "vue";
import SongArticle from "@/components/musicdetail/DetailFooter/SongArticle";
// import { useRouter } from 'vue-router';
export default {
  name: "DetailFooter",
  setup() {
    let route=useRoute()
    let store = useStore();
    let songsList = computed(() => store.state.songsList);
    let songsListIndex = computed(() => store.state.songsListIndex);
    let isPlay = computed(() => store.state.isPlay);
    let isDrawerLayer = computed(() => store.state.isDrawerLayer);
    let authorName = ref("");
   
   console.log(songsList);

    const audio = ref(null);
    onMounted(() => {
      console.log([audio.value]);
      store.dispatch("getSongLyrics", songsList.value[songsListIndex.value].id)
      updateAuthor()
    });



    let timerInterval;
    function updateCurrentTime() {
      clearInterval(timerInterval);
      if (isPlay.value) {
        timerInterval = setInterval(() => {
          store.commit("UPDATECURRENTTIME", audio.value.currentTime);
          // console.log(store.state.currentTime);
        }, 500);
      } else {
        clearInterval(timerInterval);
      }
    }
    function updateIsPlay() {
      if (!isPlay.value) {
        store.commit("UPDATEISPLAY", true);
        audio.value.play();
      } else {
        store.commit("UPDATEISPLAY", false);
        audio.value.pause();
      }
      updateCurrentTime();
    }
    function updateIsDrawerLayer() {
      store.commit("UPDATEISDRAWERLAYER", true);
    }
    function updateDuration() { 
      setTimeout(()=>{
        store.commit("UPDATEDURATION", audio.value.duration);
      console.log("audio", audio.value.duration);
      console.log("store.state",store.state.duration);  
      },3000)
     
    }
    function updateSongsListIndex() {
      let index = songsListIndex.value + 1;
      if (index == songsList.value.length) {
        index = 0;
      }
      store.commit("UPDATESONGSLISTINDEX", index);
      //重新加载音频。由于已经获取不到歌曲播放链接，无法验证 load 方法
      audio.value.load()
    }
    function updateAuthor(){
      authorName.value = songsList.value[songsListIndex.value].ar.map((ele) => ele.name).join(" ")
    }

    provide("updateIsPlay", updateIsPlay);
    provide("isPlay", isPlay);

    watch(songsListIndex, () => {
      audio.value.autoplay = true;
      //  console.log([audio.value]);
      store.commit("UPDATEISPLAY", true);
      store.dispatch("getSongLyrics", songsList.value[songsListIndex.value].id)
       console.log("index改变")
       updateDuration();
       updateAuthor()
    });
    watch(isPlay, (newValue) => {
      if (newValue) {
        audio.value.play();
        // console.log([audio.value]);
        updateCurrentTime();
        store.dispatch("getSongLyrics", songsList.value[songsListIndex.value].id)
        console.log("isplay改变");
        updateDuration();
        updateAuthor()
      }
    });
    watch(songsList, () => {
      store.commit("UPDATEISPLAY", false);
      //此处有bug,歌单改变，有时候歌曲并未停止播放
      console.log("歌单改变，isplay：",isPlay.value,"歌曲应该停止");
      // audio.value.autoplay = false
      audio.value.pause();
      // console.log([audio.value]);
    });

    return {
      songsList,
      songsListIndex,
      isPlay,
      audio,
      updateIsPlay,
      isDrawerLayer,
      updateIsDrawerLayer,
      updateSongsListIndex,
      authorName,
      route
    };
  },
  components: {
    SongArticle,
  },
};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 1.4rem;
  position: fixed;
  bottom: 0;
  background-color: white;
  padding: 0.2rem;
  border-top: 1px solid rgb(180, 175, 175);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .footer-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.2rem;
    }
    div {
      width: 3.5rem;
      height: 1rem;
      overflow: hidden;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      p {
        height: 0.5rem;
        width: 100%;
        line-height: 0.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      span {
        color: rgb(172, 164, 164);
        line-height: 0.5rem;
        overflow: hidden;
      }
    }
  }
}
</style>
