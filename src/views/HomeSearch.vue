<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="goBack()">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="陈奕迅"
      v-model="keyWord"
      @blur="addHistory"
    />
  </div>
  <div class="topNext">
    <div class="historyContainer">
      <span class="historySpan">历史</span>
      <span
        class="history"
        v-for="(history, index) in historyList"
        :key="index"
        @click="searchList(history)"
        >{{ history }}</span
      >
    </div>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="container">
  <!-- <ul class="bottomBottom">
      <li class="song" v-for="(song, index) in state.searchList" :key="song.id">
        <span class="index">{{ index + 1 }}</span>
        <div class="songDetail" @click="pushSongsList(index)">
          <p class="songName">{{ song.name }}</p>
          <span class="authorName" v-for="author in song.ar" :key="author.id">{{
            author.name
          }}</span>
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
  </ul> -->
  <ul class="bottomBottom">
      <li class="song" v-for="(song, index) in state.searchList" :key="song.id">
        <div class="bottomBottom-left">
          <span class="index">{{ index + 1 }}</span>
        <div class="songDetail" @click="pushSongsList(index)">
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
import { ref, onMounted, reactive, computed } from "vue";
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {requestSearchList} from "@/api/homeRequest"
export default {
  name: "HomeSearch",
  setup() {
    let keyWord = ref("");
    let historyList = reactive([]);
    let state=reactive({searchList:[]})

    const store=useStore()
    const songsList=computed(()=>store.state.songsList)
   
   const router=useRouter()

    onMounted(() => {
      if (localStorage.getItem("historyList")) {
        historyList.push(...JSON.parse(localStorage.getItem("historyList")));
      }
    });

    function addHistory() {
      if (keyWord.value.trim()) {
        historyList.unshift(keyWord.value);
       //去重
        const index = historyList.lastIndexOf(keyWord.value);
        if (index !== 0) {
          historyList.splice(index, 1);
        }
        if (historyList.length > 8) {
          historyList.pop();
        }
        localStorage.setItem("historyList", JSON.stringify(historyList));
         searchList(keyWord.value)
      }
      keyWord.value = "";
    }
    function delHistory() {
      localStorage.removeItem("historyList");
      //historyList=[] 这种写法会使数据失去响应性
      historyList.splice(0, historyList.length);
    }
    async function searchList(keyword){
      let result=await requestSearchList(keyword)
     state.searchList=result.data.result.songs
     console.log(state.searchList);
    }
    function pushSongsList(index){
      songsList.value.push(state.searchList[index])
      // store.commit("UPDATEISPLAY",true)
      store.commit("UPDATESONGSLISTINDEX",songsList.value.length-1)
    }
    function goBack(){
      router.go(-1)
    }

    return {
      keyWord,
      historyList,
      addHistory,
      delHistory,
      searchList,
      pushSongsList,
      state,
      goBack
    };
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  color: #999;
  overflow: hidden;
  // background-color: blueviolet;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    // outline: none;
    border: none;
    border-bottom: 1px solid #999;
    height: 0.6rem;
    width: 85%;
  }
}
.topNext {
  padding: 0 0.2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .historySpan {
    display: inline-block;
    padding: 0.2rem;
    font-weight: 700;
  }
  .history {
    display: inline-block;
    padding: 0.2rem;
    color: black;
    background-color: rgb(182, 162, 162);
    margin: 0 0.1rem;
    border-radius: 50%;
  }
}
.container{
  width: 100%;
  padding: 0.2rem;
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
