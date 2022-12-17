<template>
  <DetailTop :playlist="state.playlist" />
  <DetailBottom :songsList="state.songsList" :subscribedCount="state.playlist.subscribedCount" />
</template>

<script>
import { useRoute } from "vue-router";
import { requestMusicDetail, requestMusicDetailList } from "../api/homeRequest";
import { reactive } from "vue";
import {useStore} from "vuex"
import DetailTop from "@/components/musicdetail/DetailTop";
import DetailBottom from "@/components/musicdetail/DetailBottom";
export default {
  name: "MusicDetail",
  setup() {
    let state = reactive({ playlist:{},songsList:[] });
    const store=useStore()
    async function getMusicDetail() {
      let id=useRoute().query.id;
      let result = await requestMusicDetail(id);
      state.playlist = result.data.playlist;
       console.log("playList",state.playlist);
      let result2 = await requestMusicDetailList({id,limit:20,offset:0});
      state.songsList=result2.data.songs
      store.commit("UPDATESONGSLIST",state.songsList)
      console.log("songsList",state.songsList);
    }

    getMusicDetail();

    return { state };
  },
  components: {
    DetailTop,
    DetailBottom,
  },
};
</script>

<style></style>
