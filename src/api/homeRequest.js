import request from "./request"
//获取轮播图的数据
export const requestBanner=()=>request({url:"/banner?type=2",method:"get"})
//获取歌单-专辑
export const requestMusicList=()=>request({url:"/personalized?limit=10",method:"get"})
//获取歌单详情页上半部分的数据
export const requestMusicDetail=(id)=>request({url:`/playlist/detail?id=${id}`,method:"get"})
//获取歌单详情页下半部分的数据-歌曲列表
export const requestMusicDetailList=(params)=>request({url:'/playlist/track/all',method:"get",params})
//获取歌词
export const requestSongLyric=(id)=>request({url:`/lyric?id=${id}`,method:"get"})
//获取搜索页的歌曲或歌单列表
export const requestSearchList=(keyword)=>request({url:`/cloudSearch?keywords=${keyword}`,method:"get"})
//登录
export const requestLogin=(params)=>request({url:`/login/cellphone`,params,method:"get"})