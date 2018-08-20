<template>
    <div class="album">
        <div class="back">
            <Button icon="ios-arrow-back" to="/" size="small" type="text">返回</Button>
        </div>
        <div class="albumHeader">
            <div class="albumCover">
                <img class="coverImg" :src="album.coverImgUrl">
            </div>
            <div class="albumInfo">
                <div class="albumname">{{album.name}}</div>
                <div class="userInfo">
                    <img class="userImg" :src="album.creator.avatarUrl">
                    <span class="nickname">
                    {{album.creator.nickname}}
                </span>
                </div>
                <div class="playBox">
                    <Button @click="addToPlayList">播放整个歌单</Button>
                </div>
                <div class="tag">
                    标签:
                    <Tag :key="tag" v-for="tag in album.tags">
                        {{tag}}
                    </Tag>
                </div>
                <p class="description">
                    介绍: {{album.description}}
                </p>
            </div>
        </div>
        <div class="songList">
            <Table size="small" :loading="isLoading" class="listClass" stripe :columns="columns" :data="tracks"></Table>
        </div>
        <BackTop></BackTop>

    </div>
</template>
<style lang="less">
    div{
        display: block;
    }
    .album{
        display: block;
        width: 100%;
        overflow-y: auto;
        .back{
            padding-top: 10px;
        }
        .songList{
            /*padding: 10px;*/
            .listClass{
                border: 0px;
            }
        }
        .albumHeader{
            padding: 20px;
            display: inline-flex;
            width: 100%;
            height: 260px;
            overflow: hidden;
            .albumCover{
                /*float: left;
                position: relative;*/
                width: 200px;
                height: 200px;
                margin-right: 20px;
                .coverImg{
                    width: 200px;
                    height: 200px;
                }
            }

            .albumInfo{
                overflow: hidden;
                position: relative;
                float: left;
                height: 100%;
                .albumname{
                    font-size: 20px;
                    margin: 0 0 10px;
                }
                .userInfo{
                    display: block;
                    font-size: 15px;
                    margin: 0 0 10px;
                    height: 35px;
                    line-height: 35px;
                    .userImg{
                        float: left;
                        width: 35px;
                        height: 35px;
                        margin-right: 10px;
                    }
                    .nickname{
                        font-size: 12px;
                    }
                }
                .playBox{
                    margin-bottom: 10px;
                }
                .tag{
                    margin-bottom: 10px;
                }
                .description{
                    word-wrap: break-word;
                    width: 100%;
                    height: 50px;
                    text-overflow: ellipsis;
                    overflow-y: auto;
                    &::-webkit-scrollbar {/*滚动条整体样式*/
                        width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
                        height: 1px;
                    }

                    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 5px rgba(225, 225, 226, 0.2);
                        background: #e1e1e2;
                    }
                    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                        -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
                        border-radius: 10px;
                        background: #ffffff;
                    }
                }
            }
        }
    }

</style>
<script>
    import {getAlbumDetail,downLoadSong} from "../../api/api";
    import {mapGetters,mapMutations,mapActions} from 'vuex'

    export default {
        name: 'album-page',
        components: {},
        computed:{
            ...mapGetters({
                album:'album',
                tracks:'tracks'
            })
        },
        data() {
            return {
                isLoading:false,
                columns: [
                    {
                        title: '标题',
                        key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '歌手',
                        key: 'singer',
                        render: (h, params) => {
                            return h('div',params.row.ar[0].name);
                        }
                    },
                    {
                        title: '专辑',
                        key: 'album',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.al.name)
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        width:140,
                        key: 'operation',
                        render: (h, params) => {
                            return h('ButtonGroup', [
                                h('Button',
                                    {
                                        props: {
                                            size: 'small',
                                            icon:"ios-add",
                                            title:'添加'
                                        },
                                        on: {
                                            click: () => {
                                                this.addTrack(params.row)
                                            }
                                        }
                                    }),
                                h('Button',
                                    {
                                        props: {
                                            size: 'small',
                                            icon:'md-download'
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(params.row.name)
                                                downLoadSong(params.row,this.$Message)
                                            }
                                        }
                                    }),
                                h('Button',
                                    {
                                        props: {
                                            size: 'small',
                                            icon:'ios-link'
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(params.row.name)
                                            }
                                        }
                                    })
                            ]);
                        }
                    }
                ],
                songLists:[]
            }
        },
        created() {
            this._getAlbumDetail()
        },
        methods: {
            _getAlbumDetail(){
                this.isLoading = true
                getAlbumDetail(this.album.id).then((res)=>{
                    this.setTracks(res.playlist.tracks)
                    this.isLoading = false
                })
            },
            addToPlayList(){
                this.addTrackArray()
            },
            ...mapMutations({
                setTracks:'SET_TRACKS',
                setCurrentSong: 'SET_CURRENT_SONG'
            }),
            ...mapActions([
                'addTrackArray',
                'addTrack'
            ])
        }
    }
</script>


