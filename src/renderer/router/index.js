import Vue from 'vue'
import VueRouter from 'vue-router'
import AlbumList from '../components/albumList/AlbumList'
import AlbumDetail from '../components/albumDetail/AlbumDetail'
import SystemInfo from '../components/LandingPage/SystemInformation'
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: AlbumList
        },
        {
            path: '/info',
            component: SystemInfo
        },
        {
            path: '/album/:id',
            component: AlbumDetail
        },
        {
            path: '/myplaylist/:playlistId',
            component: AlbumDetail
        }
    ]
})
