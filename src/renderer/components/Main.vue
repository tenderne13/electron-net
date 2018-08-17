<template>
    <div>
        <ul class="card-ul">
            <li class="card-li" v-for="item in albumList" @click="initAlbum(item)">
                <Card class="card-body">
                    <img class="card-img" :src="item.coverImgUrl">
                    <p class="desc">{{item.name}}</p>
                    <p class="author">by {{item.creator.nickname}}</p>
                </Card>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getAlbumList} from "../api/api";

    export default {
        name: 'main-page',
        components: {},
        data() {
            return {
                albumList: []
            }
        },
        created() {
            this._getAlbumList()
        },
        methods: {
            initAlbum(item) {
                this.$Message.info('点击事件')
                console.log(item)
                this.$router.push('/info');
            },
            _getAlbumList() {
                getAlbumList().then((res) => {
                    console.log(res)
                    this.albumList = res.playlists
                    this.$Message.info('初始化加载完成')
                })
            },
            open(link) {
                require('electron').shell.openExternal(link)
            }
        }
    }
</script>

<style>
    .card-body {
        text-align: -webkit-left;
        width: 200px;
    }

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

    .card-ul {
        display: flex;
        overflow-y: scroll;
        height: 100%;
        flex-wrap: wrap;
        margin: 10px;
    }

    .card-li {
        line-height: 1.4;
        margin: 5px 15px;
        list-style: none outside;
        display: list-item;
        padding: 10px;
    }


</style>
