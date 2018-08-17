<template>
    <div>
        <div class="catClass">
            <Select v-model="cat" @on-change="changeCat" @on-clear="clearCat" clearable  style="width:200px" placeholder="全部">
                <Option v-for="item in catlist" :value="item.name" :key="item.id">{{ item.name }}</Option>
            </Select>
        </div>
        <ul class="card-ul">
            <li class="card-li" v-for="item in albumList" @click="initAlbum(item)">
                <Card class="card-body">
                    <img class="card-img" :src="item.coverImgUrl">
                    <p class="desc">{{item.name}}</p>
                    <p class="author">by {{item.creator.nickname}}</p>
                </Card>
            </li>
        </ul>
        <Button small long type="text" :loading="isLoading" @click="loadingMore">
            <span v-if="!isLoading">加载更多</span>
            <span v-else>正在拼命加载。。。</span>
        </Button>

    </div>
</template>

<script>
    import {getAlbumList,getHotCatList} from "../../api/api";
    import {mapGetters,mapMutations,mapActions} from 'vuex'

    export default {
        name: 'main-page',
        components: {},
        computed:{
            ...mapGetters({
                albumList:'albumList',
                offset:'offset',
                cat:'cat',
                catlist:'catlist'
            })
        },
        data() {
            return {
                //albumList: []
                isLoading:false
            }
        },
        created() {
            this._getHotCatList()
            this._getAlbumList()
        },
        methods: {
            initAlbum(item) {
                this.setAlbum(item)
                this.$router.push(`/album/${item.id}`);
            },
            _getAlbumList() {
                this.isLoading = true;
                getAlbumList(null,this.offset,this.cat).then((res) => {
                    this.setAlbumList(res.playlists)
                    this.isLoading = false
                })
            },
            _getHotCatList() {
                getHotCatList().then((res)=>{
                    this.setCatlist(res.tags)
                })
            },
            open(link) {
                require('electron').shell.openExternal(link)
            },
            //加载更多
            loadingMore(){
                this.setOffset(36);
                this._getAlbumList()
            },
            changeCat(input){
                this.setCat(input)
                this.researh()
            },
            clearCat(){
                this.setCat('全部')
                this.researh()
            },
            researh(){
                this.resetOffset()
                this._getAlbumList()
            },
            ...mapMutations({
                setAlbumList:'SET_ALBUM_LIST',
                setAlbum : 'SET_ALBUM',
                setCat : 'SET_CAT',
                setOffset: 'SET_OFFSET',
                setCatlist: 'SET_CAT_LIST',
                resetOffset: 'RESET_OFFSET'
            })
        }
    }
</script>

<style lang="less">


    .catClass{
        padding: 10px;
    }

    .card-ul {
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        /*margin: 10px;*/

        .card-li {
            line-height: 1.4;
            margin: 5px 5px;
            list-style: none outside;
            display: list-item;
            /* padding: 10px; */

            .card-body {
                text-align: -webkit-left;
                width: 200px;
                .card-img {
                    width: 160px;
                    height: 160px;
                }

                .desc {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                }

                .author {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                }
            }
        }
    }




</style>
