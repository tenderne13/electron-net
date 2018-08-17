<template>
    <div class="player">
        <!--<Button @click="play">播放</Button>
        播放器条 || 当前歌曲：【{{currentSong.name}}】|| 播放进度【{{progress}}%】-->
        <div class="middle-footer">
            <div class="middle-content">
                <div class="middle-slider">
                    <div class="words">
                        <span class="songName">{{currentSong.name}}</span>

                        <a class="author">{{currentSong.ar[0].name}}</a>
                    </div>
                    <Slider :value="progress" @on-change="setPositionValue" :tip-format="format"></Slider>
                </div>

            </div>
        </div>
        <div class="left-footer">
            <div class="btn-group">
                <Button shape="circle" type="primary" icon="ios-skip-backward" class="playChild backColor"></Button>
                <Button shape="circle" type="primary" icon="ios-play" class="playChild backColor" @click="play" v-if="!isplaying"></Button>
                <Button shape="circle" type="primary" icon="ios-pause" class="playChild backColor" @click="pause" v-else></Button>
                <Button shape="circle" type="primary" icon="ios-skip-forward"  class="playChild backColor" @click="nextTrack"></Button>
                <Avatar shape="square" size="large" :src="currentSong.al.picUrl" />
            </div>
        </div>
        <div class="right-footer">
            <div class="middle-time">{{position}}/{{duration}}  【{{loadingState}}%】</div>
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
                margin-right: 10px;
            }
            .backColor{
                background-color: #e83c3c;
                border-color: #e83c3c;
            }
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
                    height: 14px;
                    line-height: 14px;
                    position: relative;
                    top: 8px;
                    .songName{
                        font-size: 15px;
                    }
                    .author{
                        font-size: 12px;
                        margin-left: 15px;
                    }
                }
            }
        }
    }
    .right-footer{
        float: left;
        width: 300px;
        margin-left: -300px;
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
                'loadingState'
            ])
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
                setIsplaying:'SET_ISPLAYING'
            }),
            ...mapActions([
                'playerInit',
                'play',
                'pause',
                'stop',
                'nextTrack',
                'setSongPosition'
            ])
        }
    }
</script>


