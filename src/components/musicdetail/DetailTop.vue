<template>
  <div class="detailTop" v-if="playlist.creator">
    <div class="title">
      <img :src="playlist.coverImgUrl" />
      <div class="title-left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="title-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </div>
    <div class="topMiddle">
      <img :src="playlist.coverImgUrl" />
      <div class="inner-right">
        <div class="name">{{ playlist.name }}</div>
        <div class="creator">
          <img :src="playlist.creator.avatarUrl" />
          <span style="margin-left: 5px">{{ playlist.creator.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <div class="description">
          <div>{{ playlist.description }}</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="topBottom">
      <div class="comment">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinxi"></use>
        </svg>
        <span>{{playlist.commentCount}}</span>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiangxiao"></use>
        </svg>
        <span>{{playlist.shareCount}}</span>
      </div>
      <div class="download">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="elect">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xuanze"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailTop",
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  padding: 0.2rem;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  img {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 6rem;
    z-index: -1;
    filter: blur(30px);
  }
  .title-left,
  .title-right {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 0.4rem;
  }
}
.topMiddle {
  margin-top: 0.4rem;
  padding: 0.2rem;
  width: 100%;
  height: 2.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.3rem;
  }
  .inner-right {
    margin-left: 0.2rem;
    display: flex;
    flex-direction: column;
    height: 2.5rem;
    overflow: hidden;
    color: white;
    .name {
      // border: 1px solid red;
      height: 0.7rem;
      font-size: 0.32rem;
      line-height: 0.35rem;
      overflow: hidden;
    }
    .creator {
      margin: 0.2rem 0;
      height: 0.8rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: rgb(189, 184, 184);
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        vertical-align: bottom;
      }
    }
    .description {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgb(189, 184, 184);
      div {
        width: 4.5rem;
        height: 0.6rem;
        font-size: 0.28rem;
        line-height: 0.3rem;
        overflow: hidden;
      }
    }
  }
}
.topBottom{
  margin-top: .2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  height: 1rem;
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
      margin-top: .1rem;
    }
  }
}
</style>
