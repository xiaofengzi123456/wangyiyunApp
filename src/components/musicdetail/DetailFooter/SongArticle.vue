<template>
  <div class="all">
    <img class="bgImg" :src="song.al.picUrl" alt="" />
    <div class="top_middle_container">
    <div class="top">
      <div class="top-left">
        <svg
          class="icon"
          aria-hidden="true"
          style="margin-right: 15px; width: 0.6rem; height:0.6rem;"
          @click="updateIsDrawerLayer"
        >
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="songInfo">
          <Vue3Marquee class="marquee" style="height: 0.6rem">
            {{ song.name }}
          </Vue3Marquee>
          <p>
            {{ authorName }}
            <svg
              class="icon"
              aria-hidden="true"
              style="width: 14px; height: 14px"
            >
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </p>
        </div>
      </div>
      <div class="top-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiangxiao"></use>
        </svg>
      </div>
    </div>
    <div class="middle">
      <div class="imgs" v-show="!isShowLyric" @click="updateIsShowLyric">
        <img
          class="needle"
          :class="{ needle_active: isPlay }"
          src="./img/needle-ab.png"
        />
        <img class="circle" src="./img/cipan.png" />
        <img
          class="songImg"
          :class="{ rotate_active: isPlay }"
          :src="song.al.picUrl"
          alt=""
        />
      </div>
      <div
        class="lyric clearfix"
        v-show="isShowLyric"
        ref="lyric"
        @click="updateIsShowLyric"
      >
        <p
          v-for="(lyric, index) in lyricArr"
          :key="index"
          :class="{
            lyric_active:
              lyric.time <= currentTime &&
              (currentTime <= lyric.nextTime || lyric.nextTime == 0),
          }"
        >
          {{ lyric.lyricWord }}
        </p>
      </div>
    </div>
    </div>
    <div class="bottom">
      <div class="allIcons">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinaixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          style="width: 0.9rem; height: 0.9rem"
        >
          <use xlink:href="#icon-changpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <input type="range" min="0" :max="duration" step="0.03" v-model="currentTime" class="range"/>
      <div class="play">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiaoxunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="updateSongsListIndex(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          style="width: 1rem; height: 1rem"
          v-show="!isPlay"
          @click="updateIsPlay"
        >
          <use xlink:href="#icon-yunhang"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          style="width: 1rem; height: 1rem"
          v-show="isPlay"
          @click="updateIsPlay"
        >
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="updateSongsListIndex(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { useStore } from "vuex";
import { computed, inject, watch, ref } from "vue";
export default {
  name: "SongArticle",
  props: ["song","authorName"],
  setup(props) {
    console.log(props);
    const store = useStore();
    const isShowLyric = computed(() => store.state.isShowLyric);
    //歌词：数组的最后一个元素未过滤出去
    const lyricArr = computed(() =>
      store.state.lyric.split(/\n/).map((item) => {
        const minutes = item.slice(1, 3);
        const seconds = item.slice(4, 6);
        let mSeconds = parseInt(item.slice(7, 10));
        if (isNaN(mSeconds)) {
          mSeconds = 0;
        }
        const lyricWord = item.slice(item.indexOf("]") + 1, item.length);
        const time = +minutes * 60 + +seconds + mSeconds / 1000;
        return { minutes, seconds, mSeconds, lyricWord, time };
      })
    );
    const currentTime = computed(() => store.state.currentTime);
    const songsListIndex = computed(() => store.state.songsListIndex);
    const songsList = computed(() => store.state.songsList);
    const duration = computed(() => store.state.duration);

    const lyric = ref(null);

    function updateIsDrawerLayer() {
      store.commit("UPDATEISDRAWERLAYER", false);
    }
    function updateIsShowLyric() {
      if (!isShowLyric.value) {
        store.dispatch("getSongLyrics", props.song.id);
        store.commit("UPDATEISSHOWLYRIC", true);
      } else {
        store.commit("UPDATEISSHOWLYRIC", false);
      }   
    }
    function updateSongsListIndex(i) {
      let index;
      if (i == -1) {
        index = songsListIndex.value - 1;
        if (index < 0) {
          index = songsList.value.length - 1;
        }
      }
      if (i == 1) {
        index = songsListIndex.value + 1;
        if (index == songsList.value.length) {
          index = 0;
        }
      }
      store.commit("UPDATESONGSLISTINDEX", index);
      store.dispatch("getSongLyrics", songsList.value[songsListIndex.value].id)
    }

    const updateIsPlay = inject("updateIsPlay");
    const isPlay = inject("isPlay");

    watch(lyricArr, () => {
      console.log("歌词变了");
      lyricArr.value.forEach((ele, index) => {
        if (index === lyricArr.value.length - 1) {
          lyricArr.value[index].nextTime = 0;
        } else {
          ele.nextTime = lyricArr.value[index + 1].time;
        }
      });
      console.log(lyricArr.value);
    });
    watch(currentTime, () => {
      let pActive = document.querySelector("p.lyric_active");
      // console.log("p", [pActive]);
      // console.log("lyric", lyric.value.style);
      if (pActive && pActive.offsetTop > 300) {
        lyric.value.scrollTop = pActive.offsetTop - 150;
      }
    });

    return {
      isPlay,
      // authorName,
      updateIsDrawerLayer,
      updateIsPlay,
      isShowLyric,
      updateIsShowLyric,
      lyricArr,
      currentTime,
      lyric,
      updateSongsListIndex,
      duration
    };
  },
  components: {
    Vue3Marquee,
  }
};
</script>

<style lang="less" scoped>
.clearfix::before,
.clearfix::after {
    content: "";
    display: table;
    clear: both;
  }
.all {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  align-items: center;
  .bgImg {
    position: absolute;
    z-index: -1;
    filter: blur(70px);
    width: 100%;
    height: 100%;
  }
  .top_middle_container{
    width: 100%;
   .top {
    overflow: hidden;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    width: 100%;
    .top-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 70%;
      height: 1rem;
      color: white;
      .songInfo {
        width: 80%;
        height: 1rem;
        overflow: hidden;
        p {
          width: 100%;
          height: .4rem;
          line-height: .4rem;
          font-size: 0.28rem;
          color: rgb(68, 63, 63);
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .icon {
            fill: rgb(68, 63, 63);
          }
        }
      }
    }
  }
  .middle {
    height: 9rem;
    width: 100%;
    overflow: hidden;
    .imgs {
      width: 100%;
      height: 6.96rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      .needle {
        width:2rem;
        transform: rotate(-12deg);
        transform-origin: 0 0;
        position: absolute;
        z-index: 1;
        left: 45%;
        top: -0.2rem;
        transition: all 2s;
      }
      .needle_active {
        width:2rem;
        transform: rotate(4deg);
        transform-origin: 0 0;
        position: absolute;
        z-index: 1;
        left: 45%;
        top: -0.2rem;
        transition: all 2s;
      }
      .circle {
        width: 4.5rem;
        margin-top: -0.8rem;
        position: absolute;
        top: 40%;
      }
      .songImg {
        width: 3rem;
        position: absolute;
        z-index: -1;
        top: 40%;
        border-radius: 50%;
        animation: imgRotate 20s infinite linear paused forwards;
      }
      .rotate_active {
        animation-play-state: running;
      }

      @keyframes imgRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
    .lyric {
      margin: 0.7rem 0;
      width: 100%;
      height: 82%;
      overflow: scroll;
      scroll-behavior: smooth;
      position: relative;
      p {
        width: 100%;
        text-align: center;
        margin-bottom: 0.3rem;
        font-size: 0.32rem;
        color: rgb(223, 215, 215);
      }
      .lyric_active {
        font-size: 0.4rem;
        color: white;
      }
    }
  }
  }
 
  .bottom {
    margin-top: .4rem;
    width: 100%;
    .allIcons,
    .play {
      width: 100%;
      height: 1.2rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        width: 0.7rem;
        height: 0.7rem;
      }
    }
    .range{
      width: 100%;
      height: .06rem;
    }
  }
}
</style>
