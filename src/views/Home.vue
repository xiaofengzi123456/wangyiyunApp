<template>
  <TopNav/>
  <TopSwipe/>
  <IconList/>
  <MusicList/>
</template>

<script>
import TopNav from '@/components/home/TopNav' 
import TopSwipe from '@/components/home/TopSwipe' 
import IconList from '@/components/home/IconList' 
import MusicList from '@/components/home/MusicList' 
export default {
    name:"HomeComponent",
    setup(){

    },
    components:{
        TopNav,TopSwipe,IconList,MusicList
    }
}
</script>

<style>

</style>