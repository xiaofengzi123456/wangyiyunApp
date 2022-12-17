<template>
<div class="icons-container">
  <div class="icon-item">
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
    </svg>
    <span>每日推荐</span>
  </div>
  <div class="icon-item">
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diantai"></use>
    </svg>
    <span>私人FM</span>
  </div>
  <div class="icon-item">
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
    </svg>
    <span>歌单</span>
  </div>
  <div class="icon-item">
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paixingbang"></use>
    </svg>
    <span>排行榜</span>
  </div>
</div>
</template>

<script>
export default {
    name:"IconList"
}
</script>

<style lang="less" scoped>
    .icons-container{
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon-item{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .icon{
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>