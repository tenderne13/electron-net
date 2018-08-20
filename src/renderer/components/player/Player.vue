<template>
    <div class="player">
        <div class="middle-footer">
            <div class="middle-content">
                <div class="middle-slider">
                    <div class="words">
                        <span class="songName">{{currentSong.name}}</span>

                        <a class="author">{{currentSong.ar[0].name}}</a>
                    </div>
                    <Slider :value="progress" @on-change="setPositionValue" :tip-format="format"></Slider>
                    <div class="loadingState" :style="loadingStyle">

                    </div>
                </div>

            </div>
        </div>
        <div class="left-footer">
            <div class="btn-group">
                <Button shape="circle" type="primary" icon="ios-skip-backward" class="playChild backColor" @click="prevTrack"></Button>
                <Button shape="circle" type="primary" size="large" icon="ios-play" class="playChild backColor playLarge" @click="play" v-if="!isplaying"></Button>
                <Button shape="circle" type="primary" size="large" icon="ios-pause" class="playChild backColor playLarge" @click="pause" v-else></Button>
                <Button shape="circle" type="primary" icon="ios-skip-forward"  class="playChild backColor" @click="nextTrack"></Button>
                <Avatar shape="square" size="large" :src="currentSong.al.picUrl" />
            </div>
        </div>
        <div class="right-footer">
            <div class="middle-time">{{position}}/{{duration}}</div>
            <Icon :type="playmodeStyle" @click="changePlayMode" class="playmode" size="25"/>
            <div class="playList">
                <Button @click="setPlayListShow" size="small" icon="ios-list-box-outline" shape="circle" class="listBtn">{{playlist.length}}</Button>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .left-footer{
        float: left;
        width: 200px;
        margin-left: -100%;
        .btn-group{
            margin-left: 20px;
            .playChild{
                margin-right: 8px;
            }
            .backColor{
                background-color: #e83c3c;
                border-color: #e83c3c;
            }
            /*.playLarge{
                height: 38px;
                width: 38px;
            }*/
        }

    }
    .middle-footer{
        width: 100%;
        float: left;
        line-height: 50px;
        .middle-content{
            line-height: 50px;
            margin-left: 210px;
            margin-right: 310px;
            .middle-slider{
                padding: 0px;
                .words{
                    height: 11px;
                    line-height: 11px;
                    position: relative;
                    top: 4px;
                    .songName{
                        font-size: 15px;
                    }
                    .author{
                        font-size: 12px;
                        margin-left: 15px;
                    }
                }

                .ivu-slider-wrap{
                    margin: 12px 0;
                }
                .loadingState{
                    height: 3px;
                    line-height: 3px;
                    bottom: 16px;
                    position: relative;
                    background: #ff9900;
                    opacity: 0.2;
                    z-index: 0;
                }
            }


            .ivu-slider-button-wrap{
                z-index: 19930307;
            }
        }
    }
    .right-footer{
        float: left;
        width: 300px;
        margin-left: -300px;
        .middle-time{
            float: left;
        }
        .playmode{
            padding-left: 20px;
        }
        .playList{
            float: right;
            margin-right: 20px;
            .listBtn{
                background: #e1e1e2;
                .ivu-icon{
                    color: red;
                }
            }
        }
    }
</style>
<script>
    import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
    export default {
        name: 'player-page',
        components: {},
        computed:{
            ...mapGetters({
                album:'album',
                tracks:'tracks',
                currentSong:'currentSong',
                progress: 'progress',
                position:'humanPosition',
                duration:'humanDuration'
            }),
            ...mapState([
                'isplaying',
                'loadingState',
                'playlist',
                'playmode'
            ]),
            loadingStyle(){
                const style = {
                    width: this.loadingState + '%'
                };
                return style
            },
            playmodeStyle(){
                const prefix = 'ios-'
                switch (this.playmode){
                    case 0:
                        return prefix+'shuffle'
                    case 1:
                        return prefix+'repeat'
                    case 2:
                        return prefix+'refresh'
                    default:
                        return prefix+''

                }
            }
        },
        data() {
            return {
                //albumList: []
            }
        },
        created() {
            this.playerInit()
        },
        methods: {
            setPositionValue(value){
                this.setSongPosition(value)
            },
            format(input){
                return null
            },
            ...mapMutations({
                setTracks:'SET_TRACKS',
                setProgress:'SET_PROGRESS',
                setPosition:'SET_POSITION',
                setDuration:'SET_DURATION',
                setIsplaying:'SET_ISPLAYING',
                setPlayListShow:'SET_PLAYLIST_SHOW'
            }),
            ...mapActions([
                'playerInit',
                'play',
                'pause',
                'stop',
                'nextTrack',
                'prevTrack',
                'setSongPosition',
                'changePlayMode'
            ])
        }
    }
</script>


