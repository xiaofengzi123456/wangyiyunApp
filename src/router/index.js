import { createRouter,createWebHashHistory} from "vue-router";
import store from "@/store"

const routes=[
    {
        path:"/",
        name:"home",
        component:()=>import("../views/Home"),
        meta:{
            isFooter:true
        }
    },
    {
        path:"/musicdetail",
        name:"musicdetail",
        component:()=>import("../views/MusicDetail"),
        props:true,
        meta:{
            isFooter:true
        }
    },
    {
        path:"/search",
        name:"search",
        component:()=>import("../views/HomeSearch"),
        meta:{
            isFooter:true
        }
    },
    {
        path:"/userinfo",
        name:"userinfo",
        component:()=>import("../views/UserInfo"),
        meta:{
            isFooter:true
        },
        beforeEnter: (to, from, next) => {
           if(store.state.isLogin){
            next()
           }else{
            next('/login')
           }
        }
    },
    {
        path:"/login",
        name:"login",
        component:()=>import("../views/LogIn"),
        meta:{
            isFooter:false
        }
    },
]



export default createRouter({history:createWebHashHistory(process.env.BASE_URL),routes})