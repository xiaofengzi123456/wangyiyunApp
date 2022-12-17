import { createStore } from "vuex";
import {requestSongLyric} from "@/api/homeRequest"

const state = {
  songsList: [
    {
      id: 1901371647,
      name:"孤勇者",
      al: {
        id: 137142551,
        name: "孤勇者",
        pic: 109951166702962260,
        picUrl:
        "https://p1.music.126.net/aG5zqxkBRfLiV7A8W0iwgA==/109951166702962263.jpg",
        pic_str: "109951166702962263",
      },
      ar: [{ name: '陈奕迅' }],
    },
  ],
  lyric:'',
  currentTime:0,
  songsListIndex: 0,
  isPlay: false,
  isDrawerLayer: false,
  isShowLyric:false,
  duration:0,
  isLogin:false
};
const actions = {
 async getSongLyrics(context,id){
   let result=await requestSongLyric(id)
   if(result.status==200){
    context.commit("GETSONGLYRICS",result.data.lrc.lyric)
   }
  }
};
const mutations = {
  UPDATEISPLAY(state, value) {
    state.isPlay = value;
  },
  UPDATESONGSLIST(state, value) {
    state.songsList = value;
  },
  UPDATESONGSLISTINDEX(state, value) {
    state.songsListIndex = value;
  },
  UPDATEISDRAWERLAYER(state, value) {
    state.isDrawerLayer = value;
  },
  UPDATEISSHOWLYRIC(state,value){
    state.isShowLyric=value
  },
  GETSONGLYRICS(state,value){
    state.lyric=value
  },
  UPDATECURRENTTIME(state,value){
    state.currentTime=value
  },
  UPDATEDURATION(state,value){
    state.duration=value
  }
};

export default createStore({
  state,
  actions,
  mutations,
});
